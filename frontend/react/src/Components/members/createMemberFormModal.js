import React, { useState } from "react";
import { Button, Modal, Form, Input ,Upload, Flex, } from "antd";

import MemberApi from "../../services/memberAPI"

import { PlusOutlined } from '@ant-design/icons';

function CreateMemberFormModal(props) {

    const { visible, setVisible } = props;
    const [ isSendingCreateMember , setSendingCreateMember ] = useState(false)
    const [form] = Form.useForm();

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const { TextArea } = Input;
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    const onFinish = async(values) => {
      
      setSendingCreateMember(true)

      const body = {
        "name" : values.name,
        "nickName" : values.nickName,
        "profile" : values?.upload[0].response.filename ?? null,
        "description" : values.description,
        "tag" : values.tag.split(','),
        "address" : {
            "phone" : values.phone,
            "line" : values.line,
            "email" : values.email
        }
      }

      const res = await MemberApi.createNewMember(body)

      if(res.message === 'success'){
        setSendingCreateMember(false)
        form.resetFields()
        setVisible(false)
      }

    };

    const onCancel = () => {
      setSendingCreateMember(false)
      form.resetFields()
      setVisible(false);
    }

    return <Modal
        open={visible}
        title="เพื่มข้อมูลสมาชิกใหม่"
        onCancel={onCancel}
        footer={() => {
          <></>
        }}
    >  

    <Form {...formItemLayout} form={form} onFinish={onFinish} clearOnDestroy>
        <Form.Item required name="upload" label="รูปโปรไฟล์" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload 
            maxCount={1}
            action={MemberApi.URLUploadFile}
            listType="picture-card"
            onPreview={async (file)=> {
              console.log(MemberApi.getURLProfile(file.response.filename))
              return  MemberApi.getURLProfile(file.response.filename)
            }}
            
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
        <Form.Item required label="ชื่อ" name="name" >
          <Input />
        </Form.Item>
        <Form.Item required label="ชื่อเล่น" name="nickName" >
          <Input />
        </Form.Item>
        <Form.Item required label="หน้าที่" name="tag" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="เบอร์โทร" name="phone" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="อีเมลล์" name="email" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="ไลน์ไอดี" name="line" initialValue="">
          <Input />
        </Form.Item>
        <Form.Item label="รายละเอียดเพื่มเติ่ม" name="description" initialValue="">
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

export default CreateMemberFormModal;