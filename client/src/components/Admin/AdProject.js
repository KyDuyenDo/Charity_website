import React, { useState } from "react";
import TotalManageProject from "./TotalManageProject";
import Disbursement from "./Disbursement";
import { Dropdown } from "react-bootstrap";
import { setDataProjects } from "../../redux/actions/adminAction";
import { useDispatch } from "react-redux";
const AdProject = () => {
  const [selection, SetSelection] = useState(1);
  const [dropbtn, setDropbtn] = useState("Trạng thái");
  const dispatch = useDispatch();

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Quản lý chiến dịch</h1>
          <div className="filter_project">
            <div className="contain-current-project pb-0 mb-0">
              <ul className="choose-status mb-0">
                <li
                  className={
                    "project-status " + (selection === 1 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(1);
                  }}
                >
                  Quản lý chung
                </li>
                <li
                  className={
                    "project-status banner " +
                    (selection === 2 ? "active-select" : "")
                  }
                  onClick={() => {
                    SetSelection(2);
                  }}
                >
                  Giải ngân
                </li>
              </ul>
              {selection === 1 ? (
                <Dropdown className="select-drop">
                  <Dropdown.Toggle as="div" className="i-false select-drop-btn">
                    <span>{dropbtn}</span>
                    <i className="fa-regular fa-angle-down"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setDropbtn("Tất cả");
                        dispatch(setDataProjects(""));
                      }}
                    >
                      Tất cả
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDropbtn("Đang gây quỹ");
                        dispatch(setDataProjects("?state=fundraising"));
                      }}
                    >
                      Đang gây quỹ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDropbtn("Đã kết thúc");
                        dispatch(setDataProjects("?state=finished"));
                      }}
                    >
                      Đã kết thúc
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {selection === 1 ? <TotalManageProject /> : <Disbursement />}
    </>
  );
};

export default AdProject;
