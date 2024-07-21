import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useStarRender } from "@hooks/useStarRender";
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
export default function SellerRating({ rating }: SellerRatingProps) {
  const { filledStars, halfStar } = useStarRender(rating);

  return (
    <RatingWrapper>
      <Label>판매자 평점:</Label>
      {filledStars.map((_, i) => (
        <Star key={`filled-${i}`}>
          <StarIconSolid />
        </Star>
      ))}
      {halfStar && (
        <Star key="half">
          <StarIconOutline />
        </Star>
      )}
    </RatingWrapper>
  );
};