import React from 'react';
import { message } from 'antd';
// eslint-disable-next-line
import ProForm, { DrawerForm } from '@ant-design/pro-form';
// import { PlusOutlined } from '@ant-design/icons';

// Components
import MachineList from '../../dashboard/gameMachine/MachineList';

// eslint-disable-next-line
const MemberCashInOutForm = ({ isShow, setShowForm, memberID }) => {
  const waitTime = (time = 100) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
  return (
    <DrawerForm
      visible={isShow}
      autoFocusFirstInput
      submitter={false}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          setShowForm({ isShow: false, type: '' });
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <MachineList memberID={memberID} />
    </DrawerForm>
  );
};

export default MemberCashInOutForm;
