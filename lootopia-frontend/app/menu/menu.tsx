const menuLinks: any[] = [
  { path: "/", name: "Accueil", icon: "home" },
  { path: "/hunt", name: "Hunt", icon: "star" },
  { path: "/profil", name: "Profil", icon: "person" },
];

export default function Menu() {
  return (
    <ul className="dock dock-lg">
      {menuLinks.map((link) => (
        <li key={link.name}>
          <a
            className="dock-label flex flex-col items-center justify-center size-full"
            href={link.path}
          >
            <span className="material-symbols-outlined">{link.icon}</span>
            <span>{link.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
