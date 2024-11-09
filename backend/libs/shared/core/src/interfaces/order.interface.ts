export interface Order {
  id: string;
  type: string;
  price: number;
  trainTotalPrice: number;
  trainTotalCount: number;
  coachId: string;
  image: string;
  callorieQuantity: number;
  rate: number;
  title: string;
  description: string;
  createdAt: Date;
}
