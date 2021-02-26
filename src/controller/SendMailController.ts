import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
import AppError from "../errors/AppError";

export default {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError("User does not exist!");
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("Survey does not exist!");
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveysUserAlreadyExist = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveysUserAlreadyExist) {
      variables.id = surveysUserAlreadyExist.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveysUserAlreadyExist);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.status(201).json(surveyUser);
  },
};
