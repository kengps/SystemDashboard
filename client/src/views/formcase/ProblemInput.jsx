import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { useStore } from "../../service/zustand/storeCase";

import { Space } from "antd";

const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1px",
};

const ProblemInput = ({ handleChange, inputValue, selectedOption, values, newProbType2, textEmpty }) => {

    const data = useStore((state) => state.typesName)
    // console.log("➡️  file: ProblemInput.jsx:15  data:", data)
    const newDataType = data.map((item) => { return item.data.main.typeName })
    const typeProb = ([...new Set(newDataType)]).filter(Boolean);

    const [dataDetail, setDataDetail] = useState([]);

    //Type 
    const problemType = data.filter((item) => typeProb[0].includes(item.data.main.typeName));
    const problemTypeName = new Set(problemType.map((item) => { return item.data.main.sub.name }))
    const newProbType = [...problemTypeName]



    //Type Detail
    // const newType = data.filter((item) => newProbType[0].includes(item.data.main.sub.name))
    // const problemTypeDetail = newType.map((item) => { return item.data.main.sub.detail })
    // //Type Detail lsm
    // const newLsm = data.filter((item) => newProbType[1].includes(item.data.main.sub.name))
    // const problemTypeDetailLSM = newLsm.map((item) => { return item.data.main.sub.detail })


    useEffect(() => {
        // console.log(" Dev ====");
        // console.log(newProbType);
    }, [newProbType])

    const newProbTypeChange = (e) => {
        // console.log('newProbTypeChange(e) ================ ');
        // console.log(e.target.options[e.target.selectedIndex].getAttribute('key'));
        // console.log((e.target).options);
        // console.log((e.target).selectedIndex);
        // console.log((e.target).options[(e.target).selectedIndex].getAttribute());

        if ((e.target).selectedIndex === 0) {
            setDataDetail([]);
            return;
        }
        const newType = data.filter((item) => newProbType[(e.target).selectedIndex - 1].includes(item.data.main.sub.name))
        const problemTypeDetail = newType.map((item) => { return item.data.main.sub.detail })
        setDataDetail(problemTypeDetail);
        // console.log("➡️  file: ProblemInput.jsx:53  newType:", newType)
        // console.log("➡️  file: ProblemInput.jsx:54  problemTypeDetail:", problemTypeDetail)
    }


    // สมมติว่า dataDetail เป็น array ของ object ที่มี key ชื่อ 'name'
    const sortedDataDetail = dataDetail
      .filter(item => item !== "อื่นๆ") // กรองคำว่า "อื่นๆ" ออกมาก่อน
      .sort((a, b) => a.localeCompare(b, 'th')); // เรียงข้อมูลตามตัวอักษร (ตามภาษาไทย)

    // เพิ่ม "อื่นๆ" กลับไปที่ท้ายของรายการ
    if (dataDetail.includes("อื่นๆ")) {
      sortedDataDetail.push("อื่นๆ");
    }
    return (
        <div className="mt-3" >
            {/* <Space direction="horizontal" size={16}> */}

            <Form.Label style={{ fontWeight: "bold", color: 'black' }}>ประเภทปัญหา</Form.Label>

            {selectedOption.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}> * โปรดระบุ</span>) : ''}

            <InputGroup style={navDropdownItemStyle}>

                {/* <InputGroup.Text
                        className=""
                        style={{
                            fontSize: "18px",
                            fontFamily: "Times New Roman",
                            height: "2.35rem",
                        }}
                    >
                        ประเภทปัญหา
                    </InputGroup.Text> */}
                <Form.Select

                    aria-label="test"
                    value={selectedOption}
                    //onChange={handleChange}
                    onChange={(e) => {
                        handleChange(e);
                        inputValue("problem")(e);
                        newProbTypeChange(e);
                    }}
                >
                    <option key={9999} value="" >
                        --กรุณาเลือกประเภทปัญหา--
                    </option>
                    {newProbType.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item}
                        </option>
                    ))}
                </Form.Select>

                {dataDetail.length === 0 ? <></> :
                    <Form.Select
                        aria-label="test"
                        value={values.problemDetail}
                        onChange={inputValue("problemDetail")}
                    >
                        <option key={9999} value="">
                            -รายละเอียดปัญหา-
                        </option>
                        {sortedDataDetail.map((items, index) => (
                            <option value={items.name} key={index}>
                                {items}
                            </option>
                        ))}
                    </Form.Select>
                }

            </InputGroup>

            {/* </Space> */}
        </div>

    )
}

export default ProblemInput



// // สมมติว่า dataDetail เป็น array ของ object ที่มี key ชื่อ 'name'
// const sortedDataDetail = dataDetail
//   .filter(item => item !== "อื่นๆ") // กรองคำว่า "อื่นๆ" ออกมาก่อน
//   .sort((a, b) => a.localeCompare(b, 'th')); // เรียงข้อมูลตามตัวอักษร (ตามภาษาไทย)

// // เพิ่ม "อื่นๆ" กลับไปที่ท้ายของรายการ
// if (dataDetail.includes("อื่นๆ")) {
//   sortedDataDetail.push("อื่นๆ");
// }

// <Form.Select
//   aria-label="test"
//   value={values.problemDetail}
//   onChange={inputValue("problemDetail")}
// >
//   <option key={9999} value="">
//     -รายละเอียดปัญหา-
//   </option>
//   {sortedDataDetail.map((items, index) => (
//     <option value={items} key={index}>
//       {items}
//     </option>
//   ))}
// </Form.Select>