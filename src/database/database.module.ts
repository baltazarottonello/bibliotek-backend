import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_ROOT_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true,
        sync: { force: true }, // TODO: Use with caution in production
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
