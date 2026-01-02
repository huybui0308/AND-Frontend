import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { authService } from "@/services/authService";

export const DemoModeBanner = () => {
  const isDemoMode = authService.isDemoMode();

  if (!isDemoMode) return null;

  return (
    <Alert className="mb-4 border-blue-500 bg-blue-50">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle>Demo Mode Active</AlertTitle>
      <AlertDescription>
        You are using a test account. Test accounts available: teacher/teacher123,
        student/student123, admin/admin123
      </AlertDescription>
    </Alert>
  );
};
