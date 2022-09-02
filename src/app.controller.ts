import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  findClient(@Body() body: { facility: string; id: string }) {
    return this.appService.getClient(body);
  }

  @Get()
  getClient(): any {
    return '';
  }
}
