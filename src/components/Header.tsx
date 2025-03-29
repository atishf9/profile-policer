
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          <span className="text-xl font-semibold tracking-tight">ProfilePolicer</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Analyzer
          </Link>
          <Link to="/history" className="text-sm font-medium hover:text-primary transition-colors">
            History
          </Link>
          <Link to="/education" className="text-sm font-medium hover:text-primary transition-colors">
            Education
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
