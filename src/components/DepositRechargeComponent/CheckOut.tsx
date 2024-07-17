import { useEffect, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import './toss.css';
import axios from 'axios';

interface CheckoutPageProps {
  inputValue: number;
}

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ inputValue }) => {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<any>(null);
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: inputValue,
  });

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      await widgets.setAmount(amount);

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });

      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, amount]);

  useEffect(() => {
    setAmount({
      currency: 'KRW',
      value: inputValue,
    });
  }, [inputValue]);

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                /**
                 * 결제 요청
                 * 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                 * 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                 * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrequestpayment
                 * await axios.post('/api/orders', {
                  amount: amount.value,
                  paymentType: '카드', // 임시
                  orderName: '예치금 충전',
                });
                 */
                await widgets?.requestPayment({
                  orderId: generateRandomString(),
                  orderName: '토스 티셔츠 외 2건',
                  customerName: '김토스',
                  customerEmail: 'customer123@gmail.com',
                  successUrl:
                    window.location.origin +
                    '/sandbox/success' +
                    window.location.search,
                  failUrl:
                    window.location.origin +
                    '/sandbox/fail' +
                    window.location.search,
                });
              } catch (error) {
                // TODO: 에러 처리
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
