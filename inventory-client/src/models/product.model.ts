export interface CreateEditProduct{
  name: string;
  description?: string;
  price: number;
  quantityInStock: number;
  category?: string;
}
export interface Product extends CreateEditProduct{
  id: number;
  createdAt: string;
  updatedAt: string;
}