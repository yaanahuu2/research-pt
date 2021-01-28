export interface CategoryTree {
  id: number;
  cat_name: string;
  children?: CategoryTree[];
}
