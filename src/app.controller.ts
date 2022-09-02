import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async findClient(
    @Body() body: { facility: string; id: string },
    @Req() req: Request,
  ) {
    try {
      if (!body.hasOwnProperty('id')) {
        throw new BadRequestException({
          message: 'Request body has no client id field',
          received: body,
        });
      }
      const authHeader: string = req.headers['authorization'];
      return await this.appService.getClient(body, authHeader);
    } catch (e) {
      throw e;
    }
  }

  @Get()
  getClient(): any {
    return '';
  }
}
