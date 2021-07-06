import { useEffect, useState } from "react";
import { User } from "../../types";
import userApi from "../../api/userApi";
import UserDetails from "../userDetails/UserDetails";
import css from "./UsersList.module.scss";

const UsersList = () => {
  const [users, setusers] = useState<User[]>([]);
  const [error, seterror] = useState<string>("");

  const removeUser = async (password: string) => {
    try {
      await userApi.deleteUser(password);
      const newUsers: User[] = users.filter(
        (list) => list.password !== password
      );
      setusers(newUsers);
    } catch (err) {
      alert(err?.message);
    }
  };

  const updateUser = async (userToUpdate: User) => {
    try {
      const { password } = userToUpdate;
      await userApi.updateUser(userToUpdate, password);
      const updatedUsers = users.map((user: User) =>
        user.password === password
          ? {
              ...user,
              username: userToUpdate.username,
              password,
              status: userToUpdate.status,
            }
          : user
      );
      setusers(updatedUsers);
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.getUsers();
        setusers(data);
      } catch (err) {
        seterror(err?.message);
        alert(err?.message);
      }
    })();
  }, []);

  return (
    <div className={css.usersList}>
      <div>
        {users.map((user: User, index: number) => {
          return (
            <UserDetails
              key={index}
              user={user}
              removeUserFromList={removeUser}
              updateUser={updateUser}
            ></UserDetails>
          );
        })}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UsersList;
