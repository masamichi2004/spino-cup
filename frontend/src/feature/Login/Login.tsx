'use client';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { ShieldIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // GitHub認証URLにリダイレクト
      router.push('http://localhost:8080/auth/github');
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <ShieldIcon className="w-6 h-6 text-secondary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold text-center">
          SignIn
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          When you are ready, authenticate using the login button below.
        </p>
        <Button
          className="w-full bg-green text-white"
          size="lg"
          variant="default"
          onClick={handleLogin}
        >
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
