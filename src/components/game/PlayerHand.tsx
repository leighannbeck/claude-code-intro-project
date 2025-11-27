import { Card as CardType } from "@/types/game"
import Card from "./Card"

interface PlayerHandProps {
  cards: CardType[]
  onCardClick?: (card: CardType) => void
  validCards?: CardType[]
  selectedCard?: CardType | null
  showBack?: boolean
}

export default function PlayerHand({
  cards,
  onCardClick,
  validCards = [],
  selectedCard = null,
  showBack = false,
}: PlayerHandProps) {
  if (cards.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No cards in hand
      </div>
    )
  }

  return (
    <div className="flex justify-center items-end gap-1 flex-wrap">
      {cards.map((card, index) => {
        const isValid = validCards.length === 0 || validCards.some(c => c.id === card.id)
        const isSelected = selectedCard?.id === card.id

        return (
          <div key={card.id} className="transform transition-all">
            <Card
              card={card}
              onClick={isValid && onCardClick ? () => onCardClick(card) : undefined}
              disabled={!isValid}
              selected={isSelected}
              size="medium"
              showBack={showBack}
            />
          </div>
        )
      })}
    </div>
  )
}
