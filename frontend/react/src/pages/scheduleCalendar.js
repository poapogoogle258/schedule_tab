import React, { useEffect, useState } from "react";
import { Col, Row , Badge, Tag , Flex} from "antd";

import Calendar from '../Components/calendar/Calendar'
import DescriptSchudule from "../Components/calendar/listScheduleDescription"

import EventApi from "../services/eventsAPI"

function getDateFormatYYYYMMDD(day){
    return day.toISOString().split('T')[0]
}

function transformEvents(events){
    const result = {}
    for(let i = 0 ; i < events.length ; i++){
        const key = getDateFormatYYYYMMDD(new Date(events[i].start))
        result[key] = events[i]
    }

    return result
}

function DashBoard(props){

    const [ events , setEvents ] = useState([])

    useEffect(() => {
        async function loadEvent(){
            const res = await EventApi.getAllEvents()
            setEvents(transformEvents(res.data))
        }

        loadEvent()
    }, [])

    function cellRender(current, info){
        if(info.type === 'date'){
            const day = getDateFormatYYYYMMDD(current)
            if(day in events){
                console.log(events[day])
                return <Flex gap="4px 0" wrap>
                    <Tag color={events[day].schedule.color}>
                        {`${events[day].member['name']}(${events[day].member['nickName']})`}
                    </Tag>
                </Flex>
            }
        }

        // return info.originNode;
    }

    return <>
        <Row>
            <Col span={18}>
                <Calendar cellRender={cellRender}/>
            </Col>
            <Col span={1}/>
            <Col span={5}>
                <h1>เวรประจำวันนี้</h1>
                <DescriptSchudule/>
            </Col>
        </Row>
    </>
    
}


export default DashBoard;