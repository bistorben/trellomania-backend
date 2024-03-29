import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      minlength: 2,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
    sharedBoards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
