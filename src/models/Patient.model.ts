import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { Appointment } from './Appointment.model';

export class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare is_premium: CreationOptional<boolean>;
  declare premium_exp_date: CreationOptional<Date>;
  declare user_id: string;
}

export const initPatient = async (sequelize: Sequelize) => {
  Patient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      is_premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      premium_exp_date: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'patients',
    }
  );

  await Patient.sync();

  await Patient.hasMany(Appointment, {
    as: 'appointments',
    foreignKey: 'patient_id',
  });
};
