import React, { Component, useState, useEffect } from "react";
import { Table, Input, Image, Icon } from "semantic-ui-react";
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
        focusOnTab = "All";
        return {
          ...state,
          data: action.default,
          direction: null,
          column: null,
        };
      } else {
        focusOn = action.value;
        focusOnTab = action.value;
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
var focusOnTab = "";

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
  //set Data
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
                  <a>Accounting Manager</a>
                  <br></br>
                  <p>Gong Yoo</p>
                </div>
                <br></br>
                <br></br>
                <a>Project management {">"} Invoice</a>
                <br></br>
                <div className="header-name">
                  <p>Invoice </p>
                  <a>(??????????????????????????????)</a>
                </div>
                <br></br>
                {/* //button tab */}
                <div className="start-tab">
                  <div
                    className={`tab ${focusOnTab === "All" ? "fade-tab" : ""}`}
                  >
                    <div
                      className={`button  ${
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
                      <span
                        className={`dot dot1 ${
                          focusOnTab === "?????????????????????" ? "active1" : ""
                        }`}
                      ></span>
                      ????????????????????? ({tableData.length})
                    </div>
                  </div>
                  <div
                    className={`tab ${
                      focusOnTab === "??????????????????????????????" ? "fade-tab" : ""
                    }`}
                  >
                    <div
                      className={`button  ${
                        focusOn === "??????????????????????????????" ? "active2" : ""
                      }`}
                      onClick={() =>
                        dispatch({
                          type: "FILTER_STATUS",
                          value: "??????????????????????????????",
                          default: tableData,
                        })
                      }
                    >
                      <span
                        className={`dot dot2 ${
                          focusOnTab === " ??????????????????????????????" ? "active2" : ""
                        }`}
                      ></span>
                      ?????????????????????????????? (
                      {
                        tableData.filter((i) => i.status === "??????????????????????????????")
                          .length
                      }
                      )
                    </div>
                  </div>
                  <div
                    className={`tab ${
                      focusOnTab === "???????????????????????????" ? "fade-tab" : ""
                    }`}
                  >
                    <div
                      className={`button  ${
                        focusOn === "???????????????????????????" ? "active3" : ""
                      }`}
                      onClick={() =>
                        dispatch({
                          type: "FILTER_STATUS",
                          value: "???????????????????????????",
                          default: tableData,
                        })
                      }
                    >
                      <span
                        className={`dot dot3 ${
                          focusOnTab === "???????????????????????????" ? "active3" : ""
                        }`}
                      ></span>
                      ??????????????????????????? (
                      {tableData.filter((i) => i.status === "???????????????????????????").length}
                      )
                    </div>
                  </div>
                  <div
                    className={`tab ${
                      focusOnTab === "????????????????????????" ? "fade-tab" : ""
                    }`}
                  >
                    <div
                      className={`button  ${
                        focusOn === "????????????????????????" ? "active4" : ""
                      }`}
                      onClick={() =>
                        dispatch({
                          type: "FILTER_STATUS",
                          value: "????????????????????????",
                          default: tableData,
                        })
                      }
                    >
                      <span
                        className={`dot dot4 ${
                          focusOnTab === "????????????????????????" ? "active4" : ""
                        }`}
                      ></span>
                      ???????????????????????? (
                      {tableData.filter((i) => i.status === "????????????????????????").length})
                    </div>
                  </div>
                  <div
                    className={`tab ${
                      focusOnTab === "???????????????????????????" ? "fade-tab" : ""
                    }`}
                  >
                    <div
                      className={`button  ${
                        focusOn === "???????????????????????????" ? "active5" : ""
                      }`}
                      onClick={() =>
                        dispatch({
                          type: "FILTER_STATUS",
                          value: "???????????????????????????",
                          default: tableData,
                        })
                      }
                    >
                      <span
                        className={`dot dot5 ${
                          focusOnTab === "???????????????????????????" ? "active5" : ""
                        }`}
                      ></span>
                      ??????????????????????????? (
                      {tableData.filter((i) => i.status === "???????????????????????????").length}
                      )
                    </div>
                  </div>
                  <div
                    className={`tab ${
                      focusOnTab === "??????????????????" ? "fade-tab" : ""
                    }`}
                  >
                    <div
                      className={`button  ${
                        focusOn === "??????????????????" ? "active6" : ""
                      }`}
                      onClick={() =>
                        dispatch({
                          type: "FILTER_STATUS",
                          value: "??????????????????",
                          default: tableData,
                        })
                      }
                    >
                      <span
                        className={`dot dot6 ${
                          focusOnTab === "??????????????????" ? "active6" : ""
                        }`}
                      ></span>
                      ?????????????????? (
                      {tableData.filter((i) => i.status === "??????????????????").length})
                    </div>
                  </div>
                </div>
                <div className="page-table">
                  <br></br>
                  <div className="card">
                    <p>??????????????????????????????????????????</p> <h3>{Total}</h3> <p>?????????</p>
                  </div>
                  <div className="head-table">
                    Show
                    <div className="drop-down">
                      10
                      <Icon name="caret down" />
                    </div>
                    Entries
                  </div>
                  <Table sortable basic="very" fixed>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          sorted={column === "no" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "no" })
                          }
                          width={1}
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          No.
                          <br />
                          ????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "code" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "code" })
                          }
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Code <br />
                          ???????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "projectName" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "projectName",
                            })
                          }
                          width={3}
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Project Name <br />
                          ??????????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "date" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "date" })
                          }
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Date <br />
                          ????????????????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "customerName" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "customerName",
                            })
                          }
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Customer Name <br />
                          ??????????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "paymentAmount" ? direction : null}
                          onClick={() =>
                            dispatch({
                              type: "CHANGE_SORT",
                              column: "paymentAmount",
                            })
                          }
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Payment Amount <br />
                          ?????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "slip" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "slip" })
                          }
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Slip <br />
                          ???????????????????????????????????????
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          sorted={column === "status" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "status" })
                          }
                          width={2}
                          style={{ backgroundColor: "#9bcaff" }}
                        >
                          Status <br />
                          ???????????????
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
                            <Table.Cell
                              style={{ textAlign: "center", color: "#3498db" }}
                            >
                              <Icon name="book" />
                            </Table.Cell>
                            <Table.Cell>
                              <div
                                className={
                                  status === "??????????????????????????????"
                                    ? "active2"
                                    : status === "???????????????????????????"
                                    ? "active3"
                                    : status === "????????????????????????"
                                    ? "active4"
                                    : status === "???????????????????????????"
                                    ? "active5"
                                    : "active6"
                                }
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "5px",
                                  textAlign: "center",
                                }}
                              >
                                {status}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table>
                  <div style={{ textAlign: "center", cursor: "pointer" }}>
                    <div className="circle">1</div>
                    <div className="footer">2</div>
                    <div className="footer">3</div>
                    <div className="footer">4</div>
                    <div className="footer">5</div>
                  </div>
                </div>
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
