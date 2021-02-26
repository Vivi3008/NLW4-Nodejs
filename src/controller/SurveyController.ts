import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import AppError from "../errors/AppError";

export default {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveyData = surveyRepository.create({
      title,
      description,
    });

    try {
      await surveyRepository.save(surveyData);
      return res.status(201).send(surveyData);
    } catch (error) {
      throw new AppError("Survey user does not exists!");
    }
  },

  async show(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const all = await surveyRepository.find();

    return res.status(200).json(all);
  },
};
