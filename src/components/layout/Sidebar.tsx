
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  ShoppingCart, 
  Users,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Inventory", path: "/inventory", icon: ClipboardList },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Customers", path: "/customers", icon: Users },
  ];

  return (
    <div className="hidden lg:flex flex-col bg-brand-blue min-h-screen w-64 p-5">
      <div className="py-4 px-2">
        <h1 className="text-xl font-bold text-white mb-6">ProductPulse</h1>
        <nav className="space-y-1 mt-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn("sidebar-link", {
                "active": isActive(item.path),
              })}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto mb-4 space-y-1">
        <Link to="/settings" className="sidebar-link">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button className="w-full sidebar-link text-left">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};
