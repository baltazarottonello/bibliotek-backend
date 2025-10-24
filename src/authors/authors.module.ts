import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/database/models/author.model';
import { AuthorsService } from './authors.service';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
