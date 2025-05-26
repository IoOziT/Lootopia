import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function meta() {
  return [{ title: "Lootopia | Chasses disponibles" }];
}

export default function ChasseDisponible() {
  const [chasses, setChasses] = useState<Chasse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return setError("Utilisateur non connecté");

    import("~/services/chasseService").then(({ chasseService }) => {
      chasseService
        .findAll(token)
        .then((data) => {
          if (!data) throw new Error("Aucune chasse reçue");
          setChasses(data);
        })
        .catch(() => setError("Erreur lors du chargement des chasses"))
        .finally(() => setLoading(false));
    });
  }, []);

  if (loading) return <p className="p-4 text-white">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Chasses disponibles</h1>
      <div className="grid gap-6">
        {chasses.map((chasse) => (
          <Link
            key={chasse.id}
            to={`/hunt/${chasse.id}`}
            className="bg-white text-black p-4 rounded-xl shadow hover:scale-[1.01] transition-all"
          >
            <div className="mb-2">
              <img
                src="https://via.placeholder.com/400x200?text=Chasse"
                alt={chasse.titre}
                className="rounded w-full h-40 object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{chasse.titre}</h2>
            <p className="text-sm text-gray-700">
              🧭 Mode : {chasse.mode?.toLowerCase()} · Monde : {chasse.monde?.toLowerCase()}
            </p>
            <p className="text-sm mt-1">📍 {chasse.localisation}</p>
            {chasse.frais && (
              <p className="text-sm mt-1">💰 Frais : {chasse.frais} ₡</p>
            )}
            {chasse.dateDeFin && (
              <p className="text-sm mt-1">
                ⏳ Jusqu'au : {new Date(chasse.dateDeFin).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
