import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ){}

    async createUser(email:string) {
        const user = new this.userModel(email);
        return await user.save();
      }

      async UserbyGoogle(googleId: string): Promise<User | null> {
        const user = await this.userModel.findOne({ googleId }).exec();
        if (!user) {
          throw new NotFoundException(`User with Google ID ${googleId} not found`);
        }
        return user;
      }
    
      // Get all users
      async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
      }
    
      // Get a user by ID
      async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
      }
}