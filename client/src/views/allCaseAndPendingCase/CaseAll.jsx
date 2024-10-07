import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, Typography, message } from "antd";
import { CopyOutlined, PrinterOutlined } from "@ant-design/icons";

import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import DatePickerCase from "../DatePicker/DatePicker";


import { useReactToPrint } from 'react-to-print';


const CaseAll = ({ data, currentPage, ITEM_PER_PAGE }) => {


    const textRef = useRef([]);

    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    return (
        <div className="mt">

            {/* <DatePickerCase /> */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Helmet>
                    <title> Dashboard | CaseAll </title>
                </Helmet>
                <table className="table table-striped ">
                    <thead className="" style={{ fontSize: '18px', fontWeight: 'bolder' }}>
                        <tr className="table-secondary ">
                            <th scope="col">ID</th>
                            <th scope="col">ผู้แจ้งปัญหา</th>
                            <th scope="col">ประเภทปัญหา</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ค่ายเกม</th>
                            <th scope="col">ผู้บันทึก</th>
                            <th scope="col">ผู้แก้ไข</th>
                            <th scope="col">เวลาบันทึกเคส</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data
                            .sort((a, b) => (a.status === "รอการแก้ไข" && b.select !== "รอการแก้ไข" ? -1 : 1))
                            .sort((a, b) => b.id - a.id)
                            .slice(
                                currentPage * ITEM_PER_PAGE,
                                (currentPage + 1) * ITEM_PER_PAGE
                            )
                            .map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{data.caseId}</th>
                                    <td>{data.reporter}</td>
                                    <td>{data.problemDetail}</td>
                                    <td style={{ wordWrap: "break-word", maxWidth: "30ch" }}>
                                        {/* {data.detail} */}
                                        <div dangerouslySetInnerHTML={{ __html: data.detail }} />
                                    </td>
                                    <td>{data.campgame.length === 0 ? <Tag color="volcano"><i>ไม่ระบุ</i></Tag> : <>{data.campgame}</>}</td>
                                    <td>{data.recorder}</td>
                                    <td>{data.editors}</td>
                                    <td>
                                        {moment(data.createdAt).locale("th").format("lll")} น.
                                    </td>

                                    <td>{data.status === 'แก้ไขสำเร็จ' ? <b style={{ color: 'green' }}>{data.status}</b> : <b style={{ color: 'red' }}>{data.status}</b>}</td>
                                    <td>
                                        <Card
                                            ref={textRef}
                                            style={{
                                                background: "#f0f0f0",
                                                border: "1px solid gray",
                                            }}
                                        >
                                            {/* print */}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                                                {/* 
                                                <Button
                                                    onClick={() => { handlePrint(null, () => textRef.current) }}
                                                    icon={<  PrinterOutlined />} size='small' /> */}


                                            </div>
                                            <div style={{ fontSize: "8px" }}>
                                                <p className="d-block m-0">
                                                    <strong>เคส:</strong> {data.caseId}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong>ผู้แจ้งปัญหา: </strong>
                                                    {data.reporter}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong>ประเภทปัญหา: </strong>
                                                    {data.problemDetail}
                                                </p>
                                                <p
                                                    className="d-block m-0"
                                                    style={{ wordWrap: "break-word", maxWidth: "30ch" }}
                                                >
                                                    <strong>รายละเอียด: </strong>
                                                    <div dangerouslySetInnerHTML={{ __html: data.detail }} />

                                                </p>
                                                <p className="d-block m-0 font-weight-bold">
                                                    <strong>ค่ายเกม:</strong> {data.campgame}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong> ผู้ลงเคส: </strong>
                                                    {data.recorder}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong> ผู้แก้ไข: </strong>
                                                    {data.editors}
                                                </p>
                                            </div>
                                        </Card>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Box>
        </div>
    )
}

export default CaseAll



// คอมโพเนนต์ CaseAll:
// CaseAll เป็นคอมโพเนนต์ที่ใช้แสดงข้อมูลที่ดึงมาจาก API และแบ่งหน้าตามค่าปัจจุบันของหน้า (currentPage) ที่เปลี่ยนไปทุกครั้งที่ผู้ใช้กดเปลี่ยนหน้า
// คอมโพเนนต์นี้รับ Props มาสำหรับข้อมูล (data) ที่จะแสดง ค่าปัจจุบันของหน้า (currentPage) และจำนวนรายการที่แสดงในหนึ่งหน้า (ITEM_PER_PAGE)
// เมื่อข้อมูลถูกส่งมาแล้ว คอมโพเนนต์ CaseAll จะแสดงผลข้อมูลที่อยู่ในหน้าปัจจุบัน และแสดงหน้า Pagination เพื่อให้ผู้ใช้เปลี่ยนหน้าได้
