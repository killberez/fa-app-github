import { Request, Response, NextFunction } from "express";
import ProjectService from "./Project.service";
import Project from "./Project.model";
import jwt from "jsonwebtoken";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = jwt.verify(token!, "privatekey");
    //@ts-ignore
    const projects = await ProjectService.findAllByUserId(userToken.id);
    res.json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = jwt.verify(token!, "privatekey");
    const project = await ProjectService.findById(req.params.projectId);
    console.log("hello");
    //@ts-ignore
    if (data.id === project.userId) {
      res.json(project);
    } else {
      res.status(401).json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const findAllByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hello");
  try {
    //@ts-ignore
    res.json(await ProjectService.findAll());
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const userToken = jwt.verify(token!, "privatekey");
    const { name, settings } = req.body;
    console.log(name);
    console.log(token);
    //@ts-ignore
    const project = new Project({
      name: "untitled project",
      //@ts-ignore
      userId: userToken.id,
      settings: settings,
      createdOn: new Date(),
    });
    const newProject = await ProjectService.create(project);
    res.json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = jwt.verify(token!, "privatekey");
    const update = req.body;
    const projectId = req.params.projectId;
    const project = await ProjectService.findById(projectId);
    //@ts-ignore
    if (userToken.id === project.userId) {
      const updateProject = await ProjectService.update(projectId, update);
      res.json(updateProject);
    } else {
      res.status(401).json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = jwt.verify(token!, "privatekey");
    const projectId = req.params.projectId;
    const project = await ProjectService.findById(projectId);
    //@ts-ignore
    if (userToken.id === project.userId) {
      await ProjectService.deleteProject(projectId);
      res.status(204).end();
    } else {
      res.json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
