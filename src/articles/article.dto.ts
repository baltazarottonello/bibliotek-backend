export class ArticleDto {
  id: number;
  pmid: number;
  title: string;
  year: number;
  status: string;
  journalId: number;
  doi?: string;
  month?: number;
  volume?: number;
  issue?: number;
  startPage?: number;
  endPage?: number;
  abstract?: string;
}
