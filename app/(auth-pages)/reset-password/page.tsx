"use client"
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const parameter1 = searchParams.get('code');

  console.log("searchParams: ", parameter1);

  return (
    <div>
      {/* Your form or other UI elements go here */}
    </div>
  );
}

export default function ResetPassword(
) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    
    setError('');
    setMessage('');
  
 
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
  
 
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {
      //  const code=ExtractCode();
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
  
      console.log(error);
      if (error) {
        setError(error.message);
      } else {
        setMessage('Password has been reset successfully.');
        // Redirect to sign-in page after a short delay
        setTimeout(() => {
          //router.push('/auth/callback?redirect_to=/sign-in');
          window.close();
        }, 2000);
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
      console.error('Error resetting password:', err);
    }
  };

  return (
    (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-medium mb-4">Reset Password</h1>
          <p className="text-sm text-secondary-foreground mb-4">
            Already have an account?{' '}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    )
  );
}
