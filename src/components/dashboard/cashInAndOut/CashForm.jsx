import React, { useRef, useEffect, useState } from 'react';

// Toast
import { toast } from 'react-toastify';

// Prop types
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import {
  Cascader, Card, Button, Divider, message,
} from 'antd';

// Antd Pro Layout
import { PageContainer } from '@ant-design/pro-layout';

// Antd Pro Form
import ProForm, {
  ProFormDigit,
  ProFormText,
  StepsForm,
  ProFormRadio,
} from '@ant-design/pro-form';

// Components
import StepDescriptions from './StepDescription';
import StepResult from './StepResult';

// Actions
import {
  setEgmCashInOut,
  restEgmCashInOut,
} from '../../../store/actions/egmActions';

// Apis
import { egmCashInOut } from '../../../lib/api-store';

// Helpers
import { _getUserName } from '../../../lib/helper';

// Hooks
import useHttp from '../../../hooks/useHttp';

// import classes from './CashForm.module.scss';

const CashForm = ({ setVisible, setCurrent, current }) => {
  // const [cardID, setCardID] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const { egmCashInOutData } = useSelector((state) => state);

  const {
    ip, opName, amount, action,
  } = egmCashInOutData;

  const { currentCard: cardID } = useSelector((state) => state.member);
  // const { cards,  } = memberData || {};

  // const { card_id: cardID } = cards?.length ? cards[0] : {};
  //
  // Ref
  const formRef = useRef();
  const cascaderRef = useRef();

  // Init State
  const [showPageContainer, setShowPageContainer] = useState(true);
  const [cascaderValue] = useState([]);

  // Http hook
  const {
    status: cashInOutStatus,
    error: cashInOutError,
    sendRequest: cashInOutReq,
    data: cashInOutData,
  } = useHttp(egmCashInOut);

  //==== Reset Form ====//
  const resetForm = () => {
    setCurrent(0);
    dispatch(restEgmCashInOut());
    setVisible(false);
    formRef.current?.resetFields();
  };

  useEffect(() => {
    if (!opName && !action && !ip && !amount) {
      resetForm();
    }
    // eslint-disable-next-line
  }, [opName, action, ip, amount]);

  //** Http???????????? */
  useEffect(() => {
    if (cashInOutError) {
      toast.error(cashInOutError);
      return;
    }

    if (
      cashInOutStatus === 'completed'
      && !cashInOutError
      && cashInOutData?.status === 200
    ) {
      if (!cashInOutData?.quick) {
        setCurrent(2);
        return;
      }

      if (cashInOutData.result === 'atfIn success') {
        message.success('????????????');
      }
      if (cashInOutData.result === 'promoIn success') {
        message.success('????????????');
      }

      if (
        cashInOutData.result === 'aftOut success'
        || cashInOutData.result === 'aftOutDigit success'
      ) {
        message.success('????????????');
      }
    }
  }, [
    cashInOutStatus,
    cashInOutError,
    cashInOutReq,
    setCurrent,
    cashInOutData,
  ]);

  // ????????????
  const sendReqHandler = () => {
    let formData = egmCashInOutData;
    if (cardID) {
      formData = { ...formData, cardID };
    }

    cashInOutReq(formData);
  };

  // ????????????
  const cascaderOnChange = (value) => {
    // console.log(currentCard);
    if (!value) return;
    if (cardID) {
      value = [...value, cardID];
    }
    cashInOutReq(value);
  };

  const options = [
    {
      name: 'promoIn',
      value: 'promoIn',
      label: '?????????',
      children: [
        {
          value: 1000,
          label: '???1000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '???3000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '???5000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
      ],
    },
    {
      name: 'atfIn',
      value: 'atfIn',
      label: '??????',
      children: [
        {
          value: 1000,
          label: '???1000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '???3000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '???5000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
      ],
    },
    {
      name: 'aftOut',
      value: 'aftOut',
      label: '??????',
      children: [
        {
          value: 1000,
          label: '???1000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '???3000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '???5000???',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 'percentile',
          label: '???????????????',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 'thousands',
          label: '???????????????',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 99999999,
          label: '??????',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {showPageContainer && (
        <Divider orientation="left" plain>
          ????????? / ??????
        </Divider>
      )}

      <PageContainer
        content={
          showPageContainer && (
            <Cascader
              ref={cascaderRef}
              options={options}
              onChange={cascaderOnChange}
              placeholder="Please select"
              value={cascaderValue}
            />
          )
        }
      >
        <br />

        <Divider orientation="left" plain>
          ????????? / ??????
        </Divider>

        <Card
          bordered={false}
          style={{
            backgroundColor: '#141414',
            color: 'rgba(0,0,0,.85)',
          }}
        >
          <StepsForm
            current={current}
            onCurrentChange={setCurrent}
            debounceTime={100000}
            submitter={{
              render: (props, dom) => {
                if (props.step === 0) {
                  setShowPageContainer(true);
                }

                //** Step-2 Button */
                if (props.step === 1) {
                  setShowPageContainer(false);
                  const preBtn = dom.filter((el) => el.key === 'pre');
                  return [
                    preBtn,
                    <Button
                      key="submit"
                      loading={cashInOutStatus === 'pending'}
                      onClick={sendReqHandler}
                      type="primary"
                    >
                      ??????
                    </Button>,
                  ];
                }

                //** Step-3 Button */
                if (props.step === 2) {
                  return null;
                }
                return dom;
              },
            }}
          >
            {/* =======  Step-1  ======== */}
            <StepsForm.StepForm
              style={{
                marginTop: '1.5rem',
              }}
              formRef={formRef}
              title="??????"
              onFinish={(values) => {
                dispatch(setEgmCashInOut(values));
                return true;
              }}
            >
              {current === 0 && (
                <>
                  <ProForm.Group
                    style={{
                      marginTop: '2rem',
                    }}
                  >
                    <ProFormRadio.Group
                      name="action"
                      label="????????????"
                      width="md"
                      rules={[
                        {
                          required: true,
                          message: '?????????????????????',
                        },
                      ]}
                      options={[
                        {
                          label: '??????',
                          value: 'atfIn',
                        },
                        {
                          label: '??????',
                          value: 'aftOut',
                        },
                        {
                          label: '?????????',
                          value: 'promoIn',
                        },
                      ]}
                    />

                    <ProFormDigit
                      decimalSeparator="0"
                      label="????????????"
                      name="cashAmount"
                      width="100%"
                      fieldProps={{
                        formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      }}
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^[1-9]\d*$/),
                          message: '??????????????????',
                        },
                      ]}
                      placeholder=""
                    />
                  </ProForm.Group>

                  <ProForm.Group
                    style={{
                      margin: '1.2rem 0px',
                    }}
                  >
                    <ProFormText
                      label="????????????"
                      width="md"
                      name="opName"
                      value={_getUserName()}
                      disabled
                    />

                    <ProFormText
                      label="EGM IP"
                      disabled
                      width="md"
                      name="ip"
                      value={ip}
                      placeholder=""
                    />
                  </ProForm.Group>
                </>
              )}
            </StepsForm.StepForm>

            {/* =======  Step-2  ======== */}
            <StepsForm.StepForm title="??????">
              {current === 1 && (
                <div>
                  <StepDescriptions bordered />
                  <br />
                </div>
              )}
            </StepsForm.StepForm>

            {/* =======  Step-3  ======== */}
            <StepsForm.StepForm title="??????">
              {current === 2 && (
                <StepResult
                  setCurrent={setCurrent}
                  requestErr={cashInOutError}
                  onFinish={resetForm}
                >
                  <StepDescriptions />
                </StepResult>
              )}
            </StepsForm.StepForm>
          </StepsForm>
        </Card>
      </PageContainer>
    </>
  );
};

CashForm.propTypes = {
  setVisible: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  step: PropTypes.number,
};

CashForm.defaultProps = {
  step: 0,
};

export default CashForm;
