import { auctionApi } from '@api/auction';
import { auctionDetailsType } from '@mocks/db';

export const fetchAuctionDetails = async (
  auctionId: string,
  setAuctionDetails: (details: auctionDetailsType | null) => void,
  navigate: (path: string) => void,
) => {
  try {
    const response = await auctionApi.getDetails(auctionId);
    setAuctionDetails(response.data);
  } catch (error) {
    console.error('fetchAuctionDetails :' + error);
    navigate('/not-found');
  }
};
