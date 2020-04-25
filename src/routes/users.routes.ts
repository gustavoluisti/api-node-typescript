import { Router } from 'express';

import CreateuserService from '../service/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

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

usersRouter.patch('/avatar', ensureAuthenticated, async (req, res) => {
    return res.json({ ok: true })
})

export default usersRouter;
