const bcrypt = require("bcrypt");

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  formatDate: (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      seconds: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  },
  inc: (index) => {
    return index + 1;
  },
  comparePassword: async (pw, compare) => {
    console.log("received:", pw, compare);
    const result = await bcrypt.compare(pw, compare);
    console.log(result);
    return result ? true : console.log("check failed");
  },
  passStrength: (pw) => {
    const regex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    return regex.test(pw)
  },
  emailValidate: (email) => {
    regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "g");
    return regex.test(email);
  },
  hashPass: async (pw) => {
    return bcrypt.hash(pw, 10);
  },
};