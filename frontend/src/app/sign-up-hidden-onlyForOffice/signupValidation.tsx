export const validateSignupForm = (form: {
  username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!form.username.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email format.";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  
    return errors;
  };
  
// export const validateSignupForm = (form: {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phoneNumber: string;
//   address: string;
//   tradeLicenseOrOwnerId: string;
// }) => {
//   const errors: { [key: string]: string } = {};

//   if (!form.username.trim()) errors.username = "Name is required.";
//   if (!form.email.trim()) errors.email = "Email is required.";
//   if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email format.";
//   if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
//   if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
//   if (!form.phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
//   if (!form.address.trim()) errors.address = "Address is required.";
//   // if (!form.tradeLicenseOrOwnerId.trim()) errors.tradeLicenseOrOwnerId = "Trade License / Owner ID is required.";

//   return errors;
// };
  
