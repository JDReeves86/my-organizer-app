const parseError = (error) => {
  const removeThese = [
    "ValidationError:",
    "email:",
    "password:",
    "username:",
    "Error:",
  ];
  const split = error.split(" ");
  const returnString = split.filter((el) => {
    return !removeThese.includes(el);
  });
  return returnString.join(" ");
};

const capitalizeFirstLetter = (string) => {
  const newString = string.split("");
  const capLetter = newString[0].toUpperCase();
  newString.shift();
  newString.unshift(capLetter);
  return newString.join("");
};

const calculateStartYear = () => {
  return new Date().getFullYear();
};

module.exports = {
  parseError,
  capitalizeFirstLetter,
  calculateStartYear,
};
