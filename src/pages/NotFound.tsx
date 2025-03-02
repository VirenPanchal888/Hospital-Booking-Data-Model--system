
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center md:p-8">
      <div className="animate-slide-in-up">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <span className="text-4xl font-bold text-muted-foreground">404</span>
        </div>
        
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Page not found</h1>
        
        <p className="mb-8 max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
          Check the URL or navigate back to the dashboard.
        </p>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to="/">
            <Button className="w-full gap-2 sm:w-auto">
              <HomeIcon className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
