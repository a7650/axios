import { AxiosRequestConfigWithoutUrl } from '../types/index'
import { isPlainObject, deepMerge } from '../helpers/utils'
type configType = AxiosRequestConfigWithoutUrl

const strats = Object.create(null)

const defaultStratKeys = ['url', 'params', 'key']

const deepMergeStratKeys = ['headers']

defaultStratKeys.forEach(key => {
  strats[key] = defaultStrat
})

deepMergeStratKeys.forEach(key => {
  strats[key] = deepMergeStrat
})

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

export default function mergeConfig(config1: configType, config2?: configType): configType {
  const config = Object.create(null)
  if (!config2) {
    config2 = {}
  }
  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    let strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
