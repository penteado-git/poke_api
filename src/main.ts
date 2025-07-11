import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Pokémon Teams API')
    .setDescription('API RESTful para gerenciar Times de Pokémon criados por Treinadores')
    .setVersion('1.0')
    .addTag('trainers', 'Operações relacionadas aos treinadores')
    .addTag('teams', 'Operações relacionadas aos times')
    .addTag('team-pokemons', 'Operações relacionadas aos Pokémon dos times')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Documentação Swagger: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
