import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Navbar from './navbar'
import usePasswordToggle from '../component/usePasswordToggle';
import swal from "sweetalert2";
import Select from 'react-select';
import { api } from '../../plugins/api';
import { useHistory } from "react-router-dom";
import "../style.css";

const Register = () => {
  const [user, setUser] = useState({
    nama: "",
    email: "",
    password: ""
  });

  const [categories, setCategories] = useState([{}])
  const [selectedOption, setSelectedOption] = useState(null);
  const [passwordInputType, setPasswordInputType] = usePasswordToggle();

  const history = useHistory();

  const handleChangeUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const validasi = (e) => {
    e.preventDefault()
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (user.nama.length === 0) {
      swal.fire('Peringatan!', 'Nama tidak boleh kosong!', 'warning');
    }
    else if (user.email.length === 0) {
      swal.fire('Peringatan!', 'Email tidak boleh kosong!', 'warning');
    }
    else if (!(emailRegex.test(user.email))) {
      swal.fire('Peringatan!', 'Format email salah!', 'warning');
    }
    else if (user.password.length === 0) {
      swal.fire('Peringatan!', 'Password tidak boleh kosong!', 'warning');
    }
    else if (selectedOption.length === 0) {
      swal.fire('Peringatan!', 'Minat belajar tidak boleh kosong!', 'warning');
    }
    else {
      RegisterAPI()
    }
  }

  const RegisterAPI = () => {
    api.post(`register`, {
      nama: user.nama,
      email: user.email,
      password: user.password,
    }).then((res) => {
      if (res.data.success) {
        api.post(`get-id-user`, {
          email: user.email
        }).then((res) => {
          selectedOption.map((d) => {
            return (
              api.post(`add-minat`, {
                id_user: res.data.result[0].id_user,
                id_skill: d.value,
              })
            )
          })
        })
        swal.fire('Sukses', res.data.message, 'success');
        history.push({ pathname: `/login` })
      } else {
        swal.fire('Gagal', 'Email ini sudah digunakan!', 'error');
      }
    })
  }

  const getCategories = () => {
    api.get(`get-skills`).then((res) => {
      setCategories(res.data.result);
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="c-app c-default-layout flex-row align-items-center bg-image">
      <Navbar />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm method="post" onSubmit={(e) => validasi(e)}>
                  <h1>Daftar</h1>
                  <hr className='hr-text' />
                  <p className="text-muted">Buat akunmu</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Masukkan Nama Lengkap" autoComplete="nama lengkap"
                      value={user.nama}
                      onChange={(e) => {
                        handleChangeUser("nama", e.target.value);
                      }} />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput placeholder="Masukkan Alamat Email" autoComplete="email"
                      value={user.email}
                      onChange={(e) => {
                        handleChangeUser("email", e.target.value);
                      }} />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type={passwordInputType} placeholder="Masukkan Sandi" autoComplete="new-password"
                      value={user.password}
                      onChange={(e) => {
                        handleChangeUser("password", e.target.value);
                      }} />
                    <span className="password-toogle-icon">
                      {setPasswordInputType}
                    </span>
                  </CInputGroup>

                  <CRow className="mb-4">
                    <CCol>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={categories}
                        placeholder="Pilih Minat Belajar(maksimal 3)"
                        isMulti
                        isOptionDisabled={() => selectedOption && selectedOption.length >= 3}
                        styles={{
                          indicatorSeparator: state => ({
                            display: 'none',
                          }),
                        }}
                      />
                    </CCol>
                  </CRow>

                  <CButton color="success" block type='submit'>Daftar</CButton>
                </CForm>
              </CCardBody>

              <CCardFooter className="p-3">
                <CRow className="text-center">
                  <CCol>
                    Sudah Memiliki Akun? <span className="hyperlink" onClick={() => history.push({ pathname: `/login` })}>Masuk</span>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default Register
