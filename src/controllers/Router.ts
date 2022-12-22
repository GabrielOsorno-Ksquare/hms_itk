import express from 'express';
import AppointmentRouter from './Appointment.controller';
import DoctorRouter from './Doctor.controller';
import PatientRouter from './Patient.controller';

const apiRouter = express.Router();
export const appRouter = express.Router();

apiRouter.use('/appointment', AppointmentRouter);
apiRouter.use('/doctor', DoctorRouter);
apiRouter.use('/patient', PatientRouter);

appRouter.use('/v1', apiRouter);
