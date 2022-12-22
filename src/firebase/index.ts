import * as admin from 'firebase-admin';

export type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';

// Cuenta admin
// admin@test.com / toor123

interface User {
  uid: string;
  email: string;
  username: string;
  role: Role;
  isDisabled: boolean;
}

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: '' }) as { role?: string };
  const role = customClaims.role ? customClaims.role : '';
  return {
    uid: user.uid,
    email: user.email,
    username: user.displayName,
    role,
    isDisabled: user.disabled,
  };
};

export const createUser = async (
  displayName: string,
  email: string,
  password: string,
  role: Role
) => {
  try {
    const { uid } = await admin.auth().createUser({
      displayName,
      email,
      password,
    });

    await admin.auth().setCustomUserClaims(uid, { role });

    return uid;
  } catch (error) {
    console.error(error);
  }
};

export const readUser = async (uid: string) => {
  const user = await admin.auth().getUser(uid);

  return mapToUser(user);
};

export const getAllUsers = async () => {
  const listOfUsers = await admin.auth().listUsers(10);
  const users = listOfUsers.users.map(mapToUser);

  return users;
};

export const updateUser = async (uid: string, displayName: string) => {
  const user = await admin.auth().updateUser(uid, {
    displayName,
  });

  return mapToUser(user);
};

export const disableUser = async (uid: string, disabled: boolean) => {
  const user = await admin.auth().updateUser(uid, {
    disabled,
  });
};
