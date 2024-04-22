import React from 'react';
import { Modal } from 'antd';
const CustomModel = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModel;
