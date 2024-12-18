import axios from 'axios'

axios.interceptors.request.use(config => {
    // 从localStorage中获取token
    const token = localStorage.getItem('token');
    // 如果有token, 就把token设置到请求头中
    token && (config.headers.token = token);
    return config; 
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // 当响应码是 2xx 的情况, 进入这里
    const res = response.data;
    if (res.status === '20001') {
        window.location.href = "/login";
    }
    return res;
}, error => {
    // 当响应码不是 2xx 的情况, 进入这里
    return error 
});

export function post(url, params, headers = {}) { 
    return new Promise((resolve, reject) => { 
         axios.post(url, params, headers).then((res) => { 
             resolve(res)
        }).catch((err) => {
            // debugger
             reject(err) 
        }) 
    })
}

export function get(url, params, headers = {}) {
    return new Promise((resolve, reject) => { 
       axios.get(url, { params, headers }).then(res => { 
           resolve(res)
       }).catch(err => {
           reject(err) 
        })
    })
}