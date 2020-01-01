import axios from '../../src/index'
import { AxiosTransformer } from '../../src/types'
import defaults from '../../src/defaults'

axios.defaults.headers.common['test'] = "test11111111111"

const axios2 = axios.create({
  headers: {
    common: {
      test2: 2222222222
    }
  }
})

console.log(axios2.defaults === defaults)

axios({
  url: '/simple/post',
  method: 'post',
  headers: {
    test1: '22312'
  },
  data: {
    test: 111
  },
  transformRequest: [function (data) {
    data.testRequestTransform = "test"
    return data
  }, ...axios.defaults.transformRequest as AxiosTransformer[]],
  transformResponse: [
    ...axios.defaults.transformResponse as AxiosTransformer[],
    function (data) {
      data.testResponseTransform = "test"
      return data
    }
  ]
}).then((res) => {
  console.log(res.data)
})

axios2({
  url: '/simple/post',
  method: 'post',
  headers: {
    test1: '22312'
  },
  data: {
    test: 111
  },
  transformRequest: [function (data) {
    data.testRequestTransform = "test"
    return data
  }, ...axios.defaults.transformRequest as AxiosTransformer[]],
  transformResponse: [
    ...axios.defaults.transformResponse as AxiosTransformer[],
    function (data) {
      data.testResponseTransform = "test"
      return data
    }
  ]
}).then((res) => {
  console.log(res.data)
})