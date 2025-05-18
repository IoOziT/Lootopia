import React, { useState } from "react";
import { utilisateurService } from "~/services/utilisateurService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
  const AUTH0_CLIENT_SECRET = import.meta.env.VITE_AUTH0_CLIENT_SECRET;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "password",
          username: email,
          password: password,
          audience: "https://dev-t45du7jmlhk0m3wf.eu.auth0.com/api/v2/",
          scope: "openid profile email",
          client_id: AUTH0_CLIENT_ID,
          client_secret: AUTH0_CLIENT_SECRET,
          connection: "Username-Password-Authentication",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = await utilisateurService.findByEmail(
          email,
          data.access_token
        );
        // Sauvegarde le token pour tes appels backend
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", user.email);
        alert("Connexion réussie !");
        // Redirige ou change d'état
      } else {
        setError(data.error_description || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur réseau");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <div>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Se connecter
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
