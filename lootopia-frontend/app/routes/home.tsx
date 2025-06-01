import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Accueil" }];
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setToken(null);
  };
  useEffect(() => {
    if (localStorage) {
      setToken(localStorage.getItem("access_token"));
    }
  }, []);
  return (
    <div className="h-11/12 container flex flex-col justify-evenly items-center">
      <h1 className="text-3xl font-bold text-center">Accueil</h1>

      <ul className="flex flex-col gap-6">
        {!token && (
          <li>
            <h2 className="text-2xl font-bold">Authentification</h2>
            <ul className="list-disc">
              <li>
                <a className="text-blue-500" href="register">
                  S'inscrire
                </a>
              </li>
              <li>
                <a className="text-blue-500" href="login">
                  Se connecter
                </a>
              </li>
            </ul>
          </li>
        )}
        {token && (
          <div>
            <li>
              <h2 className="text-2xl font-bold">Profil</h2>
              <ul className="list-disc">
                <li>
                  <a className="text-blue-500" href="profile">
                    Profil du mail {localStorage.getItem("user")}
                  </a>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="cursor-pointer text-blue-500"
                  >
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-2xl font-bold">Chasse</h2>
              <ul className="list-disc">
                <li>
                  <a className="text-blue-500" href="hunt/create">
                    Créer une chasse
                  </a>
                </li>
                <li>
                  <a className="text-blue-500" href="hunt/1">
                    Chasse 1
                  </a>
                </li>
                <li>
                  <a className="text-blue-500" href="hunt/1/step/create">
                    Ajouter une étape à Chasse 1
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
