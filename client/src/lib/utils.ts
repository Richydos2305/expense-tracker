import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getAccountColor(accountName: string): string {
  const colors: Record<string, string> = {
    'GTBank': 'gtbank',
    'Access Bank': 'access',
    'PiggyVest': 'piggyvest',
    'Crypto Wallet': 'crypto',
    'Cash': 'cash',
  };
  return colors[accountName] || 'secondary';
}

export function getCategoryIcon(categoryName: string): string {
  const icons: Record<string, string> = {
    'Food': 'utensils',
    'Transport': 'car',
    'Entertainment': 'film',
    'Shopping': 'shopping-bag',
    'Bills': 'file-text',
    'Health': 'heart',
    'Education': 'book',
    'Other': 'more-horizontal',
  };
  return icons[categoryName] || 'more-horizontal';
}
