import { Patient } from '../models/Patient.model';
import { User } from '../models/User.model';

export const createPatient = async (
  is_premium: boolean,
  premium_exp_date: Date,
  user_id: string
) => {
  try {
    const patient = await Patient.create({
      is_premium,
      premium_exp_date,
      user_id,
    });

    return patient;
  } catch (error) {
    console.error(error);
  }
};

export const findAllPatients = async () => {
  try {
    const patientUsers: User[] = await User.findAll({
      include: { model: Patient, as: 'patient_data' },
      where: { is_deleted: false, role_id: 3 },
    });

    return patientUsers;
  } catch (error) {
    console.log(error);
  }
};

export const findPatientById = async (id: number) => {
  try {
    const patient = await Patient.findByPk(id);
    const patientUser = await User.findOne({
      include: { model: Patient, as: 'patient_data' },
      where: { id: patient?.user_id, is_deleted: false, role_id: 3 },
    });

    return patientUser;
  } catch (error) {
    console.error(error);
  }
};

export const enablePatient = async (id: number) => {
  try {
    const patient = await Patient.findByPk(id);
    await User.update(
      { is_deleted: false },
      { where: { id: patient?.user_id, is_deleted: true, role_id: 3 } }
    );

    return patient?.user_id;
  } catch (error) {
    console.error(error);
  }
};

export const disablePatient = async (id: number) => {
  try {
    const patient = await Patient.findByPk(id);
    await User.update(
      { is_deleted: true },
      { where: { id: patient?.user_id, is_deleted: false, role_id: 3 } }
    );

    return patient?.user_id;
  } catch (error) {
    console.error(error);
  }
};
