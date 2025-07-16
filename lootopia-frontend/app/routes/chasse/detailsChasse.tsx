import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { chasseService } from "~/services/chasseService"
import type { Route } from "./+types/createChasse"

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Détails chasse" }]
}

export default function DetailsChasse() {
  const [chasseData, setChasseData] = useState<Chasse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { id } = useParams()
  const chasseId = Number(id) || 1

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token")
      chasseService.findById(1, token as string).then((data) => {
        setChasseData(data)
        setLoading(false)
      })
    }
  }, [])

  if (loading) return <p className="p-4">Chargement...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <main className="h-11/12 flex flex-col gap-4">
      {chasseData && (
        <div>
          <header className="flex flex-col w-full py-10 px-4 bg-black text-white">
            <figure>
              <img
                src="https://www.befrenchie.fr/wp-content/uploads/2020/04/chasse-au-tresor-pirate-705x470.jpg"
                alt=""
                className="rounded-xl w-full h-48 object-cover"
              />
            </figure>
            <h1 className="text-3xl font-bold mt-4">
              {chasseData.titre || "The Lost Crowns"}
            </h1>
            <h2 className="text-sm text-gray-300">
              {chasseData.mode || "Public"}
            </h2>
          </header>

          <div className="bg-white px-4 py-6">
            <h3 className="font-semibold text-md mb-2">Description</h3>
            <p className="text-sm text-gray-700">
              {chasseData.description ||
                "Une chasse mystérieuse au cœur d'une forêt dangereuse. Résous les énigmes et récupère la couronne perdue avant les autres."}
            </p>
          </div>

          <div className="px-4 pb-6">
            <button className="w-full bg-black text-white font-semibold text-center py-3 rounded-full hover:opacity-90 transition">
              Participer
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
