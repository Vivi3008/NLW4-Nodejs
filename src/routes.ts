import { Router } from "express";
import SurveyController from "./controller/SurveyController";
import UserController from "./controller/UserController";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/surveys", SurveyController.create);
routes.get("/surveys", SurveyController.show);

export default routes;
