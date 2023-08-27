const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'some-secret-key';

module.exports = {
  SECRET_KEY,
};
