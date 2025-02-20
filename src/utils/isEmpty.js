const isEmpty = (value) => {
  if (!value) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  if (value === null) return true;
  return false;
};

module.exports = { isEmpty };
