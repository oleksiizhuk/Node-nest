import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entities";
import { IUser } from "./interfaces/user.interfaces";

@Injectable()
export class UserRepository {
  constructor(@InjectModel("User") private UserDB: Model<UserEntity>) {}

  async getUsers(): Promise<IUser[]> {
    return this.UserDB.find().limit(20).lean();
  }

  async createUser(user: UserDto): Promise<IUser> {
    const newUser = { ...user, email: user.email.toLowerCase() };
    return await this.UserDB.create(newUser);
  }

  async getUserById(id: string): Promise<IUser> {
    return this.UserDB.findById(Types.ObjectId(id));
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return this.UserDB.findOne({ email }).lean();
  }

  async update(id: string, user: UserDto): Promise<IUser> {
    return this.UserDB.findByIdAndUpdate(Types.ObjectId(id), user, {
      new: true,
    });
  }

  async delete(id: string): Promise<IUser> {
    return this.UserDB.findByIdAndRemove(Types.ObjectId(id));
  }
}
