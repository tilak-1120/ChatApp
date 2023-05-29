const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/conn");

// Env file configuration
dotenv.config({ path: "./config/config.env" });

// Database connection
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
