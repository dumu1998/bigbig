// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {

  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url

  options.contentType = 'application/json'

  // 将获取的表单数据转换为josn字符串
  const form2Josn = (source) => {
    let target = {}
    source.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = decodeURIComponent(kv[1])
    })
    return JSON.stringify(target)
  }

  options.data = options.data && form2Josn(options.data)

  if (options.url.includes('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

   // 统一添加错误回调  或 complete 回调
   options.error = function (err) {
    if (
      err.responseJSON?.code === 1 &&
      err.responseJSON?.message === '身份认证失败！'
    ) {
      // 进次处的话，可以认为请求有误了
      localStorage.clear()
      location.href = '/login.html'
    }
  }
})