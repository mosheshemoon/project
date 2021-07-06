import * as fileReader from "../repos/file.repo";
import { USER_PATH } from "../constants/constants";
import { User } from "../types/user";
import { Status } from "../enums/status";

export async function getUsers(): Promise<User[]> {
  return JSON.parse(await fileReader.readFile(USER_PATH));
}

export async function addUser(
  username: string,
  password: string
): Promise<User> {
  try {
    if (!username || !password) {
      throw new Error("didnt find requierd field name");
    }

    const users = JSON.parse(await fileReader.readFile(USER_PATH));
    const userToUpdate = getUserByPassword(password, users);
    const user = userToUpdate
      ? await updateUserDate(userToUpdate)
      : await saveNewUser(password, username, users);

    return user;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(
  password: string,
  userToUpdate: User,
  date?: Date
): Promise<void> {
  try {
    const users = JSON.parse(await fileReader.readFile(USER_PATH));

    const updatedUsers = users.map((user: User) =>
      user.password === password
        ? {
            ...user,
            username: userToUpdate.username,
            password,
            status: userToUpdate.status,
            lastVisited: date ? date : user.lastVisited,
          }
        : user
    );
    await fileReader.writeToFile(USER_PATH, JSON.stringify(updatedUsers));
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(password: string): Promise<void> {
  try {
    const users = JSON.parse(await fileReader.readFile(USER_PATH));
    if (!getUserByPassword(password, users)) {
      throw new Error("the id does not exist!");
    }

    const updatedUsers = users.filter(
      (user: User) => user.password !== password
    );
    return await fileReader.writeToFile(
      USER_PATH,
      JSON.stringify(updatedUsers)
    );
  } catch (err) {
    throw err;
  }
}

function getUserByPassword(password: string, users: User[]): User | undefined {
  return users.find((user) => user.password === password);
}

async function saveNewUser(
  password: string,
  username: string,
  users: User[]
): Promise<User> {
  const user = createUserObject(password, username);
  users.push(user);
  await fileReader.writeToFile(USER_PATH, JSON.stringify(users));
  return user;
}

function createUserObject(password: string, username: string): User {
  return {
    username,
    password,
    status: Status.Active,
    lastVisited: new Date(),
  };
}

async function updateUserDate(user: User) {
  const currentDate = new Date();
  await updateUser(user.password, user, currentDate);
  user.lastVisited = currentDate;
  return user;
}
