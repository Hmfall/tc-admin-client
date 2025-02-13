import type { AxiosRequestConfig } from 'axios';
import { BaseAxiosAPI } from '@/shared/lib/storeFactory/model/BaseAxiosAPI';

export class Repository extends BaseAxiosAPI {
  async getAll<T>(params?: Record<string, any>) {
    return (await this.axios.get<T[]>(`${this.path}`, { params })).data;
  }

  async getById<T>(id: ID) {
    return (await this.axios.get<T>(`${this.path}/${id}`)).data;
  }

  async create(body: Record<string, any>) {
    return (await this.axios.post(`${this.path}`, body)).data;
  }

  async updateById(id: ID, body: Record<string, any>) {
    return (await this.axios.put(`${this.path}/${id}`, body)).data;
  }

  async updateThis(body: Record<string, any>) {
    return (await this.axios.put(`${this.path}`, body)).data;
  }

  async deleteById(id: ID) {
    return (await this.axios.delete(`${this.path}/${id}`)).data;
  }

  async get<T>(url: string, config?: AxiosRequestConfig<T>) {
    return (await this.axios.get<T>(`${this.path}${url}`, config)).data;
  }

  async post<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
    return (await this.axios.post<T>(`${this.path}${url}`, body, config)).data;
  }

  async put<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
    return (await this.axios.put<T>(`${this.path}${url}`, body, config)).data;
  }

  async patch<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
    return (await this.axios.patch<T>(`${this.path}${url}`, body, config)).data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<T>) {
    return (await this.axios.delete<T>(`${this.path}${url}`, config)).data;
  }
}
