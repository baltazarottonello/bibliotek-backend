import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //@ts-expect-error eventually fix this
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host:
          process.env.DATABASE_HOST ||
          configService.get<string>('DATABASE_HOST'),
        port:
          process.env.DATABASE_PORT ||
          configService.get<number>('DATABASE_PORT'),
        username:
          process.env.DATABASE_USERNAME ||
          configService.get<string>('DATABASE_USERNAME'),
        password:
          process.env.DATABASE_ROOT_PASSWORD ||
          configService.get<string>('DATABASE_ROOT_PASSWORD'),
        database:
          process.env.DATABASE_NAME ||
          configService.get<string>('DATABASE_NAME'),
        autoLoadModels: true,
        synchronize: true,
        sync: { force: true }, // TODO: Use with caution in production
        logging: (sql: string) => {
          if (sql.toLowerCase().includes('error')) {
            console.error('SQL ERROR:', sql);
          }
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
