import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function meta() {
  return [{ title: "Lootopia | Hunts" }];
}

export default function ChasseDisponible() {
  const [chasses, setChasses] = useState<Chasse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    import("~/services/chasseService").then(({ chasseService }) => {
      chasseService
        .findAll()
        .then((data) => {
          if (!data) throw new Error("Aucune chasse reçue");
          setChasses(data);
        })
        .catch(() => setError("Erreur lors du chargement des chasses"))
        .finally(() => setLoading(false));
    });
  }, []);

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-black text-white py-6 px-4">
        <h1 className="text-3xl font-bold text-center mb-4">Hunts</h1>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="w-[90%] max-w-md rounded-full px-5 py-2 text-black bg-white placeholder-gray-500"
          />
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col gap-6">
        {chasses.map((chasse) => (
          <Link
            key={chasse.id}
            to={`/hunt/${chasse.id}`}
            className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:scale-[1.01] transition-transform"
          >
            <div>
              <h2 className="text-xl font-bold">{chasse.titre}</h2>
              <p className="text-gray-700">{chasse.mode}</p>
              <div className="flex items-center gap-2 mt-1 text-gray-700">
                <span>👥</span>
                <span>64 players</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-600 font-bold text-lg">
              <span>💰</span>
              <span>{chasse.frais || 0}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
