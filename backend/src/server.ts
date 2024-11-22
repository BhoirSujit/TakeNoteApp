import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validate.js";
import app from "./app.js";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTING_STRING)
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log("server is running on : " + port);
    });
  })
  .catch(console.error);
