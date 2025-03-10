
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  ClipboardList, 
  Cog, 
  Home, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: Home },
      { title: 'Inventory', href: '/inventory', icon: Box },
      { title: 'Orders', href: '/orders', icon: ShoppingCart },
    ]
  },
  {
    title: 'Management',
    items: [
      { title: 'Products', href: '/products', icon: Package },
      { title: 'Suppliers', href: '/suppliers', icon: Truck },
      { title: 'Reports', href: '/reports', icon: BarChart3 },
      { title: 'Purchase Orders', href: '/purchase-orders', icon: ClipboardList },
    ]
  },
  {
    title: 'Administration',
    items: [
      { title: 'Users', href: '/users', icon: Users },
      { title: 'Settings', href: '/settings', icon: Cog },
    ]
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        'bg-navy text-lightGray/90 h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex items-center h-16 border-b border-white/10 px-4">
        {!collapsed && <h2 className="text-lg font-bold tracking-tight">InventTrack</h2>}
        <button 
          className={cn(
            'p-1.5 rounded-lg bg-ocean/20 hover:bg-ocean/30 transition-colors ml-auto'
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        {navSections.map((section, i) => (
          <div key={i} className="mb-6 px-3">
            {!collapsed && (
              <h3 className="text-xs uppercase text-lightGray/60 font-medium px-3 mb-2">
                {section.title}
              </h3>
            )}
            
            <ul className="space-y-1">
              {section.items.map((item, j) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={j}>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center rounded-lg py-2 px-3 hover:bg-ocean transition-colors',
                        isActive ? 'bg-teal text-white' : 'text-lightGray/80'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', collapsed ? 'mx-auto' : 'mr-3')} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/10 p-4">
        <div className={cn(
          'flex items-center',
          collapsed ? 'justify-center' : 'justify-start'
        )}>
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-lightGray/60">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
