module.exports = {
    customerId: {
        isInt: {
            bail: true,
            errorMessage: 'Параметр должен быть числовым',
        },
    },
    sellerId: {
        isInt: {
            bail: true,
            errorMessage: 'Значение должно быть числовым',
        },
    }
};
