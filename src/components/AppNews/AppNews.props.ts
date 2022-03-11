import { NewsInterface } from '../../../interfaces/News.interface';

export interface AppNewsProps {
  news: NewsInterface[];
  deleteNews(id: number);
}
