function validate(schema, path) {
  return async (req, res, next) => {
    try {
      const validation = await schema.validate(req[path], {
        abortEarly: false,
      });
      req[
        `validated${path.charAt(0).toUpperCase() + path.slice(1)}`
      ] = validation;

      next();
    } catch (error) {
      res.status(400).json({ message: "Bad request", errors: error.errors });
    }
  };
}

module.exports = validate;
