import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import { User } from '../../src/models';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userOne = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const userTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const admin = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

export const insertUsers = async (users: typeof userOne[]) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword }))
  );
};
