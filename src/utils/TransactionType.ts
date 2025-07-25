export interface Transaction {
  id?: number;
  userId: string,
  description: string;
  type: string;
  category: string;
  amount?: number;
  date?: string;
  action?: (id: number | undefined) => void
}