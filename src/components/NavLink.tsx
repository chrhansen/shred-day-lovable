import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  to: string;
  activeClassName?: string;
  end?: boolean;
}

export function NavLink({ 
  to, 
  className, 
  activeClassName = "bg-sidebar-accent text-sidebar-accent-foreground",
  end = false,
  children,
  ...props 
}: NavLinkProps) {
  const location = useLocation();
  const isActive = end 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}
