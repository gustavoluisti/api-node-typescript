import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointment = await appointmentsRepository.find();

    return res.status(200).json(appointment);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id,
        });

        return res.status(200).json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
