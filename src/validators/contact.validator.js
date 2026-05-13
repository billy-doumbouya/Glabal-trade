import * as yup from "yup";

export const contactValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: yup
    .string()
    .required("L'email est requis")
    .email("Veuillez entrer un email valide"),
  subject: yup
    .string()
    .required("Le sujet est requis")
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(100, "Le sujet ne peut pas dépasser 100 caractères"),
  message: yup
    .string()
    .required("Le message est requis")
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});
