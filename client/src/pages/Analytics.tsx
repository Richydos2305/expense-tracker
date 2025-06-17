import { Header } from '@/components/Header';
import { ExpenseChart } from '@/components/ExpenseChart';
import { CategoryChart } from '@/components/CategoryChart';
import { useExpense } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsProps {
  onMenuClick: () => void;
}

export default function Analytics({ onMenuClick }: AnalyticsProps) {
  const { expenses, accounts, categories } = useExpense();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const topCategory = categories
    .map(category => ({
      ...category,
      total: expenses
        .filter(expense => expense.categoryId === category.id)
        .reduce((sum, expense) => sum + expense.amount, 0)
    }))
    .sort((a, b) => b.total - a.total)[0];

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Analytics"
        onMenuClick={onMenuClick}
        showSearch={false}
      />
      
      <div className="p-4 lg:p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(averageExpense)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{topCategory?.name || 'None'}</div>
              <div className="text-sm text-gray-500">
                {topCategory ? formatCurrency(topCategory.total) : formatCurrency(0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpenseChart />
          <CategoryChart />
        </div>
      </div>
    </div>
  );
}
