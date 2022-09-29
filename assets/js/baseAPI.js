// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 将获取的表单数据转换为josn字符串
  const form2Josn = (soure) => {
    let target = {}
    soure.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://big-event-vue-api-t.itheima.net' + options.url
  options.contentType = 'application/json'

  options.data = form2Josn(options.data)
})