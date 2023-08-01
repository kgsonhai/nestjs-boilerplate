import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { User } from '@/entity/user.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('Test auth service', () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService>;
  beforeEach(async () => {
    fakeUserService = {
      getUserByEmail: () => Promise.resolve({} as User),
      createUser: ({ email, password }) =>
        Promise.resolve({ id: 1, email, password }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: fakeUserService },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create instance auth service', async () => {
    expect(service).toBeDefined();
  });

  // it('sign up user', async () => {
  //   fakeUserService.getUserByEmail = () =>
  //     Promise.resolve({
  //       id: 1,
  //       email: 'b@gmail.com',
  //     } as User);
  //   try {
  //     const user = await service.signUp('bc12@gmail.com', '123');
  //     expect(user.password).not.toEqual('123');
  //   } catch (error) {}
  // });

  // it('verify duplicate email', async () => {
  //   expect(service.signUp('bc@gmail.com', '123')).rejects.toThrow(
  //     ConflictException,
  //   );
  // });

  // it('throws if an invalid password is provided', async () => {
  //   fakeUserService.getUserByEmail = () =>
  //     Promise.resolve({ email: 'a@gmail.com', password: '1234' } as User);
  //   try {
  //     const user = await service.signIn('a@gmail.com', 'pass');
  //     await expect(user.password).rejects.toThrow(BadRequestException);
  //   } catch (error) {}
  // });
});
