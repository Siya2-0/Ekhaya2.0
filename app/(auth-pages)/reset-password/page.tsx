"use client"
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { SupportedStorage } from "@supabase/supabase-js";


function ResetPasswordContent()
{
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState<any>(null);
  const searchParams = useSearchParams();
  // const parameter1 = searchParams.get('code');

  useEffect(() => {
    const parameter1 = searchParams.get('code');
    console.log("searchParams: ", parameter1);
    setCode(parameter1);
  }, [searchParams]); // Only run this effect when searchParams changes
//   const customStorageAdapter: SupportedStorage = {
//     getItem: (key) => {
//     if (!supportsLocalStorage()) {
//         // Configure alternate storage
//         return null
//     }
//     return globalThis.localStorage.getItem(key)
//     },
//     setItem: (key, value) => {
//     if (!supportsLocalStorage()) {
//         // Configure alternate storage here
//         return
//     }
//     globalThis.localStorage.setItem(key, value)
//     },
//     removeItem: (key) => {
//     if (!supportsLocalStorage()) {
//         // Configure alternate storage here
//         return
//     }
//     globalThis.localStorage.removeItem(key)
//     },
// }




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
    if(!code)
    {
      setError('Unexpected error.');
      return;

    }
    try {
      const supabase = createClient();
     // console.log(code);
    //  const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    
      // console.log(data+'data');
      // console.log(sessionError+'session');
      // if (sessionError) {
      //   setError(sessionError.message);
      //   return;
      // }
    
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
    
      console.log(error+ 'here')
      if (error) {
        setError(error.message);
      } else {
        setMessage('Password has been reset successfully.');
        await supabase.auth.signOut();
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    } catch (err) {
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


};


export default function ResetPassword() 
{
  return (
    (
      <div className="min-h-screen min-w-full flex items-center justify-center bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
          </Suspense>
      </div>
    )
  );
  

}


// 'use client';

// import { useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { SubmitButton } from "@/components/submit-button";
// import logo from "../../assets/logo.png";
// import Image from "next/image";

// const SearchParamsComponent = ({ onCodeRetrieved }) => {
//   const searchParams = useSearchParams();
//   const code = searchParams.get('code');
  
//   useEffect(() => {
//     if (code) {
//       onCodeRetrieved(code);
//     }
//   }, [code, onCodeRetrieved]);

//   return null;
// };

// export default function ResetPasswordContent() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [code, setCode] = useState(null);
//   const router = useRouter();

//   const handleCodeRetrieved = (retrievedCode:any) => {
//     setCode(retrievedCode);
//   };

//   useEffect(() => {
//     const exchangeCodeForSession = async () => {
//       if (code) {
//         const supabase = createClient();
//         const { data, error } = await supabase.auth.exchangeCodeForSession(code as string);
//         if (error) {
//           setError('Error exchanging code for session: ' + error.message);
//         } else {
//           console.log('Session data:', data);
//         }
//       }
//     };

//     exchangeCodeForSession();
//   }, [code]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     // Clear previous error and message
//     setError('');
//     setMessage('');

//     // Validate password length
//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long.');
//       return;
//     }

//     // Validate password match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     if (!code) {
//       setError('Unexpected error: Missing code.');
//       return;
//     }

//     try {
//       const supabase = createClient();

//       // Update user password
//       const { error: updateError } = await supabase.auth.updateUser({
//         password: password,
//       });

//       if (updateError) {
//         setError(updateError.message);
//       } else {
//         setMessage('Password has been reset successfully.');
//         // Close the app after a short delay
//         setTimeout(() => {
//           window.close();
//         }, 2000);
//       }
//     } catch (err) {
//       // Handle unexpected errors
//       setError('An unexpected error occurred. Please try again.');
//       console.error('Error resetting password:', err);
//     }
//   };

//   return (
//     <main className="min-h-screen min-w-full items-center justify-center flex bg-[#F2F2F2]">
//       <div className="card">
//         <div className="column left-column">
//           <h1 className="text-[#303030]">Welcome!</h1>
//           <Image src={logo} alt="" unoptimized priority width={100} height={100} className="w-[80%]" />
//         </div>
//         <div className="column right-column">
//           <svg width="36" height="36" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-10 w-10">
//             <path fillRule="evenodd" clipRule="evenodd" d="M30.9701 54.7998C30.9235 68.2521 41.7908 79.1889 55.2344 79.2355L55.1858 93.2754C33.9895 93.202 16.8567 75.9588 16.9302 54.7512L30.9701 54.7998Z" fill="currentColor"></path>
//             <path fillRule="evenodd" clipRule="evenodd" d="M38.4756 31.1054C25.0233 31.0588 14.0865 41.9261 14.0399 55.3698L0 55.3211C0.0734286 34.1248 17.3166 16.9921 38.5243 17.0655L38.4756 31.1054Z" fill="currentColor"></path>
//             <path fillRule="evenodd" clipRule="evenodd" d="M62.1701 38.6112C62.2167 25.1588 51.3494 14.222 37.9058 14.1754L37.9544 0.135498C59.1507 0.208927 76.2835 17.4521 76.21 38.6598L62.1701 38.6112Z" fill="currentColor"></path>
//             <path fillRule="evenodd" clipRule="evenodd" d="M54.6643 62.3054C68.1167 62.352 79.0535 51.4847 79.1001 38.0411L93.14 38.0897C93.0666 59.2861 75.8234 76.4188 54.6157 76.3454L54.6643 62.3054Z" fill="currentColor"></path>
//           </svg>
//           <h1 className="logintext">Reset Password</h1>
//           <div>
//             <p className="text-sm text-secondary-foreground">
//               Already have an account?{" "}
//               <Link className="text-primary underline" href="/sign-in">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//           <Suspense fallback={<div>Loading...</div>}>
//             <SearchParamsComponent onCodeRetrieved={handleCodeRetrieved} />
//           </Suspense>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//                 New Password
//               </Label>
//               <Input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter new password"
//                 required
//                 className="mt-1 p-2 w-full border border-gray-300 rounded"
//               />
//             </div>
//             <div className="flex flex-col gap-2">
//               <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
//                 Confirm Password
//               </Label>
//               <Input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm new password"
//                 required
//                 className="mt-1 p-2 w-full border border-gray-300 rounded"
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             {message && <p className="text-green-500 text-sm">{message}</p>}
//             <SubmitButton type="submit">
//               Reset Password
//             </SubmitButton>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }