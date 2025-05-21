import { useState } from "react";
import type { Route } from "./+types/createChasse";
import { MODE_ENUM, MONDE_ENUM } from "~/utils/Enum";
import { chasseService } from "~/services/chasseService";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Créer une chasse" }];
}

export default function CreateChasse() {
  const [error, setError] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [mode, setMode] = useState(MODE_ENUM.PUBLIC as string);
  const [dateDeFin, setdateDeFin] = useState("");
  const [nbMaxParticipants, setNbMaxParticipants] = useState("");
  const [frais, setFrais] = useState("");
  const [monde, setMonde] = useState(MONDE_ENUM.CARTOGRAPHIQUE as string);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let chasseInput = {
      titre: titre,
      localisation: localisation,
      ...(description && { description }),
      ...(mode && { mode }),
      ...(dateDeFin && { dateDeFin }),
      ...(nbMaxParticipants && { nbMaxParticipants }),
      ...(frais && { frais }),
      ...(monde && { monde }),
    };
    try {
      const userEmail = localStorage.getItem("user");
      if (userEmail) {
        const create = await chasseService.create(
          chasseInput,
          userEmail,
          localStorage.getItem("access_token") as string
        );
        console.log("Chasse créée :", create);
        alert("Chasse créée avec succès !");
      }
    } catch (err: any) {
      console.error("Erreur lors de la création de chasse :", err);
      setError(
        err.response.data.message || "Erreur lors de la création de chasse"
      );
    }
  };
  return (
    <main className="h-11/12 flex flex-col items-gap-4">
      <header className="flex w-full bg-black text-white py-10">
        <button className="px-4">Cancel</button>
      </header>
      <div className="h-full">
        <h1 className="text-3xl font-bold">Create Hunt</h1>
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col gap-4 w-xs p-4"
        >
          <div className="flex flex-col">
            <label className="label">Title</label>
            <input
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="nouvelle chasse"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Description</label>
            <input
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Localisation</label>
            <input
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="localisation"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="select"
            >
              <option value={MODE_ENUM.PUBLIC}>{MODE_ENUM.PUBLIC}</option>
              <option value={MODE_ENUM.PRIVE}>{MODE_ENUM.PRIVE}</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="label">Date de fin</label>
            <input
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="JJ/MM/YYYY"
              value={dateDeFin}
              onChange={(e) => setdateDeFin(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Nombre maximum de participants</label>
            <input
              type="number"
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="0"
              value={nbMaxParticipants}
              onChange={(e) => setNbMaxParticipants(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Frais</label>
            <input
              type="number"
              className="border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
              placeholder="0"
              value={frais}
              onChange={(e) => setFrais(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="label">monde</label>
            <select
              value={monde}
              onChange={(e) => setMonde(e.target.value)}
              className="select"
            >
              <option value={MONDE_ENUM.CARTOGRAPHIQUE}>
                {MONDE_ENUM.CARTOGRAPHIQUE}
              </option>
              <option value={MONDE_ENUM.REEL}>{MONDE_ENUM.REEL}</option>
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
