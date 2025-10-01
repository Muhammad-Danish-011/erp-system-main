export const validateSignupForm = (form: {
  fullName: string;
  userName: string;
  nicNumber: string;
  departmentId: string;
  designationId: string;
  userTypeId: string;
  roleId: string;
  isSeniorManager: boolean;
  isLocalManager: boolean;
  password: string;
  confirmPassword: string;
}) => {
  const errors: { [key: string]: string } = {};

  // Username
  if (!form.userName.trim()) errors.userName = "❌ Username is required.";
  else if (form.userName.trim().length > 10) errors.userName = "❌ Username cannot exceed 10 characters.";

  // Full name
  if (!form.fullName.trim()) errors.fullName = "❌ Full name is required.";
  else if (form.fullName.trim().length > 50) errors.fullName = "❌ Full name cannot exceed 50 characters.";

  // NIC
  const nicDigits = form.nicNumber.replace(/-/g, "");
  if (!form.nicNumber.trim()) errors.nicNumber = "❌ NIC number is required.";
  else if (nicDigits.length !== 13 || !/^\d+$/.test(nicDigits)) {
    errors.nicNumber = "❌ NIC must be exactly 13 digits.";
  }

  // Role name
  if (!form.roleId.trim()) errors.roleId = "❌ Role name is required.";

  // Department, Designation, UserType (required)
  if (!form.departmentId.trim()) errors.departmentId = "❌ Department is required.";
  if (!form.designationId.trim()) errors.designationId = "❌ Designation is required.";
  if (!form.userTypeId.trim()) errors.userTypeId = "❌ User type is required.";

  // Password validations
  if (!form.password.trim()) errors.password = "❌ Password is required.";
  else if (form.password.length < 8) errors.password = "❌ Password must be at least 8 characters.";
  if (form.password !== form.confirmPassword) errors.confirmPassword = "❌ Passwords do not match.";

  return errors;
};
