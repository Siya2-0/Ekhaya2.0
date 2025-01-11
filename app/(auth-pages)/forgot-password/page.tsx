import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import logo from "../../assets/logo.png";
import Image from "next/image";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
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
          <form id="login-form" className="login-form">
          <div>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
          </div>
            <label htmlFor="email">Username</label>
            <Input name="email" placeholder="Enter your email address" required/>
        
            {/* <label htmlFor="password">Password</label>
            <Input type="password" name="password" placeholder="Enter your password" required/> */}
            <SubmitButton pendingText="Reset Password..." formAction={forgotPasswordAction}>
              Reset Password
            </SubmitButton>
            {/* <button type="submit">Log in now</button> */}
            <FormMessage message={searchParams} />
          </form>
        </div>      
      </div>

    </main>

  );
}


