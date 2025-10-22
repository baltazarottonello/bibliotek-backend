import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleMesh } from 'src/database/models/article-mesh.model';

@Module({
  imports: [SequelizeModule.forFeature([ArticleMesh])],
})
export class ArticleMeshModule {}
