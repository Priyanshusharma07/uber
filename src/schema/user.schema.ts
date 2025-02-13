import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop({ })
  firstName: string;

  @Prop({ })
  lastName: string;

  @Prop({ })
  email: string;

  @Prop({ })
  mobileNumber: string;

  @Prop()
  googleId: string;
  
  @Prop()
  facebookeId:string;

  @Prop()
  gitId:string;
}

export const UserSchema = SchemaFactory.createForClass(User);
