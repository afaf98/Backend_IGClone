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
<<<<<<< HEAD
    use_env_variable: "PRODUCTION_DATABASE",
    dialect: "postgres",
=======
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
>>>>>>> edf62289401a9f850c4bd55dea3099affec39898
  },
};
