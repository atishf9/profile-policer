
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          <span className="text-sm font-semibold">ProfilePolicer</span>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          This tool provides an estimation of profile authenticity based on common indicators.
          <br />
          Results should be considered as guidance only and not definitive proof.
        </p>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ProfilePolicer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
