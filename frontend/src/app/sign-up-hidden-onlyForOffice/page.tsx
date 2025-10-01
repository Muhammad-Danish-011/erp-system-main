"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { validateSignupForm } from "./signupValidation";
import axios from "axios";
import { toast } from "@/components/ui/CustomToast";

interface SignUpForm {
  fullName: string;
  userName: string;
  nicNumber: string;
  departmentId: string;
  designationId: string;
  userTypeId: string;
  isSeniorManager: boolean;
  isLocalManager: boolean;
  roleName: string;
  roleId: string;
  password: string;
  confirmPassword: string;
  tradeLicenseOrOwnerId: string;
  DefaultApplicationID: number;
  IsManagedBy: number;
}

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState<SignUpForm>({
    fullName: "",
    userName: "",
    nicNumber: "",
    departmentId: "",
    designationId: "",
    userTypeId: "",
    isSeniorManager: false,
    isLocalManager: false,
    roleName: "",
    roleId: "",
    password: "",
    confirmPassword: "",
    tradeLicenseOrOwnerId: "",
    DefaultApplicationID: 1,
    IsManagedBy: 1,
  });

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [department, setDepartments] = useState<any[]>([]);
  const [designation, setDesignations] = useState<any[]>([]);
  const [userType, setUserTypes] = useState<any[]>([]);
  const [role, setRoles] = useState<any[]>([]);
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setPending(true);
  setError(""); // Clear previous errors

  // 1️⃣ Form validation
  const validationErrors = validateSignupForm(form);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    toast.error("❌ Please fix the errors in the form.");
    setPending(false);
    return;
  }

  // 2️⃣ Backend payload
  const body = {
    LoginName: form.userName?.trim() || "",
    Password: form.password?.trim() || "",
    EmployeeName: form.fullName?.trim() || "",
    NICNo: form.nicNumber?.trim() || "",
    DepartmentID: Number(form.departmentId) || 0,
    DesignationID: Number(form.designationId) || 0,
    UserTypeID: Number(form.userTypeId) || 0,
    RoleID: Number(form.roleId) || 0,
    RoleName: form.roleName?.trim() || "",
    IsSeniorManager: form.isSeniorManager ?? false,
    IsLocalManager: form.isLocalManager ?? false,
    DefaultApplicationID: 1,
    IsManagedBy: 1,
  };

  console.log("Signup Payload:", body);

  try {
    const res = await axios.post(
      "https://localhost:7215/api/Auth/signup",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(res.data, "✅ Signup response");
    toast.success("✅ Account created successfully!");
    router.push("/sign-in");
  } catch (err: any) {
    console.error("Signup Error:", err);

    let message = "An unexpected error occurred.";

    if (axios.isAxiosError(err)) {
      // ✅ Use backend message if available
      message = err.response?.data?.error || err.response?.data?.message || message;

      // Optional: fallback for other status codes
      if (!message) {
        switch (err.response?.status) {
          case 400: message = "❌ Bad request. Check your input."; break;
          case 401: message = "❌ Unauthorized. You are not allowed."; break;
          case 403: message = "❌ Forbidden. Contact support."; break;
          case 409: message = "❌ Duplicate entry. User already exists."; break;
          case 500: message = "❌ Server error. Try again later."; break;
        }
      }
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError(message);
    toast.error(message); // ✅ Show proper toast
  } finally {
    setPending(false);
  }
};




  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7215/api/MasterData/Departments"
        );
        setDepartments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDesignations = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7215/api/MasterData/Designations"
        );
        setDesignations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserTypes = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7215/api/MasterData/UserTypes"
        );
        setUserTypes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7215/api/MasterData/Roles"
        );
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDepartments();
    fetchDesignations();
    fetchUserTypes();
    fetchRoles();
  }, []);

  return (
    <div
      className="h-screen w-full flex items-center justify-center fixed inset-0"
      style={{
        backgroundImage: "url('/erp.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#25254e",
      }}
    >
      <div className="absolute top-4 left-4 z-10 animate-pulse hidden lg:block">
        <Logo />
      </div>

      <Card className="w-[90%] sm:w-[600px] p-4 sm:p-8 bg-white/90 shadow-2xl rounded-2xl">
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
              <InputField
                label="Full Name"
                type="text"
                name="fullName"
                value={form.fullName}
                error={errors.fullName}
                onChange={setForm}
                pending={pending}
              />

              <InputField
                label="User Name"
                type="text"
                name="userName"
                value={form.userName}
                error={errors.userName}
                onChange={setForm}
                pending={pending}
              />

              <InputField
                label="CNIC Number"
                type="number"
                name="nicNumber"
                value={form.nicNumber}
                error={errors.nicNumber}
                onChange={setForm}
                pending={pending}
              />

              {/* Department */}
              <SelectField
                label="Department"
                name="departmentId"
                value={form.departmentId}
                options={department.map((d) => ({
                  value: d.departmentID,
                  label: d.departmentName,
                }))}
                error={errors.departmentId}
                onChange={(val) => setForm({ ...form, departmentId: val })}
                pending={pending}
              />

              {/* Role */}
              <SelectField
                label="Role"
                name="roleId"
                value={form.roleId}
                options={role.map((r) => ({
                  value: r.roleID,
                  label: r.roleName,
                }))}
                error={errors.roleId}
                onChange={(val) => {
                  const selectedRole = role.find(
                    (r) => r.roleID === parseInt(val)
                  );
                  setForm({
                    ...form,
                    roleId: val,
                    roleName: selectedRole ? selectedRole.roleName : "",
                  });
                }}
               
                pending={pending}
              />

              {/* Designation */}
              <SelectField
                label="Designation"
                name="designationId"
                value={form.designationId}
                options={designation.map((d) => ({
                  value: d.designationID,
                  label: d.designation,
                }))}
                error={errors.designationId}
                onChange={(val) => setForm({ ...form, designationId: val })}
                pending={pending}
              />

              {/* User Type */}
              <SelectField
                label="User Type"
                name="userTypeId"
                value={form.userTypeId}
                options={userType.map((u) => ({
                  value: u.userTypeID,
                  label: u.description,
                }))}
                error={errors.userTypeId}
                onChange={(val) => setForm({ ...form, userTypeId: val })}
                pending={pending}
              />
            </div>

            {/* Managers */}
            <div className="grid grid-cols-2 gap-4">
              <CheckboxField
                label="Senior Manager"
                checked={form.isSeniorManager}
                onChange={(checked) =>
                  setForm({
                    ...form,
                    isSeniorManager: checked,
                    isLocalManager: checked ? false : form.isLocalManager,
                  })
                }
                pending={pending}
              />

              <CheckboxField
                label="Local Manager"
                checked={form.isLocalManager}
                onChange={(checked) =>
                  setForm({
                    ...form,
                    isLocalManager: checked,
                    isSeniorManager: checked ? false : form.isSeniorManager,
                  })
                }
                pending={pending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Password"
                type="password"
                name="password"
                value={form.password}
                error={errors.password}
                onChange={setForm}
                pending={pending}
              />

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={setForm}
                pending={pending}
              />
            </div>

            <Button
              className="mt-6 w-full p-3 rounded-xl bg-[#25254e] text-[#f0eff2] hover:bg-[#fab619] hover:text-[#25254e] transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
              size="lg"
              disabled={pending}
            >
              <img src="/log-in.png" alt="" className="w-5 h-5" />
              Signup
            </Button>
          </form>

          <p className="text-center text-sm mt-2 text-[#25254e]">
            Already have an account?
            <Link
              className="text-[#fab619] ml-2 hover:underline cursor-pointer hover:text-[#25254e]"
              href="/sign-in"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
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
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <Input
      type={type}
      name={name}
      disabled={pending}
      placeholder={`Enter ${label}`}
      value={value}
      onChange={(e) =>
        onChange((prev: any) => ({ ...prev, [name]: e.target.value }))
      }
      className={`${
        error ? "border-red-500 bg-red-100" : "border-gray-300"
      } border rounded-lg`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  options,
  error,
  onChange,
  pending,
}: {
  label: string;
  name: string;
  value: string;
  options: { value: string | number; label: string }[];
  error?: string;
  onChange: (val: string) => void;
  pending: boolean;
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={pending}
      className={`w-full rounded-lg border px-3 py-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const CheckboxField = ({
  label,
  checked,
  onChange,
  pending,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  pending: boolean;
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={pending}
      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
    />
    <span className="text-gray-700">{label}</span>
  </div>
);
