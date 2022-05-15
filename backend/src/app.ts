import configs from './configs';
import Koa from 'koa';
import KoaRouter from 'koa-router'
import {bootstrapControllers} from 'koa-ts-controllers';
import path from 'path';
import KoaBodyParser from 'koa-bodyparser'
import { Context } from 'vm';
import Boom from '@hapi/Boom';
import {Sequelize} from 'sequelize-typescript'


(async () => {
    const app = new Koa();
    const router = new KoaRouter();
    
    // 链接数据库
    const db = new Sequelize({
        ...configs.database, 
        models: [__dirname + '/models/**/*']
    });

    await bootstrapControllers(app, {
        router,
        basePath: '/api',
        versions: [1],
        controllers: [
            path.resolve(__dirname, 'controllers/**/*')
        ],
        errorHandler: async (err: any, ctx: Context) => {
            let status = 500;
            let body : any = {
                statusCode : status,
                error: "Internal Server error",
                message: "An internal server error occurred"
            };
            console.log('err---',err,'---')
            if (err.output) {
                let {statusCode, payload}= err.output
                status = statusCode;
                body = {...err.output.payload};
                console.log(err.data)
                if (err.data) {
                    body.errorDetails = err.data
                }
            }

            ctx.status = status;
            ctx.body = body
        }
    })

    router.all('*', async (ctx) => {
        throw Boom.notFound('没有该路由');
    })

    app.use(KoaBodyParser());
    app.use(router.routes());

    app.listen(configs.server.port, configs.server.host, () => {
        console.log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`)
    }); 
})()