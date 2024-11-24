import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

import memberAPI from '../../services/memberAPI';


function DeleteMemberModal(props){

  const { visible, setVisible , data} = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteMemberTimeoutId , setDeleteMemberTimeoutId ] = useState(null)

  const handleOk = () => {
    setConfirmLoading(true);

    setDeleteMemberTimeoutId(setTimeout(async() => {
      const res = await memberAPI.deleteMember(data['_id'])
      if(res.message == 'success'){
        setVisible(false);
        setConfirmLoading(false);
      }
    } , 3000 ));
  };

  const handleCancel = () => {
    setVisible(false);
    setConfirmLoading(false)
    clearTimeout(deleteMemberTimeoutId)
    
  };

  return <Modal
        title="ลบข้อข้อมูล"
        open={visible}
        onOk={handleOk}
        okText="ลบข้อมูล"
        cancelText="ยกเลิก"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onClose={handleCancel}
        okButtonProps={{danger : true}}
      >
        <p>ต้องการลบข้อมูลของ {data.name} ({data.nickName}) หรือไม่</p>
  </Modal>;
  
};
export default DeleteMemberModal;