import React from "react"
import { useNavigate, useParams } from "react-router"

const TreasureChestAnimation: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      onClick={() => navigate(-1)}
    >
      <div className="text-center">
        <div
          style={{
            fontSize: 120,
            animation: "bounce 1s infinite",
          }}
          aria-label="Coffre au trésor"
          role="img"
        >
          💰
        </div>
        <h2 className="mt-6 text-3xl text-yellow-400 font-bold">
          🎉 Tu as trouvé le trésor ! 🎉
        </h2>
        <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-30px);}
        }
      `}</style>
      </div>
    </div>
  )
}

export default TreasureChestAnimation
