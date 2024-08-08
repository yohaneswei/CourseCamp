import React from "react";
import "../style.css";
import { CContainer, CRow, CCol, CCard, CCardBody } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    easing: 'ease-out',
    duration: 2000,
    anchorPlacement: 'top-bottom',
});

function Brand() {

    return (
        <CContainer style={{ paddingTop: "55px", paddingBottom: "55px" }} data-aos="zoom-in">
            <CRow className="mb-3">
                <CCol className="text-center">
                    <h2>
                        CourseCamp juga menyediakan
                    </h2>
                </CCol>
            </CRow>
            <CRow>
                <CCol xxs="12" xs="12" sm="12" md="6" lg="4" className="text-center mb-3">
                    <CCard style={{ height: "100%" }}>
                        <CCardBody>
                            <div>
                                <FontAwesomeIcon icon={faThumbsUp} className="fa-3x" />
                            </div>
                            <h5 className="mt-3 mb-3">
                                Rekomendasi
                            </h5>
                            <div>
                                Course sudah tersusun sesuai berdasarkan kategorinya sehingga mempermudah pelajar dalam melakukan pencarian.
                                {/* Dalam sistem CourseCamp sendiri juga memiliki fitur rekomendasi yang dapat membantu pelajar dalam memilih course yang mirip. */}
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xxs="12" xs="12" sm="12" md="6" lg="4" className="text-center mb-3">
                    <CCard style={{ height: "100%" }}>
                        <CCardBody>
                            <FontAwesomeIcon icon={faLayerGroup} className="fa-3x" />
                            <h5 className="mt-3 mb-3">
                                Latihan
                            </h5>
                            <div>
                                Pada setiap course juga memiliki latihan-latihan yang ditujukan untuk memastikan pelajar memahami materi yang diberikan.
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xxs="12" xs="12" sm="12" md="12" lg="4" className="text-center mb-3" >
                    <CCard style={{ height: "100%" }}>
                        <CCardBody >
                            <FontAwesomeIcon icon={faCircleInfo} className="fa-3x" />
                            <h5 className="mt-3 mb-3">
                                Materi
                            </h5>
                            <div>
                                Pada setiap course juga akan berisikan penjelasan mengenai setiap modul yang dibahas pada course tersebut.
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer >
    )
}

export default Brand;