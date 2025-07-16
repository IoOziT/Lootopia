import { useNavigate } from "react-router-dom";
import type { Route } from "./+types/home";
import Menu from "../menu/menu";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Accueil" }];
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center pt-16 pb-10">
        <h1 className="text-4xl font-bold mb-6">Play</h1>
        <button
          onClick={() => navigate("/hunt")}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-105 transition flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-10 h-10 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <div className="flex-1 bg-white text-black px-4 pb-32 rounded-t-3xl">
        <h2 className="text-xl font-semibold mt-6 mb-3">🏆 Top du jour</h2>
        <div className="space-y-3 mb-10">
          {[
            { name: "MarieJungle", points: 82, medal: "🥇" },
            { name: "ElFox", points: 77, medal: "🥈" },
            { name: "ChasseurPro", points: 75, medal: "🥉" },
            { name: "LunaHunter", points: 72 },
            { name: "Yanis", points: 70 },
            { name: "AyaExplores", points: 68 },
            { name: "LucasQuest", points: 65 },
            { name: "NinaWild", points: 61 },
            { name: "LeoTracks", points: 58 },
            { name: "KenzaRunner", points: 55 },
          ].map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-2 shadow-sm"
            >
              <span className="font-semibold">
                {user.medal ? `${user.medal} ` : `#${i + 1} `} {user.name}
              </span>
              <span className="text-sm text-gray-600">{user.points} pts</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-3">📸 Galerie des joueurs</h2>
<div className="flex overflow-x-auto space-x-6 pb-12">
  {[
    { name: "Lou", img: "https://randomuser.me/api/portraits/women/21.jpg" },
    { name: "Aris", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Zoé", img: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "Nico", img: "https://randomuser.me/api/portraits/men/54.jpg" },
    { name: "Tara", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Jules", img: "https://randomuser.me/api/portraits/men/18.jpg" },
    { name: "Léa", img: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Hugo", img: "https://randomuser.me/api/portraits/men/29.jpg" },
    { name: "Clara", img: "https://randomuser.me/api/portraits/women/7.jpg" },
    { name: "Mehdi", img: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Emma", img: "https://randomuser.me/api/portraits/women/19.jpg" },
    { name: "Sofiane", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Inès", img: "https://randomuser.me/api/portraits/women/37.jpg" },
    { name: "Téo", img: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Noa", img: "https://randomuser.me/api/portraits/women/23.jpg" },
  ].map((player, i) => (
    <div
      key={i}
      className="w-24 flex-shrink-0 flex flex-col items-center text-center"
    >
      <img
        src={player.img}
        alt={player.name}
        className="w-16 h-16 rounded-full object-cover shadow-md"
      />
      <p className="mt-2 text-sm font-medium">{player.name}</p>
    </div>
  ))}
</div>
      </div>
      <Menu />
    </div>
  );
}
