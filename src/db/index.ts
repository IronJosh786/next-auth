import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("DB connected");
    });
    connection.on("error", (error) => {
      console.log("Could not connect db" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Error while connecting to DB" + error);
  }
};

export default connect;
