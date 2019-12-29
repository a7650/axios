import { AxiosRequestConfig, AxiosPromise } from './types/index'
import xhr from './xhr'
import { buildURL } from "./helpers/url"
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'


export default function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transformResponse(res)
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
    return buildURL(config.url, config.params)
}

function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    let { data, headers = {} } = config
    return processHeaders(headers, data)
}