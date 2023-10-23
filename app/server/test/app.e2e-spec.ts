import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto, LoginDto } from '../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });
  describe('App e2e', () => {
    const dto: LoginDto = {
      email: 'bar@foo.com',
      password: 'password',
    };
    describe('Auth', () => {
      const dtoSignUp: AuthDto = {
        ...dto,
        username: 'barfoo',
      };
      describe('signup', () => {
        it('should signup', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(dtoSignUp)
            .expectStatus(201)
            .inspect();
          // .stores('AccessToken', 'access_token');
        });
      });
      // describe('signin', () => {
      //   it('should not signin with user not exist', () => {
      //     return pactum
      //       .spec()
      //       .post('/auth/signin')
      //       .withHeaders('authorization', 'Bearer $S{AccessToken}')
      //       .withBody({ email: 'notauser@gmail.com', password: 'nopass' })
      //       .expectStatus(403)
      //       .expectBodyContains('Email incorrect');
      //   });
      //   it('should signin', () => {
      //     return pactum
      //       .spec()
      //       .post('/auth/signin')
      //       .withHeaders('authorization', 'Bearer $S{AccessToken}')
      //       .withBody(dto)
      //       .expectStatus(200)
      //       .stores('RefreshToken', 'refresh_token');
      //   });
      // });
      // describe('refresh and log out', () => {
      //   it('should refresh token', () => {
      //     return pactum
      //       .spec()
      //       .post('/auth/refresh')
      //       .withHeaders('authorization', 'Bearer $S{RefreshToken}')
      //       .withBody(dto)
      //       .expectStatus(200);
      //   });
      //   it('should get data', () => {
      //     return pactum
      //       .spec()
      //       .get('/auth')
      //       .withHeaders('authorization', 'Bearer $S{AccessToken}')
      //       .expectStatus(200)
      //       .inspect();
      //   });
      //   it('should logout', () => {
      //     return pactum
      //       .spec()
      //       .post('/auth/logout')
      //       .withHeaders('authorization', 'Bearer $S{AccessToken}')
      //       .withBody(dto)
      //       .expectStatus(200);
      //   });
      //   it('should fail', () => {
      //     return pactum
      //       .spec()
      //       .get('/auth')
      //       .withHeaders('authorization', 'Bearer $S{AccessToken}')
      //       .expectStatus(200)
      //       .inspect();
      //   });
      // });
    });
  });
});
