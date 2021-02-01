var register = {
  email: {
    presence: {
      message: "is required",
    },
    email: {
      message: "doesn't look like a valid email",
    },
  },
  username: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 3,
      tooShort: "needs to have 3 words or more",
    },
  },
  security_question: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 2,
      tooShort: "needs to have 2 words or more",
    },
  },
  security_answer: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 1,
      tooShort: "needs to have 1 words or more",
    },
  },
  password: {
    presence: {
      message: "is required",
    },
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "must be 8 characters and contains both letter and digit",
    },
  },
};

var changePassword = {
  username: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 3,
      tooShort: "needs to have 3 words or more",
    },
  },
  security_question: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 2,
      tooShort: "needs to have 2 words or more",
    },
  },
  security_answer: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 1,
      tooShort: "needs to have 2 words or more",
    },
  },
  password: {
    presence: {
      message: "is required",
    },
    format: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: "must be 8 characters and contains both letter and digit",
    },
  },
};

module.exports = { register: register, changePassword: changePassword };
