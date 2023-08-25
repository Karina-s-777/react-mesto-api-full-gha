import { useEffect, useState } from "react";

// вынесли компонент лайка 👍
export default function LikeButton({ card, mypersonalid, onCardLike }) {
  // создаем два стейта для лайков и для счетчиков
  const [isLike, setIsLike] = useState(false);
  //   const [count, setCount] = useState(likes.length)

  useEffect(() => {
    // Проходимся по массиву likes методом some. Внутри мы берем элемент i, если наш id === id элемента, то true (если мы есть в массиве)
    setIsLike(card.likes.some((item) => mypersonalid === item));
  }, [card, mypersonalid]);

  return (
    <div className="elements__mesto-like">
      {/* если isLike=true , то добавляем класс активности для лайка */}
      <button
        className={`elements__heart ${isLike ? "elements__heart_active" : ""} `}
        type="button"
        onClick={() => onCardLike(card)}
      ></button>
      <p className="elements__number-like">{card.likes.length}</p>
    </div>
  );
}