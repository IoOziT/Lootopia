import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function InscriptionChasse({ chasseId }: { chasseId: number }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        console.log("🔐 Token reçu :", accessToken);
      } catch (err) {
        console.error("Erreur récupération token", err);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleInscription = async () => {
    if (!token) return alert("Pas de token");

    const response = await fetch(
      `${import.meta.env.VITE_API_ADDRESS}chasse/protected/${chasseId}/join`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log("✅ Inscription réussie :", result);
  };

  return (
    <button
      onClick={handleInscription}
      className="bg-black text-white px-4 py-2 rounded"
    >
      S’inscrire à la chasse
    </button>
  );
}
