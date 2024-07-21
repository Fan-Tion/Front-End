import { auctionApi } from '@api/auction';
import { auctionDetailsType } from '@mocks/db';

export const fetchAuctionDetails = async (
  auctionId: string,
  setAuctionDetails: (details: auctionDetailsType | null) => void,
  setLoading: (loading: boolean) => void,
  navigate: (path: string) => void,
) => {
  try {
    const response = await auctionApi.getDetails(auctionId);
    setAuctionDetails(response);
  } catch (error) {
    console.log(error);
    navigate('/not-found');
  } finally {
    setLoading(false);
  }
};
