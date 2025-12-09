import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingStarsProps {
  rating: number; // TMDB gives 0–10
  max?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  className = "",
}) => {
  const stars = [];

  // Convert 0-10 TMDB score to 0-5 star rating
  const value = rating / 2;

  for (let i = 1; i <= max; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-500" />);
    }
  }

  return <div className={`flex gap-1 text-xl ${className}`} dir="ltr">{stars}</div>;
};
