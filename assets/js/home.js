$(function () {
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success(res) {
            console.log(res);
            // if (res.code !== 0) return layer.msg(res.message)
            // renderAvatar()
        }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎$nbsp;$nbsp;` + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}