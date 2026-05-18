export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export const validateContactForm = (form: ContactFormState): string => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    return "Please complete all fields.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
};
