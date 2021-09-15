import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import config from './config';
import { enviroments } from './enviroments';
import { CuentasModule } from './cuentas/cuentas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    CommonModule,
    UsuariosModule,
    CuentasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
