import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getClient(@Body() body): any {
    try {
      return this.appService.getClient(body);
    } catch (e) {
      throw e;
    }
  }
}
