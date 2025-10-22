import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/database/models/author.model';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
})
export class AuthorsModule {}
