import { extend, deepMerge } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfigWithoutUrl, AxiosStatic } from './types/index'
import Axios from './core/Axios'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfigWithoutUrl): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function(config): AxiosInstance {
  console.log(JSON.parse(JSON.stringify(defaults)))
  return createInstance(deepMerge(defaults, config)) as AxiosInstance
}

export default axios
