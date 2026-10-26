import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Home, 
  AlertTriangle, 
  ArrowRightLeft, 
  BarChart2, 
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    route: '/admin/dashboard'
  },
  {
    id: 'issues',
    label: 'Issues Management',
    icon: AlertTriangle,
    route: '/admin/issues',
    badge: 47
  },
  {
    id: 'transfers',
    label: 'Department Transfer',
    icon: ArrowRightLeft,
    route: '/admin/transfers',
    submenu: [
      {
        label: 'Pending Transfers',
        route: '/admin/transfers/pending',
        badge: 12
      },
      {
        label: 'Transfer History',
        route: '/admin/transfers/history'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: BarChart2,
    route: '/admin/analytics'
  },
  {
    id: 'communication',
    label: 'Citizen Communication',
    icon: MessageCircle,
    route: '/admin/communication'
  }
];

export function Sidebar({ currentPage, onPageChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`bg-[#1E293B] border-r border-[#475569] transition-all duration-300 flex flex-col h-screen ${
      collapsed ? 'w-[72px]' : 'w-[280px]'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-[#475569] bg-[#334155]">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-white font-semibold">Municipal Dashboard</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-white hover:bg-[#475569] hidden lg:flex"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <div key={item.id}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-white hover:bg-[#334155] ${
                  isActive ? 'bg-[#334155] text-blue-400' : ''
                } ${collapsed ? 'px-2' : 'px-3'}`}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className={`h-4 w-4 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="bg-red-500 text-white text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>

              {/* Submenu */}
              {!collapsed && item.submenu && currentPage === item.id && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.route}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-300 hover:bg-[#334155] hover:text-white"
                    >
                      <span className="flex-1 text-left">{subItem.label}</span>
                      {subItem.badge && (
                        <Badge 
                          variant="outline" 
                          className="border-yellow-500 text-yellow-400 text-xs"
                        >
                          {subItem.badge}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-[#475569]">
          <div className="bg-[#334155] rounded-lg p-2">
            <p className="text-white text-xs font-medium mb-1">Quick Stats</p>
            <div className="space-y-0.5">
              <p className="text-gray-300 text-xs">47 open issues</p>
              <p className="text-gray-300 text-xs">12 pending transfers</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}