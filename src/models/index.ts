import { Sequelize } from 'sequelize';
import { initAdmin } from './Admin.model';
import { initAppointment } from './Appointment.model';
import { initDoctor } from './Doctor.model';
import { initPatient } from './Patient.model';
import { initRole } from './Role.model';
import { initUser } from './User.model';

export let sequelize: Sequelize;

const models = [
  initRole,
  initUser,
  initAdmin,
  initDoctor,
  initPatient,
  initAppointment,
];

export const startSequelize = async (
  db_hostname: string,
  db_name: string,
  db_password: string,
  db_username: string
) => {
  const sequelize = new Sequelize(db_name, db_username, db_password, {
    dialect: 'postgres',
    host: db_hostname,
  });

  for (const initModel of models) {
    initModel(sequelize);
  }

  await sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' });

  return sequelize;
};
