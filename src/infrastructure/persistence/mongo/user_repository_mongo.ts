import mongoose from "mongoose";
import { User } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/repositories/user_repository";

interface UserDocument extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export class UserRepositoryMongo implements UserRepository {
  constructor() {}

  async save(user: User): Promise<void> {
    const newUser = new UserModel(user)
    await newUser.save()
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ email })
    return userDocument
      ? new User(userDocument._id, userDocument.email, userDocument.password)
      : null
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id)

    return user ? new User(user._id, user.email, user.password) : null
  }
}