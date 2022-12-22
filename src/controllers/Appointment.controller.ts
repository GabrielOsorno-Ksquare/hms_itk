import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import {
  createAppointment,
  disableAppointment,
  findAllAppointments,
  findPatientAppointmentById,
  updateAppointment,
} from '../services/Appointment.service';

const AppointmentRouter = Router();

/* Endpoint that will create a new Appointment */
AppointmentRouter.post(
  '/',
  isAuthenticated,
  isAuthorized({
    roles: ['PATIENT'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const { date, description, doctor_id, patient_id, title } = req.body;

      const newAppointment = await createAppointment(
        date,
        description,
        doctor_id,
        patient_id,
        title
      );

      if (!date) {
        return res.status(400).send({ message: 'Missing date.' });
      }
      if (!description) {
        return res.status(400).send({ message: 'Missing description.' });
      }
      if (!doctor_id) {
        return res.status(400).send({ message: 'Missing doctor_id.' });
      }
      if (!patient_id) {
        return res.status(400).send({ message: 'Missing patient_id.' });
      }
      if (!title) {
        return res.status(400).send({ message: 'Missing title.' });
      }

      if (newAppointment) {
        return res.status(201).send(newAppointment);
      } else {
        return res
          .status(500)
          .send({ message: 'Something went wrong :C. Please try again!' });
      }
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will retrieve all Appointment */
AppointmentRouter.get(
  '/',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 0);
      const pageSize = Number(req.query.pageSize || 10);
      const { doctor_id, patient_id, is_deleted } = req.query;

      let filters = {};
      if (doctor_id) filters = { ...filters, doctor_id };
      if (patient_id) filters = { ...filters, patient_id };
      if (is_deleted) filters = { ...filters, is_deleted };

      const appointmentsList = await findAllAppointments(
        page,
        pageSize,
        filters
      );

      return res
        .status(200)
        .send({ appointments: appointmentsList, page, pageSize });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will retrieve all Appointments from a Doctor */
AppointmentRouter.get(
  '/doctor/:id',
  isAuthenticated,
  isAuthorized({
    roles: ['DOCTOR'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const doctor_id = Number(req.params.id);
      const page = Number(req.query.page || 0);
      const pageSize = Number(req.query.pageSize || 10);
      const { patient_id, date } = req.query;

      let filters = {};
      if (doctor_id) filters = { ...filters, doctor_id };
      if (patient_id) filters = { ...filters, patient_id };
      if (date) filters = { ...filters, date };

      const appointmentsList = await findAllAppointments(
        page,
        pageSize,
        filters
      );

      return res
        .status(200)
        .send({ appointments: appointmentsList, page, pageSize });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will retrieve all Appointments from a Patient */
AppointmentRouter.get(
  '/patient/:id',
  isAuthenticated,
  isAuthorized({
    roles: ['PATIENT'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 0);
      const pageSize = Number(req.query.pageSize || 10);
      const patient_id = Number(req.params.id);
      const filters = { patient_id, is_deleted: false };

      const appointmentsList = await findAllAppointments(
        page,
        pageSize,
        filters
      );

      return res
        .status(200)
        .send({ appointments: appointmentsList, page, pageSize });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will retrieve one Appointment from a Doctor by Id */
AppointmentRouter.get(
  '/:appointment_id/patient/:patient_id',
  isAuthenticated,
  isAuthorized({
    roles: ['PATIENT'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const appointment_id = Number(req.params.appointment_id);
      const patient_id = Number(req.params.patient_id);

      const appointment = await findPatientAppointmentById(
        appointment_id,
        patient_id
      );

      if (!appointment) {
        return res.status(404).send({
          message: `Appointment with id: ${appointment_id} was not found.`,
        });
      }
      return res.status(200).send(appointment);
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will update an Appointment's date */
AppointmentRouter.patch(
  '/:id',
  isAuthenticated,
  isAuthorized({
    roles: ['DOCTOR'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);
      const { date } = req.body;

      if (!date) {
        return res.status(400).send({ message: 'Missing date.' });
      }

      const updatedAppointment = await updateAppointment(id, date);

      if (!updatedAppointment) {
        res
          .status(404)
          .send({ message: `Appointment with id: ${id} was not found.` });
      } else {
        res.status(200).send({ message: 'Appointment updated.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will soft delete an Appointment */
AppointmentRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized({
    roles: ['PATIENT'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const deletedAppointment = await disableAppointment(id);

      if (!deletedAppointment) {
        res
          .status(404)
          .send({ message: `Appointment with id: ${id} was not found.` });
      } else {
        res.status(200).send({ message: 'Appointment deleted.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

export default AppointmentRouter;
