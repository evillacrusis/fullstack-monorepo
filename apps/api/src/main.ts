import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiEnv } from '@repo/env/api';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger:
      apiEnv.NODE_ENV === 'development' ? ['log', 'warn', 'error', 'debug'] : ['warn', 'error'],
  });

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: apiEnv.ALLOWED_ORIGINS,
    credentials: true,
  });

  // ─── Global prefix ────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── Global exception filter ──────────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ─── Swagger ──────────────────────────────────────────────────────────────
  if (apiEnv.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BarberConnect API')
      .setDescription('BarberConnect REST API — contract-first, Zod validated')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(apiEnv.PORT);
  console.info(`🚀 API running on ${apiEnv.API_BASE_URL}`);
}

void bootstrap();
