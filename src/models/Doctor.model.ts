import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { Appointment } from './Appointment.model';

export class Doctor extends Model<
  InferAttributes<Doctor>,
  InferCreationAttributes<Doctor>
> {
  declare degree: string;
  declare id: CreationOptional<number>;
  declare user_id: string;
}

export const initDoctor = async (sequelize: Sequelize) => {
  Doctor.init(
    {
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'doctors',
    }
  );

  await Doctor.sync();

  await Doctor.hasMany(Appointment, {
    as: 'appointments',
    foreignKey: 'doctor_id',
  });
};
