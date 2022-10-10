$(function () {
    let layer = layui.layer
    let form = layui.form

    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success(res) {
                if (res.code !== 0) return layer.msg(`获取分类失败` + res.message)
                let html = template('tpl-cate', res)
                $('[name=cate_id]').html(html)
                form.render()
            }
        })
    }

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 400 / 280,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChoose').on('click', function () {
        file.click()
    })

    $('#file').on('change', function (e) {
        let filelist = e.target.files
        if (filelist.length === 0) return layer.msg('请选择图片')
        let imgURL = URL.createObjectURL(filelist[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    let state = '已发布'

    $('#btnSave2').on('click', function () {
        state = '草稿'
    })

    $('#formPub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0]) //拿到表单数据
        fd.append('state', state)

        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fd.append('cover_img', blob)

                $.ajax({
                    method: 'POST',
                    url: 'http://big-event-vue-api-t.itheima.net/my/article/add',
                    data: fd,
                    headers: {
                        Authorization: localStorage.getItem('token')
                    },
                    processData: false,
                    contentType: false,
                    success(res) {
                        if (res.code !== 0) return layer.msg('发布失败')
                        layer.msg('发布成功')
                        location.href = '/article/art_list.html'
                    }
                })
            })
    })
})