import { Router, Request, Response } from 'express';
import {
  createUser as createFirebaseUser,
  disableUser as disableFirebaseUser,
} from '../firebase';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import {
  createPatient,
  disablePatient,
  enablePatient,
  findAllPatients,
} from '../services/Patient.service';
import { createUser } from '../services/User.service';

const PatientRouter = Router();

/* Endpoint that will create a new Patient account */
PatientRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {
      birthdate,
      email,
      first_name,
      is_premium,
      last_name,
      password,
      premium_exp_date,
      username,
    } = req.body;

    if (!birthdate) {
      return res.status(400).send({ message: 'Missing birthdate.' });
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
      'PATIENT'
    );

    if (firebaseUserId) {
      const newUserId = await createUser(
        birthdate,
        email,
        first_name,
        firebaseUserId,
        last_name,
        password,
        3,
        username
      );

      if (newUserId) {
        const newPatient = await createPatient(
          is_premium,
          premium_exp_date,
          newUserId
        );

        return res.status(201).send(newPatient);
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
});

/* Endpoint that will retrieve all Patients 
This endpoint is for you to quickly test if the rows are created */
PatientRouter.get('/', async (req: Request, res: Response) => {
  try {
    const patientsList = await findAllPatients();

    return res.status(200).send({ patients: patientsList });
  } catch (error) {
    console.error(error);
  }
});

/* Endpoint that will restore a Patient account */
PatientRouter.patch(
  '/:id/enable',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const enablededPatientId = await enablePatient(id);

      if (!enablededPatientId) {
        res
          .status(404)
          .send({ message: `Patient with id: ${id} was not found.` });
      } else {
        await disableFirebaseUser(enablededPatientId, false);

        res.status(200).send({ message: 'Patient restored.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

/* Endpoint that will delete a Patient account */
PatientRouter.delete(
  '/:id/:user_id',
  isAuthenticated,
  isAuthorized({
    roles: ['ADMIN'],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);

      const deletedPatientId = await disablePatient(id);

      if (!deletedPatientId) {
        res
          .status(404)
          .send({ message: `Patient with id: ${id} was not found.` });
      } else {
        await disableFirebaseUser(deletedPatientId, true);

        res.status(200).send({ message: 'Patient deleted.' });
      }

      return res
        .status(500)
        .send({ message: 'Something went wrong :C. Please try again!' });
    } catch (error) {
      console.error(error);
    }
  }
);

export default PatientRouter;
