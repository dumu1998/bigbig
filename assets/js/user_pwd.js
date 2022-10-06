$(function () {
    const form = layui.form

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value === $('[name=old_pwd]').val()){
                return '与原密码一致'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=new_pwd]').val()){
                return '两次密码输入不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'PATCH',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success(res){
                if(res.code !==0) return layer.msg(res.message)
                layer.msg('修改成功')
                $('#btnReset').click()
            }
        })
    })
})