import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: false,
        bodyParser: true,
    });
    await app.listen(3000, () => {
        console.log(`Listening at http://localhost:3000/`);
    });
}

bootstrap();
