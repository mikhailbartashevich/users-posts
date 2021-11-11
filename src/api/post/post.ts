import axios, { AxiosPromise } from 'axios';

import { COMMON_HEADERS } from '../config';
import { Post } from './DTO';

type GetPostByUserIdParams = {
  userId: string;
  page: number;
  limit: number;
};

type GetPostByTagParams = {
  tagId: string;
  page: number;
  limit: number;
};

type PostsResponse = {
  data: Post[];
  total: number;
};

export const getPostsByUserId = (
  key: string,
  { userId, page, limit }: GetPostByUserIdParams,
): AxiosPromise<PostsResponse> => {
  return axios.get(`https://dummyapi.io/data/v1/user/${userId}/post`, {
    headers: COMMON_HEADERS,
    params: {
      page,
      limit,
    },
  });
};

export const getPostsByTag = (
  key: string,
  { tagId, page, limit }: GetPostByTagParams,
): AxiosPromise<PostsResponse> => {
  return axios.get(`https://dummyapi.io/data/v1/tag/${tagId}/post`, {
    headers: COMMON_HEADERS,
    params: {
      page,
      limit,
    },
  });
};
