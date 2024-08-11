import { auctionApi } from '@api/auction';
import { categoryKrMap } from '@constants/category';
import useDateRange from '@hooks/useDateRange';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalInput } from '../../styled-components/Globalstyle';

const Row = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 10px;
`;

const Label = styled.label`
  margin-top: 30px;
  width: 60px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled(GlobalInput)`
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
  border: 2px solid #e8e9ec;
  &:hover {
    border: 2px solid #4fd66e;
  }
  &:focus {
    outline: none;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const SmallInputWrapper = styled.div`
  width: 49%;
  position: relative;
`;

const SmallInput = styled(GlobalInput)`
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
  border: 2px solid #e8e9ec;
  &:hover {
    border: 2px solid #4fd66e;
  }
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span`
  position: absolute;
  right: 10px;
  top: 65%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #222;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 40%;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid #e8e9ec;
  padding: 10px;
  box-sizing: border-box;
  appearance: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    border: 2px solid #4fd66e;
  }
  &:focus {
    outline: none;
  }
`;

const CustomArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 6px solid black;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
  }
`;

interface InputAreaProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  formData: {
    title: string;
    currentBidPrice: string | number;
    buyNowPrice: string | number;
    endDate: string;
    auctionType: boolean;
    category: string;
  };
}

interface categoryType {
  title: string;
}

export default function InputArea({ onChange, formData }: InputAreaProps) {
  const [category, setCategory] = useState<categoryType[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await auctionApi.getCategory();
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const { minDate, maxDate } = useDateRange();
  return (
    <>
      <Row>
        <SelectWrapper>
          <Select
            id="bid-category"
            name="category"
            value={formData.category}
            onChange={onChange}
          >
            {/* 카테고리 목록을 api로 받아오도록 설정*/}
            <option value="" disabled>
              카테고리 선택
            </option>
            {category
              ? category.map(category => {
                  return (
                    <option value={category.title} key={category.title}>
                      {categoryKrMap[category.title]}
                    </option>
                  );
                })
              : null}
          </Select>
          <CustomArrow />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            id="bid-type"
            name="auctionType"
            value={formData.auctionType ? '1' : '0'}
            onChange={onChange}
          >
            <option value={1}>비공개 입찰</option>
            <option value={0}>공개 입찰</option>
          </Select>
          <CustomArrow />
        </SelectWrapper>
      </Row>
      <InputWrapper>
        <Input
          id="bid-title"
          name="title"
          type="text"
          placeholder="경매 제목 입력"
          value={formData.title}
          onChange={onChange}
          required
        />
        <Price>
          <SmallInputWrapper>
            <SmallInput
              id="bid-start-price"
              name="currentBidPrice"
              type="text"
              placeholder="경매 시작가"
              value={formData.currentBidPrice}
              onChange={onChange}
              required
            />
            {formData.currentBidPrice && <Unit>원</Unit>}
          </SmallInputWrapper>
          <SmallInputWrapper>
            <SmallInput
              id="bid-buy-now"
              name="buyNowPrice"
              type="text"
              placeholder="즉시 구매가"
              value={formData.buyNowPrice}
              onChange={onChange}
              required
            />
            {formData.buyNowPrice && <Unit>원</Unit>}
          </SmallInputWrapper>
        </Price>
        <Price>
          <Label htmlFor="bid-end-date">마감일: </Label>
          <Input
            id="bid-end-date"
            name="endDate"
            type="date"
            placeholder="경매 종료시간"
            value={formData.endDate}
            onChange={onChange}
            min={minDate}
            max={maxDate}
            required
          />
        </Price>
      </InputWrapper>
    </>
  );
}
