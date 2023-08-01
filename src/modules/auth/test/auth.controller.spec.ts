import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { User } from '@/entity/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      getUserByEmail: () => Promise.resolve({} as User),
      createUser: ({ email, password }) =>
        Promise.resolve({ id: 1, email, password }),
    };

    fakeAuthService = {
      signUp: (email, password) => Promise.resolve({ id: 1, email }),
      signIn: (email, password) => Promise.resolve({ id: 1, email }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UserService, useValue: fakeUserService },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('signin', async () => {
    const session = { userId: -10 };
    const user = await authController.signIn(
      { email: 'abcd@gmail.com', password: '12345' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
