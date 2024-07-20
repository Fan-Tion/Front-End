import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import styled from "styled-components";

const RatingWrapper = styled.div`
  display: flex;
  align-items: center; 
`;

const Star = styled.div`
  width: 24px;
  height: 24px;
  color: #ffd700;
`;

const Label = styled.label`
  margin-right: 8px;
  font-weight: bold;
`;

interface SellerRatingProps {
  rating: number; // 0 to 10
}
export default function SellerRating() {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  const [rating, setRating] = useState<number>(0);

  const testHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRating(newValue)
  }
  // let rating = 10;
  useEffect(() => {
    const filledStars = (Math.trunc(rating) / 2);
    const halfStar = Math.trunc(rating) % 2
    const starElements = [];

    for (let i = 0; i < filledStars; i++) {
      starElements.push(
        <Star key={`filled-${i}`}>
          <StarIconSolid />
        </Star>
      );
    }

    if (halfStar === 1) {
      starElements.push(
        <Star key="empty">
          <StarIconOutline />
        </Star>
      );
    }

    setStars(starElements);
  }, [rating]);

  return (
    <>
      <RatingWrapper>
        <Label>판매자 평점:</Label>
        {stars}
      </RatingWrapper>
      <div>
        테스트용 rating : <input type="number" value={rating} onChange={testHandler} />
      </div>
    </>
  );
};


