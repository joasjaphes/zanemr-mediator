import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerMediator } from 'openhim-mediator-utils';
import { mediatorConf } from './mdiator-config';
// import  {} from

// Express Server Code

const openhimConfig = {
  username: 'admin@monitafrica.com',
  password: 'Admin@2022',
  apiURL: 'http://zhil-core:8080',
  trustSelfSigned: true,
};

registerMediator(openhimConfig, mediatorConf, (err) => {
  if (err) {
    throw new Error(`Failed to register mediator. Check your Config. ${err}`);
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
