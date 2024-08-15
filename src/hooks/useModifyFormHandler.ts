import { auctionApi } from '@api/auction';
import { Editor } from '@toast-ui/react-editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface formDataType {
  title: string;
  currentBidPrice: string | number;
  buyNowPrice: string | number;
  endDate: string;
  auctionType: boolean;
  category: string;
  auctionImage?: (string | File)[];
  description?: string;
  [key: string]: string | number | boolean | (string | File)[] | undefined;
}

export const useModifyFormHandler = (
  auctionId: string | undefined,
  initialImages: (string | File)[],
) => {
  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
    auctionImage: initialImages, // 초기 이미지로 설정
    category: '',
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const navigate = useNavigate();

  // 만약 초기 이미지가 변경되면 다시 설정합니다.
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      auctionImage: initialImages,
    }));
  }, [initialImages]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'auctionType') {
        setFormData(prevData => ({
          ...prevData,
          [name]: value === '1',
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

  const handleFilesChange = useCallback((files: (string | File)[]) => {
    setFormData(prevData => ({
      ...prevData,
      auctionImage: files, // string과 File 모두 포함하여 상태에 저장
    }));
  }, []);

  const handleSubmitModifiedData = useCallback(
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

      const jsonPayload = {
        ...formData,
        description,
      };

      const data = {
        request: new Blob([JSON.stringify(jsonPayload)], {
          type: 'application/json',
        }),
        auctionImage: formData.auctionImage?.length
          ? formData.auctionImage
          : initialImages, // auctionImage가 없으면 초기 이미지로 설정
      };

      if (!auctionId) {
        console.error('auctionId가 정의되지 않았습니다.');
        return;
      }

      try {
        setButtonDisable(true);
        const response = (await auctionApi.modify(data, auctionId)) as any;
        console.log(response);
        alert(response.message);
        navigate(`/auction/${response.data.auctionId}`);
      } catch (error) {
        console.error(error);
      } finally {
        setButtonDisable(false);
      }
    },
    [formData, auctionId, initialImages],
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
    setFormData,
    handleChange,
    handleFilesChange,
    handleSubmitModifiedData,
    buttonDisable,
    editorRef,
  };
};
