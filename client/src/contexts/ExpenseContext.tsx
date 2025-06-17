import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Account, Category, Expense, InsertExpense } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

interface ExpenseContextType {
  accounts: Account[];
  categories: Category[];
  expenses: Expense[];
  isLoadingAccounts: boolean;
  isLoadingCategories: boolean;
  isLoadingExpenses: boolean;
  addExpense: (expense: InsertExpense) => Promise<void>;
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addAccount: (account: Omit<Account, 'id'>) => Promise<void>;
  updateAccount: (id: string, account: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch data using React Query
  const { data: accounts = [], isLoading: isLoadingAccounts } = useQuery({
    queryKey: ['/api/accounts'],
    queryFn: () => fetch('/api/accounts').then(res => res.json()),
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['/api/categories'],
    queryFn: () => fetch('/api/categories').then(res => res.json()),
  });

  const { data: expenses = [], isLoading: isLoadingExpenses } = useQuery({
    queryKey: ['/api/expenses'],
    queryFn: () => fetch('/api/expenses').then(res => res.json()),
  });

  // Mutations for expenses
  const addExpenseMutation = useMutation({
    mutationFn: async (expense: InsertExpense) => {
      await apiRequest('POST', '/api/expenses', expense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: async ({ id, expense }: { id: string; expense: Partial<Expense> }) => {
      await apiRequest('PATCH', `/api/expenses/${id}`, expense);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
    },
  });

  // Mutations for accounts
  const addAccountMutation = useMutation({
    mutationFn: async (account: Omit<Account, 'id'>) => {
      await apiRequest('POST', '/api/accounts', account);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: async ({ id, account }: { id: string; account: Partial<Account> }) => {
      await apiRequest('PATCH', `/api/accounts/${id}`, account);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/accounts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/accounts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
    },
  });

  // Mutations for categories
  const addCategoryMutation = useMutation({
    mutationFn: async (category: Omit<Category, 'id'>) => {
      await apiRequest('POST', '/api/categories', category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, category }: { id: string; category: Partial<Category> }) => {
      await apiRequest('PATCH', `/api/categories/${id}`, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
    },
  });

  const value: ExpenseContextType = {
    accounts,
    categories,
    expenses,
    isLoadingAccounts,
    isLoadingCategories,
    isLoadingExpenses,
    addExpense: (expense: InsertExpense) => addExpenseMutation.mutateAsync(expense),
    updateExpense: (id: string, expense: Partial<Expense>) => 
      updateExpenseMutation.mutateAsync({ id, expense }),
    deleteExpense: (id: string) => deleteExpenseMutation.mutateAsync(id),
    addAccount: (account: Omit<Account, 'id'>) => addAccountMutation.mutateAsync(account),
    updateAccount: (id: string, account: Partial<Account>) => 
      updateAccountMutation.mutateAsync({ id, account }),
    deleteAccount: (id: string) => deleteAccountMutation.mutateAsync(id),
    addCategory: (category: Omit<Category, 'id'>) => addCategoryMutation.mutateAsync(category),
    updateCategory: (id: string, category: Partial<Category>) => 
      updateCategoryMutation.mutateAsync({ id, category }),
    deleteCategory: (id: string) => deleteCategoryMutation.mutateAsync(id),
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
