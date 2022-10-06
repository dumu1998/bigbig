$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChoose').on('click', function () {
        file.click()
    })

    $('#file').on('change', function (e) {
        console.log(e)
        let filelist = e.target.files
        if (filelist.length === 0) return layer.msg('请选择图片')
        let imgURL = URL.createObjectURL(filelist[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'PATCH',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.code !== 0) return layer.msg('更换失败')
                layer.msg('更换成功')
                window.parent.getUserInfo()
            }
        })
    })
})