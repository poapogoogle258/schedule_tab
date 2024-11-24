import React, { useEffect, useState } from "react";

import { EditOutlined, EllipsisOutlined, SettingOutlined, CalendarOutlined } from '@ant-design/icons';
import { Avatar, Card , Flex , Button} from 'antd';

import SchedulesApi from "../services/schedulesAPI"


const { Meta } = Card;


function getCard(info){
    return   <Card
        style={{ width: 400 }}
        cover={
        <img
            src={SchedulesApi.URLUploadFile + info.image}
        />
        }
        actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta
        title={info.name}
        description={info.description}
        />
  </Card>
}


function ScheduleManager(props){

    const [ schedules , setSchedules ] = useState([])

    useEffect(() => {
        async function loadSchedules(){
            const res = await SchedulesApi.getAllSchedules()
            setSchedules(res.data)
        }

        loadSchedules()

    }, [])

    return <>
        <Flex align="center" justify="space-between">
            <h1>การจัดเวร</h1>
            <Button 
              icon={<CalendarOutlined />}
            >
              <h3>เพื่มการจัดเวร</h3>
            </Button>
        </Flex>
        <Flex gap='middle'>
            {schedules.map((e) => getCard(e) )}
        </Flex>
    </>
    
}


export default ScheduleManager;