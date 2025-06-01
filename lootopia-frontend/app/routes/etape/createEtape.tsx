import { useState } from "react";
import type { Route } from "./+types/createEtape";
import { etapeService } from "~/services/etapeService";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Ajouter une étape" }];
}

export default function CreateEtape() {
  const [error, setError] = useState("");
  const [indication, setIndication] = useState("");
  const { id: chasseId } = useParams();
  const [carteId, setCarteId] = useState("");

  const listeCartes = [
    {
      id: 1,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      titre: "Carte 1",
    },
    {
      id: 2,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      titre: "Carte 2",
    },
    {
      id: 3,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      titre: "Carte 3",
    },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let etapeInput = {
      indication: indication,
      chasse_id: parseInt(chasseId ?? "", 1),
      ...(carteId && { carte_id: carteId }),
    };

    try {
      const create = await etapeService.create(
        etapeInput,
        localStorage.getItem("access_token") as string
      );
      console.log("etape créée :", create);
      alert("etape créée avec succès !");
    } catch (err: any) {
      console.error("Erreur lors de la création de etape :", err);
      setError(
        err.response.data.message || "Erreur lors de la création de etape"
      );
    }
  };
  return (
    <main className="h-11/12 flex flex-col items-gap-4">
      <header className="flex w-full bg-black text-white py-10">
        <button
          className="px-4 cursor-pointer"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </header>
      <div className="h-full">
        <h1 className="text-3xl font-bold">Add Step</h1>
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col gap-4 w-xs p-4"
        >
          <div className="flex flex-col">
            <label className="label">Indication</label>
            <input
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="avancer vers le nord"
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">carte</label>
            <select
              value={carteId}
              onChange={(e) => setCarteId(e.target.value)}
              className="select"
            >
              {listeCartes.map((carte) => (
                <option key={carte.id} value={carte.id}>
                  {carte.titre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="self-end btn btn-neutral mt-4">
            Create
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
}
