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
  page: number;
  limit: number;
};

export const getUsers = (
  key: string,
  { page, limit }: GetUsersParams,
): AxiosPromise<UsersResponse> =>
  axios.get('https://dummyapi.io/data/v1/user', {
    headers: COMMON_HEADERS,
    params: {
      page,
      limit,
    },
  });

type GetUserDetailsParams = { userId: string };

export const getUserDetails = (
  key: string,
  { userId }: GetUserDetailsParams,
): AxiosPromise<UserDetails> =>
  axios.get(`https://dummyapi.io/data/v1/user/${userId}`, {
    headers: COMMON_HEADERS,
  });

const userApi = {
  getUsers,
  getUserDetails,
};

export default userApi;
