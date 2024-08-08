import React, { useState } from "react";
import "../style.css";
import Navbar from "./navbarDashboard";
import { CCard, CCardBody, CContainer, CRow, CCol, CForm, CInput, CButton } from "@coreui/react";
import usePasswordToggle from "../component/usePasswordToggle";
import { api, authToken } from "../../plugins/api";
import swal from "sweetalert2";
import ProfileImage from "../component/ProfileImage";

function SearchPage() {
    const [passwordLama, setPasswordLama] = useState("");
    const [passwordLamaInputType, setPasswordLamaInputType] = usePasswordToggle();

    const [passwordBaru, setPasswordBaru] = useState("");
    const [passwordBaruInputType, setPasswordBaruInputType] = usePasswordToggle();

    const [conPassword, setConPassword] = useState("");
    const [conPasswordInputType, setConPasswordInputType] = usePasswordToggle();

    const token = localStorage.getItem("token");

    const ubahPassword = (e) => {
        e.preventDefault();

        api.put(`change-password/${authToken().uid}`, {
            passwordLama: passwordLama,
            passwordBaru: passwordBaru,
            conPassword: conPassword,
            token: token
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success");
            } else {
                swal.fire("Gagal!", res.data.message, "error");
            }
        })
    }

    return (
        <div className="bg">
            <Navbar />
            <CContainer>
                <ProfileImage />

                <hr style={{ borderRadius: "30px", marginTop: "-8px" }} />

                <CCard>
                    <CCardBody>
                        <div className="text-center">
                            <h3>
                                Ubah Password
                            </h3>
                        </div>

                        <hr style={{ borderRadius: "30px", marginTop: "10px", marginBottom: "50px" }} />

                        <CForm method="POST" onSubmit={(e) => ubahPassword(e)}>
                            <CRow className="d-flex align-items-center justify-content-center">
                                <CCol md="3">
                                    Sandi Lama
                                </CCol>
                                <CCol>
                                    <div className="input-group">
                                        <CInput
                                            type={passwordLamaInputType}
                                            placeholder="Masukkan Sandi Lama"
                                            max="30"
                                            value={passwordLama}
                                            className="form-control"
                                            onChange={(e) => { setPasswordLama(e.target.value) }}
                                            required
                                        />
                                        <span className="password-toogle-icon">
                                            {setPasswordLamaInputType}
                                        </span>
                                    </div>
                                </CCol>
                            </CRow>

                            <CRow className="d-flex align-items-center justify-content-center mt-3">
                                <CCol md="3">
                                    Sandi Baru
                                </CCol>
                                <CCol>
                                    <div className="input-group">
                                        <CInput
                                            type={passwordBaruInputType}
                                            placeholder="Masukkan Sandi Baru"
                                            max="30"
                                            value={passwordBaru}
                                            className="form-control"
                                            onChange={(e) => { setPasswordBaru(e.target.value) }}
                                            required
                                        />
                                        <span className="password-toogle-icon">
                                            {setPasswordBaruInputType}
                                        </span>
                                    </div>
                                </CCol>
                            </CRow>

                            <CRow className="d-flex align-items-center justify-content-center mt-3">
                                <CCol md="3">
                                    Konfirmasi Password Baru
                                </CCol>
                                <CCol>
                                    <div className="input-group">
                                        <CInput
                                            type={conPasswordInputType}
                                            placeholder="Masukkan Sandi Baru"
                                            max="30"
                                            value={conPassword}
                                            className="form-control"
                                            onChange={(e) => { setConPassword(e.target.value) }}
                                            required
                                        />
                                        <span className="password-toogle-icon">
                                            {setConPasswordInputType}
                                        </span>
                                    </div>
                                </CCol>
                            </CRow>

                            <div className="text-center" style={{ marginTop: "50px" }}>
                                <CButton
                                    active
                                    color="success"
                                    style={{ fontWeight: "bold" }}
                                    aria-pressed="true"
                                    type="submit"
                                >
                                    Simpan
                                </CButton>
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default SearchPage;