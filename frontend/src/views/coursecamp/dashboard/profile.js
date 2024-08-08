import React, { useState, useEffect } from "react";
import Navbar from "./navbarDashboard";
import "../style.css";
import { CCard, CCardBody, CContainer, CRow, CCol, CImg, CBadge } from "@coreui/react";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Progress from "../component/Progress";
import { categoryImage } from "../../plugins/data";
import ProfileImage from "../component/ProfileImage";
import { api, authToken } from "../../plugins/api";
import moment from "moment"
import { useHistory } from "react-router-dom";
import Loader from "../component/Loader";

function CourseProfile(props) {
    const filteredCourses = props.courseList.filter((d) => d.status === Number(props.show.value));
    const history = useHistory();

    return (
        <CRow>
            {
                filteredCourses.length === 0 ?
                    (
                        <CCol className="text-center d-flex justify-content-center align-items-center" style={{ padding: "100px" }}>
                            {
                                Number(props.show.value) ?
                                    <h5>
                                        Belum Terdapat Course yang sudah Selesai!
                                    </h5>
                                    :
                                    <h5>
                                        Ayo Mulai Pembelajaran Anda!
                                    </h5>
                            }
                        </CCol>
                    )
                    :
                    (
                        filteredCourses.map((d, i) => (
                            <CCol xxs="12" xs="12" sm="12" md="12" xl="6" key={i}>
                                <CCard className="user-course" style={{ height: "92%" }} onClick={() => { history.push({ pathname: `../detail-course/${d.id_course}` }) }}>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xxs="12" xs="12" sm="12" md="5" xl="5" >
                                                <CImg
                                                    src={categoryImage(d.kategori)}
                                                    className="img-fluid"
                                                    style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.3)", borderRadius: "10px" }}
                                                />
                                            </CCol>
                                            <CCol>
                                                <CRow className="mb-1">
                                                    <CCol>
                                                        <b style={{ fontSize: "16px" }}>
                                                            {d.nama.length > 25 ? `${d.nama.substring(0, 25)}...` : d.nama}
                                                        </b>
                                                    </CCol>
                                                </CRow>
                                                <CRow className="mb-2">
                                                    <CCol xxs="6" xs="6" sm="6" md="6" xl="4">
                                                        {d.rating ? d.rating : 0}{" "}<FontAwesomeIcon icon={faStar} color="#f59e0b" />
                                                    </CCol>
                                                    <CCol xxs="6" xs="6" sm="6" md="6" xl="4">
                                                        {d.jumlah_modul} Modul
                                                    </CCol>
                                                    <CCol xxs="12" xs="12" sm="12" md="12" xl="4">
                                                        <CBadge
                                                            className="text-center"
                                                            color={d.kesulitan === "Mudah" ? "success" : d.kesulitan === "Menengah" ? "warning" : "danger"}
                                                            style={{ fontSize: "12px" }}
                                                        >
                                                            {d.kesulitan}
                                                        </CBadge>
                                                    </CCol>
                                                </CRow>
                                                <div className="mb-2">
                                                    <Progress
                                                        percent={d.progress}
                                                        backgroundColor={"#f4f4f5"}
                                                        boxShadow="none"
                                                        height="15"
                                                    />
                                                </div>

                                                <div>
                                                    {d.deskripsi.length > 150 ? `${d.deskripsi.substring(0, 150)}...` : d.deskripsi}
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol className="text-right" style={{ fontSize: "10px" }}>
                                                {moment(d.tgl_mulai).format("DD MMM YYYY")}
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        ))
                    )
            }
        </CRow>
    )
}

function Profile() {
    const [courseList, setCourseList] = useState([{
        nama: "",
        deskripsi: ""
    }]);
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);

        api.post(`/get-all-learn`, {
            id_user: authToken().uid,
            token: token
        }).then((res) => {
            setCourseList(res.data.result)
            setLoading(false);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [show, setShow] = useState(
        { value: '0', label: 'Sedang dipelajari' }
    );

    const options = [
        { value: '0', label: 'Sedang dipelajari' },
        { value: '1', label: 'Sudah selesai' },
    ]

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <CContainer>
                        <Navbar />
                        <ProfileImage />

                        <hr style={{ borderRadius: "30px", marginTop: "-8px" }} />

                        <CRow>
                            <CCol>
                                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                                    Pelajaran yang diambil{" "}<CBadge color="danger" shape="pill" style={{ position: 'static' }}>{courseList.filter((item) => item.status === 0).length}</CBadge>
                                </div>
                            </CCol>
                            <CCol className="col-auto">
                                <div style={{ fontSize: "16px" }}>
                                    Tampil:
                                </div>
                            </CCol>
                            <CCol className="col-auto">
                                <Select
                                    defaultValue={show}
                                    onChange={setShow}
                                    options={options}
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    isSearchable={false}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '27px',
                                            height: '27px',
                                            width: 'auto',
                                            boxShadow: state.isFocused ? null : null,
                                        }),

                                        valueContainer: (provided, state) => ({
                                            ...provided,
                                            height: '27px',
                                            fontSize: "12px",
                                            padding: '0 6px',
                                        }),

                                        input: (provided, state) => ({
                                            ...provided,
                                            margin: '0px',
                                        }),

                                        indicatorsContainer: (provided, state) => ({
                                            ...provided,
                                            height: '27px',
                                        }),
                                        indicatorSeparator: state => ({
                                            display: 'none',
                                        }),
                                    }}
                                />
                            </CCol>
                        </CRow>
                        <br />

                        <CourseProfile show={show} courseList={courseList} />
                    </CContainer >
            }
        </div >
    )
}

export default Profile;