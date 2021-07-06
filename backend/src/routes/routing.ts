import * as express from 'express';
import { userRouter } from './user.route';

export function getMainRouter() {
    const mainRouter = express.Router();
    mainRouter.use('/user', userRouter);
    return mainRouter;
}