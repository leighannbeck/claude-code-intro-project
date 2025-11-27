import { Card as CardType, Suit, Rank } from "@/types/game"

interface CardProps {
  card: CardType
  onClick?: () => void
  disabled?: boolean
  selected?: boolean
  size?: "small" | "medium" | "large"
  showBack?: boolean
}

const suitSymbols: Record<Suit, string> = {
  [Suit.SPADES]: "♠",
  [Suit.HEARTS]: "♥",
  [Suit.DIAMONDS]: "♦",
  [Suit.CLUBS]: "♣",
}

const suitColors: Record<Suit, string> = {
  [Suit.SPADES]: "text-gray-900",
  [Suit.HEARTS]: "text-red-600",
  [Suit.DIAMONDS]: "text-red-600",
  [Suit.CLUBS]: "text-gray-900",
}

const rankLabels: Record<Rank, string> = {
  [Rank.NINE]: "9",
  [Rank.TEN]: "10",
  [Rank.JACK]: "J",
  [Rank.QUEEN]: "Q",
  [Rank.KING]: "K",
  [Rank.ACE]: "A",
}

const sizeClasses = {
  small: "w-12 h-16 text-xs",
  medium: "w-16 h-24 text-sm",
  large: "w-20 h-28 text-base",
}

export default function Card({
  card,
  onClick,
  disabled = false,
  selected = false,
  size = "medium",
  showBack = false,
}: CardProps) {
  const suitSymbol = suitSymbols[card.suit]
  const suitColor = suitColors[card.suit]
  const rankLabel = rankLabels[card.rank]

  if (showBack) {
    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-blue-900 flex items-center justify-center shadow-lg`}
      >
        <div className="text-white text-2xl opacity-30">🂠</div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || !onClick}
      className={`
        ${sizeClasses[size]}
        bg-white rounded-lg border-2 shadow-lg
        flex flex-col items-center justify-between p-1
        transition-all duration-200
        ${
          selected
            ? "border-blue-500 bg-blue-50 transform -translate-y-2"
            : "border-gray-300"
        }
        ${
          onClick && !disabled
            ? "hover:border-blue-400 hover:-translate-y-1 cursor-pointer"
            : ""
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {/* Top rank and suit */}
      <div className={`font-bold ${suitColor} flex flex-col items-center leading-tight`}>
        <span>{rankLabel}</span>
        <span className="text-lg">{suitSymbol}</span>
      </div>

      {/* Center suit symbol */}
      <div className={`text-3xl ${suitColor}`}>{suitSymbol}</div>

      {/* Bottom rank and suit (upside down) */}
      <div
        className={`font-bold ${suitColor} flex flex-col items-center leading-tight transform rotate-180`}
      >
        <span>{rankLabel}</span>
        <span className="text-lg">{suitSymbol}</span>
      </div>
    </button>
  )
}
