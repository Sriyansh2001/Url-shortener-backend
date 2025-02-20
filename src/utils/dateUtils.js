const checkIsUrlExpire = ({ date, expireDate }) => {
  return date >= expireDate;
};

module.exports = {
  checkIsUrlExpire,
};
