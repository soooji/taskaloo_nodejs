var clientProfile = {
  first_name: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 2,
      tooShort: "needs to have 2 words or more",
    },
  },
  last_name: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 2,
      tooShort: "needs to have 2 words or more",
    },
  },
  birth_date: {
    presence: {
      message: "is required",
    },
  },
  nationality: {
    presence: {
      message: "is required",
    },
  },
};
var artistProfile = {
  artistic_name: {
    presence: {
      message: "is required",
    },
    length: {
      minimum: 2,
      tooShort: "needs to have 2 words or more",
    },
  },
  start_date: {
    presence: {
      message: "is required",
    },
  },
  nationality: {
    presence: {
      message: "is required",
    },
  },
};
module.exports = { clientProfile: clientProfile, artistProfile: artistProfile };
