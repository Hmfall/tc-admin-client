import type { Axios } from 'axios';
import axiosInstance from '@/shared/api/axios';

export class BaseAxiosAPI {
  path!: string;

  axios!: Axios;

  constructor(path?: string, axios = axiosInstance) {
    if (path) {
      this.path = path;
    }

    this.axios = axios;
  }

  set APIPath(path: string) {
    this.path = path;
  }
}
