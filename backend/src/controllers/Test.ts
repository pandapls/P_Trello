import { Body, Controller, Get, Params, Post, Query } from 'koa-ts-controllers'

import {IsNumberString, IsNumber} from 'class-validator';

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
}