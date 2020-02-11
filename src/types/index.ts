export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

interface AxiosRequestConfigBase {
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  [propertyName: string]: any
}

export interface AxiosRequestConfig extends AxiosRequestConfigBase {
  url: string
}

export interface AxiosRequestConfigWithoutUrl extends AxiosRequestConfigBase {
  url?: string
}

interface CancelToken {
  promise: Promise<string>
  reason?: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  interceptors: Interceptors

  defaults: AxiosRequestConfigWithoutUrl
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfigWithoutUrl): AxiosPromise
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number
  eject(id: number): void
  forEach(fn: any): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfigWithoutUrl): AxiosInstance
}
