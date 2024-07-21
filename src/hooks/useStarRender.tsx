interface StarRenderResult {
  filledStars: boolean[];
  halfStar: boolean;
}

export const useStarRender = (rating: number): StarRenderResult => {
  const filledStarsCount = Math.trunc(rating / 2);
  const halfStar = Math.trunc(rating) % 2 === 1;

  return {
    filledStars: new Array(filledStarsCount).fill(true),
    halfStar
  };
}