import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Config } from '@constants';

class APIhandler {
  private readonly axiosInstance: AxiosInstance;
  private readonly axiosHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.API_URL,
      headers: this.axiosHeaders,
      timeout: 10000,
      timeoutErrorMessage: 'Slow Network',
      validateStatus(status) {
        return (
          (status >= 200 && status < 300) || status === 400 || status === 401
        );
      },
    });
  }

  requestHeader = () => {
    return {
      Authorization: `Bearer `,
    };
  };

  handleBodyResponse = async (response: AxiosResponse): Promise<any> => {
    if (response.status === 200) {
      return Promise.resolve(JSON.parse(JSON.stringify(response.data)));
    } else if (response.status === 400) {
      return Promise.reject({
        cause: response.status.toString(),
        message: response.data.message,
        name: 'Error',
      });
    } else if (response.status === 401) {
      return Promise.reject({
        cause: response.status.toString(),
        message: 'Your session has been expired..!!! please login again...',
        name: 'Error',
      });
    } else {
      return Promise.reject({
        cause: response.status.toString(),
        message: response.statusText,
        name: 'Error',
      });
    }
  };

  postAPIService = async (api: string, reqParams: any): Promise<any> => {
    try {
      const response = await this.axiosInstance.post<any>(api, reqParams, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  async getAPIService(api: string): Promise<any> {
    try {
      // get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
      const response = await this.axiosInstance.get(api, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  deleteAPIService = async (api: string, reqParams: any = {}): Promise<any> => {
    try {
      const response = await this.axiosInstance.delete<any>(api, {
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
        params: reqParams,
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  putAPIService = async (api: string, reqParams: any = {}): Promise<any> => {
    try {
      const response = await this.axiosInstance<any>({
        data: reqParams,
        headers: { ...this.axiosHeaders, ...this.requestHeader() },
        method: 'PUT',
        url: api,
      });
      return this.handleBodyResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export const API = new APIhandler();
