import { useState } from 'react';
import { MunicipalAuth } from './municipal/MunicipalAuth';
import { DashboardOverview } from './municipal/DashboardOverview';
import { IssuesManagement } from './municipal/IssuesManagement';
import { Sidebar } from './municipal/Sidebar';
import { Button } from './ui/button';
import { ArrowLeft, Menu } from 'lucide-react';

interface MunicipalDashboardProps {
  onBack: () => void;
}

type DashboardPage = 'auth' | 'overview' | 'issues' | 'transfers' | 'analytics' | 'communication';

export function MunicipalDashboard({ onBack }: MunicipalDashboardProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('overview');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A]">
        <div className="p-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-[#1E293B]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Button>
        </div>
        <MunicipalAuth onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1E293B] border-b border-[#475569] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-white hover:bg-[#334155] lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-[#334155]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Dashboard
              </Button>
            </div>
            <div className="text-white">
              <span className="text-sm text-gray-300">Welcome, </span>
              <span className="font-medium">Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {currentPage === 'overview' && <DashboardOverview />}
          {currentPage === 'issues' && <IssuesManagement />}
          {currentPage === 'transfers' && (
            <div className="p-6 text-white">
              <h1 className="text-2xl font-bold mb-4">Department Transfers</h1>
              <p className="text-gray-300">Transfer management functionality coming soon...</p>
            </div>
          )}
          {currentPage === 'analytics' && (
            <div className="p-6 text-white">
              <h1 className="text-2xl font-bold mb-4">Analytics & Reports</h1>
              <p className="text-gray-300">Analytics dashboard coming soon...</p>
            </div>
          )}
          {currentPage === 'communication' && (
            <div className="p-6 text-white">
              <h1 className="text-2xl font-bold mb-4">Citizen Communication</h1>
              <p className="text-gray-300">Communication tools coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}