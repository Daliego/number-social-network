import { User } from "./User";

export interface Publication {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  comment: Comment[];
}

export interface IPublication {
  title: string;
  text: string;
  userId: string;
}
