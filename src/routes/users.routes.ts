import { Router } from 'express';

import CreateuserService from '../service/CreateUserService';

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

        return res.json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default usersRouter;
