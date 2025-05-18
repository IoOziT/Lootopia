import { utilisateurService } from "~/services/utilisateurService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [couronnes, setCouronnes] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          const email = localStorage.getItem("email") || "";
          console.log(token);
          const data = await utilisateurService.fetchCouronnesByUser(
            email,
            token
          );
          console.log("data", data);
          if (data) {
            setCouronnes(data.couronnes);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des couronnes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Lootopia</a>
      </div>
      {isAuthenticated ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div className="indicator">
              <span>{couronnes}</span>
              <span className="material-symbols-outlined">crown</span>
              <button onClick={() => logout()} className="btn btn-secondary">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <a className="btn btn-primary" href="login">
            Se connecter
          </a>
          <a href="register">S'inscrire</a>
        </div>
      )}
    </div>
  );
}
