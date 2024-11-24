import React, { useEffect, useState } from 'react';
import { Button, Table , Flex, Avatar } from 'antd';

import { UserAddOutlined , EditOutlined, DeleteOutlined , ExceptionOutlined } from '@ant-design/icons'

import CreateMemberFormModal from '../Components/members/createMemberFormModal'

import OperatorMemberTable from '../Components/members/OperatorMemberTable'

import MembersApi from "../services/memberAPI"


const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [ isModalCreateMemberOpen , setModalCreateMemberOpen ] = useState(false) 


  useEffect(() => {

    async function getMembers(){
      const members = await MembersApi.getAllUsers()
      setDataSource(members.data)
    }


    getMembers()
  },[])


  const defaultColumns = [
    {
      title: 'รูปภาพ',
      dataIndex: 'image',
      width: '10%',
      align : 'center',
      render : ( _ , record ) => dataSource.length >= 1 ? <>
        <img 
          src={MembersApi.getURLProfile(record.profile)} 
          alt={record.name} 
          style={{
            "margin" : "auto",
            "verticalAlign": "middle",
            "width": "144px",
            "height": "144px",
            "borderRadius": "10%",
          }}
        />
      </> : null
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      width: '40%',
      render : ( _ , record ) => dataSource.length >= 1 ? <>
        <Flex vertical gap='small'>
          <Flex><h3>{record.name}</h3>&nbsp;&nbsp;<h4>({record.nickName})</h4></Flex>
          <h5 style={{opacity : '0.5'}}>{record.description}</h5>
        </Flex>
      </> : null
    },
    {
      title: 'หน้าที่',
      dataIndex: 'tag',
      width: '10%',
      render : ( _ , record ) => <>
        {record.tag.map((t, i) => <p>{t} {i + 1 !== record.tag.length ? ',' : ''}</p>)}
      </>
    },
    {
      title: '',
      dataIndex: 'operator',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? <>
          <OperatorMemberTable record={record} />
        </> 
         : null,
    }
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Flex vertical gap='large' >
        <Flex align="center" justify="space-between">
            <h1> สมาชิกทั้งหมด {dataSource.length} คน </h1>
            <Button 
              icon={<UserAddOutlined />}
              onClick={() => {setModalCreateMemberOpen(true)}}
            >
              <h3>เพื่มสมาชิก</h3>
            </Button>
            <CreateMemberFormModal visible={isModalCreateMemberOpen} setVisible={setModalCreateMemberOpen} />
        </Flex>
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </Flex>

    </div>

  );
};
export default App;