import { auctionApi } from '@api/auction';

interface FetchProductsParams {
  page: number;
  categoryOption?: string;
  keyword?: string;
}

export const fetchProducts = async ({
  page,
  categoryOption = 'ALL',
  keyword = '',
}: FetchProductsParams) => {
  try {
    const response = await auctionApi.search({
      page,
      categoryOption,
      keyword,
    });
    const { content, totalPages } = response.data;

    return {
      products: Array.isArray(content) ? content : [],
      hasMore: page < totalPages,
    };
  } catch (error) {
    console.error(error);
    throw new Error('데이터를 가져오지 못했습니다.');
  }
};
