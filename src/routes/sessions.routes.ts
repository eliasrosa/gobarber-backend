import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessions = Router();

sessions.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const session = new CreateSessionService();

    const { user, token } = await session.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessions;
