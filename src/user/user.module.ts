import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService,MongooseModule]
})
export class UserModule {}
