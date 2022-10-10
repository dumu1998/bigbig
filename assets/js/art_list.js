$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    template.defaults.imports.dataFormat = function (date) {
        let dy = new Date(date)
        let y = dy.getFullYear()
        let m = (dy.getMonth() + 1 + '').padStart(2, '0')
        let d = (dy.getDate() + '').padStart(2, '0')

        let hh = (dy.getHours() + '').padStart(2, '0')
        let mm = (dy.getMinutes() + '').padStart(2, '0')
        let ss = (dy.getSeconds() + '').padStart(2, '0')

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    let q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示数据量
        cate_id: '', //文章分类id
        state: '' //文章发布状态
    }

    loadArticleList()
    initCate()

    function loadArticleList() {
        $.ajax({
            method: 'GET',
            url: `/my/article/list?pagenum=${q.pagenum}&pagesize=${q.pagesize}&cate_id=${q.cate_id}&state=${q.state}`,
            success(res) {
                if (res.code !== 0) return layer.msg(`获取列表失败` + res.message)
                let html = template('tpl-table', res)
                $('tbody').empty().html(html)
                renderPager(res.total)
            }
        })
    }

    $('#choose').on('submit', function (e) {
        e.preventDefault()
        const cate_id = $('[name=cate_id]').val()
        const state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state

        loadArticleList()
    })

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) return layer.msg(`获取分类失败` + res.message)
                let html = template('tpl-cate', res)
                $('[name=cate_id]').html(html)
                form.render()
            }
        })
    }

    function renderPager(total) {
        laypage.render({
            elem: document.getElementById('pageBox'),
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'ptrv', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) return loadArticleList()
            }
        })
    }

    $('tbody').on('click', '#btn_delete', function () {
        const result = confirm('确定删除吗？')
        const leng = $('.btn_delete').length
        if (result) {
            const id = $(this).attr('data-id')
            $.ajax({
                method: 'DELETE',
                url: `/my/article/info?id=${id}`,
                success(res) {
                    if (res.code !== 0) return layer.msg('删除失败！')
                    layer.msg('删除成功！')
                    if (leng === 1){
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    loadArticleList()
                }
            })
        }
    })
})