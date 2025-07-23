import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilita a transformação automática de tipos
      transformOptions: {
        enableImplicitConversion: true, // Permite conversão implícita com base nos tipos do DTO
      },
    }),
  );
  
  app.enableCors({
    origin: ['http://localhost:3000',], // Substitua pelos domínios permitidos
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Turismo')
    .setDescription('Documentação da API de Turismo')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "Authorization",
      in: "header",
    })
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001, '0.0.0.0');
}
bootstrap();
