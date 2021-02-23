import { Router } from "express";
import UserController from "./controller/UserController";

const routes = Router();

routes.post("/users", UserController.create);

export default routes;
