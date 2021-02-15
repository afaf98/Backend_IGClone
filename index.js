const port = process.env.PORT || 5000;
const app = require("./app");

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
