import { CertificationType } from "./question";

export interface Bookmark {
  questionId: string;
  createdAt: string; // ISO String
  certification?: CertificationType;
}
