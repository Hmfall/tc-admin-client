import type { Axios } from 'axios';
import axiosInstance from '@/shared/api/axios/axiosInstance';

export class BaseAxiosAPI {
  path!: string;

  axios!: Axios;

  constructor(path: string, axios = axiosInstance) {
    this.path = path;
    this.axios = axios;
  }
}
