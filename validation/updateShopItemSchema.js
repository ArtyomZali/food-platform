module.exports = {
    name: {
      notEmpty: {
        bail: true,
        errorMessage: 'Обязательное поле',
      },
      isString: {
        bail: true,
        errorMessage: 'Параметр должен быть строкой',
      },
    },
    description: {
      notEmpty: {
        bail: true,
        errorMessage: 'Обязательное поле',
      },
      isString: {
        bail: true,
        errorMessage: 'Параметр должен быть строкой',
      },
    },
  };
  