import { Request, Response } from "express";
import * as ai from "../services/ai.service";

export const parse = async (req: Request, res: Response) => {
  const data = await ai.parseJobDescription(req.body.text);
  res.json(data);
};

export const bullets = async (_: Request, res: Response) => {
  const data = await ai.generateBullets();
  res.json(data);
};

export const score = async (req: Request, res: Response) => {
  const data = ai.matchScore(req.body.userSkills, req.body.jobSkills);
  res.json(data);
};
