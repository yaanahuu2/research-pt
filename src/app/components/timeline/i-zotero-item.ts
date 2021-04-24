export interface ZoteroItem {
  id?: number;
  key?: string;
  date: string;
  title?: string;
  note?: string;
  itemType: string;
  url?: string;
  tags?: any[];
  parentItem?: string;
  abstract?: string;
  relations?: any[];
}
