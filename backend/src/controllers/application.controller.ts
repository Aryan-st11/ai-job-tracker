import { Request, Response } from "express";
import * as service from "../services/application.service";

export const create = async (req: any, res: Response) => {
  const app = await service.createApp({ ...req.body, userId: req.user });
  res.json(app);
};

export const getAll = async (req: any, res: Response) => {
  const apps = await service.getApps(req.user);
  res.json(apps);
};

export const update = async (req: Request, res: Response) => {
  const app = await service.updateApp(req.params.id, req.body);
  res.json(app);
};

export const remove = async (req: Request, res: Response) => {
  await service.deleteApp(req.params.id);
  res.json({ success: true });
};