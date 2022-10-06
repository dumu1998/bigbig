$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '长度必须为1-6位的非空字符串'
        }
    })

    const initInfo = () => {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success(res){
                if(res.code !== 0) return layer.msg('请求信息失败')
                console.log(res)
                // 数据回显
                form.val('userForm',res.data)
            }
        })
    }

    initInfo()

    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initInfo()
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'PUT',
            url:'/my/userinfo',
            data:form.val('userForm'),
            success(res){
                if(res.code !== 0) return layer.msg('更新失败')
                layer.msg('更新成功')
                window.parent.getUserInfo()
            }
        })
    })
})