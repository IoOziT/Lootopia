import type { Route } from "./+types/home";
import Menu from "../components/menu/menu";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Accueil" }];
}

export default function Home() {
  return (
    <div className="container flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center">Accueil</h1>
    </div>
  );
}
