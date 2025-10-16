import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_TMDB_BASE_URL;
    
    this.api = axios.create({
      baseURL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }


  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }
}



export const apiService = new ApiService();
