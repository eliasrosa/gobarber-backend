import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import usersGuestRoutes from './guest/users.routes';
import sessionsGuestRoutes from './guest/sessions.routes';

const routes = Router();
// guest routes
routes.use('/sessions', sessionsGuestRoutes);
routes.use('/users', usersGuestRoutes);

// add middleware
routes.use(ensureAuthenticated);

// routes authenticated
routes.use('/users', usersRoutes);
routes.use('/appointments', appointmentsRoutes);

export default routes;
