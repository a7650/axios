import * as getType from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  let parts: string[] = []
  Object.keys(params).forEach(key => {
    let value: any = params[key]
    if (value === null || typeof value === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }
    values.forEach(val => {
      if (getType.isDate(val)) {
        val = val.toISOString()
      } else if (getType.isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${val}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    let idx = url.indexOf('#')
    if (idx > -1) {
      url = url.slice(0, idx)
    }
  }
  url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams
  return url
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
