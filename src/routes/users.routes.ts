import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateuserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const createuser = new CreateuserService();

        const user = await createuser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (req, res) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: req.user.id,
                avatarFilename: req.file.filename,
            });

            delete user.password;

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    },
);

export default usersRouter;
