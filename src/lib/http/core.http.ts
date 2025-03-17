import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

import { asyncStorageService } from '@/common/services';
import { AsyncStorageKey } from '@/common/types';
import { envVariables } from '@/common/utils';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isPrivateRoute?: boolean;
}

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  isPrivateRoute?: boolean;
}

class HttpClient {
  protected axiosInstance: AxiosInstance;

  constructor(
    baseURL: string = envVariables.API_ENDPOINT,
    { headers, ...otherConfigs }: Omit<CreateAxiosDefaults, 'baseURL'> = {},
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...otherConfigs,
    });

    this.axiosInstance.interceptors.request.use(this.onSuccessRequest);

    this.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseFailed,
    );
  }

  protected async onSuccessRequest({
    isPrivateRoute,
    ...config
  }: CustomInternalAxiosRequestConfig) {
    if (isPrivateRoute) {
      let accessToken: string;
      let refreshToken: string;

      try {
        accessToken = await asyncStorageService.get(
          AsyncStorageKey.ACCESS_TOKEN,
          '',
        );

        const { exp } = jwtDecode(accessToken);
        if (exp! * 1000 < Date.now()) throw new Error();

        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (accessTokenError) {
        refreshToken = await asyncStorageService.get(
          AsyncStorageKey.REFRESH_TOKEN,
          '',
        );
        const result = (
          await axios.post(`${envVariables.API_ENDPOINT}/auth/refresh`, {
            refreshToken,
          })
        ).data.data;

        asyncStorageService.set(
          AsyncStorageKey.ACCESS_TOKEN,
          result.accessToken,
        );
        asyncStorageService.set(
          AsyncStorageKey.REFRESH_TOKEN,
          result.refreshToken,
        );

        config.headers.Authorization = `Bearer ${result.accessToken}`;
      }
    }

    return config;
  }

  protected onResponseSuccess(response: AxiosResponse) {
    return response.data;
  }

  protected onResponseFailed(error: AxiosError) {
    if (!error.status || error.status === HttpStatusCode.InternalServerError) {
      console.error(error);
    }

    if (error.status === HttpStatusCode.Unauthorized) {
      asyncStorageService.remove(AsyncStorageKey.ACCESS_TOKEN);
      asyncStorageService.remove(AsyncStorageKey.REFRESH_TOKEN);
    }

    return Promise.reject(error);
  }

  public get<T>(url: string, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.get<T, T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.post<T, T>(url, data, config);
  }

  public patch<T>(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.patch<T, T>(url, data, config);
  }

  public put<T>(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.put<T, T>(url, data, config);
  }

  public delete<T>(url: string, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.delete<T, T>(url, config);
  }
}

const httpClient = new HttpClient();
export { httpClient, HttpClient };
