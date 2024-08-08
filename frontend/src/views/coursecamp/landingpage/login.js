import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import "../style.css";
import loginImage from "../../gambar/LoginImage.png"
import Navbar from './navbar';
import { useHistory } from "react-router-dom";
import { api } from '../../plugins/api';
import swal from 'sweetalert2';
import usePasswordToggle from '../component/usePasswordToggle';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [passwordInputType, setPasswordInputType] = usePasswordToggle();
  const history = useHistory();

  const handleChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const validasi = (e) => {
    e.preventDefault()
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (user.email.length === 0) {
      swal.fire('Peringatan!', 'Email tidak boleh kosong!', 'warning');
    }
    else if (!(emailRegex.test(user.email))) {
      swal.fire('Peringatan!', 'Format email salah!', 'warning');
    }
    else if (user.password.length === 0) {
      swal.fire('Peringatan!', 'Password tidak boleh kosong!', 'warning');
    }
    else {
      LoginAPI()
    }
  }

  const LoginAPI = async () => {
    try {
      const res = await api.post(`login`, {
        email: user.email,
        password: user.password,
      });

      if (res.data.success) {
        await swal.fire({
          icon: `success`,
          title: `Sukses!`,
          text: `${res.data.message}`,
          confirmButtonColor: "#3399FF",
        });
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      } else {
        swal.fire("Gagal!", res.data.message, 'error');
      }
    } catch (error) {
      if (error.response) {
        swal.fire("Gagal!", "Ada masalah dengan server.", 'error');
      } else if (error.request) {
        swal.fire("Gagal!", "Tidak dapat terhubung ke server.", 'error');
      } else {
        swal.fire("Gagal!", "Terjadi kesalahan.", 'error');
      }
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center bg-image">
      <Navbar />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="10">
            <CCardGroup>

              <CCard className="p-4">
                <CCardBody>
                  <CForm method="post" onSubmit={(e) => validasi(e)}>
                    <h1 style={{ fontWeight: "bold" }}>Masuk</h1>
                    <hr className='hr-text' />
                    <p className="text-muted" style={{ fontSize: "14px" }}>Silahkan mengisi email dan password</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email"
                        onChange={(e) => {
                          handleChangeUser("email", e.target.value);
                        }} />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type={passwordInputType} placeholder="Password" autoComplete="current-password" onChange={(e) => {
                        handleChangeUser("password", e.target.value);
                      }} />
                      <span className="password-toogle-icon">
                        {setPasswordInputType}
                      </span>
                    </CInputGroup>

                    <CRow style={{ marginTop: "120px" }}>
                      <CCol xs="6">
                        <CButton
                          type='submit'
                          className="px-4 btn-young-blue"
                          style={{ fontWeight: "bold" }}
                        >
                          Masuk
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0"
                        // onClick={() => history.push({ pathname: `/course-dashboard` })}  
                        >
                          Lupa password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-youngblue p-2 d-md-down-none" style={{ width: '44%', border: "none" }}>
                <CCardBody className="text-center">
                  <div style={{ marginTop: "75px" }}>
                    <h3><b>Belum Mempunyai Akun?</b></h3>
                    <p style={{ fontSize: "16px" }}>
                      Ayo{" "}
                      <span
                        className="hyperlink"
                        onClick={() => history.push({ pathname: `/register` })}
                      >
                        Daftar Sekarang
                      </span>
                      !
                    </p>

                    <div style={{ position: "absolute", left: "0px", bottom: "0" }}>
                      <img src={loginImage} alt="people learning" style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
