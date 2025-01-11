"use client"
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import logo from "../../assets/logo.png";
import Image from "next/image";


 function ExtractCode() {
  const searchParams = useSearchParams()
  console.log("Here11");
  const code = searchParams.get('code')
  console.log(code);
  return code;
}

export default function ResetPassword(
) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
 


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
      
       const code=ExtractCode();
      console.log("vuma"); 
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
    <main className="min-h-screen min-w-full items-center justify-center flex bg-[#F2F2F2]">
      <div className="card">
        <div className="column left-column">
          <h1 className="text-[#303030]">Welcome!</h1>
          <Image src={logo} alt="" unoptimized priority width={100} height={100} className="w-[80%]"/>
        </div>
        <div className="column right-column">
          <svg width="36" height="36" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-10 w-10"><path fillRule="evenodd" clipRule="evenodd" d="M30.9701 54.7998C30.9235 68.2521 41.7908 79.1889 55.2344 79.2355L55.1858 93.2754C33.9895 93.202 16.8567 75.9588 16.9302 54.7512L30.9701 54.7998Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M38.4756 31.1054C25.0233 31.0588 14.0865 41.9261 14.0399 55.3698L0 55.3211C0.0734286 34.1248 17.3166 16.9921 38.5243 17.0655L38.4756 31.1054Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M62.1701 38.6112C62.2167 25.1588 51.3494 14.222 37.9058 14.1754L37.9544 0.135498C59.1507 0.208927 76.2835 17.4521 76.21 38.6598L62.1701 38.6112Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M54.6643 62.3054C68.1167 62.352 79.0535 51.4847 79.1001 38.0411L93.14 38.0897C93.0666 59.2861 75.8234 76.4188 54.6157 76.3454L54.6643 62.3054Z" fill="currentColor"></path></svg>
          <h1 className="logintext">Reset Password</h1>
          <div>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          </div>
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

    </main>


  );
}


