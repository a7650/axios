import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  AxiosRequestConfigAuthType
} from '../types/index'
import xhr from '../xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.headers = addAuth(flattenHeaders(config.headers, config.method!), config.auth!, config.url)
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
}

function addAuth(headers: any, auth: AxiosRequestConfigAuthType, url: string): any {
  if (auth.key && auth.value) {
    let { key, value, inclusive, exclusive } = auth
    let authValue: string = ''
    if ((exclusive && exclusive.includes(url)) || (inclusive && !inclusive.includes(url))) {
      return
    }
    if (typeof value === 'string') {
      authValue = value
    } else if (typeof value === 'function') {
      authValue = value()
    }
    if (!headers[key]) {
      headers[key] = authValue
    }
  }
}

function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(config.url, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
