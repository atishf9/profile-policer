
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Home, History, Book, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-10">
      <div className="container flex h-14 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-colors hover:opacity-80"
        >
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FakeDetector
          </span>
        </Link>
        
        <nav className="flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"} 
              size="sm"
              className="text-xs md:text-sm"
            >
              <Home className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
          </Link>
          
          <Link to="/history">
            <Button 
              variant={location.pathname === "/history" ? "default" : "ghost"} 
              size="sm"
              className="text-xs md:text-sm"
            >
              <History className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">History</span>
            </Button>
          </Link>
          
          <Link to="/education">
            <Button 
              variant={location.pathname === "/education" ? "default" : "ghost"} 
              size="sm"
              className="text-xs md:text-sm"
            >
              <Book className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Education</span>
            </Button>
          </Link>
          
          <Link to="/login">
            <Button 
              variant={location.pathname === "/login" ? "default" : "ghost"} 
              size="sm"
              className="text-xs md:text-sm"
            >
              <User className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Login</span>
            </Button>
          </Link>
          
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
