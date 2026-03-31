export type TransactionType = 'ride' | 'expense' | 'bonus';
export type RideType = 'uber' | '99' | 'avulsa';

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: TransactionType;
  rideType?: RideType;
  quantity?: number;
  timestamp: Date;
  category?: string;
}

export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  period: 'daily' | 'weekly' | 'monthly' | 'custom';
  description: string;
}

export interface DailyStat {
  day: string;
  earnings: number;
  expenses: number;
}
