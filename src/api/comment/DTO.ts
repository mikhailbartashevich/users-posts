import { User } from '../user/DTO';

export type Comment = {
  id: string;
  message: string;
  owner: User;
  post: string;
  publishDate: string;
};
