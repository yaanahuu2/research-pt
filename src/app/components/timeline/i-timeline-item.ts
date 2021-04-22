export interface TimelineItem {
  id?: number;
  key?: string;
  datetime: string;
  datetime_out?: string;
  title: string;
  abstract?: string;
  relations?: any[];
}
