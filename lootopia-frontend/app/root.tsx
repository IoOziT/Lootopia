import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import { Auth0Provider } from "@auth0/auth0-react"
import type { Route } from "./+types/root"
import "./app.css"
import Menu from "./menu/menu"

import "leaflet/dist/leaflet.css"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-t45du7jmlhk0m3wf.eu.auth0.com"
      clientId="3CNYLTvW3jyTy4bvvXMYf3UdXUEVdTsb"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
        audience: "https://dev-t45du7jmlhk0m3wf.eu.auth0.com/api/v2/",
      }}
    >
      <html data-theme="acid" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="h-screen flex flex-col">
          {children}
          <ScrollRestoration />
          <Scripts />
          <Menu />
        </body>
      </html>
    </Auth0Provider>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
