import { Header } from '@/components/Header';
import { useExpense } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoriesProps {
  onMenuClick: () => void;
}

export default function Categories({ onMenuClick }: CategoriesProps) {
  const { categories, expenses } = useExpense();

  const categoriesWithTotals = categories.map(category => {
    const total = expenses
      .filter(expense => expense.categoryId === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const count = expenses.filter(expense => expense.categoryId === category.id).length;
    
    return {
      ...category,
      total,
      count,
    };
  }).sort((a, b) => b.total - a.total);

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: 'bg-red-100 border-red-200',
      blue: 'bg-blue-100 border-blue-200',
      green: 'bg-green-100 border-green-200',
      yellow: 'bg-yellow-100 border-yellow-200',
      purple: 'bg-purple-100 border-purple-200',
      pink: 'bg-pink-100 border-pink-200',
      indigo: 'bg-indigo-100 border-indigo-200',
      gray: 'bg-gray-100 border-gray-200',
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Categories"
        onMenuClick={onMenuClick}
        showSearch={false}
      />
      
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithTotals.map((category) => (
            <Card key={category.id} className={getColorClass(category.color)}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {category.icon === 'utensils' && '🍽️'}
                    {category.icon === 'car' && '🚗'}
                    {category.icon === 'film' && '🎬'}
                    {category.icon === 'shopping-bag' && '🛍️'}
                    {category.icon === 'file-text' && '📄'}
                    {category.icon === 'heart' && '❤️'}
                    {category.icon === 'book' && '📚'}
                    {category.icon === 'more-horizontal' && '📋'}
                  </span>
                  <span className="text-lg font-semibold">{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(category.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transactions</span>
                    <span className="font-medium">{category.count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
