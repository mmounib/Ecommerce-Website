import { Controller } from '@nestjs/common';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
@Controller('app')
export class AppController implements OnApplicationBootstrap {
  constructor(private appService: AppService) {}

  async onApplicationBootstrap() {
    // Synchronize data from the public API during application startup
    await this.appService.syncDataFromApi();
  }
}