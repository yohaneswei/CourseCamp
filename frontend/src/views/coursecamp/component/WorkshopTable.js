import React, { useState } from "react";
import { CCard, CCardHeader, CCardBody, CButton, CRow, CCol, CBadge, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
// import { useHistory } from "react-router-dom";
// import { api } from '../../../plugins/api';

const data = [
    ["04", "Jonathan", "jonathan@example.com", "Senior Implementation Architect", "Hauck Inc", "Holy See"],
    ["05", "Harold", "harold@example.com", "Forward Creative Coordinator", "Metz Inc", "Iran"],
    ["08", "Shannon", "shannon@example.com", "Legacy Functionality Associate", "Zemlak Group", "South Georgia"],
    ["07", "Robert", "robert@example.com", "Product Accounts Technician", "Hoeger", "San Marino"],
    ["06", "Noel", "noel@example.com", "Customer Data Director", "Howell - Rippin", "Germany"],
    ["01", "Traci", "traci@example.com", "Corporate Identity Director", "Koelpin - Goldner", "Vanuatu"],
    ["02", "Kerry", "kerry@example.com", "Lead Applications Associate", "Feeney, Langworth and Tremblay", "Niger"],
    ["03", "Patsy", "patsy@example.com", "Dynamic Assurance Director", "Streich Group", "Niue"],
    ["09", "Cathy", "cathy@example.com", "Customer Data Director", "Ebert, Schamberger and Johnston", "Mexico"],
    ["10", "Tyrone", "tyrone@example.com", "Senior Response Liaison", "Raynor, Rolfson and Daugherty", "Qatar"],
];

function Workshop() {
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     api.get(`/get-courses`).then((res) => {
    //         setCourse(res.data.map((d) => Object.values(d)));
    //     });
    // }, []);

    return (
        <div>
            <CModal
                show={success}
                onClose={() => setSuccess(!success)}
                color="success"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => setSuccess(!success)}>Do Something</CButton>{' '}
                    <CButton color="secondary" onClick={() => setSuccess(!success)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
            <CRow>
                <CCol xxs="12" xs="12" sm="12" md="12" xl="2" lg="2" xxl="2">
                    <CCard style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.15)", borderRadius: "10px 10px 5px 5px" }}>
                        <CCardHeader style={{ fontSize: "24px", borderRadius: "10px 10px 0 0" }}>
                            <b>
                                Filter
                            </b>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xxs="6" xs="6" sm="4" md="3" xl="12" lg="12" xxl="12">
                                    Seminar {" "} <CBadge color="primary" shape="pill" style={{ position: 'static' }}>0</CBadge>
                                </CCol>

                                <CCol xxs="12" xs="6" sm="4" md="3" xl="12" lg="12" xxl="12">
                                    Workshop {" "} <CBadge color="info" shape="pill" style={{ position: 'static' }}>0</CBadge>
                                </CCol>

                                <CCol xxs="12" xs="6" sm="4" md="3" xl="12" lg="12" xxl="12">
                                    Bootcamp {" "} <CBadge color="warning" shape="pill" style={{ position: 'static' }}>0</CBadge>
                                </CCol>

                                <CCol xxs="12" xs="6" sm="4" md="3" xl="12" lg="12" xxl="12">
                                    Perkuliahan {" "} <CBadge color="success" shape="pill" style={{ position: 'static' }}>0</CBadge>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xxs="12" xs="12" sm="12" md="12" xl="10" lg="10" xxl="10">

                    <CCard style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.15)", borderRadius: "10px 10px 5px 5px" }}>
                        <CCardHeader style={{ borderRadius: "10px 10px 0 0" }}>
                            <CRow>
                                <CCol style={{ fontSize: "24px" }}>
                                    <b>
                                        Workshop Table
                                    </b>
                                </CCol>
                                <CCol className="text-right">
                                    <CButton active color="success" onClick={() => setSuccess(!success)} aria-pressed="true">Tambah Workshop</CButton>


                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <div id="table-gridjs">
                                <Grid
                                    data={data}
                                    columns={[{
                                        name: 'ID',
                                        width: '100px',
                                        formatter: (cell, row) => {
                                            // console.log('Row => ',cell)
                                            return _(<span className="fw-semibold">{cell}</span>)
                                        }
                                    },
                                        "Name",
                                    {
                                        name: 'Email',
                                        formatter: (cell) => _(<a href="/#"> {cell} </a>)
                                    },
                                        "Position",
                                    {
                                        name: "Company",
                                        width: '200px',
                                        formatter: (cell, row) => {
                                            // console.log('Row => ',cell)
                                            return _(<span>{cell}</span>)
                                        }
                                    },
                                        "Country",
                                    {
                                        name: 'Actions',
                                        width: '120px',
                                        formatter: (cell) => _(<a href='/#' className='text-reset text-decoration-underline'> Details </a>)
                                    },
                                    ]}
                                    search={true}
                                    sort={true}
                                    pagination={{ enabled: true, limit: 5, }}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div >
    )
}

export default Workshop;