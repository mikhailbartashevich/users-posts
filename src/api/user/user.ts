import axios, { AxiosPromise } from 'axios';

import { COMMON_HEADERS } from '../config';
import { User, UserDetails } from './DTO';

type GetUsersParams = {
  page: number;
  limit: number;
};

type UsersResponse = {
  data: User[];
  total: number;
};

export const getUsers = (
  key: string,
  { page, limit }: GetUsersParams,
): AxiosPromise<UsersResponse> => {
  return axios.get('https://dummyapi.io/data/v1/user', {
    headers: COMMON_HEADERS,
    params: {
      page,
      limit,
    },
  });
};

type GetUserDetailsParams = { userId: string };

export const getUserDetails = (
  key: string,
  { userId }: GetUserDetailsParams,
): AxiosPromise<UserDetails> => {
  return axios.get(`https://dummyapi.io/data/v1/user/${userId}`, {
    headers: COMMON_HEADERS,
  });
};
