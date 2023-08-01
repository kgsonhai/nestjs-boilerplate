import { Serialize } from '@/interceptors/serialize.inteceptor';
import { MailService } from '@/shared/mail/mail.service';
import { RedisService } from '@/shared/redis/redis.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/req/create-user.dto';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/res/login-res.dto';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  @Get('/test')
  testAPI() {
    return 'Hello world';
  }

  @Get('/test-set-redis')
  async setCache() {
    await this.redisService.setValue('demo', 'This is a demo', 30);
    return true;
  }

  @Get('/test-get-redis')
  async getCache() {
    const dataFromRedis = await this.redisService.getValue('demo');
    if (dataFromRedis) return dataFromRedis;
    let some = 0;
    for (let i = 0; i < 10000000; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      some += 1;
    }
    const data = 'This is a demo';
    await this.redisService.setValue('demo', data, 60);
    return data;
  }

  @Get('/test-delete-cache-redis')
  async deleteCache() {
    return this.redisService.deleteValue('demo');
  }

  @Get('/test-send-mail')
  async send() {
    await this.mailService.sendEmail('kgsonhai81@gmail.com', '123456');
  }

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }

  @Post('/signin')
  @Serialize(LoginResDto)
  async signIn(@Body() body: CreateUserDto): Promise<LoginResDto> {
    return await this.authService.signIn(body.email, body.password);
  }
}
