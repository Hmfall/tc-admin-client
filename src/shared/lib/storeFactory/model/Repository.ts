import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseAxiosAPI } from '@/shared/lib/storeFactory/model/BaseAxiosAPI';

export class Repository extends BaseAxiosAPI {
  async getAll<T>(params?: Record<string, unknown>) {
    return (await this.axios.get<T[]>(`${this.path}`, { params })).data;
  }

  async getThis<T>(params?: Record<string, unknown>) {
    return (await this.axios.get<T>(`${this.path}`, { params })).data;
  }

  async getById<T>(id: ID) {
    return (await this.axios.get<T>(`${this.path}/${id}`)).data;
  }

  async create(body: Record<string, unknown>) {
    return (await this.axios.post(`${this.path}`, body)).data;
  }

  async updateById(id: ID, body: Record<string, unknown>) {
    return (await this.axios.put(`${this.path}/${id}`, body)).data;
  }

  async updateThis(body: Record<string, unknown>) {
    return (await this.axios.put(`${this.path}`, body)).data;
  }

  async updateAll(body: Record<string, unknown>[]) {
    return (await this.axios.put(`${this.path}`, body)).data;
  }

  async deleteById(id: ID) {
    return (await this.axios.delete(`${this.path}/${id}`)).data;
  }

  async get<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
    return (await this.axios.get<T, AxiosResponse<T>>(`${this.path}${url}`, config)).data;
  }

  async post<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
    return (await this.axios.post<T, AxiosResponse<T>>(`${this.path}${url}`, body, config)).data;
  }

  async put<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
    return (await this.axios.put<T, AxiosResponse<T>>(`${this.path}${url}`, body, config)).data;
  }

  async patch<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
    return (await this.axios.patch<T, AxiosResponse<T>>(`${this.path}${url}`, body, config)).data;
  }

  async delete<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
    return (await this.axios.delete<T, AxiosResponse<T>>(`${this.path}${url}`, config)).data;
  }
}
