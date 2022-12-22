import { User } from '../models/User.model';

export const createUser = async (
  birthdate: Date,
  email: string,
  first_name: string,
  id: string,
  last_name: string,
  password: string,
  role_id: number,
  username: string
) => {
  try {
    const user: User = await User.create({
      birthdate,
      email,
      first_name,
      id,
      last_name,
      password,
      role_id,
      username,
    });

    return user.id;
  } catch (error) {
    console.error(error);
  }
};

export const findUserById = async (id: number) => {
  try {
    const user = await User.findOne({ where: { id } });

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const user = await User.update(
      { is_deleted: true },
      { where: { id, is_deleted: false } }
    );

    return user;
  } catch (error) {
    console.error(error);
  }
};
