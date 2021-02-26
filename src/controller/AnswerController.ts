import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

export default {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  },
};
