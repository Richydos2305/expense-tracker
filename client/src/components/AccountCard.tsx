import { Account } from '@shared/schema';
import { useExpense } from '@/contexts/ExpenseContext';
import { formatCurrency, cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { University, PiggyBank, Bitcoin, Banknote } from 'lucide-react';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const { expenses } = useExpense();

  // Calculate monthly expenses for this account
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expense.accountId === account.id &&
             expenseDate.getMonth() === currentMonth &&
             expenseDate.getFullYear() === currentYear;
    })
    .reduce((total, expense) => total + expense.amount, 0);

  const getIcon = () => {
    switch (account.icon) {
      case 'university':
        return <University className="h-5 w-5 text-white" />;
      case 'piggy-bank':
        return <PiggyBank className="h-5 w-5 text-white" />;
      case 'bitcoin':
        return <Bitcoin className="h-5 w-5 text-white" />;
      case 'money-bill':
        return <Banknote className="h-5 w-5 text-white" />;
      default:
        return <University className="h-5 w-5 text-white" />;
    }
  };

  const getStatusColor = () => {
    if (account.balance < 10000) return 'bg-red-500';
    if (account.balance < 50000) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (account.balance < 10000) return 'Low';
    if (account.balance < 50000) return 'Warning';
    return 'Active';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${account.color}`)}>
              {getIcon()}
            </div>
            <div>
              <h4 className="font-semibold text-primary">{account.name}</h4>
              <p className="text-sm text-gray-500 capitalize">{account.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={cn("w-2 h-2 rounded-full", getStatusColor())} />
            <span className="text-xs text-gray-500">{getStatusText()}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Balance</span>
            <span className="font-bold text-lg text-primary">
              {formatCurrency(account.balance)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">This Month</span>
            <span className={cn(
              "font-medium",
              monthlyExpenses > 0 ? "text-red-600" : "text-gray-500"
            )}>
              {monthlyExpenses > 0 ? `-${formatCurrency(monthlyExpenses)}` : formatCurrency(0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
