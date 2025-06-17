import { useState } from 'react';
import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import { Sidebar } from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import AddExpense from '@/pages/AddExpense';
import Transactions from '@/pages/Transactions';
import Analytics from '@/pages/Analytics';
import Accounts from '@/pages/Accounts';
import Categories from '@/pages/Categories';
import NotFound from '@/pages/not-found';

function Router() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <Switch>
        <Route path="/" component={() => <Dashboard onMenuClick={handleMenuClick} />} />
        <Route path="/add-expense" component={() => <AddExpense onMenuClick={handleMenuClick} />} />
        <Route path="/transactions" component={() => <Transactions onMenuClick={handleMenuClick} />} />
        <Route path="/analytics" component={() => <Analytics onMenuClick={handleMenuClick} />} />
        <Route path="/accounts" component={() => <Accounts onMenuClick={handleMenuClick} />} />
        <Route path="/categories" component={() => <Categories onMenuClick={handleMenuClick} />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ExpenseProvider>
          <Toaster />
          <Router />
        </ExpenseProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
