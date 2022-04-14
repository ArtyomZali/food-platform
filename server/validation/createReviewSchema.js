module.exports = {
  text: {
    notEmpty: {
      bail: true,
      errorMessage: 'Обязательное поле',
    },
    isString: {
      bail: true,
      errorMessage: 'Параметр должен быть строкой',
    },
  },
  shopItemId: {
    notEmpty: {
      bail: true,
      errorMessage: 'Обязательное поле',
    },
    isInt: {
      bail: true,
      errorMessage: 'Значение должно быть числовым',
    },
  },
  grade: {
    notEmpty: {
      bail: true,
      errorMessage: 'Обязательное поле',
    },
    isInt: {
      bail: true,
      errorMessage: 'Значение должно быть числовым',
    },
    isIn: [0, 1, 2, 3, 4, 5]
  }
};
