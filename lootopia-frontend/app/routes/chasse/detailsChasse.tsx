import { useEffect, useState } from "react";
import type { Route } from "./+types/createChasse";
import { chasseService } from "~/services/chasseService";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Détails chasse" }];
}

export default function DetailsChasse() {
  const [chasseData, setChasseData] = useState<Chasse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      chasseService.findById(1, token as string).then((data) => {
        setChasseData(data);
        setLoading(false);
      });
    }
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <main className="h-11/12 flex flex-col gap-4">
      {chasseData && (
        <div>
          <header className="flex flex-col w-full py-10 px-4 bg-black text-white">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Image de la chasse"
                className="rounded-xl"
              />
            </figure>
            <h1 className="text-3xl font-bold">{chasseData.titre}</h1>
            <h2>{chasseData.mode}</h2>
          </header>
          <div className="h-full px-4 py-2">
            <p>{chasseData.description}</p>
          </div>
        </div>
      )}
    </main>
  );
}
