import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Home, ListOrdered, Package, Settings, Users } from 'lucide-react'; // Example icons

// Define props if the sidebar content is dynamic (e.g., menu items)
interface SidebarProps {
  className?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: ListOrdered },
  { href: "/products", label: "Products", icon: Package },
  { href: "/customers", label: "Customers", icon: Users, disabled: true }, // Example disabled link
  { href: "/settings", label: "Settings", icon: Settings, disabled: true },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className={cn("hidden md:flex md:flex-col md:w-64 border-r bg-background", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          {/* <Package2 className="h-6 w-6" /> Replace with your logo component or SVG */}
          <span className="">Admin Panel</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                location.pathname.startsWith(item.href) && !item.disabled && "bg-muted text-primary",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
              aria-disabled={item.disabled}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      {/* Optional: Footer section in sidebar */}
      {/* <div className="mt-auto p-4 border-t">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Your Company</p>
      </div> */}
    </aside>
  );
}
export default Sidebar;