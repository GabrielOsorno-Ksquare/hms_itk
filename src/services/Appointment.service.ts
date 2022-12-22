import { Appointment } from '../models/Appointment.model';

export const createAppointment = async (
  date: Date,
  description: string,
  doctor_id: number,
  patient_id: number,
  title: string
) => {
  try {
    const newAppointment = await Appointment.create({
      date,
      description,
      doctor_id,
      patient_id,
      title,
    });

    return newAppointment;
  } catch (error) {
    console.error(error);
  }
};

export const findAllAppointments = async (
  page: number,
  pageSize: number,
  filters: object
) => {
  try {
    const appointments: Appointment[] = await Appointment.findAll({
      where: { ...filters },
      ...paginate({ page, pageSize }),
    });

    return appointments;
  } catch (error) {
    console.error(error);
  }
};

export const findPatientAppointmentById = async (
  appointment_id: number,
  patient_id: number
) => {
  try {
    const appointment = Appointment.findOne({
      where: { id: appointment_id, is_deleted: false, patient_id },
    });

    return appointment;
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointment = async (id: number, newDate: Date) => {
  try {
    const updatedAppointment = await Appointment.update(
      { date: newDate },
      { where: { id } }
    );

    return updatedAppointment;
  } catch (error) {
    console.error(error);
  }
};

export const disableAppointment = async (id: number) => {
  try {
    const disabledAppointment = await Appointment.update(
      { is_deleted: true },
      { where: { id, is_deleted: false } }
    );

    return disabledAppointment;
  } catch (error) {
    console.error(error);
  }
};

const paginate = ({ page, pageSize }: { page: number; pageSize: number }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};
