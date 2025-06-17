import { Header } from '@/components/Header';
import { AccountCard } from '@/components/AccountCard';
import { useExpense } from '@/contexts/ExpenseContext';

interface AccountsProps {
  onMenuClick: () => void;
}

export default function Accounts({ onMenuClick }: AccountsProps) {
  const { accounts } = useExpense();

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Accounts"
        onMenuClick={onMenuClick}
        showSearch={false}
      />
      
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
}
