import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(
        private readonly userservice:UserService ,
    ){}

    @Get()
    @ApiQuery({name:'email',description:'entre you email'})
    async getuser(@Query('email')email:string){
        return this.userservice.createUser(email);
    }


    @Get('all-user')
    async getalluser(){
        return this.userservice.getAllUsers();
    }

    @Get('by-Id')
    @ApiQuery({name:'userId',description:'enter the User Id'})
    async getbyId(
        @Query('userId')userId:string,
    ){
        return this.userservice.getUserById(userId);
    }
}
