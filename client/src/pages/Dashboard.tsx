import { useState } from 'react';
import { useExpense } from '@/contexts/ExpenseContext';
import { Header } from '@/components/Header';
import { AccountCard } from '@/components/AccountCard';
import { ExpenseChart } from '@/components/ExpenseChart';
import { CategoryChart } from '@/components/CategoryChart';
import { TransactionsTable } from '@/components/TransactionsTable';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardProps {
  onMenuClick: () => void;
}

export default function Dashboard({ onMenuClick }: DashboardProps) {
  const { accounts, isLoadingAccounts, isLoadingCategories, isLoadingExpenses } = useExpense();
  const [searchValue, setSearchValue] = useState('');

  const isLoading = isLoadingAccounts || isLoadingCategories || isLoadingExpenses;

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Dashboard"
        onMenuClick={onMenuClick}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      
      <div className="p-4 lg:p-6 space-y-6">
        {/* Account Overview */}
        <section>
          <h3 className="text-lg font-semibold text-primary mb-4">Account Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoadingAccounts ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))
            ) : (
              accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))
            )}
          </div>
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <Skeleton className="h-80 lg:col-span-2" />
              <Skeleton className="h-80" />
            </>
          ) : (
            <>
              <ExpenseChart />
              <CategoryChart />
            </>
          )}
        </div>

        {/* Recent Transactions */}
        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <TransactionsTable limit={10} />
        )}
      </div>
    </div>
  );
}
