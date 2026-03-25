import { AuthUI } from "@/components/AuthUI";

export const metadata = {
  title: "Access - Safelance CRM",
  description: "Securely enter your autonomous freelancer workspace.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream">
       <AuthUI />
    </div>
  );
}
