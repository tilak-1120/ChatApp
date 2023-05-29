const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Database`);
  } catch (err) {
    console.log(`MongoDB error ${err}`);
  }
};

module.exports = connectDatabase;
