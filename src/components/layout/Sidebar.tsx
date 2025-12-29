
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Box, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  LogOut, 
  Package, 
  Settings, 
  ShoppingCart, 
  Truck, 
  UserPlus, 
  Users, 
  Warehouse 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { signOut, isAdmin, isInventoryManager } = useAuth();

  const navItems = [
    { 
      title: 'Dashboard', 
      icon: <Home className="h-5 w-5" />, 
      path: '/dashboard',
      showFor: () => true
    },
    { 
      title: 'Inventory', 
      icon: <Warehouse className="h-5 w-5" />, 
      path: '/inventory',
      showFor: () => true
    },
    { 
      title: 'Products', 
      icon: <Package className="h-5 w-5" />, 
      path: '/products',
      showFor: () => true
    },
    { 
      title: 'Orders', 
      icon: <ShoppingCart className="h-5 w-5" />, 
      path: '/orders',
      showFor: () => true
    },
    { 
      title: 'Suppliers', 
      icon: <Truck className="h-5 w-5" />, 
      path: '/suppliers',
      showFor: () => true
    },
    { 
      title: 'Analytics', 
      icon: <BarChart3 className="h-5 w-5" />, 
      path: '/analytics',
      showFor: () => isAdmin || isInventoryManager
    },
    { 
      title: 'User Management', 
      icon: <UserPlus className="h-5 w-5" />, 
      path: '/user-management',
      showFor: () => isAdmin
    },
    { 
      title: 'Settings', 
      icon: <Settings className="h-5 w-5" />, 
      path: '/settings',
      showFor: () => true
    },
  ];

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 relative flex flex-col",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn("flex items-center space-x-2", !expanded && "justify-center")}>
          <Box className="h-6 w-6 text-primary" />
          {expanded && <span className="font-semibold">InventTrack</span>}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full"
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.filter(item => item.showFor()).map((item) => (
            <li key={item.path}>
              {expanded ? (
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex justify-center items-center p-2 rounded-md transition-colors",
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={signOut}
          className={cn(
            "flex items-center space-x-3 w-full px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors",
            !expanded && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {expanded && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
