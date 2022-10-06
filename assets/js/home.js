$(function () {
    getUserInfo()
    let layer = layui.layer
    // 点击退出事件  
    // 弹出确认弹窗确认后，清除本地存储里面的token值再进行跳转到登录页面
    $('.back').on('click', function () {
        layer.confirm('是否确认退出', {
            icon: 7,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '../../login.html'
            layer.close(index)
        })
    })
})

// var const 区别
// 由var 声明的变量会默认存在window全局变量上，但let/const不会

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.code !== 0) return layer.msg(res.message)
            renderAvatar(res)
        }
    })
}

function renderAvatar(res) {
    const uname = res.data.nickname || res.data.username
    $('#welcome').html(`欢迎  ${uname}`)
    if (res.data.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}