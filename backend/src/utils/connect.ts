import mongoose from "mongoose";

export function connect(uri: string) {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected");
    });
}

export function close() {
  return mongoose.disconnect();
}
