$(function(){
    // 注册登录事件
    $('#go2Reg').on('click',function(){
        $('.login-warp').hide()
        $('.reg-warp').show()
    })
    $('#go2Login').on('click',function(){
        $('.reg-warp').hide()
        $('.login-warp').show()
    })

    let form = layui.form
    
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] 
    })
})