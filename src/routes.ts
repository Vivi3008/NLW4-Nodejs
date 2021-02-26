import { Router } from "express";
import SurveyController from "./controller/SurveyController";
import UserController from "./controller/UserController";
import SendMailController from "./controller/SendMailController";
import AnswerController from "./controller/AnswerController";
import NPSController from "./controller/NPSController";

const routes = Router();

routes.post("/users", UserController.create);
routes.post("/surveys", SurveyController.create);
routes.get("/surveys", SurveyController.show);
routes.post("/sendMail", SendMailController.execute);
routes.get("/answers/:value", AnswerController.execute);
routes.get("/nps/:survey_id", NPSController.execute);

export default routes;
