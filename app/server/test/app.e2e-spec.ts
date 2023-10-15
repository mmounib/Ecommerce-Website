import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto, LoginDto } from '../src/auth/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    // create a testing module
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // create a NestJs application
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);
    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    it('should signup', () => {
      const dto: AuthDto = {
        email: 'foo@bar.com',
        username: 'bar',
        password: 'password',
      };
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201);
    });

    it('should signin', () => {
      const dto: LoginDto = {
        email: 'foo@bar.com',
        password: 'password',
      };
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200);
    });
  });
});
