import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  phone: z
    .string()
    .min(7, "Podaj numer telefonu")
    .regex(/^[+\d][\d\s\-()]{6,20}$/, "Nieprawidłowy format numeru telefonu."),
  message: z.string().min(10, "Wiadomość musi mieć min. 10 znaków"),
});

export const phoneRegex = /^[+\d][\d\s\-()]{6,20}$/;

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

export function validateField(
  name: keyof z.infer<typeof formSchema>,
  value: string,
  setFormErrors?: (cb: (prev: FormErrors) => FormErrors) => void,
  formErrors?: FormErrors
) {
  if (name === "phone" && value) {
    if (!phoneRegex.test(value)) {
      setFormErrors?.((prev: FormErrors) => ({
        ...prev,
        phone: "Nieprawidłowy format numeru telefonu.",
      }));
      return false;
    }
  }
  try {
    formSchema.shape[name].parse(value);
    if (setFormErrors && formErrors) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(() => newErrors);
    }
    return true;
  } catch (error) {
    if (setFormErrors && error instanceof z.ZodError) {
      setFormErrors((prev: FormErrors) => ({
        ...prev,
        [name]: error.issues[0].message,
      }));
    }
    return false;
  }
}

export function validateForm(
  formData: z.infer<typeof formSchema>,
  setFormErrors?: (errors: FormErrors) => void
) {
  try {
    formSchema.parse(formData);
    setFormErrors?.({});
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: FormErrors = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof z.infer<typeof formSchema>] =
            err.message;
        }
      });
      setFormErrors?.(newErrors);
    }
    return false;
  }
}
