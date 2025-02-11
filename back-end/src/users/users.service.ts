import User from "../models/user.model.js";
import { UpdateUserDto } from "../validations/update-user.schema.js";

export class UsersService {
  async getUserById(id: string) {
    const user = await User.findById({ _id: id }).select(
      "_id name email phone"
    );
    return user;
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    return User.updateOne({ _id: id }, { $set: userData });
  }

  async isEmailAssociatedWithAnotherUser(id: string, email: string) {
    return User.findOne({ email, _id: { $ne: id } });
  }
}
