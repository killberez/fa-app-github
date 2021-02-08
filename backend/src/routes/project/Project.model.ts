import mongoose, { Document, Schema } from "mongoose";

export type ProjectDocument = Document & {
  name: string;
  userId: string;
  settings: object;
  createdOn: Date;
  lastModifiedOn: Date;
};

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  createdOn: Date,
  lastModifiedOn: Date,
  settings: Object,
});

export default mongoose.model<ProjectDocument>("Project", ProjectSchema);
