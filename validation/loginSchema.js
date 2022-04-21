module.exports = {
  email: {
    notEmpty: {
      bail: true,
      errorMessage: 'Обязательное поле',
    },
  },
  password: {
    notEmpty: {
      bail: true,
      errorMessage: 'Обязательное поле',
    },
  },
};
