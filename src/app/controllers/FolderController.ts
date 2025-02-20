import { Request, Response } from "express";
import FolderModel from "../models/FolderModel";
import path from "path";
import fs from "fs-extra";



// Create a folder
const createFolder = async (req: Request, res:Response) => {

  try {
    const { name, parent } = req.body;
    const folderPath = path.join(__dirname, "../uploads", name);
    
    fs.ensureDirSync(folderPath); // Create directory

    const newFolder = new FolderModel({ name, parent: parent || null });
    await newFolder.save();

    res.status(201).json({ message: "Folder created", folder: newFolder });
  } catch (error) {
    res.status(500).json({ message: "Error creating folder", error });
  }
};


export {
    createFolder
}