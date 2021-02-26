import { Router } from "express";
import SurveyController from "./controller/SurveyController";
import UserController from "./controller/UserController";
import SendMailController from "./controller/SendMailController";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/surveys", SurveyController.create);
routes.get("/surveys", SurveyController.show);
routes.post("/sendMail", SendMailController.execute);

export default routes;
