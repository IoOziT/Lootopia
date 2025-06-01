import React, { useState } from "react";
import { utilisateurService } from "~/services/utilisateurService";

export default function RegisterForm() {
  const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `HTTPS://${AUTH0_DOMAIN}/dbconnections/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: AUTH0_CLIENT_ID,
            email,
            password,
            connection: "Username-Password-Authentication",
            user_metadata: {
              username,
              role,
            },
          }),
        }
      );

      const json = await response.json();
      console.log("Inscription réussie :", json);

      const create = await utilisateurService.createUser({
        username: username,
        email: email,
      });

      alert("Inscription réussie !");
    } catch (err: any) {
      console.error("Erreur lors de l'inscription :", err);
      setError(err.response.data.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <div>
        <label className="label">Username</label>
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="label">TYpe de compte</label>
        <select
          value={role}
          onChange={(e) => setUsername(e.target.value)}
          defaultValue="Quel type de compte voulez-vous"
          className="select"
        >
          <option value={"COMMUN"}>Commun</option>
          <option value={"PARTENAIRE"}>Partenaire</option>
        </select>
      </div>
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-neutral mt-4">
        S'inscrire
      </button>
      {error && <p>{error}</p>}
      <span>
        Déjà un compte ? <a href="/login">Se connecter</a>
      </span>
    </form>
  );
}
