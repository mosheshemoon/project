import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { User } from "../../types";
import css from "./UserDetails.module.scss";
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from "@material-ui/core/";

type Props = {
  user: User;
  removeUserFromList: (password: string) => void;
  updateUser: (user: User) => void;
};

const UserDetails: React.FC<Props> = ({ user, removeUserFromList }) => {

  const removeItem = () => {
    removeUserFromList(user.password);
  };

  return (
    <Card className={css.userDetails}>
      <CardContent>
        <Typography variant="h5" component="h2">
          lastVisited: {user.lastVisited}
        </Typography>
        <Typography variant="h5" component="h2">
          status: {user.status}
        </Typography>
        <Typography variant="h5" component="h2">
          username: {user.username}
        </Typography>
        <Typography variant="h5" component="h2">
          password: {user.password}
        </Typography>
      </CardContent>
      <Fab size="small" color="secondary" onClick={removeItem}>
        <DeleteIcon />
      </Fab>
    </Card>
  );
};

export default UserDetails;
