$(function () {
    const layer = layui.layer
    const form = layui.form
    loadCateList()

    function loadCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) return layer.msg('请求数据失败')
                const html = template('tpl-cate', res)
                $('tbody').empty().html(html)
            }
        })
    }

    let index = undefined
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加分类名称',
            area: ['400px', '300px'],
            content: $('#dialog-add').html()
        })
    })

    let isEdit = false
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()
        if (isEdit) {
            $.ajax({
                method: 'PUT',
                url: '/my/cate/info',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) return layer.msg('修改失败')
                    layer.msg('修改成功')
                    loadCateList()
                }
            })
        } else {
            $.ajax({
                method: 'POST',
                url: '/my/cate/add',
                data: $(this).serialize(),
                success(res) {
                    if (res.code !== 0) return layer.msg('添加失败')
                    layer.msg('添加成功')
                    loadCateList()
                }
            })
        }
        isEdit = false
        layer.close(index)
        loadCateList()
    })

    $('tbody').on('click', '#btn_edit', function () {
        isEdit = true
        index = layer.open({
            type: 1,
            title: '修改分类名称',
            area: ['400px', '300px'],
            content: $('#dialog-add').html()
        })

        const id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: `/my/cate/info?id=${id}`,
            success(res) {
                if (res.code !== 0) return layer.msg('获取分类详情失败')
                form.val('addFormFilter', res.data)
            }
        })
    })

    $('tbody').on('click', '#btn_delete', function () {
        const result = confirm('确定删除此分类吗？')
        const id = $(this).attr('data-id')
        $.ajax({
            method: 'DELETE',
            url: `/my/cate/del?id=${id}`,
            success(res) {
                if (res.code !== 0) return layer.msg('删除分类失败')
                layer.msg('删除分类成功！')
                loadCateList()
            }
        })
    })
})