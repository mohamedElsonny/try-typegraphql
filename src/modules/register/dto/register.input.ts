import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailExists } from '../decorators/is-email-exists.decorator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailExists()
  email: string;

  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  password: string;
}
