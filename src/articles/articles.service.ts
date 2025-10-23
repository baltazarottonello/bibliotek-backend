import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/database/base/base.service';
import { Article } from 'src/database/models/article.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ArticlesService extends BaseService<Article> {
  constructor(protected readonly articleRepo: typeof Article) {
    super(articleRepo);
  }

  async create(articleDto: CreationAttributes<Article>): Promise<Article> {
    return await super.create(articleDto);
  }
}
