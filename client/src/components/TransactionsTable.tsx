import { useState } from 'react';
import { useExpense } from '@/contexts/ExpenseContext';
import { formatCurrency, formatDate, getCategoryIcon } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, University, PiggyBank, Bitcoin, Banknote } from 'lucide-react';
import { Expense } from '@shared/schema';

interface TransactionsTableProps {
  showFilters?: boolean;
  limit?: number;
}

export function TransactionsTable({ showFilters = true, limit }: TransactionsTableProps) {
  const { expenses, accounts, categories, deleteExpense } = useExpense();
  const [accountFilter, setAccountFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const getAccountIcon = (accountName: string) => {
    const account = accounts.find(a => a.name === accountName);
    switch (account?.icon) {
      case 'university':
        return <University className="h-4 w-4 text-white" />;
      case 'piggy-bank':
        return <PiggyBank className="h-4 w-4 text-white" />;
      case 'bitcoin':
        return <Bitcoin className="h-4 w-4 text-white" />;
      case 'money-bill':
        return <Banknote className="h-4 w-4 text-white" />;
      default:
        return <University className="h-4 w-4 text-white" />;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    const colorMap: Record<string, string> = {
      red: 'bg-red-100 text-red-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      pink: 'bg-pink-100 text-pink-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      gray: 'bg-gray-100 text-gray-800',
    };
    return colorMap[category?.color || 'gray'] || colorMap.gray;
  };

  const filteredExpenses = expenses
    .filter(expense => {
      if (accountFilter && expense.accountId !== accountFilter) return false;
      if (categoryFilter && expense.categoryId !== categoryFilter) return false;
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  const handleDelete = (expense: Expense) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(expense.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold text-primary">
            Recent Transactions
          </CardTitle>
          {showFilters && (
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Accounts</SelectItem>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => {
                  const account = accounts.find(a => a.id === expense.accountId);
                  const category = categories.find(c => c.id === expense.categoryId);
                  
                  return (
                    <TableRow key={expense.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(expense.date)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-${category?.color}-100 rounded-lg flex items-center justify-center`}>
                            <span className="text-sm">
                              {category?.icon === 'utensils' && '🍽️'}
                              {category?.icon === 'car' && '🚗'}
                              {category?.icon === 'film' && '🎬'}
                              {category?.icon === 'shopping-bag' && '🛍️'}
                              {category?.icon === 'file-text' && '📄'}
                              {category?.icon === 'heart' && '❤️'}
                              {category?.icon === 'book' && '📚'}
                              {category?.icon === 'more-horizontal' && '📋'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {expense.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={getCategoryColor(category?.name || '')}
                        >
                          {category?.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 bg-${account?.color} rounded flex items-center justify-center`}>
                            {getAccountIcon(account?.name || '')}
                          </div>
                          <span className="text-sm text-gray-600">{account?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm font-semibold text-red-600">
                          {formatCurrency(expense.amount)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-secondary hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-red-700"
                            onClick={() => handleDelete(expense)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
