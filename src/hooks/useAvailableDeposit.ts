import { historyApi } from '@api/history';
import { useEffect, useState } from 'react';

export function useAvailableDeposit() {
  const [availableDeposit, setAvailableDeposit] = useState(0);
  const [totalBidPrice, setTotalBidPrice] = useState(0);

  const getAvailableDeposit = async () => {
    try {
      const response = await historyApi.availableDeposit();
      setAvailableDeposit(response.data.canUseBalance);
      setTotalBidPrice(response.data.totalBidPrice);
    } catch (error) {
      console.error('Error fetching deposit data:', error);
    }
  };

  useEffect(() => {
    getAvailableDeposit();
  }, []);

  return { availableDeposit, totalBidPrice };
}
