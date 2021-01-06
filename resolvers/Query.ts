//_, args, ctx
const users = (_, args, ctx) => {
  return {
    id: "1",
    email: "test@test",
    password: "1234",
  };
};

const str = (_, args, ctx) => {
  return "test str is this";
};

module.exports = {
  users,
  str,
};
