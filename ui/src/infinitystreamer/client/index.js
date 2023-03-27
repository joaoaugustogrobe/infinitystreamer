import axios from 'axios';

class InfinityStreamer {
  constructor() {
    this.url = 'http://localhost:3000';
  }
  async post(endpoint, data = {}, params = {}) {
    // TODO params to endpoint
    return this.request(
      'POST',
      endpoint,
      data,
      params
    );
  }

  async get(endpoint, params = {}, config) {
    // TODO params to endpoint
    return this.request(
      'GET',
      endpoint,
      null,
      params,
      config,
    );
  }
  
  async request(method, endpoint, data, params, config) {
    try {
      const response = await axios.request({
        method,
        url: `${this.url}/${endpoint}`,
        data: data,
        params: params,
        ...this.config,
        ...config,
      });
      return {
        ok: true,
        data: response.data
      }

    } catch(e) {
      console.log(e);
      return {
        ok: false,
        data: {
          code: e?.code,
          message: e.message,
        },
      };
    }
  }

}
export default InfinityStreamer;