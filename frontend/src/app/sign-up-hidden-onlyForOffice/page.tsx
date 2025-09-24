"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { validateSignupForm } from "./signupValidation";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    tradeLicenseOrOwnerId: "",
  });

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const validationErrors = validateSignupForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("❌ Please fix the errors in the form.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("https://api20230805195433.azurewebsites.net/api/dealer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registration successful!");
        router.push("/sign-in");
      } else {
        setErrors({ general: data.message || "Registration failed." });
        toast.error(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again later.");
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

      <div className="absolute top-4 left-4 z-10 animate-pulse hidden lg:block">
        <Logo />
      </div>
      <Card className="md:h-auto w-[80%] sm:w-[600px] p-4 sm:p-8 bg-white/90 shadow-2xl rounded-2xl">


        <CardHeader>
          <CardTitle className="text-center text-[#25254e]">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-[#25254e]">
            Create your account to get started
          </CardDescription>
        </CardHeader>

        {errors.general && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{errors.general}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6 w-full">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <img src="/user.png" alt="" className="w-5 h-5"/>
                  Full Name
                </label>
                <InputField
                  label=""
                  type="text" 
                  name="username"
                  value={form.username}
                  error={errors.username}
                  onChange={setForm}
                  pending={pending}
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <img src="/email.png" alt="" className="w-5 h-5"/>
                  Email
                </label>
                <InputField
                  label=""
                  type="email"
                  name="email" 
                  value={form.email}
                  error={errors.email}
                  onChange={setForm}
                  pending={pending}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <img src="/padlock.png" alt="" className="w-5 h-5"/>
                  Password
                </label>
                <InputField
                  label=""
                  type="password"
                  name="password"
                  value={form.password}
                  error={errors.password}
                  onChange={setForm}
                  pending={pending}
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <img src="/padlock.png" alt="" className="w-5 h-5"/>
                  Confirm Password
                </label>
                <InputField
                  label=""
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={setForm}
                  pending={pending}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img src="/telephone-symbol-button.png" alt="" className="w-5 h-5"/>
                Phone Number
              </label>
              <PhoneInput
                country={'pk'}
                value={form.phoneNumber}
                onChange={(phone) => setForm({ ...form, phoneNumber: phone })}
                inputStyle={{ width: '100%', height: '40px', borderRadius: '8px' }}
                containerStyle={{ width: '100%' }}
                dropdownStyle={{ zIndex: 9999 }}
                enableSearch
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">{errors.phoneNumber}</span>
              )}

              <div className="mt-4">
                <label className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <img src="/house.png" alt="" className="w-5 h-5"/>
                  Address
                </label>
                <InputField
                  label=""
                  type="text"
                  name="address"
                  value={form.address}
                  error={errors.address}
                  onChange={setForm}
                  pending={pending}
                />
              </div>
            </div>

            <Button
              className="mt-6 w-full p-3 rounded-xl bg-[#25254e] text-[#f0eff2] hover:bg-[#fab619] hover:text-[#25254e] transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
              size="lg"
              disabled={pending}
            >
              <img src="/log-in.png" alt="" className="w-5 h-5"/>
              Signup
            </Button>
          </form>

        <p className="text-center text-sm mt-2 text-[#25254e]">
          Already have an account?
          <Link className="text-[#fab619] ml-4 hover:underline cursor-pointer hover:text-[#25254e]" href="/sign-in">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
    </div >
  );
};

export default SignUp;

const InputField = ({
  label,
  type,
  name,
  value,
  error,
  onChange,
  pending,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  onChange: any;
  pending: boolean;
}) => (
  <div className="field">
    <label className="block text-lg font-bold text-gray-700 mb-1">{label}</label>
    <Input
      type={type}
      disabled={pending}
      placeholder={`Enter ${label}`}
      value={value}
      onChange={(e) => onChange((prev: any) => ({ ...prev, [name]: e.target.value }))}
      className={`input ${error ? "border-red-500 bg-red-100" : ""} border-[#25254e] focus:border-[#fab619]`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
