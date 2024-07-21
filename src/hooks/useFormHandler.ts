import { auctionApi } from '@api/auction';
import { Editor } from '@toast-ui/react-editor';
import { useCallback, useRef, useState } from 'react';

export interface formDataType {
  title: string;
  currentBidPrice: string | number;
  buyNowPrice: string | number;
  endDate: string;
  auctionType: boolean;
  category: string;
  auctionImages?: File[];
  description?: string;
  [key: string]: string | number | boolean | File[] | undefined;
}

export const useFormHandler = () => {
  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
    auctionImages: [],
    category: '',
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'auctionType') {
        setFormData(prevData => ({
          ...prevData,
          [name]: value === '1', // '1'은 true, '0'은 false로 변환
        }));
        return;
      }

      if (
        (name === 'currentBidPrice' || name === 'buyNowPrice') &&
        (isNaN(Number(value.replace(/,/g, ''))) ||
          Number(value.replace(/,/g, '')) < 0)
      ) {
        return;
      }

      setFormData(prevData => ({
        ...prevData,
        [name]: value.replace(/,/g, ''),
      }));
    },
    [],
  );

  const handleFilesChange = useCallback((files: File[]) => {
    setFormData(prevData => ({
      ...prevData,
      auctionImages: files,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const error =
        Number(formData.buyNowPrice) <= Number(formData.currentBidPrice);

      if (error) {
        alert('즉시 구매가는 경매 시작가보다 작거나 같을 수 없습니다.');
        return;
      }

      const editorInstance = editorRef.current?.getInstance();
      const description = editorInstance ? editorInstance.getHTML() : '';

      // JSON 데이터 생성
      const jsonPayload = {
        ...formData,
        description,
      };

      const data = {
        request: new Blob([JSON.stringify(jsonPayload)], {
          type: 'application/json',
        }),
        file: formData.auctionImages,
      };

      try {
        setButtonDisable(true);
        const response = await auctionApi.create(data);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setButtonDisable(false);
      }
    },
    [formData],
  );

  const numberFormat = new Intl.NumberFormat();
  const formattedFormData = {
    ...formData,
    currentBidPrice:
      formData.currentBidPrice === 0 || formData.currentBidPrice === ''
        ? ''
        : numberFormat.format(Number(formData.currentBidPrice)),
    buyNowPrice:
      formData.buyNowPrice === 0 || formData.buyNowPrice === ''
        ? ''
        : numberFormat.format(Number(formData.buyNowPrice)),
  };

  return {
    formData: formattedFormData,
    handleChange,
    handleFilesChange,
    handleSubmit,
    buttonDisable,
    editorRef,
  };
};
