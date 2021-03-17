require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DEVELOPMENT_DATABASE",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "TEST_DATABASE",
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "PRODUCTION_DATABASE",
    dialect: "postgres",
  },
};
