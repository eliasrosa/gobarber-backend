import { getRepository } from 'typeorm';
// import { hash } from 'bcryptjs';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrent e-mail/password combination.');
    }

    //
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw Error('Incorrent e-mail/password combination.');
    }

    return { user };
  }
}

export default CreateSessionService;
