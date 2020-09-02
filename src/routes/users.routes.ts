import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    // console.log(request.file);
    return response.json({ ok: true });
  },
);

export default usersRoutes;
