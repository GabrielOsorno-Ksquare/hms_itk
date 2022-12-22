import { Doctor } from '../models/Doctor.model';
import { User } from '../models/User.model';

export const createDoctor = async (degree: string, user_id: string) => {
  try {
    const doctor = await Doctor.create({
      degree,
      user_id,
    });

    return doctor;
  } catch (error) {
    console.error(error);
  }
};

export const findAllDoctors = async () => {
  try {
    const doctorUsers: User[] = await User.findAll({
      include: { model: Doctor, as: 'doctor_data' },
      where: { is_deleted: false, role_id: 2 },
    });

    return doctorUsers;
  } catch (error) {
    console.log(error);
  }
};

export const findDoctorById = async (id: number) => {
  try {
    const doctor = await Doctor.findByPk(id);
    const doctorUser = await User.findOne({
      include: { model: Doctor, as: 'doctor_data' },
      where: { id: doctor?.user_id, is_deleted: false, role_id: 2 },
    });

    return doctorUser;
  } catch (error) {
    console.error(error);
  }
};

export const enableDoctor = async (id: number) => {
  try {
    const doctor = await Doctor.findByPk(id);
    await User.update(
      { is_deleted: false },
      { where: { id: doctor?.user_id, is_deleted: true, role_id: 2 } }
    );

    return doctor?.user_id;
  } catch (error) {
    console.error(error);
  }
};

export const disableDoctor = async (id: number) => {
  try {
    const doctor = await Doctor.findByPk(id);
    await User.update(
      { is_deleted: true },
      { where: { id: doctor?.user_id, is_deleted: false, role_id: 2 } }
    );

    return doctor?.user_id;
  } catch (error) {
    console.error(error);
  }
};
