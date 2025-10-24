import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Mesh } from 'src/database/models/mesh.model';

@Injectable()
export class MeshService extends BaseService<Mesh> {
  constructor(@InjectModel(Mesh) meshRepo: typeof Mesh) {
    super(meshRepo);
  }

  async findByName(name: string, opts?: any): Promise<Mesh | null> {
    try {
      return super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(`Error finding mesh by name: ${name}`);
    }
  }
}
