import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerMediator } from 'openhim-mediator-utils';
import { mediatorConf } from './mdiator-config';
// import  {} from

// Express Server Code

// const openhimConfig = {
//   username: 'root@openhim.org',
//   password: 'Admin@2022',
//   apiURL: 'http://localhost:8080',
//   trustSelfSigned: true,
// };

// registerMediator(openhimConfig, mediatorConf, (err) => {
//   if (err) {
//     throw new Error(`Failed to register mediator. Check your Config. ${err}`);
//   }
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Listening on port', 3000);
}
bootstrap();
