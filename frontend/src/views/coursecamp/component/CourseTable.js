import React from "react";
import { CCard, CCardHeader, CCardBody, CButton, CRow, CCol, CBadge } from "@coreui/react"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useHistory } from "react-router-dom";
import moment from 'moment';

function Course(props) {
    const history = useHistory();

    return (
        <div>
            <CCard style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }}>
                <CCardHeader>
                    <CRow>
                        <CCol style={{ fontSize: "24px" }}>
                            <b>
                                Course Table
                            </b>
                        </CCol>
                        <CCol className="text-right">
                            <CButton active color="success" aria-pressed="true" onClick={() =>
                                history.push({
                                    pathname: `/add-course`
                                })}>
                                Tambah Course
                            </CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <div id="table-gridjs" >
                        <Grid
                            data={props.course}
                            columns={[{
                                name: 'Nama',
                                formatter: (cell) => _(<div>{cell}</div>)

                            },
                            {
                                name: 'Kategori',
                                formatter: (cell) => _(<div>{cell}</div>)
                            },
                            {
                                name: 'Kesulitan',
                                formatter: (cell) => _(
                                    <div className="text-center">
                                        <CBadge
                                            className="text-center"
                                            color={cell === "Mudah" ? "success" : cell === "Menengah" ? "warning" : "danger"}
                                            style={{ fontSize: "12px" }}
                                        >
                                            {cell}
                                        </CBadge>
                                    </div>)
                            },
                            {
                                name: 'Jumlah Modul',
                                formatter: (cell) => _(<div>{cell}</div>)
                            },
                            {
                                name: 'Tanggal Publikasi',
                                formatter: (cell) => _(<div>{moment(cell).format("DD MMMM YYYY")}</div>)
                            },
                            {
                                name: 'Status',
                                formatter: (cell) => _(<div>{cell ? "Aktif" : "Tidak Aktif"}</div>)
                            },
                            {
                                name: 'Aksi',
                                formatter: (cell) => _(<div className="text-center" onClick={() =>
                                    history.push({
                                        pathname: `/detail-course/${cell}`
                                    })}>
                                    <CButton color="light">Details</CButton>
                                </div>)
                            },
                            ]}
                            search={true}
                            sort={true}
                            pagination={{ enabled: true, limit: 10, }}
                        />
                    </div>
                </CCardBody>
            </CCard>
        </div >
    )
}

export default Course;