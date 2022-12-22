import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { Admin } from './Admin.model';
import { Doctor } from './Doctor.model';
import { Patient } from './Patient.model';
import { Role } from './Role.model';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare birthdate: Date;
  declare email: string;
  declare first_name: string;
  declare id: string;
  declare is_deleted: CreationOptional<boolean>;
  declare last_name: string;
  declare password: string;
  declare role_id: number;
  declare username: string;
}

export const initUser = async (sequelize: Sequelize) => {
  User.init(
    {
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );

  await User.sync();

  await User.hasOne(Role, {
    as: 'role',
    foreignKey: 'id',
    sourceKey: 'role_id',
  });

  await User.hasOne(Patient, {
    as: 'patient_data',
    foreignKey: 'user_id',
  });

  await User.hasOne(Doctor, {
    as: 'doctor_data',
    foreignKey: 'user_id',
  });

  await User.hasOne(Admin, {
    as: 'admin_data',
    foreignKey: 'user_id',
  });
};
