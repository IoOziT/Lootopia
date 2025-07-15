import { useAuth0 } from "@auth0/auth0-react";
import type { Route } from "./+types/register";
import RegisterForm from "~/components/auth/registerForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Inscription" }];
}

export default function Shop() {
  if (useAuth0().isAuthenticated) {
    return <div>Vous avez deja un compte</div>;
  }
  return <RegisterForm />;
}
