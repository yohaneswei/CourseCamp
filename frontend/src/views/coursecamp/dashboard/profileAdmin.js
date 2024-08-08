import React, { useState, useEffect } from "react";
import Navbar from "./navbarDashboard";
import "../style.css";
import {
    CContainer, CRow, CCol, CWidgetDropdown
} from "@coreui/react";
import CountUp from "react-countup";
import Course from "../component/CourseTable";
// import Workshop from "./component/WorkshopTable";
import { authToken } from "../../plugins/api";
import { useHistory } from "react-router-dom";
import { api } from "../../plugins/api";
import ProfileImage from "../component/ProfileImage";
import Loader from "../component/Loader";

function ProfileAdmin() {
    const [countUser, setCountUser] = useState(0)
    const [countCourse, setCountCourse] = useState(0)
    const [countWorkshop, setCountWorkshop] = useState(0)
    const [course, setCourse] = useState([])

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");
    const history = useHistory()

    useEffect(() => {
        setLoading(true)

        if (authToken().isa === 0) {
            history.push({ pathname: `../course-dashboard` })
        }

        api.post(`count-user`, {
            token: token
        }).then((res) => {
            setCountUser(res.data.result)
            setLoading(false)
        })

        api.post(`count-course`, {
            token: token
        }).then((res) => {
            setCountCourse(res.data.result);
            setLoading(false)
        })

        api.post(`/get-courses`, {
            token: token
        }).then((res) => {
            setCourse(res.data.map((d) => Object.values(d)));
            setLoading(false)
        });

        setCountWorkshop(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg" >
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <ProfileImage />

                            <CRow>
                                <CCol sm="6" md="4" lg="4">
                                    <CWidgetDropdown
                                        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)", height: "160px" }}
                                        color="gradient-primary"
                                        header={
                                            <CountUp
                                                start={0}
                                                prefix={""}
                                                suffix={""}
                                                separator={"."}
                                                end={countUser || 0}
                                                duration={4}
                                            />}
                                        text="User Terdaftar"
                                    />
                                </CCol>

                                <CCol sm="6" md="4" lg="4">
                                    <CWidgetDropdown
                                        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)", height: "160px" }}
                                        color="gradient-info"
                                        header={
                                            <CountUp
                                                start={0}
                                                prefix={""}
                                                suffix={""}
                                                separator={"."}
                                                end={countCourse || 0}
                                                duration={4}
                                            />}
                                        text="Course Terdaftar"
                                    />
                                </CCol>

                                <CCol xxs="12" xs="12" sm="12" md="4" xl="4" lg="4" xxl="4" >
                                    <CWidgetDropdown
                                        style={{ boxShadow: "0 2px 3px rgba(0,0,0,0.15)", height: "160px" }}
                                        color="gradient-warning "
                                        header={
                                            <CountUp
                                                start={0}
                                                prefix={""}
                                                suffix={""}
                                                separator={"."}
                                                end={countWorkshop || 0}
                                                duration={4}
                                            />}
                                        text="Lorem Ipsium"
                                    />
                                </CCol>
                            </CRow>
                            {console.clear()}

                            {/* <hr style={{ borderRadius: "30px", marginTop: "-8px" }} /> */}

                            {/* <div className="mb-3">
                    <CButton onClick={() => { setBtnTable(0) }} className={"btn-menu left-radius " + (!btnTable && "btn-clicked")}>Course</CButton>
                    <CButton onClick={() => { setBtnTable(1) }} className={"btn-menu right-radius " + (btnTable && "btn-clicked")}>Workshop</CButton>
                </div>

                {btnTable ?
                    <Workshop />
                    :
                    <Course />
                } */}
                            <Course course={course} />
                        </CContainer>
                    </>
            }
        </div >
    )
}

export default ProfileAdmin;