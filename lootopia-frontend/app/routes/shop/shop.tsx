import type { Route } from "./+types/shop";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Lootopia | Boutique" }];
}

export default function Shop() {
  return (
    <div className="container flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center">Boutique</h1>

      <span></span>
    </div>
  );
}
