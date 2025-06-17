import { useState } from 'react';
import { Header } from '@/components/Header';
import { AccountCard } from '@/components/AccountCard';
import { AddAccountModal } from '@/components/AddAccountModal';
import { useExpense } from '@/contexts/ExpenseContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AccountsProps {
  onMenuClick: () => void;
}

export default function Accounts({ onMenuClick }: AccountsProps) {
  const { accounts, isLoadingAccounts } = useExpense();
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  if (isLoadingAccounts) {
    return (
      <div className="flex-1 overflow-auto">
        <Header
          title="Accounts"
          onMenuClick={onMenuClick}
          showSearch={false}
        />
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Accounts"
        onMenuClick={onMenuClick}
        showSearch={false}
      />
      
      <div className="p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-primary">Your Accounts</h3>
          <Button
            onClick={() => setIsAddAccountModalOpen(true)}
            className="bg-secondary hover:bg-blue-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        {accounts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No accounts found</p>
            <Button
              onClick={() => setIsAddAccountModalOpen(true)}
              className="bg-secondary hover:bg-blue-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Account
            </Button>
          </div>
        )}
      </div>

      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
      />
    </div>
  );
}
