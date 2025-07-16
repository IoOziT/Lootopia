import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { chasseService } from "~/services/chasseService"; // ajuste le chemin si besoin

export default function InscriptionChasse({ chasseId }: { chasseId: number }) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [token, setToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then((t) => setToken(t))
        .catch((err) => console.error("Erreur token", err));
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleInscription = async () => {

    console.log("🧪 Bouton cliqué");

    if (!isAuthenticated) {
      return loginWithRedirect({
        appState: { returnTo: location.pathname },
      });
    }

    if (!token) {
      console.log("❌ Token manquant");
      return alert("Token manquant");
  }
    try {

          console.log("🟡 Envoi de la requête à :", `${import.meta.env.VITE_API_ADDRESS}chasse/protected/${chasseId}/inscription`);
    console.log("🔐 Token utilisé :", token);
      
      const { status, data } = await chasseService.register(chasseId, token);

      console.log("🟢 Réponse status :", status);
    console.log("📦 Réponse data :", data);

      if (status === 200 && data.message === "Déjà inscrit") {
        alert("Vous êtes déjà inscrit à cette chasse.");
      } else if (status === 201) {
        alert("Inscription réussie !");
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error)
      alert("Une erreur est survenue.");
    }
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
