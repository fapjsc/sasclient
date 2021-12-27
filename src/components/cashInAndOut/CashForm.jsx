import React, { useRef, useEffect } from 'react';

// Prop types
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Action

// Antd
import {
  Cascader,
  Card,
  // Result,
  Button,
  // Descriptions,
  Divider,
  Alert,
  // Statistic,
  // Collapse,
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

import { restEgmCashInOut } from '../../store/actions/egmActions';

// Style
import styles from './CashForm.module.scss';

// lib
import { getEgmList } from '../../lib/api';
import { _getUserToken } from '../../lib/helper';

// Hooks
import useHttp from '../../hooks/useHttp';

// const { Panel } = Collapse;

// const StepDescriptions = ({ bordered }) => {
//   const {
//     opName, action, amount, machineNumber,
//   } = useSelector((state) => state.egmCashInOutData);

//   return (
//     <Descriptions column={1} bordered={bordered}>
//       <Descriptions.Item label="操作人員">
//         {' '}
//         {opName}
//       </Descriptions.Item>
//       <Descriptions.Item label="操作項目">
//         {' '}
//         {action === 'cashIn' ? '開分' : '洗分'}
//       </Descriptions.Item>
//       <Descriptions.Item label="機器編號">
//         {' '}
//         {machineNumber}
//       </Descriptions.Item>
//       <Descriptions.Item label="操作金額">
//         <Statistic
//           value={amount}
//           suffix={(
//             <span
//               style={{
//                 fontSize: 14,
//               }}
//             >
//               元
//             </span>
//           )}
//           precision={0}
//         />
//       </Descriptions.Item>
//     </Descriptions>
//   );
// };

// StepDescriptions.propTypes = {
//   bordered: PropTypes.bool,
// };

// StepDescriptions.defaultProps = {
//   bordered: false,
// };

// const StepResult = ({ onFinish, requestErr, children }) => {
//   const { action } = useSelector((state) => state.egmCashInOutData);

//   const titleText = () => {
//     if (action === 'cashIn') return '開分';
//     if (action === 'cashOut') return '洗分';
//   };

//   const titleResultText = () => {
//     if (requestErr) return '失敗';
//     if (!requestErr) return '成功';
//   };

//   return (
//     <Result
//       status={requestErr ? 'error' : 'success'}
//       title={
//         titleText() + titleResultText()
//       }
//       subTitle=""
//       extra={(
//         <>
//           {/* <Button type="primary" onClick={againClickHandler}>
//             再來一次
//           </Button> */}
//           <Button type="primary" onClick={onFinish}>
//             關閉
//           </Button>
//         </>
//       )}
//       className={styles.result}
//     >
//       {children}
//     </Result>
//   );
// };

// StepResult.propTypes = {
//   onFinish: PropTypes.func.isRequired,
//   requestErr: PropTypes.func.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

//===============//

const CashForm = ({
  setVisible, setCurrent, current, step,
}) => {
  // Redux
  const dispatch = useDispatch();
  const { egmCashInOutData } = useSelector((state) => state);
  const {
    machineNumber, opName, action, amount,
  } = egmCashInOutData;
  const formRef = useRef();

  // Http hook
  const {
    status: getEgmListStatus,
    error: getEgmListError,
    sendRequest: getEgmListReq,
  } = useHttp(getEgmList);

  //==== Reset Form ====//
  const resetForm = () => {
    formRef.current?.resetFields();
  };

  //** Http狀態監聽 */
  useEffect(() => {
    // if (getEgmListError) alert('error');
    if (getEgmListStatus === 'completed' && !getEgmListError) {
      setCurrent(2);
    }
  }, [getEgmListStatus, getEgmListError, setCurrent]);

  //** Rest Form Listen */
  useEffect(() => {
    if (!machineNumber && !opName && !action && !amount) {
      resetForm();
    }
  }, [machineNumber, opName, action, amount]);

  //==== 發送請求 ====//
  const sendReqHandler = () => {
    const token = _getUserToken('token');
    getEgmListReq(token && token);
  };

  const options = [
    {
      value: 'cashIn',
      label: '開分',
      children: [
        {
          value: '1000',
          label: '開1000分',
          children: [
            {
              value: 'mike',
              label: 'Mike',
            },
          ],
        },
      ],
    },
    {
      value: 'cashOut',
      label: '洗分',
      children: [
        {
          value: 'nanjing',
          label: '洗到百分位',
          children: [
            {
              value: 'mike',
              label: 'Mike',
            },
          ],
        },
      ],
    },
  ];

  //=================//

  const cascaderOnChange = (value) => {};

  return (
    <>
      <Divider orientation="left" plain>
        常用開 / 洗分
      </Divider>
      <PageContainer
        content={(
          <Cascader
            options={options}
            onChange={cascaderOnChange}
            placeholder="Please select"
          />
        )}
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
            submitter={{
              render: (props, dom) => {
                //** Step-2 Button */
                if (step === 1) {
                  let preBtn;
                  // dom.forEach((el) => (el.key === 'pre'
                  // ? (preBtn = { ...el, key: el.key }) : null));

                  return [
                    preBtn,
                    <Button
                      key="submit"
                      loading={getEgmListStatus === 'pending'}
                      onClick={sendReqHandler}
                      type="primary"
                    >
                      確定
                      {action === 'cashIn' ? '開分' : '洗分'}
                    </Button>,
                  ];
                }

                //** Step-3 Button */
                if (step === 2) {
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
              // onValuesChange={(e) => {
              //   console.log(e);
              //   // for (const key in e) {
              //   //   dispatch(setEgmCashInOut({ [key]: e[key] }));
              //   // }
              // }}
              // eslint-disable-next-line
              onFinish={(values) => {
                // console.log(values, 'values');
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
                      initialValue={action}
                      rules={[
                        {
                          required: true,
                          message: '請選擇操作項目',
                        },
                      ]}
                      options={[
                        {
                          label: '開分',
                          value: 'cashIn',
                        },
                        {
                          label: '洗分',
                          value: 'cashOut',
                        },
                      ]}
                    />

                    <ProFormDigit
                      decimalSeparator="0"
                      label="操作金額"
                      name="amount"
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
                      value={opName}
                      placeholder=""
                      rules={[
                        {
                          required: true,
                          message: '操作人員不得為空',
                        },
                      ]}
                    />

                    <ProFormText
                      label="機器編號"
                      disabled
                      width="md"
                      name="machineNumber"
                      value={machineNumber}
                      placeholder=""
                    />
                  </ProForm.Group>
                </>
              )}
            </StepsForm.StepForm>

            {/* =======  Step-2  ======== */}
            <StepsForm.StepForm title="確認">
              {current === 1 && (
                <div className={styles.result}>
                  <Alert
                    // closable
                    showIcon
                    message="請確認操作項目以及金額是否正確。"
                    style={{
                      marginBottom: 24,
                    }}
                  />
                  <StepDescriptions bordered />
                  <Divider
                    style={{
                      margin: '24px 0',
                    }}
                  />
                </div>
              )}
            </StepsForm.StepForm>

            {/* =======  Step-3  ======== */}
            <StepsForm.StepForm title="完成">
              {current === 2 && (
                <StepResult
                  setCurrent={setCurrent}
                  requestErr={getEgmListError}
                  onFinish={() => {
                    setCurrent(0);
                    resetForm();
                    dispatch(restEgmCashInOut());
                    setVisible(false);
                  }}
                >
                  <StepDescriptions />
                </StepResult>
              )}
            </StepsForm.StepForm>
          </StepsForm>
          <Divider
            style={{
              margin: '40px 0 24px',
            }}
          />
          <div className={styles.desc}>
            <h3>说明</h3>
            <h4>如果需要,這裡可以放一些說明。</h4>
          </div>
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
