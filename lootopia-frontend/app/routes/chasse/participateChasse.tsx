import L, { type LatLngExpression } from "leaflet"
import React, { useState } from "react"
import {
  Circle,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet"
import TreasureChestAnimation from "../../components/TreasureChestAnimation"

interface CircleData {
  lat: number
  lng: number
  radius: number
  id: number
}

const NUM_CIRCLES = 4 as const
const BASE_RADIUS = 1200 // mètres

const treasure = {
  lat: 48.858288,
  lng: 2.294463,
}

function generateCircles(): CircleData[] {
  let circles: CircleData[] = []
  let center = { ...treasure }
  for (let i = NUM_CIRCLES - 1; i >= 0; i--) {
    const radius = BASE_RADIUS / 2 ** i
    const angle = Math.random() * 2 * Math.PI
    const offset = i > 0 ? radius * 0.6 : 0
    const dLat = (offset / 111320) * Math.cos(angle)
    const dLng =
      (offset / ((40075000 * Math.cos((center.lat * Math.PI) / 180)) / 360)) *
      Math.sin(angle)
    center = { lat: center.lat + dLat, lng: center.lng + dLng }
    circles.push({ lat: center.lat, lng: center.lng, radius, id: i })
  }
  return circles.reverse()
}

const circlesData = generateCircles()

function pointInCircle(
  point: [number, number],
  center: { lat: number; lng: number },
  radius: number
): boolean {
  const distance = L.latLng(point).distanceTo([center.lat, center.lng])
  return distance <= radius
}

const MapClickHandler: React.FC<{
  onAdvance: (latlng: L.LatLng) => void
  activeCircle: CircleData
  found: boolean
}> = ({ onAdvance, activeCircle, found }) => {
  const map = useMap()

  useMapEvent("click", (e) => {
    if (!found) {
      onAdvance(e.latlng)
    }
  })

  map.setView([activeCircle.lat, activeCircle.lng], map.getZoom())

  return null
}

const CenterOnCircle = ({
  center,
  zoom,
}: {
  center: LatLngExpression
  zoom: number
}) => {
  const map = useMap()

  map.setView(center, zoom)

  return null
}

const TreasureHunt: React.FC = () => {
  const [currentCircle, setCurrentCircle] = useState<number>(0)
  const [found, setFound] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(13)

  const activeCircle = circlesData[currentCircle]

  const handleAdvance = (latlng: L.LatLng) => {
    const clicked: [number, number] = [latlng.lat, latlng.lng]

    if (
      currentCircle === NUM_CIRCLES - 1 &&
      pointInCircle(clicked, treasure, 30)
    ) {
      setFound(true)
      return
    }

    const next = circlesData[currentCircle + 1]

    if (next && pointInCircle(clicked, next, next.radius)) {
      setCurrentCircle(currentCircle + 1)
      setZoom((z) => z + 2)
    }
  }
  const circle = circlesData[currentCircle]

  return (
    <div className="w-full h-full flex-1">
      {found && <TreasureChestAnimation />}
      <MapContainer
        center={[activeCircle.lat, activeCircle.lng] as LatLngExpression}
        zoom={zoom}
        className={`h-full w-full z-0 ${
          found ? "pointer-events-none" : "pointer-events-auto"
        }`}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <CenterOnCircle
          center={[activeCircle.lat, activeCircle.lng]}
          zoom={zoom}
        />
        <MapClickHandler
          onAdvance={handleAdvance}
          activeCircle={activeCircle}
          found={found}
        />
        <Circle
          key={circle.id}
          center={[circle.lat, circle.lng]}
          radius={circle.radius}
          pathOptions={{
            color: "red",
            fillOpacity: 0.3,
          }}
        />
      </MapContainer>
      {!found && (
        <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-md shadow text-black z-10">
          <b>Étape :</b> {currentCircle + 1} / {NUM_CIRCLES}
          <br />
          {currentCircle === NUM_CIRCLES - 1
            ? "Dernière étape! Trouve le coffre !"
            : "Le trésor t’attend… Trouve le cercle suivant pour poursuivre ta quête !"}
        </div>
      )}
    </div>
  )
}

export default TreasureHunt
