
import { Shield, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          <span className="text-sm font-semibold">ProfilePolicer</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
          <a 
            href="https://cybercrime.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Report to Cyber Crime Portal
          </a>
          <a 
            href="https://www.identitytheft.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            FTC Identity Theft
          </a>
          <a 
            href="https://www.facebook.com/help/1216349518398524" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Report Fake Accounts on Facebook
          </a>
          <a 
            href="https://help.twitter.com/en/safety-and-security/report-abusive-behavior" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Report on Twitter
          </a>
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
