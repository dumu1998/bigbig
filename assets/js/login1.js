$(function () {
    // 注册登录事件
    $('#go2Reg').on('click', function () {
        $('.login-warp').hide()
        $('.reg-warp').show()
    })
    $('#go2Login').on('click', function () {
        $('.reg-warp').hide()
        $('.login-warp').show()
    })

    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            let pwd = $('#mima').val()
            if (pwd !== value) return '两次密码不一致！'
        }
    })

    // 注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: `/api/reg`,
            data: $(this).serialize(),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('#go2Login').click()
            }
        })
    })

    // 登录表单
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: `/api/login`,
            data: $(this).serialize(),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/home.html'
            }
        })
    })
})