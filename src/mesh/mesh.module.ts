import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mesh } from 'src/database/models/mesh.model';

@Module({
  imports: [SequelizeModule.forFeature([Mesh])],
})
export class MeshModule {}
