import axios from 'axios';

export const getGoogleReviews = async (placeId: string) => {
  const reviews = await axios.get(
    `${process.env.GOOGLE_PLACE_URL}?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`,
  );
  return {
    rating: reviews.data.result.rating,
    reviews: reviews.data.result.reviews,
  };
};
