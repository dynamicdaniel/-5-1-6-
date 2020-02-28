const Koa = require('koa')
const Router = require('@koa/router')
const KoaBody = require('koa-body')
const KoaCors = require('@koa/cors')
const pretty = require('koa-json')
const app = new Koa()
const router = new Router()

router.prefix('/test')
router.get('/', (ctx, next) => {
    ctx.body = 'hello world'
})
router.get('/api', (ctx, next) => {
    let params = ctx.request.query
    ctx.body = 'hello api'
})
router.post('/post', async (ctx, next) => {
    let { body, header } = ctx.request
    let { name, email } = body || {}
    let { role } = header
    let code, data
    if (role) {
        if (role === 'admin') {
            if (name && email) {
                if (name === 'imooc' && email === 'imooc@test.com') {
                    ctx.status = 200
                    data = body
                    ctx.msg = '上传成功'
                } else {
                    ctx.status = 404
                    ctx.msg = '用户名或邮箱错误'
                }
            } else {
                ctx.status = 404
                ctx.msg = '用户名与邮箱不能为空'
            }
        } else {
            ctx.status = 401
            ctx.msg = '无权访问'
        }
    } else {
        ctx.status = 401
        ctx.msg = '无权访问'
    }
    code = ctx.status
    ctx.body = {
        code,
        ...data ? { data } : {},
        msg: ctx.msg,
        message: ctx.message
    }
})

app
    .use(KoaBody())
    .use(KoaCors())
    .use(pretty({ pretty: false, param: 'pretty' }))
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(10000)