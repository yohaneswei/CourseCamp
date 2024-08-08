import React from "react"
import { CCard, CCardBody, CRow, CCol, CImg, } from "@coreui/react";
import ProfileImg from "../../gambar/ProfileImg.jpg"
import { authToken } from "../../plugins/api";
import "../style.css";
import moment from "moment"
import "moment/locale/id";

function ProfileImage() {
    return (
        <CCard
            style={{
                backgroundColor: "gray",
                marginTop: "75px",
                color: "white",
                backgroundImage: "linear-gradient(to bottom, #3399FF, #7119B6)"
            }}
        >
            <CCardBody className="text-center">
                <CRow>
                    <CCol>
                        <CImg
                            src={ProfileImg}
                            className="img-fluid"
                            style={{ width: "auto", height: "250px", borderRadius: "50%" }}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol>
                        <b style={{ fontSize: "28px" }}>{authToken().urn}</b>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol>
                        <div style={{ fontSize: "18px" }}>Bergabung sejak {moment(authToken().tma).format("DD MMMM YYYY")}</div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard >
    )
}

export default ProfileImage