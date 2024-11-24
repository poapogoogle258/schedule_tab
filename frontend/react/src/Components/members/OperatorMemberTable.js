import React , { useState } from "react"

import { Button , Flex } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import EditMemberFormModal from './EditMemberFormModal'
import DeleteMemberModal from './DeleteMemberModal'

function OperatorMemberTable({record}){

    const [ isModalEditMemberOpen , setModalEditMemberOpen ] = useState(false)
    const [ isModalDeleteMemberOpen , setModalDeleteMemberOpen ] = useState(false)

    return  <Flex justify='space-evenly' align='center'>
        <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => setModalEditMemberOpen(true)}
        >
        </Button>
        <EditMemberFormModal visible={isModalEditMemberOpen} setVisible={setModalEditMemberOpen} data={record}/>
        <Button
            type='text'
            icon={<DeleteOutlined />}
            danger
            onClick={() => setModalDeleteMemberOpen(true)}
        >
        </Button>
        <DeleteMemberModal visible={isModalDeleteMemberOpen} setVisible={setModalDeleteMemberOpen} data={record}/>
  </Flex>
}

export default OperatorMemberTable;