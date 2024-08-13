import { auctionApi } from '@api/auction';
import { Editor } from '@toast-ui/react-editor';
import { useCallback, useRef, useState } from 'react';
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

export const useModifyFormHandler = (auctionId: string | undefined) => {
  const [formData, setFormData] = useState<formDataType>({
    title: '',
    currentBidPrice: '',
    buyNowPrice: '',
    endDate: '',
    auctionType: false,
    auctionImage: [],
    category: '',
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const navigate = useNavigate();

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

  const handleFilesChange = useCallback((files: (string | File)[]) => {
    setFormData(prevData => ({
      ...prevData,
      auctionImage: files, // string과 File 모두 포함하여 상태에 저장
    }));
  }, []);
  console.log('Current formData:', formData);
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

      // FormData 객체 생성
      const formDataPayload = new FormData();
      formDataPayload.append(
        'request',
        new Blob(
          [
            JSON.stringify({
              ...formData,
              description,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      );

      formData.auctionImage?.forEach((image, index) => {
        if (typeof image === 'string') {
          // 기존 이미지(URL)는 그대로 전달
          formDataPayload.append(`auctionImageUrl[${index}]`, image);
        } else {
          // 새로 추가된 파일(이진 파일)은 파일로 전달
          formDataPayload.append('auctionImage', image);
        }
      });
      if (!auctionId) {
        console.error('auctionId가 정의되지 않았습니다.');
        return;
      }

      try {
        setButtonDisable(true);
        const response = (await auctionApi.modify(
          formDataPayload,
          auctionId,
        )) as any;
        console.log(response);
        alert(response.message);
        navigate(`/auction/${response.data.auctionId}`);
      } catch (error) {
        console.error(error);
      } finally {
        setButtonDisable(false);
      }
    },
    [formData, auctionId],
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
