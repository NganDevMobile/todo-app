export interface Category {
  id?: string;
  name: string;
  color?: string;
  icon?: string;
  count?: number;
  userId?: string;
  isDefault?: boolean;
}

export interface CategoryAction {
  type: string;
  name: string;
}
