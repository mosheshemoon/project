import { Status } from "../enums/status";

export interface User {
    password: string
    username: string
    lastVisited: Date
    status: Status
}