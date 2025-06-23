export interface CashRegisterData {
  cashRegisterId?: number;
  initDate?: Date;
  endDate?: Date;
  initialBalance?: number;
  endBalance?: number;
  totalSales?: number;
  totalWithdrawals?: number;
  status?: string;
  notes?: string;
  userId?: number;
}
