module.exports = {
    firstName: {
      notEmpty: {
        bail: true,
        errorMessage: 'Обязательное поле',
      },
      isString: {
        bail: true,
        errorMessage: 'Параметр должен быть строкой',
      },
    },
    lastName: {
      notEmpty: {
        bail: true,
        errorMessage: 'Обязательное поле',
      },
      isString: {
        bail: true,
        errorMessage: 'Параметр должен быть строкой',
      },
    },
    email: {
      notEmpty: {
        bail: true,
        errorMessage: 'Обязательное поле',
      },
      isString: {
        bail: true,
        errorMessage: 'Параметр должен быть строкой',
      },
    },
    password: {
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
  