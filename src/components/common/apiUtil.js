import axios from 'axios'
import _ from 'lodash'

axios.defaults.timeout = 5000; // 超时时间

const generateApiMap = (map) => {
  let facade = {}
  _.forEach(map, function (value, key) {
    facade[key] = toMethod(value)
  })
  return facade
}

const toMethod = (options, msg) => {
  options.method = options.method || 'post'
  return (params, config = {}) => {
    return sendApiInstance(options.method, options.url, params, config)
  }
}

// 创建axios实例
const createApiInstance = (config = {}) => {
  const _config = {
    withCredentials: true, // 跨域
    baseURL: ''
  }
  config = _.merge(_config, config)
  return axios.create(config)
}


const sendApiInstance = (method, url, params, config = {}) => {
  trim(params)
  function trim(param) {
    for (let a in param) {
      if (typeof param[a] == "string") {
        param[a] = param[a].trim();
      } else {
        trim(param[a])
      }
    }
  }
  if (!url) {
    return
  }
  let instance = createApiInstance(config)

  if (method === 'get') {
    params = {
      params: params
    }
  }

  return instance[method](url, params, config)

}

export default {
  generateApiMap: generateApiMap
}
