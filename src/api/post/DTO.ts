import { User } from '../user/DTO';

export type Post = {
  id: string;
  image: string;
  text: string;
  tags: string[];
  owner: User;
};
