import React, { Component, useState, useEffect } from "react";
import { Menu, Table, Input, Segment, Image, Icon } from "semantic-ui-react";
import _ from "lodash";
import { Get } from "react-axios";

var tableData = [];

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
        focusOn = "All";
        return {
          ...state,
          data: action.default,
          direction: null,
          column: null,
        };
      } else {
        focusOn = action.value;
        return {
          ...state,
          data: action.default.filter((d) => d.status === action.value),
          direction: null,
          column: null,
          color: action.default,
        };
      }
    case "SET_DATA":
      return {
        ...state,
        data: action.data,
        direction: null,
        column: null,
      };
    default:
      throw new Error();
  }
}

var focusOn = "";
const MyStyle = () => {
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
  useEffect(() => {
    if (data.length === 0) {
      dispatch({
        type: "SET_DATA",
        data: tableData,
      });
    }
  });
  return (
    <div>
      <Get url="http://my-json-server.typicode.com/Tiewly/data-final/tableData">
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return (
              <div>
                Something bad happened: {error.message}{" "}
                <button
                  onClick={() => makeRequest({ params: { reload: true } })}
                >
                  Retry
                </button>
              </div>
            );
          } else if (isLoading) {
            return <div>Loading...</div>;
          } else if (response !== null) {
            tableData = response.data;
            const x = (
              <div className="page">
                <Input icon="search" iconPosition="left" placeholder="search" />

                <div className="card-account">
                  <Image
                    floated="left"
                    size="mini"
                    rounded
                    src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                    style={{ marginBottom: "0" }}
                  />
                  <i>Accounting Manager</i>
                  <br></br>
                  <p>Gong Yoo</p>
                </div>
                <br></br>
                <br></br>
                <a>Project management > Invoice</a>
                <br></br>
                <div className="header-name">
                  <p>Invoice </p>
                  <a>(ใบแจ้งหนี้)</a>
                </div>
                <Segment>
                  <div
                    className={`button button1 ${
                      focusOn === "All" ? "active1" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "All",
                        default: tableData,
                      })
                    }
                  >
                    ทั้งหมด ({tableData.length})
                  </div>
                  <div
                    className={`button button2 ${
                      focusOn === "รอชำระเงิน" ? "active2" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "รอชำระเงิน",
                        default: tableData,
                      })
                    }
                  >
                    รอชำระเงิน (
                    {tableData.filter((i) => i.status === "รอชำระเงิน").length})
                  </div>
                  <div
                    className={`button button3 ${
                      focusOn === "รอตรวจสอบ" ? "active3" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "รอตรวจสอบ",
                        default: tableData,
                      })
                    }
                  >
                    รอตรวจสอบ (
                    {tableData.filter((i) => i.status === "รอตรวจสอบ").length})
                  </div>
                  <div
                    className={`button button4 ${
                      focusOn === "จ่ายแล้ว" ? "active4" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "จ่ายแล้ว",
                        default: tableData,
                      })
                    }
                  >
                    จ่ายแล้ว (
                    {tableData.filter((i) => i.status === "จ่ายแล้ว").length})
                  </div>
                  <div
                    className={`button button5 ${
                      focusOn === "ไม่สำเร็จ" ? "active5" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "ไม่สำเร็จ",
                        default: tableData,
                      })
                    }
                  >
                    ไม่สำเร็จ (
                    {tableData.filter((i) => i.status === "ไม่สำเร็จ").length})
                  </div>
                  <div
                    className={`button button6 ${
                      focusOn === "ยกเลิก" ? "active6" : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "FILTER_STATUS",
                        value: "ยกเลิก",
                        default: tableData,
                      })
                    }
                  >
                    ยกเลิก (
                    {tableData.filter((i) => i.status === "ยกเลิก").length})
                  </div>

                  <br></br>
                  <div className="card">
                    <p>ยอดชำระทั้งหมด</p> <h3>{Total}</h3> <p>บาท</p>
                  </div>
                  <Table sortable celled fixed>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          sorted={column === "no" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "no" })
                          }
                          style={{ width: "7rem" }}
                        >
                          No.
                          <br />
                          ลำดับที่
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "code" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "code" })
                          }
                        >
                          Code <br />
                          เลขที่บิล
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "projectName" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "projectName",
                            })
                          }
                          style={{ width: "15rem" }}
                        >
                          Project Name <br />
                          ชื่อโปรเจค
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "date" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "date" })
                          }
                        >
                          Date <br />
                          วันที่ออกบิล
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "customerName" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "customerName",
                            })
                          }
                        >
                          Customer Name <br />
                          ชื่อลูกค้า
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "paymentAmount" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "paymentAmount",
                            })
                          }
                        >
                          Payment Amount <br />
                          ยอดชำระ
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "slip" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "slip" })
                          }
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
                            <Table.Cell style={{ textAlign: "center" }}>
                              {no}
                            </Table.Cell>
                            <Table.Cell style={{ color: "#2980b9" }}>
                              {code}
                            </Table.Cell>
                            <Table.Cell style={{ color: "#2980b9" }}>
                              {projectName}
                            </Table.Cell>
                            <Table.Cell>{date}</Table.Cell>
                            <Table.Cell>{customerName}</Table.Cell>
                            <Table.Cell style={{ color: "#e74c3c" }}>
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

                    {/* <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="10">
                          <Menu floated="right" pagination>
                            <Menu.Item as="a" icon>
                              <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item as="a">1</Menu.Item>
                            <Menu.Item as="a">2</Menu.Item>
                            <Menu.Item as="a">3</Menu.Item>
                            <Menu.Item as="a">4</Menu.Item>
                            <Menu.Item as="a" icon>
                              <Icon name="chevron right" />
                            </Menu.Item>
                          </Menu>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer> */}
                  </Table>
                </Segment>
              </div>
            );
            return x;
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </div>
  );
};

export default MyStyle;
