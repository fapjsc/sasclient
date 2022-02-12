import React, { useRef, useState, useEffect } from 'react';

// Antd
import { StepsForm } from '@ant-design/pro-form';
import {
  Card, Space, Switch, Tag,
} from 'antd';

// Toast
import { toast } from 'react-toastify';

// Components
import AddMemberStep1 from './add-member-form/AddMemberStep1';
import AddMemberStep2 from './add-member-form/AddMemberStep2';
import AddMemberStep3 from './add-member-form/AddMemberStep3';
import AddMemberResult from './add-member-form/AddMemberResult';

// Hooks
import useHttp from '../../hooks/useHttp';

// Apis
import {
  getFormSelectOption,
  createMember,
  updateMemberPicture,
} from '../../lib/api-store';

const AddMemberForm = () => {
  // Ref
  const formRef = useRef();

  // Init State
  const [current, setCurrent] = useState(0);
  const [stepData, setStepData] = useState(null);
  const [hasCard, setHasCard] = useState(true);

  // Hooks
  const { sendRequest: getSelectOption, data: selectOption } =
    useHttp(getFormSelectOption);

  const {
    sendRequest: createMemberReq,
    data: memberData,
    error: memberDataError,
    status: memberStatus,
  } = useHttp(createMember);

  const {
    sendRequest: updatePictureReq,
    data: updatePictureData,
    error: updatePictureError,
    status: updatePictureStatus,
  } = useHttp(updateMemberPicture);

  useEffect(() => {
    getSelectOption();
  }, [getSelectOption]);

  useEffect(() => {
    if (memberDataError) {
      toast.error(memberDataError);
      return;
    }

    if (memberStatus === 'completed' && !memberDataError && memberData) {
      setCurrent(1);
    }
  }, [memberStatus, memberDataError, memberData]);

  useEffect(() => {
    if (updatePictureError) {
      toast.error('上傳照片失敗');
      return;
    }

    if (
      updatePictureStatus === 'completed'
      && !updatePictureError
      && updatePictureData
    ) {
      setCurrent(2);
    }
  }, [updatePictureData, updatePictureError, updatePictureStatus]);

  const onResetHandler = () => {
    console.log(updatePictureStatus);
    setCurrent(0);
    setStepData(null);
    setHasCard(true);
    formRef.current.forEach((item) => {
      item?.current?.resetFields();
    });
  };

  return (
    <Card bordered={false}>
      <StepsForm
        current={current}
        onCurrentChange={setCurrent}
        formMapRef={formRef}
        // onFinish={(values) => {
        //   console.log(values);
        //   return true;
        //   //   return Promise.resolve(true);
        // }}
        submitter={{
          render: (props, dom) => {
            const { step } = props || {};
            if (step === 1) {
              return dom[1];
            }
            if (!hasCard) {
              if (step === 2) {
                return null;
              }
            }

            if (hasCard) {
              if (step === 3) {
                return null;
              }
            }
            return dom;
          },
        }}
      >
        <StepsForm.StepForm
          name="step1"
          title="輸入會員資料"
          onFinish={async (values) => {
            setStepData({ ...values, hasCard });
            const formData = { ...values, hasCard };
            await createMemberReq(formData);
          }}
        >
          {current === 0 && (
            <Space
              direction="vertical"
              size="large"
              style={{ marginTop: '2rem' }}
            >
              <Space>
                <Tag color="orange">是否需要會員卡？</Tag>
                <Switch
                  onChange={(e) => setHasCard(e)}
                  checkedChildren="需要"
                  unCheckedChildren="不需要"
                  defaultChecked
                />
              </Space>
              <AddMemberStep1 data={selectOption} hasCard={hasCard} />
            </Space>
          )}
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="step2"
          title="會員拍照"
          onFinish={async () => {
            console.log(stepData);
            console.log(memberData);
            const { member_id: memberID } = memberData || {};
            const { picture } = stepData || {};

            if (!picture || !memberID) {
              toast.error('照片無效');
              return false;
            }

            await updatePictureReq({ member_id: memberID, picture });
          }}
        >
          {current === 1 && <AddMemberStep2 setStepData={setStepData} />}
        </StepsForm.StepForm>

        {hasCard && (
          <StepsForm.StepForm name="step3" title="製卡">
            {current === 2 && <AddMemberStep3 stepData={stepData} />}
          </StepsForm.StepForm>
        )}

        <StepsForm.StepForm title="完成">
          {((hasCard && current === 3) || (!hasCard && current === 2)) && (
            <AddMemberResult onResetHandler={onResetHandler} />
          )}
        </StepsForm.StepForm>
      </StepsForm>
    </Card>
  );
};
export default AddMemberForm;
