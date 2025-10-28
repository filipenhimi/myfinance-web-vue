import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'https://localhost:44340/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use(
            (config) => {
                // Exemplo: incluir token JWT, se existir
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('Erro na API:', error);
                if (error.response?.status === 401) {
                    // Exemplo: redirecionar para login
                    console.warn('Não autorizado. Redirecionando para login...');
                }
                return Promise.reject(error);
            }
        );
    }

    public async get<T>(url: string, params?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.get(url, { params });
        return response.data;
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.post(url, data);
        return response.data;
    }

    public async put<T>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.api.put(url, data);
        return response.data;
    }

    public async delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.api.delete(url);
        return response.data;
    }
}

export const api = new ApiService();
