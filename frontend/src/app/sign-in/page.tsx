"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import axios from "axios";
import Logo from "@/components/ui/logo";
import LoadingSpinner from "@/components/ui/loadingSpinner";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(''); // Clear previous errors
    
    try {
        const response = await axios.post("https://api20230805195433.azurewebsites.net/api/authentication/login", { 
            email, 
            password 
        });

        if (response.data?.accessToken) {
            // Store authentication data
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("role", response.data.role);

            // Redirect and show success
            router.push("/dashboard");
            toast.success("Login successful");
        } else {
            throw new Error("Invalid server response");
        }
    } catch (error) {
        console.error("Login error:", error);
        
        // Handle different error cases
        if (axios.isAxiosError(error)) {
            // Backend returned an error response
            const message = error.response?.data?.message || error.response?.data;
            
            if (error.response?.status === 401) {
                if (message.includes("pending approval")) {
                    toast.info("Your account is pending admin approval. Please wait or contact support.");
                } else {
                    toast.error("Invalid email or password");
                }
            } else if (error.response?.status === 403) {
                toast.error("Account inactive. Please contact support.");
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error(message || "Login failed. Please try again.");
            }
        } else if (error instanceof Error) {
            // Other JavaScript errors
            toast.error(error.message || "An unexpected error occurred");
        } else {
            // Unknown error type
            toast.error("Login failed. Please try again.");
        }
        
        setError("Login failed. Please check your credentials and try again.");
    } finally {
        setPending(false);
    }
};
  
 

  return (
    <div
      className="h-screen w-full flex items-center justify-center fixed inset-0"
      style={{
        backgroundImage: `url('/erp.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#25254e', // Added purple background
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >

<div className="absolute top-4 left-4 z-10 animate-pulse hidden md:block">
        <Logo />
      </div>
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white/90 shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-[#25254e]">ERP Login</CardTitle>
          <CardDescription className="text-sm text-center text-[#25254e]">
            Use Registered Email to Login
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6 relative">
  
          
          <form onSubmit={handleSubmit} className="space-y-4 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-lg">
            <div className="relative">
              <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img src="/user.png" alt="" className="w-5 h-5"/>
                Username
              </label>
              <Input
                type="text"
                disabled={pending}
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="border-2 border-[#25254e] focus:border-[#fab619] rounded-lg p-3 transition-all duration-300 hover:shadow-md focus:shadow-lg"
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img src="/padlock.png" alt="" className="w-5 h-5"/>
                Password
              </label>
              <Input
                type="password"
                disabled={pending}
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-[#25254e] focus:border-[#fab619] rounded-lg p-3 transition-all duration-300 hover:shadow-md focus:shadow-lg"
              />
            </div>

            <Button               
              className="mt-8 w-full p-4 rounded-xl bg-gradient-to-r from-[#25254e] to-[#373770] text-[#f0eff2] hover:from-[#fab619] hover:to-[#ffd700] hover:text-[#25254e] transition-all duration-500 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              size="lg"
              disabled={pending}>
              {pending ? (
                <LoadingSpinner/>
              ) : (
                <>
                  <img src="/log-in.png" alt="" className="w-6 h-6"/>
                  Login
                </>
              )}
            </Button>

          </form>

          {/* <p className="text-center text-sm mt-4 text-[#25254e] font-medium">
            Create new account
            <Link className="text-[#fab619] ml-4 hover:underline cursor-pointer hover:text-[#25254e] transition-colors duration-300 font-bold" href="sign-up-hidden-onlyForOffice">
              Sign Up
            </Link>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
