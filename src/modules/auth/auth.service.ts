import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { randomBytes, scrypt as _scrypt } from 'crypto';
// import { promisify } from 'util';
import { isEmpty } from 'lodash';

import { UserService } from '../user/user.service';
import { generateHash, verifyHash } from '@/utils/encrypt.utils';
import { TokenManagerService } from '@/shared/token-manager/token-manager.service';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from '../user/dto/req/create-user.dto';

// const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenManager: TokenManagerService,
    private RolesService: RolesService,
  ) {}

  async signUp({ email, password, avatars }: CreateUserDto): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!isEmpty(user)) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await generateHash(password);
    return await this.userService.createUser({
      email,
      password: passwordHash,
      avatars,
    });
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    if (!(await verifyHash(password, user.password))) {
      throw new BadRequestException('Bad password');
    }
    const { id: userId } = user;

    const roles = (await this.RolesService.fetchRoles(userId)).map(
      (role) => role.name,
    );
    const { accessToken, refreshToken } = this.tokenManager.generateToken({
      userId,
      roles,
    });
    return { roles, accessToken, refreshToken };
  }

  // async signUp(email: string, password: string): Promise<any> {
  //   const user = await this.userService.getUserByEmail(email);
  //   if (user) {
  //     throw new ConflictException('User already exists');
  //   }
  //   const salt = randomBytes(8).toString('hex');
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;
  //   const passwordHash = salt + '.' + hash.toString('hex');
  //   return await this.userService.createUser({ email, password: passwordHash });
  // }

  // async signIn(email: string, password: string): Promise<any> {
  //   const user = await this.userService.getUserByEmail(email);
  //   if (!user) {
  //     throw new NotFoundException('Not found user');
  //   }
  //   const [salt, hashStored] = user.password.split('.');
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;
  //   if (hashStored !== hash.toString('hex')) {
  //     throw new BadRequestException('Bad password');
  //   }
  //   return user;
  // }
}
