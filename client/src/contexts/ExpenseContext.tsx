import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Account, Category, Expense, InsertExpense } from '@shared/schema';
import { generateId } from '@/lib/utils';

interface ExpenseContextType {
  accounts: Account[];
  categories: Category[];
  expenses: Expense[];
  addExpense: (expense: InsertExpense) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const defaultAccounts: Account[] = [
  {
    id: '1',
    name: 'GTBank',
    type: 'savings',
    balance: 245000,
    color: 'gtbank',
    icon: 'university',
  },
  {
    id: '2',
    name: 'Access Bank',
    type: 'current',
    balance: 89500,
    color: 'access',
    icon: 'university',
  },
  {
    id: '3',
    name: 'PiggyVest',
    type: 'savings',
    balance: 156780,
    color: 'piggyvest',
    icon: 'piggy-bank',
  },
  {
    id: '4',
    name: 'Crypto Wallet',
    type: 'investment',
    balance: 78900,
    color: 'crypto',
    icon: 'bitcoin',
  },
  {
    id: '5',
    name: 'Cash',
    type: 'cash',
    balance: 25000,
    color: 'cash',
    icon: 'money-bill',
  },
];

const defaultCategories: Category[] = [
  { id: '1', name: 'Food', color: 'red', icon: 'utensils' },
  { id: '2', name: 'Transport', color: 'blue', icon: 'car' },
  { id: '3', name: 'Entertainment', color: 'green', icon: 'film' },
  { id: '4', name: 'Shopping', color: 'yellow', icon: 'shopping-bag' },
  { id: '5', name: 'Bills', color: 'purple', icon: 'file-text' },
  { id: '6', name: 'Health', color: 'pink', icon: 'heart' },
  { id: '7', name: 'Education', color: 'indigo', icon: 'book' },
  { id: '8', name: 'Other', color: 'gray', icon: 'more-horizontal' },
];

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useLocalStorage<Account[]>('expense-accounts', defaultAccounts);
  const [categories, setCategories] = useLocalStorage<Category[]>('expense-categories', defaultCategories);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  const addExpense = (expense: InsertExpense) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    
    // Update account balance
    setAccounts(prev => prev.map(account => 
      account.id === expense.accountId 
        ? { ...account, balance: account.balance - expense.amount }
        : account
    ));
  };

  const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  const deleteExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setExpenses(prev => prev.filter(e => e.id !== id));
      // Restore account balance
      setAccounts(prev => prev.map(account => 
        account.id === expense.accountId 
          ? { ...account, balance: account.balance + expense.amount }
          : account
      ));
    }
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...account,
      id: generateId(),
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = (id: string, updatedAccount: Partial<Account>) => {
    setAccounts(prev => prev.map(account => 
      account.id === id ? { ...account, ...updatedAccount } : account
    ));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    // Remove expenses associated with this account
    setExpenses(prev => prev.filter(expense => expense.accountId !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: generateId(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updatedCategory } : category
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const value: ExpenseContextType = {
    accounts,
    categories,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    addAccount,
    updateAccount,
    deleteAccount,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
