import axios, { AxiosPromise } from 'axios';

import { COMMON_HEADERS } from '../config';
import { Comment } from './DTO';

type GetCommentsByPostIdParams = {
  postId: string;
  limit: number;
  page: number;
};

type CommentsResponse = {
  data: Comment[];
  total: number;
};

export const getCommentsByPostId = (
  key: string,
  { postId, page, limit }: GetCommentsByPostIdParams,
): AxiosPromise<CommentsResponse> => {
  return axios.get(`https://dummyapi.io/data/v1/post/${postId}/comment`, {
    headers: COMMON_HEADERS,
    params: {
      page,
      limit,
    },
  });
};
