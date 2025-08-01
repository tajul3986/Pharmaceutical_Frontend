export interface Warehouse {
  id?: number;
  name: string;
  location: string;
  capacity: number;
  description?: string;
  manager?: string;
  contactEmail: string;
}