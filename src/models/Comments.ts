import { Publication } from "./Publication";
import { User } from "./User";

export type Operations = "subtraction" | "addition" | "multiplication" | "division";

export interface Comment {
  id: string;
  text: string;
  operation: Operations;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  publicationId: string;
  publication: Publication;
}

export interface IComment {
  text: string;
  operation: Operations;
  publicationId: string;
  userId: string;
  predecessorId?: string;
}
