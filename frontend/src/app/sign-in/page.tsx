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
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Logo from "@/components/ui/logo";
import { TriangleAlert } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import CustomToast, { toast } from "@/components/ui/CustomToast";
import Loading from "@/components/ui/Loading";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setPending(true);
  setLoading(true);
  setError("");

  try {
    const response = await axios.post("https://localhost:7215/api/Auth/login", {
      loginName: email,
      password: password,
    });

    const data = response.data;

    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userID || "");
      localStorage.setItem("employeeName", data.employeeName || "");
      localStorage.setItem("roleID", data.roleID?.toString() || "");
      localStorage.setItem("roleName", data.roleName || "");
      localStorage.setItem("isSeniorManager", data.isSeniorManager?.toString() || "false");
      localStorage.setItem("isLocalManager", data.isLocalManager?.toString() || "false");
      localStorage.setItem("expiration", data.expiration || "");

      toast.success("Login successful! Redirecting...");
      router.push("/dashboard");
    } else {
      throw new Error("Invalid server response.");
    }
  } catch (err) {
    console.error("Login error:", err);
    let message = "An unexpected error occurred.";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || JSON.stringify(err.response?.data);

      switch (err.response?.status) {
        case 400:
          message = "Bad request. Check your input.";
          break;
        case 401:
          message = "Invalid username or password.";
          break;
        case 403:
          message = "Account inactive. Contact support.";
          break;
        case 500:
          message = "Server error. Try again later.";
          break;
      }
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError(message);
    toast.error(message);
  } finally {
    setPending(false);
    setLoading(false);
  }
};

  return (
    <div
      className="h-screen w-full flex items-center justify-center fixed inset-0"
      style={{
        backgroundImage: `url('/erp.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#25254e",
      }}
    >
      <CustomToast />

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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 mb-6">
            <TriangleAlert className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <CardContent className="px-2 sm:px-6 relative">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 shadow-lg"
          >
            <div className="relative">
              <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img src="/user.png" alt="" className="w-5 h-5" />
                Username
              </label>
              <Input
                type="text"
                disabled={pending}
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`border-2 rounded-lg p-3 transition-all duration-300 hover:shadow-md focus:shadow-lg ${
                  error.includes("username") ? "border-red-500" : "border-[#25254e] focus:border-[#fab619]"
                }`}
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img src="/padlock.png" alt="" className="w-5 h-5" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  disabled={pending}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`border-2 rounded-lg p-3 transition-all duration-300 hover:shadow-md focus:shadow-lg pr-12 ${
                    error.includes("password") ? "border-red-500" : "border-[#25254e] focus:border-[#fab619]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-100 hover:text-[#fab619] focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              className="mt-8 w-full p-4 rounded-xl bg-gradient-to-r from-[#25254e] to-[#373770] text-[#f0eff2] hover:from-[#fab619] hover:to-[#ffd700] hover:text-[#25254e] transition-all duration-500 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              size="lg"
              disabled={pending}
            >
              {pending ? (
                <Loading />
              ) : (
                <>
                  <img src="/log-in.png" alt="" className="w-6 h-6" /> Login
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
