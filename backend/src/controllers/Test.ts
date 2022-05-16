import { Body, Controller, Ctx, Get, Params, Post, Query, Flow } from 'koa-ts-controllers'

import {IsNumberString, IsNumber} from 'class-validator';
import { Context } from 'koa';
import authorization from '../middlewares/authorization';

class GetUsersQuery {
    @IsNumberString({},{
        message: "page必须是数字222"
    })
    page : number;
};

@Controller('/test')
class TestController {
    @Get('/hello')
    async hello(){
        return 'hello Test'
    }

    @Get('/user/:id(\\d+)')
    async getUser(
        @Params('id') id : number
    ) {
        return '当前params中的用户id是：' + id
    }

    // @Get('/user')
    // async getUser2(
    //     @Query() q : {id : number}
    // ){
    //     return '当前params中的用户22id是：' + q.id

    // }

    @Post('/user')
    async postUser(
        @Body() body : {
            name : string;
            password : string;
        }
    ) {
        console.log(body)
        return `当前提交的数据是: ${JSON.stringify(body)}`
    }


    @Get('/users')
    async getUsers(
        @Query() q : GetUsersQuery
    ){
        return 'query' + JSON.stringify(q)
    }

    @Get('/auth')
    @Flow([authorization])
    async auth(
        @Ctx() ctx: Context
    ){
        return 'sss'
    }

    @Get('/noauth')
    async noAuth() {
        return '随便看'
    }
}