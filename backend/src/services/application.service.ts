import { Application } from "../models/application.model";

export const createApp = (data: any) => Application.create(data);

export const getApps = (userId: string) =>
  Application.find({ userId });

export const updateApp = (id: string, data: any) =>
  Application.findByIdAndUpdate(id, data, { new: true });

export const deleteApp = (id: string) =>
  Application.findByIdAndDelete(id);