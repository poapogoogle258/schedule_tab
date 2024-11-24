import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input ,Upload, Flex, } from "antd";

import MemberApi from "../../services/memberAPI"

import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function EditMemberFormModal(props) {

    const { visible, setVisible , data} = props;
    const [form] = Form.useForm();
    const [ isSendingCreateMember , setSendingCreateMember ] = useState(false)

    const defaultFileList = [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        response : { filename : data.profile },
        url : MemberApi.getURLProfile(data.profile)
    }]
    const [fileList , setFileList ] = useState(defaultFileList)
    
    const onChange =  (values) => {
      if(values.file.status === 'done' && values.file.response.message === 'success'){
        values.file.url = MemberApi.getURLProfile(values.file.response.filename)
      }
      setFileList([values.file]);
    };

    const initialForm = {
      "name" : data?.name || "",
      "nickName" :  data?.nickName || "",
      "description" : data?.description || "",
      "tag": data?.tag.join(', ') || "",
      "phone": data.address?.phone || "",
      "line": data.address?.line || "",
      "email": data.address?.email || ""
    }

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    const onFinish = async(values) => {
      
      setSendingCreateMember(true)

      const body = {
        "name" : "name",
        "nickName" : values.nickName,
        "profile" : !!values.upload ?  values.upload[0].response?.filename : data.profile,
        "description" : values.description,
        "tag" : values.tag.split(','),
        "address" : {
            "phone" : values.phone,
            "line" : values.line,
            "email" : values.email
        }
      }

      const res = await MemberApi.updateMember(data['_id'], body)

      if(res.message === 'success'){
        setSendingCreateMember(false)
        setVisible(false);
  
        form.resetFields()
        setFileList(defaultFileList)
      }

    };

    const onCancel = () => {
      setSendingCreateMember(false)
      setVisible(false);

      form.resetFields()
      setFileList(defaultFileList)

    }

    return <Modal
        open={visible}
        title="แก้ไขข้อมูลสมาชิก"
        onCancel={onCancel}
        footer={() => <></> }
    > 

    <Form {...formItemLayout} form={form} destroyOnClose onFinish={onFinish} clearOnDestroy >
        <Form.Item required name="upload" label="รูปโปรไฟล์" getValueFromEvent={normFile}>
          <Upload 
            maxCount={1}
            action={MemberApi.URLUploadFile}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
          >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item required label="ชื่อ" name="name" initialValue={initialForm.name}>
          <Input />
        </Form.Item>
        <Form.Item required label="ชื่อเล่น" name="nickName" initialValue={initialForm.nickName}>
          <Input />
        </Form.Item>
        <Form.Item required label="หน้าที่" name="tag" initialValue={initialForm.tag}>
          <Input />
        </Form.Item>
        <Form.Item label="เบอร์โทร" name="phone" initialValue={initialForm.phone}>
          <Input />
        </Form.Item>
        <Form.Item label="อีเมลล์" name="email" initialValue={initialForm.email}>
          <Input />
        </Form.Item>
        <Form.Item label="ไลน์ไอดี" name="line" initialValue={initialForm.line}>
          <Input />
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description" initialValue={initialForm.description} >
          <TextArea rows={4} />
        </Form.Item>
        
        <Flex gap="middle" justify="center" align='center'>
          <Form.Item>
            <Button key="submit" type="primary" htmlType='submit' loading={isSendingCreateMember} >
              บันทึก
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={onCancel}>
                ยกเลิก
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
}

export default EditMemberFormModal;