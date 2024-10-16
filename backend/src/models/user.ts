import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type : String,
            required : true,
            unique: true,
        },
        email: {
            type : String,
            required : true,
            select: false,
            unique: true,
        },
        password: {
            type : String,
            required : true,
            select: false,
        }
    }
);

type user = InferSchemaType<typeof userSchema>

export default model<user>('user', userSchema);