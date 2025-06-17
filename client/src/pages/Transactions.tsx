import { useState } from 'react';
import { Header } from '@/components/Header';
import { TransactionsTable } from '@/components/TransactionsTable';

interface TransactionsProps {
  onMenuClick: () => void;
}

export default function Transactions({ onMenuClick }: TransactionsProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Transactions"
        onMenuClick={onMenuClick}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      
      <div className="p-4 lg:p-6">
        <TransactionsTable />
      </div>
    </div>
  );
}
