require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DEVELOPMENT_DATABASE",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "TEST_DATABASE",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
