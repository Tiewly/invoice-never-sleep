import React, { Component, useState } from "react";
import { Button, Card, Table, Input, Label } from "semantic-ui-react";
import styled from "styled-components";
import _ from "lodash";

const tableData = [
  {
    no: 1,
    code: "A123456789",
    projectName: "Apple",
    date: "12/02/2564",
    customerName: "คุณสมชาย",
    paymentAmount: 1000000.0,
    status: "รอชำระเงิน",
  },
  {
    no: 2,
    code: "B123456789",
    projectName: "Banana",
    date: "09/05/2564",
    customerName: "คุณสมหมาย",
    paymentAmount: 20000.0,
    status: "รอตรวจสอบ",
  },
  {
    no: 3,
    code: "C123456789",
    projectName: "Cat",
    date: "07/02/2564",
    customerName: "คุณมีสุข",
    paymentAmount: 500000.0,
    status: "จ่ายแล้ว",
  },
  {
    no: 4,
    code: "D123456789",
    projectName: "Doctor",
    date: "22/08/2564",
    customerName: "คุณกิต",
    paymentAmount: 550000.0,
    status: "ไม่สำเร็จ",
  },
  {
    no: 5,
    code: "E123456789",
    projectName: "English",
    date: "21/06/2564",
    customerName: "คุณคิดดี",
    paymentAmount: 2750000.0,
    status: "ยกเลิก",
  },
  {
    no: 6,
    code: "A223456789",
    projectName: "Pineapple",
    date: "12/02/2564",
    customerName: "คุณอาทิตย์",
    paymentAmount: 10510000.0,
    status: "รอชำระเงิน",
  },
  {
    no: 7,
    code: "B223456789",
    projectName: "Bank",
    date: "09/05/2564",
    customerName: "คุณมั่งมี",
    paymentAmount: 200500.0,
    status: "รอตรวจสอบ",
  },
  {
    no: 8,
    code: "C223456789",
    projectName: "The Richest",
    date: "07/02/2564",
    customerName: "คุณเฮงเฮง",
    paymentAmount: 370000.0,
    status: "จ่ายแล้ว",
  },
  {
    no: 9,
    code: "D223456789",
    projectName: "Heart",
    date: "22/08/2564",
    customerName: "คุณใจเดียว",
    paymentAmount: 150100.0,
    status: "ไม่สำเร็จ",
  },
  {
    no: 10,
    code: "E223456789",
    projectName: "Lovely",
    date: "21/06/2564",
    customerName: "คุณข้างกาย",
    paymentAmount: 270090.0,
    status: "ยกเลิก",
  },
];

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    case "FILTER_STATUS":
      if (action.value === "All") {
        return {
          ...state,
          data: action.default,
          direction: null,
          column: null,
        };
      } else {
        return {
          ...state,
          data: action.default.filter((d) => d.status === action.value),
          direction: null,
          column: null,
        };
      }
    default:
      throw new Error();
  }
}

function filter() {}

const MyStyle = () => {
  const [count, setCounter] = useState(0);
  //table
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;
  //total paymentAmount
  const Total = data
    .reduce((totalPayment, data) => totalPayment + data.paymentAmount, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div>
      <Input icon="search" iconPosition="left" placeholder="search" />
      {/* {JSON.stringify(state)} */}
      <h2>Invoice (ใบแจ้งหนี้)</h2>
      <Button
        basic
        color="blue"
        onClick={() =>
          dispatch({ type: "FILTER_STATUS", value: "All", default: tableData })
        }
      >
        ทั้งหมด
      </Button>
      <Button
        basic
        color="grey"
        onClick={() =>
          dispatch({
            type: "FILTER_STATUS",
            value: "รอชำระเงิน",
            default: tableData,
          })
        }
      >
        รอชำระเงิน
      </Button>
      <Button
        basic
        color="grey"
        onClick={() =>
          dispatch({
            type: "FILTER_STATUS",
            value: "รอตรวจสอบ",
            default: tableData,
          })
        }
      >
        รอตรวจสอบ
      </Button>
      <Button
        basic
        color="grey"
        onClick={() =>
          dispatch({
            type: "FILTER_STATUS",
            value: "จ่ายแล้ว",
            default: tableData,
          })
        }
      >
        จ่ายแล้ว
      </Button>
      <Button
        basic
        color="grey"
        onClick={() =>
          dispatch({
            type: "FILTER_STATUS",
            value: "ไม่สำเร็จ",
            default: tableData,
          })
        }
      >
        ไม่สำเร็จ
      </Button>
      <Button
        basic
        color="grey"
        onClick={() =>
          dispatch({
            type: "FILTER_STATUS",
            value: "ยกเลิก",
            default: tableData,
          })
        }
      >
        ยกเลิก
      </Button>
      <br></br>
      <Card color="red">ยอดชำระทั้งหมด {Total} บาท</Card>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "no" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "no" })}
            >
              No.
              <br />
              ลำดับที่
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "code" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "code" })}
            >
              Code <br />
              เลขที่บิล
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "projectName" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "projectName" })
              }
            >
              Project Name <br />
              ชื่อโปรเจค
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "date" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "date" })}
            >
              Date <br />
              วันที่ออกบิล
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "customerName" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "customerName" })
              }
            >
              Customer Name <br />
              ชื่อลูกค้า
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "paymentAmount" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "paymentAmount" })
              }
            >
              Payment Amount <br />
              ยอดชำระ
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "slip" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "slip" })}
            >
              Slip <br />
              หลักฐานการโอน
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "status" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "status" })
              }
            >
              Status <br />
              สถานะ
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(
            ({
              no,
              code,
              projectName,
              date,
              customerName,
              paymentAmount,
              slip,
              status,
            }) => (
              <Table.Row key={code}>
                <Table.Cell>{no}</Table.Cell>
                <Table.Cell style={{ color: "blue" }}>{code}</Table.Cell>
                <Table.Cell style={{ color: "blue" }}>{projectName}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{customerName}</Table.Cell>
                <Table.Cell style={{ color: "red" }}>
                  {paymentAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Table.Cell>
                <Table.Cell>{slip}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MyStyle;
