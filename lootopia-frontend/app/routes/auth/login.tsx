import { useAuth0 } from "@auth0/auth0-react";
import type { Route } from "./+types/register";
import LoginForm from "~/components/auth/loginForm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Inscription" }];
}

export default function Shop() {
  if (useAuth0().isAuthenticated) {
    return <div>Vous êtes déjà connecté</div>;
  }
  return <LoginForm />;
}
