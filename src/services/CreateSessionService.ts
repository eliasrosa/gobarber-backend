import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
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

    const token = sign({}, 'a1d7896a3eed8933878a053bf5e9a7e9', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
