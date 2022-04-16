const User = require('./user');
const SellerProfile = require('./sellerProfile');
const SellerProfileAsset = require('./sellerProfileAsset');
const ShopItem = require('./shopItem');
const ShopItemAsset = require('./shopItemAsset');
const Chat = require('./chat.js');
const ChatMessage = require('./chatMessage.js');
const Purchase = require('./purchase');
const Review = require('./review');
const PurchaseShopItem = require('./purchaseShopItem');
const Address = require('./address');
const SellerProfileCategory = require('./sellerProfileCategory');
const SellerProfileCategoryBind = require('./sellerProfileCategoryBind');
const ShopItemCategory = require('./shopItemCategory');
const ShopItemUnit = require('./shopItemUnit');

User.hasOne(SellerProfile, {
  foreignKey: 'userId'
});
SellerProfile.belongsTo(User, { foreignKey: 'userId' });

SellerProfile.hasMany(SellerProfileAsset, {
  foreignKey: 'sellerProfileId'
});
SellerProfileAsset.belongsTo(SellerProfile, { foreignKey: 'sellerProfileId' });

Chat.belongsTo(User, {
  foreignKey: 'customerId'
});
Chat.belongsTo(SellerProfile, {
  foreignKey: 'sellerId'
});

Chat.hasMany(ChatMessage, {
  foreignKey: 'chatId'
});
ChatMessage.belongsTo(Chat);

User.belongsTo(Address, {
  foreignKey: 'addressId'
});
SellerProfile.belongsTo(Address, {
  foreignKey: 'addressId'
});

Review.belongsTo(User, {
  foreignKey: 'authorId'
});
Review.belongsTo(ShopItem, {
  foreignKey: 'shopItemId'
});
ShopItem.hasMany(Review);

ShopItem.hasMany(ShopItemAsset, {
  foreignKey: 'shopItemId'
});
ShopItemAsset.belongsTo(ShopItem);

ShopItem.belongsTo(ShopItemUnit, {
  foreignKey: 'unitId'
});
ShopItemUnit.hasOne(ShopItem, { foreignKey: 'unitId' });

ShopItem.belongsTo(SellerProfile, { foreignKey: 'ownerId' });
SellerProfile.hasMany(ShopItem, { foreignKey: 'ownerId' });

Purchase.belongsTo(User, {
  foreignKey: 'customerId'
});
Purchase.belongsTo(SellerProfile, {
  foreignKey: 'sellerId'
});
Purchase.belongsToMany(ShopItem, { through: PurchaseShopItem, foreignKey: 'shopItemId' });
ShopItem.belongsToMany(Purchase, { through: PurchaseShopItem, foreignKey: 'purchaseId' });

SellerProfile.belongsToMany(SellerProfileCategory, { through: SellerProfileCategoryBind, foreignKey: 'sellerProfileId' });
SellerProfileCategory.belongsToMany(SellerProfile, { through: SellerProfileCategoryBind, foreignKey: 'categoryId' });

ShopItem.belongsTo(ShopItemCategory, { foreignKey: 'categoryId' });
ShopItemCategory.hasMany(ShopItem, { foreignKey: 'categoryId' });

SellerProfileCategory.hasMany(ShopItemCategory, { foreignKey: 'sellerProfileCategoryId' });
ShopItemCategory.belongsTo(SellerProfileCategory, { foreignKey: 'sellerProfileCategoryId' });

module.exports = {
  User,
  SellerProfile,
  SellerProfileAsset,
  ShopItem,
  ShopItemAsset,
  Chat,
  ChatMessage,
  Purchase,
  Review,
  PurchaseShopItem,
  Address,
  SellerProfileCategory,
  SellerProfileCategoryBind,
  ShopItemCategory,
  ShopItemUnit,
};
