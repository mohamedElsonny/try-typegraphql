import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '@entities/User';
import { RegisterInput } from './dto/register.input';

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg('data') { email, password, firstName, lastName }: RegisterInput): Promise<User> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({ firstName, lastName, email, password: hashedPassword }).save();

    return userCreated;
  }
}
