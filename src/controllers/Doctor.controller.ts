import { Router, Request, Response } from 'express';
import {
  createUser as createFirebaseUser,
  disableUser as disableFirebaseUser,
} from '../firebase';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import {
  createDoctor,
  disableDoctor,
  enableDoctor,
  findAllDoctors,
} from '../services/Doctor.service';
import { createUser } from '../services/User.service';

const DoctorRouter = Router();

/* Endpoint that will create a new Doctor account */
DoctorRouter.post(
  '/',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const {
        birthdate,
        degree,
        email,
        first_name,
        last_name,
        password,
        username,
      } = req.body;

      if (!birthdate) {
        return res.status(400).send({ message: 'Missing birthdate.' });
      }
      if (!degree) {
        return res.status(400).send({ message: 'Missing degree.' });
      }
      if (!email) {
        return res.status(400).send({ message: 'Missing email.' });
      }
      if (!first_name) {
        return res.status(400).send({ message: 'Missing first_name.' });
      }
      if (!last_name) {
        return res.status(400).send({ message: 'Missing last_name.' });
      }
      if (!password) {
        return res.status(400).send({ message: 'Missing password.' });
      }
      if (!username) {
        return res.status(400).send({ message: 'Missing username.' });
      }

      const firebaseUserId = await createFirebaseUser(
        username,
        email,
        password,
        'DOCTOR'
      );

      if (firebaseUserId) {
        const newUserId = await createUser(
          birthdate,
          email,
          first_name,
          firebaseUserId,
          last_name,
          password,
          2,
          username
        );

        if (newUserId) {
          const newDoctor = await createDoctor(degree, newUserId);

          return res.status(201).send(newDoctor);
        }
      } else {
        return res.status(400).send({
          message: 'The email adress is already in use. Please try again!',
        });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will retrieve all Doctors 
This endpoint is for you to quickly test if the rows are created */
DoctorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const doctorsList = await findAllDoctors();

    return res.status(200).send({ doctors: doctorsList });
  } catch (error) {
    console.error(error);
  }
});

/* Endpoint that will restore a Doctor account */
DoctorRouter.patch(
  '/:id/enable',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const enabledDoctorId = await enableDoctor(id);

      if (!enabledDoctorId) {
        res
          .status(404)
          .send({ message: `Doctor with id: ${id} was not found.` });
      } else {
        await disableFirebaseUser(enabledDoctorId, false);

        res.status(200).send({ message: 'Doctor restored.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will soft delete a Doctor account */
DoctorRouter.delete(
  '/:id/:user_id',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const deletedDoctorId = await disableDoctor(id);

      if (!deletedDoctorId) {
        res
          .status(404)
          .send({ message: `Doctor with id: ${id} was not found.` });
      } else {
        await disableFirebaseUser(deletedDoctorId, true);

        res.status(200).send({ message: 'Doctor deleted.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

export default DoctorRouter;
