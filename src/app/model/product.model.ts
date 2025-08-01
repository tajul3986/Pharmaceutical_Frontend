export interface Product {
  quantity: number;
  id?: number | undefined;
  productCode : string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  category: string | undefined;
  subcategory: string | undefined;
  stock: number | undefined;
  image: string | undefined;
}