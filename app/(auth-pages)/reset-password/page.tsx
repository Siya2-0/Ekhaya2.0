"use client"
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/client";

export default function ResetPassword(
) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  //const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

  
  const supabase = createClient(); 
  const { data, error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    setError(error.message);
    
  } else {
    setMessage('Password has been reset successfully.');
    //redirect to sign

    
  }
  };

  return (
    (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
