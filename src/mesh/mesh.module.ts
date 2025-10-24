import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mesh } from 'src/database/models/mesh.model';
import { MeshService } from './mesh.service';

@Module({
  imports: [SequelizeModule.forFeature([Mesh])],
  providers: [MeshService],
  exports: [MeshService],
})
export class MeshModule {}
