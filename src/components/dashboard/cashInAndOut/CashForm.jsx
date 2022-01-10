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
  // Redux
  const dispatch = useDispatch();
  const { egmCashInOutData } = useSelector((state) => state);

  const {
    ip, opName, amount, action,
  } = egmCashInOutData;

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

  //** Http狀態監聽 */
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

      if (cashInOutData.result === 'atfIn success') message.success('開分成功');
      if (cashInOutData.result === 'promoIn success') { message.success('招分成功'); }

      if (
        cashInOutData.result === 'aftOut success'
        || cashInOutData.result === 'aftOutDigit success'
      ) { message.success('洗分成功'); }
    }
  }, [
    cashInOutStatus,
    cashInOutError,
    cashInOutReq,
    setCurrent,
    cashInOutData,
  ]);

  //==== 發送請求 ====//
  const sendReqHandler = () => {
    const formData = egmCashInOutData;
    cashInOutReq(formData);
  };

  const options = [
    {
      name: 'promoIn',
      value: 'promoIn',
      label: '招待分',
      children: [
        {
          value: 1000,
          label: '招1000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '招3000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '招5000分',
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
      label: '開分',
      children: [
        {
          value: 1000,
          label: '開1000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '開3000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '開5000分',
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
      label: '洗分',
      children: [
        {
          value: 1000,
          label: '洗1000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 3000,
          label: '洗3000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 5000,
          label: '洗5000分',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 'percentile',
          label: '洗到百分位',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 'thousands',
          label: '洗到千分位',
          children: [
            {
              value: ip,
              label: ip,
            },
          ],
        },
        {
          value: 99999999,
          label: '全洗',
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

  const cascaderOnChange = (value) => {
    if (!value) return;
    cashInOutReq(value);
  };

  return (
    <>
      {showPageContainer && (
        <Divider orientation="left" plain>
          常用開 / 洗分
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
          手動開 / 洗分
        </Divider>

        <Card
          bordered={false}
          style={{ backgroundColor: '#141414', color: 'rgba(0,0,0,.85)' }}
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
                      確定
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
              style={{ marginTop: '1.5rem' }}
              formRef={formRef}
              title="設定"
              onFinish={(values) => {
                dispatch(setEgmCashInOut(values));
                return true;
              }}
            >
              {current === 0 && (
                <>
                  <ProForm.Group style={{ marginTop: '2rem' }}>
                    <ProFormRadio.Group
                      name="action"
                      label="操作項目"
                      width="md"
                      rules={[
                        {
                          required: true,
                          message: '請選擇操作項目',
                        },
                      ]}
                      options={[
                        {
                          label: '開分',
                          value: 'atfIn',
                        },
                        {
                          label: '洗分',
                          value: 'aftOut',
                        },
                        {
                          label: '招待分',
                          value: 'promoIn',
                        },
                      ]}
                    />

                    <ProFormDigit
                      decimalSeparator="0"
                      label="操作金額"
                      name="cashAmount"
                      width="100%"
                      rules={[
                        {
                          required: true,
                          message: '金額不可以為空',
                        },
                        {
                          pattern: /^(\d+)((?:\.\d+)?)$/,
                          message: '請輸入有效的金額',
                        },
                      ]}
                      placeholder=""
                      fieldProps={{
                        prefix: '＄',
                      }}
                    />
                  </ProForm.Group>

                  <ProForm.Group style={{ margin: '1.2rem 0px' }}>
                    <ProFormText
                      label="操作人員"
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
            <StepsForm.StepForm title="確認">
              {current === 1 && (
                <div>
                  <StepDescriptions bordered />
                  <br />
                </div>
              )}
            </StepsForm.StepForm>

            {/* =======  Step-3  ======== */}
            <StepsForm.StepForm title="完成">
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
  step: PropTypes.number.isRequired,
};

export default CashForm;
