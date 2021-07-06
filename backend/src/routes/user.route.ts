import * as express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../modules/user";

const userRouter = express.Router();

userRouter
  .get("/", async (req, res) => {
    try {
      const response = await getUsers();
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
  .post("/", async (req, res) => {
    try {
      const { username, password } = req.body;
      await addUser(username, password);

      res.status(201).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
  .put("/:password", async (req, res) => {
    try {
      const { user } = req.body;
      const { password } = req.params;
      await updateUser(password, user);

      res.status(200).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
  .delete("/:password", async (req, res) => {
    try {
      const { password } = req.params;
      await deleteUser(password);

      res.status(200).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

export { userRouter };
