(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-491ab9fe"],{"07ba":function(e,t,r){"use strict";r("d196")},2502:function(e,t,r){},"2c2a":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h4",[e._v("Средняя оценка: "+e._s(e.averageReview.toFixed(1)))]),r("v-rating",{attrs:{"half-increments":"",readonly:"",length:"5",size:"32",value:e.averageReview}}),e.mutable?r("v-btn",{attrs:{color:"primary"},on:{click:e.openCreateReviewModal}},[e._v("Добавить оценку")]):e._e(),e._l(e.reviews,(function(e){return r("review",{key:"review-"+e.id,attrs:{review:e}})})),r("create-review-modal",{attrs:{isOpened:e.isCreateReviewModalOpened,shopItem:e.shopItem},on:{close:e.closeCreateReviewModal}})],2)},n=[],s=r("1da1"),i=(r("96cf"),r("d3b7"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",{staticClass:"review-card"},[r("v-img",{staticClass:"user-avatar",attrs:{"max-width":"64",src:e.userAvatar}}),r("div",[r("h4",[e._v(e._s(e.review.User.name))]),r("p",[e._v(e._s(e.review.text))]),r("v-rating",{attrs:{"half-increments":"",readonly:"",length:"5",size:"16",value:e.review.grade}})],1)],1)}),o=[],l=(r("99af"),{props:{review:{type:Object,required:!0}},computed:{userAvatar:function(){var e;return null!==(e=this.review.User)&&void 0!==e&&e.avatar?"".concat(this.$api.BASE_URL).concat(this.review.User.avatar):r("113c")}}}),c=l,u=(r("5cfd"),r("2877")),d=r("6544"),p=r.n(d),h=r("b0af"),f=r("adda"),m=r("1d4d"),v=Object(u["a"])(c,i,o,!1,null,"24bb203c",null),g=v.exports;p()(v,{VCard:h["a"],VImg:f["a"],VRating:m["a"]});var w=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-dialog",{attrs:{"max-width":"600"},on:{"click:outside":function(t){return e.$emit("close")}},model:{value:e.isOpened,callback:function(t){e.isOpened=t},expression:"isOpened"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5 grey lighten-2"},[e._v(" Создание оценки ")]),r("v-card-text",[r("v-form",{model:{value:e.isFormValid,callback:function(t){e.isFormValid=t},expression:"isFormValid"}},[r("v-text-field",{attrs:{label:"Описание",rules:e.textInputRules,"validate-on-blur":""},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}}),r("v-input",{attrs:{value:e.grade,rules:e.gradeInputRules}},[r("v-rating",{attrs:{color:"primary",large:""},model:{value:e.grade,callback:function(t){e.grade=t},expression:"grade"}})],1)],1)],1),r("v-divider"),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"primary",text:"",loading:e.isLoading,disabled:!e.isFormValid},on:{click:e.createShopItem}},[e._v("Создать")])],1)],1)],1)},b=[],x={props:{isOpened:{type:Boolean,required:!0},shopItem:{type:Object,required:!0}},data:function(){return{text:"",grade:0,isFormValid:!1,isLoading:!1,textInputRules:[function(e){return!!e||"Заполните поле"},function(e){return(e||"").length>=3||"Минимальное число символов - 3"},function(e){return(e||"").length<=300||"Максимальное число символов - 300"}],gradeInputRules:[function(e){return!!e||"Заполните поле"}]}},methods:{createShopItem:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isFormValid){t.next=6;break}return e.isLoading=!0,t.next=4,e.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.createReview({text:e.text,grade:e.grade,shopItemId:e.shopItem.id});case 2:case"end":return t.stop()}}),t)}))));case 4:e.isLoading=!1,e.$emit("close",!0);case 6:case"end":return t.stop()}}),t)})))()}}},_=x,A=r("8336"),O=r("99d9"),I=r("169a"),R=r("ce7e"),k=r("4bd4"),y=r("b675"),S=r("2fa4"),$=r("8654"),C=Object(u["a"])(_,w,b,!1,null,"2fc5ac33",null),V=C.exports;p()(C,{VBtn:A["a"],VCard:h["a"],VCardActions:O["a"],VCardText:O["b"],VCardTitle:O["c"],VDialog:I["a"],VDivider:R["a"],VForm:k["a"],VInput:y["a"],VRating:m["a"],VSpacer:S["a"],VTextField:$["a"]});var j={components:{Review:g,CreateReviewModal:V},props:{shopItem:{type:Object,required:!0},mutable:{type:Boolean,required:!0}},data:function(){return{reviews:[],isCreateReviewModalOpened:!1}},computed:{averageReview:function(){var e=this;return this.reviews.reduce((function(t,r){return t+r.grade/e.reviews.length}),0)}},methods:{getReviews:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getReviewsByShopItemId(e.shopItem.id);case 2:e.reviews=t.sent.data;case 3:case"end":return t.stop()}}),t)}))));case 2:case"end":return t.stop()}}),t)})))()},openCreateReviewModal:function(){this.isCreateReviewModalOpened=!0},closeCreateReviewModal:function(e){this.isCreateReviewModalOpened=!1,e&&this.getReviews()}},watch:{shopItem:function(){this.getReviews()}},beforeMount:function(){this.getReviews()}},M=j,P=Object(u["a"])(M,a,n,!1,null,null,null);t["a"]=P.exports;p()(P,{VBtn:A["a"],VRating:m["a"]})},"42b1":function(e,t,r){"use strict";r("2502")},"4a0a":function(e,t,r){},"4bd4":function(e,t,r){"use strict";var a=r("5530"),n=(r("caad"),r("2532"),r("07ac"),r("4de4"),r("d3b7"),r("159b"),r("7db0"),r("58df")),s=r("7e2b"),i=r("3206");t["a"]=Object(n["a"])(s["a"],Object(i["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,r=function(e){return e.$watch("hasError",(function(r){t.$set(t.errorBag,e._uid,r)}),{immediate:!0})},a={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(e._uid)||(a.valid=r(e)))})):a.valid=r(e),a},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var r=this.watchers.find((function(e){return e._uid===t._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},5720:function(e,t,r){},"5cfd":function(e,t,r){"use strict";r("93d0")},"5d2b":function(e,t,r){"use strict";r("5720")},"93d0":function(e,t,r){},c4da:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.shopItem?r("v-container",[r("h2",{staticClass:"seller-profile-page__header"},[e._v(e._s(e.shopItem.name))]),r("div",{staticClass:"seller-profile-page__seller-profile-info-container"},[r("div",{staticClass:"mr-2 mb-2"},[r("v-img",{staticClass:"seller-profile-page__sellerProfile-avatar",attrs:{src:e.shopItemAvatar,alt:"Аватар пользователя"}})],1),r("v-col",[r("label",{staticClass:"text-caption",attrs:{for:"description-field"}},[e._v("Описание")]),r("p",{attrs:{name:"description-field"}},[e._v(e._s(e.shopItem.description))]),r("label",{staticClass:"text-caption",attrs:{for:"phone-field"}},[e._v("Цена")]),r("p",[e._v(" "+e._s(e.shopItem.price)+"р за "+e._s(e.shopItem.unitName)+" ")]),e.shopItem.ShopItemCategory?r("v-chip",{staticClass:"category-chip",attrs:{color:"primary",label:"",outlined:""}},[e._v(e._s(e.shopItem.ShopItemCategory.name)+" ")]):e._e(),e.isAuth&&e.isNotOwnerOfShopItem?r("v-btn",{staticClass:"d-flex",attrs:{color:"primary"},on:{click:e.addShopItemToBasket}},[e._v("Добавить в корзину")]):e._e()],1)],1),r("h2",[e._v("Продавец")]),e.sellerProfile?r("div",{staticClass:"d-flex"},[r("div",{staticClass:"mr-4 mb-2"},[r("v-img",{staticClass:"seller-profile-page__sellerProfile-avatar",attrs:{src:e.sellerProfileAvatar,alt:"Аватар пользователя","max-width":"160"}})],1),r("div",[r("label",{staticClass:"text-caption",attrs:{for:"description-field"}},[e._v("Название")]),r("p",{attrs:{name:"description-field"}},[e._v(e._s(e.sellerProfile.name))]),e._l(e.sellerProfile.SellerProfileCategories,(function(t){return r("v-chip",{key:"seller-profile-category-chip-"+t.id,staticClass:"category-chip",attrs:{color:"primary",label:"",outlined:""}},[e._v(e._s(t.name)+" ")])})),r("v-btn",{staticClass:"d-flex",attrs:{color:"primary",to:"/seller/"+e.sellerProfile.id}},[e._v("Перейти")])],2)]):e._e(),e.shopItem.ShopItemAssets.length?r("label",{staticClass:"text-caption d-block mt-3"},[e._v("Материалы")]):e._e(),r("assets-slider",{attrs:{mutable:!1,size:"lg",type:"shopItem",shopItem:e.shopItem},on:{update:e.getShopItem}}),r("h2",[e._v("Отзывы")]),r("reviews",{attrs:{shopItem:e.shopItem,mutable:e.isAuth&&e.isNotOwnerOfShopItem}})],1):e._e()},n=[],s=r("1da1"),i=(r("96cf"),r("99af"),r("cc2c")),o=r("2c2a"),l={components:{AssetsSlider:i["a"],Reviews:o["a"]},data:function(){return{shopItem:null,sellerProfile:null}},computed:{shopItemAvatar:function(){var e;return null!==(e=this.shopItem)&&void 0!==e&&e.avatar?"".concat(this.$api.BASE_URL).concat(this.shopItem.avatar):r("113c")},sellerProfileAvatar:function(){var e;return null!==(e=this.sellerProfile)&&void 0!==e&&e.avatar?"".concat(this.$api.BASE_URL).concat(this.sellerProfile.avatar):r("113c")},isAuth:function(){return this.$store.getters.isAuth},isNotOwnerOfShopItem:function(){var e,t;return(null===(e=this.$store.getters.userData)||void 0===e?void 0:e.id)!==(null===(t=this.sellerProfile)||void 0===t?void 0:t.userId)}},methods:{getShopItem:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getShopItem(e.$route.params.id);case 2:e.shopItem=t.sent.data;case 3:case"end":return t.stop()}}),t)}))));case 2:case"end":return t.stop()}}),t)})))()},getSellerProfile:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getSellerProfile(e.shopItem.ownerId);case 2:e.sellerProfile=t.sent.data;case 3:case"end":return t.stop()}}),t)}))));case 2:case"end":return t.stop()}}),t)})))()},addShopItemToBasket:function(){this.$store.dispatch("addShopItemToBasket",{sellerProfile:this.sellerProfile,shopItem:this.shopItem})}},beforeMount:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getShopItem();case 2:return t.next=4,e.getSellerProfile();case 4:case"end":return t.stop()}}),t)})))()}},c=l,u=(r("07ba"),r("2877")),d=r("6544"),p=r.n(d),h=r("8336"),f=r("cc20"),m=r("62ad"),v=r("a523"),g=r("adda"),w=Object(u["a"])(c,a,n,!1,null,"aa9933b4",null);t["default"]=w.exports;p()(w,{VBtn:h["a"],VChip:f["a"],VCol:m["a"],VContainer:v["a"],VImg:g["a"]})},cc2c:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{class:"slider-container slider-container--"+e.size},[r("vue-horizontal",[e._l(e.assets,(function(t){return r("asset",{key:"asset-"+t.link,attrs:{asset:t,mutable:e.mutable,size:e.size},on:{delete:function(r){return e.showDeleteAssetModal(t)},show:function(r){return e.showAsset(t)}}})})),e.mutable?r("button",{class:"add-asset-btn add-asset-btn--"+e.size,on:{click:e.openUploadAssetModal}},[e._v(" + ")]):e._e()],2),r("upload-asset-modal",{attrs:{isOpened:e.isUploadAssetModalOpened,title:"Загрузка материала",buttonLabel:"Загрузить",isVideoAllowed:!0},on:{close:e.closeUploadAssetModal}}),r("asset-modal",{attrs:{asset:e.currentAsset,isOpened:e.isAssetModalOpened},on:{close:e.closeAssetModal}}),r("confirmation-modal",{attrs:{isOpened:e.isDeleteAssetModalOpened,title:"Удаление материала",text:"Вы уверены, что хотите удалить материал?",buttonLabel:"Удалить"},on:{close:e.closeDeleteAssetModal,confirm:e.deleteAsset}})],1)},n=[],s=r("1da1"),i=(r("96cf"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:"asset asset--"+e.size,on:{click:e.showAsset}},[e.asset&&e.asset.link.includes(".mp4")?r("div",{staticClass:"video-placeholder"}):r("v-img",{staticClass:"image-placeholder",attrs:{src:e.assetSrc}}),e.mutable?r("v-icon",{staticClass:"delete-btn",on:{click:function(t){return t.stopPropagation(),e.deleteAsset.apply(null,arguments)}}},[e._v("mdi-close")]):e._e()],1)}),o=[],l=(r("99af"),r("9911"),{props:{mutable:{type:Boolean,default:!1},asset:{type:Object,required:!0},size:{type:String,required:!0}},methods:{deleteAsset:function(){this.$emit("delete")},showAsset:function(){this.$emit("show")}},computed:{assetSrc:function(){return"".concat(this.$api.BASE_URL).concat(this.asset.link)}}}),c=l,u=(r("42b1"),r("2877")),d=r("6544"),p=r.n(d),h=r("132d"),f=r("adda"),m=Object(u["a"])(c,i,o,!1,null,null,null),v=m.exports;p()(m,{VIcon:h["a"],VImg:f["a"]});var g=r("12c8"),w=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-overlay",{attrs:{value:e.isOpened},on:{click:function(t){return e.$emit("close")}}},[r("div",{staticClass:"asset-cover",on:{click:function(e){e.stopPropagation()}}},[e.isVideo?r("video-player",{staticClass:"video",attrs:{options:e.playerOptions}}):e._e(),r("v-img",{staticClass:"image",attrs:{src:e.assetSrc}})],1)])},b=[],x=(r("caad"),r("2532"),r("d6d3")),_=(r("fda2"),r("1a36"),{components:{videoPlayer:x["videoPlayer"]},props:{isOpened:{type:Boolean,required:!0},asset:{type:null|Object,required:!0}},computed:{assetSrc:function(){var e;return"".concat(this.$api.BASE_URL).concat(null===(e=this.asset)||void 0===e?void 0:e.link)},playerOptions:function(){return{muted:!1,language:"ru",playbackRates:[.7,1,1.5,2],height:"300",sources:[{type:"video/mp4",src:this.assetSrc}]}},isVideo:function(){var e;return null===(e=this.asset)||void 0===e?void 0:e.link.includes(".mp4")}}}),A=_,O=(r("f6aa"),r("a797")),I=Object(u["a"])(A,w,b,!1,null,"c711e308",null),R=I.exports;p()(I,{VImg:f["a"],VOverlay:O["a"]});var k=r("0f7b"),y={components:{Asset:v,UploadAssetModal:g["a"],AssetModal:R,ConfirmationModal:k["a"]},props:{mutable:{type:Boolean,default:!1},type:{type:String,required:!0},sellerProfile:{type:Object},shopItem:{type:Object},size:{type:String,default:"sm"}},data:function(){return{isUploadAssetModalOpened:!1,isAssetModalOpened:!1,isDeleteAssetModalOpened:!1,currentAsset:null}},methods:{openUploadAssetModal:function(){this.isUploadAssetModalOpened=!0},showAsset:function(e){this.currentAsset=e,this.isAssetModalOpened=!0},closeAssetModal:function(){this.isAssetModalOpened=!1},closeUploadAssetModal:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e){r.next=8;break}if("sellerProfile"!==t.type){r.next=6;break}return r.next=4,t.addSellerProfileAsset(e);case 4:r.next=8;break;case 6:return r.next=8,t.addShopItemAsset(e);case 8:t.isUploadAssetModalOpened=!1;case 9:case"end":return r.stop()}}),r)})))()},addSellerProfileAsset:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$api.createSellerProfileAsset({asset:e});case 2:t.$emit("update");case 3:case"end":return r.stop()}}),r)}))));case 2:case"end":return r.stop()}}),r)})))()},addShopItemAsset:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$api.createShopItemAsset({asset:e},t.shopItem.id);case 2:t.$emit("update");case 3:case"end":return r.stop()}}),r)}))));case 2:case"end":return r.stop()}}),r)})))()},showDeleteAssetModal:function(e){this.currentAsset=e,this.isDeleteAssetModalOpened=!0},closeDeleteAssetModal:function(){this.isDeleteAssetModalOpened=!1},deleteAsset:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("sellerProfile"!==e.type){t.next=5;break}return t.next=3,e.deleteSellerProfileAsset(e.currentAsset);case 3:t.next=7;break;case 5:return t.next=7,e.deleteShopItemAsset(e.currentAsset);case 7:e.isDeleteAssetModalOpened=!1;case 8:case"end":return t.stop()}}),t)})))()},deleteSellerProfileAsset:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$api.deleteSellerProfileAsset(e.id);case 2:t.$emit("update");case 3:case"end":return r.stop()}}),r)}))));case 2:case"end":return r.stop()}}),r)})))()},deleteShopItemAsset:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$callWithErrorHandler(Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$api.deleteShopItemAsset(e.id);case 2:t.$emit("update");case 3:case"end":return r.stop()}}),r)}))));case 2:case"end":return r.stop()}}),r)})))()}},computed:{assets:function(){return this.sellerProfile?this.sellerProfile.SellerProfileAssets:this.shopItem.ShopItemAssets}}},S=y,$=(r("5d2b"),r("a523")),C=Object(u["a"])(S,a,n,!1,null,"35929c50",null);t["a"]=C.exports;p()(C,{VContainer:$["a"]})},d196:function(e,t,r){},f6aa:function(e,t,r){"use strict";r("4a0a")}}]);
//# sourceMappingURL=chunk-491ab9fe.f291e021.js.map