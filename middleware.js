const Koa = require('koa')
const app = new Koa()

const middleware = async function(ctx, next) {
    console.log('middleware start')
    next()
    console.log('middleware end')
}
const middleware1 = async function(ctx, next) {
    console.log('middleware_1')
    next()
    console.log('middleware_1_end')
}
const middleware2 = async function(ctx, next) {
    console.log('middleware_2')
    next()
    console.log('middleware_2_end')
}
const middleware3 = async function(ctx, next) {
    console.log('middleware_3')
    console.log('middleware_3_end')
    // next()
}

app.use(middleware)
app.use(middleware1)
app.use(middleware3)
app.use(middleware2)
app.listen(10000)