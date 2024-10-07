import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, message, Select, Modal, Input, Drawer, Popconfirm, Tooltip } from "antd";
import { Box } from "@mui/material";
import { Form, InputGroup } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Button1 from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import { QuestionCircleOutlined } from '@ant-design/icons';

import {
    useQueryParams,
    StringParam,
    NumberParam,
    ArrayParam,
    withDefault,
} from 'use-query-params';


const SearchCase = ({ search, setSearch, onClickButton, showDrawer, pendingCasesCount, pendingCases, confirm, cancel, textRef }) => {






    const handleSearchChange = (event) => {
        const search = event.target.value;

        if (search) {
            setSearch({ search })
        } else {
            setSearch({})

        }
        // setSearch(inputValue);
        // setQuery(
        //     { filters: [...filters, `${search}`], q: 'bar' },
        //     'push'
        // )

    };


    // const MyFiltersParam = withDefault(ArrayParam, [])
    // const [query, setQuery] = useQueryParams({
    //     x: NumberParam,
    //     q: StringParam,
    //     filters: MyFiltersParam,
    // });
    // const { x: num, q: searchQuery, filters } = query;


    const [currentTime, setCurrentTime] = useState(moment());

    const updateTime = () => {
        setCurrentTime(moment());
    };

    const targetDate = currentTime;
    const formattedDate = targetDate.locale('th').format('ll เวลา LT');
    const isMorning = currentTime.isBetween(moment('09:35', 'HH:mm'), moment('21:35', 'HH:mm'));
    const timeOfDay = isMorning ? '(กะเช้า)' : '(กะดึก)';


    return (
        <Box>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="ค้นหาCase"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button
                    variant="danger"
                    value="Submit"
                    onClick={onClickButton}
                    className="btn-1"
                >
                    <RxCross2 />
                </Button>
                {/* <Tooltip
                    color="white"
                    title={
                        <Card ref={textRef}>
                            <p>


                                {isMorning ? <p>🌞 เคสค้างประจำวันที่ {formattedDate} {timeOfDay} 🌞</p> : <p>🌜 สรุปเคสค้างวันที่ {formattedDate}  {timeOfDay} 🌛</p>}
                            </p>
                            <p>
                                <p>
                                    <br />
                                    {pendingCasesCount === 0
                                        ? "- ไม่มีรายการค้าง"
                                        : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                                    <p>
                                        {pendingCases.map((item, index) => (
                                            <p key={index}>
                                                {index + 1}. {item.caseId} -{" "}
                                                {item.status}
                                            </p>
                                        ))}
                                    </p>
                                </p>
                            </p>
                        </Card>
                    }
                >

                    <Button1
                        onMouseEnter={updateTime} // อัปเดตเวลาเมื่อเม้าส์ไปอยู่ที่ปุ่ม
                        variant="success"
                        onClick={showDrawer}
                        style={{ marginLeft: "20px" }}
                    >
                        สรุปเคสประจำวัน
                    </Button1>
                </Tooltip> */}

                <Popconfirm

                    title="ส่งเคส"
                    description={
                        <Card ref={textRef}>
                            <p>


                                {isMorning ? <p>🌞 วันที่ {formattedDate} {timeOfDay} 🌞</p> : <p>🌜 สรุปเคสค้างวันที่ {formattedDate}  {timeOfDay} 🌛</p>}
                            </p>
                            <p>
                                <br />
                                {pendingCasesCount === 0
                                    ? "- ไม่มีรายการค้าง"
                                    : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                                <p>
                                    {pendingCases.map((item, index) => (
                                        <p key={index}>
                                            {index + 1}. {item.caseId} -{" "}
                                            {item.status}
                                        </p>
                                    ))}
                                </p>
                            </p>
                        </Card>
                    }
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    icon={
                        <QuestionCircleOutlined

                        />
                    }
                >

                    <Button1
                        onMouseEnter={updateTime} // อัปเดตเวลาเมื่อเม้าส์ไปอยู่ที่ปุ่ม
                        variant="success"
                        onClick={showDrawer}
                        style={{ marginLeft: "20px" }}
                    >
                        สรุปเคสประจำวัน
                    </Button1>
                </Popconfirm>
            </InputGroup>
        </Box>
    );
}

export default SearchCase