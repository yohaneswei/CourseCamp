import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CContainer, CButton, CCol, CRow, CImg, CInput, CForm, CTooltip, CSwitch, CModal, CModalFooter, CModalBody, CModalHeader, CModalTitle, CLabel, CFormGroup, CInputRadio, CTextarea } from "@coreui/react";
import Navbar from "../dashboard/navbarDashboard";
import "../style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown, faChevronUp, faEye, faEyeSlash, faPen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { api, authToken } from '../../plugins/api';
import swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import "moment/locale/id";
import { categoryImage } from "../../plugins/data";
import Loader from "../component/Loader";

function EditCourse() {
    const [course, setCourse] = useState({
        nama: "",
        kategori: "",
        kesulitan: "",
        deskripsi: "",
        tgl_dibuat: "",
        sumber: "",
        status: null
    })
    const [modul, setModul] = useState({
        nama_course: "",
        modul: [{
            id_modul: 0,
            nama_modul: "",
            materi: [{
                id_materi: 0,
                nama_materi: "",
                is_latihan: false
            }]
        }]
    })

    const [namaModul, setNamaModul] = useState("");
    const [namaMateri, setNamaMateri] = useState("");
    const [isLatihan, setIsLatihan] = useState(0);
    const [idModul, setIDModul] = useState(-1);
    const [idMateri, setIDMateri] = useState(-1);

    const [selected, setSelected] = useState(-1);
    const [showMenuModul, setShowMenuModul] = useState(-1);
    const [showMenuMateri, setShowMenuMateri] = useState(-1);

    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [selectedDifficulty, setSelectedDifficulty] = useState();
    const difficultyOptions = [
        { value: 'Mudah', label: 'Mudah' },
        { value: 'Menengah', label: 'Menengah' },
        { value: 'Sulit', label: 'Sulit' }
    ];

    const [modalTambahModul, setModalTambahModul] = useState(false);
    const [modalTambahMateri, setModalTambahMateri] = useState(false);
    const [modalUpdateModul, setModalUpdateModul] = useState(false);
    const [modalUpdateMateri, setModalUpdateMateri] = useState(false);

    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const token = localStorage.getItem("token")

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(-1);
        }

        setSelected(i)
    }

    const handleChangeCourse = (name, value) => {
        setCourse({ ...course, [name]: value });
    };

    const validasi = (e) => {
        e.preventDefault()

        if (course.nama.length === 0) {
            swal.fire('Peringatan!', 'Judul tidak boleh kosong!', 'warning');
        }
        else if (!selectedCategory) {
            swal.fire('Peringatan!', 'Kategori tidak boleh kosong!', 'warning');
        }
        else if (!selectedDifficulty) {
            swal.fire('Peringatan!', 'Tingkat Kesulitan tidak boleh kosong!', 'warning');
        }
        else if (course.deskripsi.length === 0) {
            swal.fire('Peringatan!', 'Deskripsi tidak boleh kosong!', 'warning');
        }
        else if (course.deskripsi[0] === " " || course.nama[0] === " ") {
            swal.fire('Peringatan', "Jangan menggunakan spasi pada awal kata, jika mengalami masalah silahkan muat ulang!", 'warning');
        }
        else if (course.nama.length > 100) {
            swal.fire('Peringatan!', 'Judul tidak boleh melebihi 100 kata', 'warning');
        }
        else if (course.deskripsi.length > 600) {
            swal.fire('Peringatan', "Maksimal Karakter untuk Deskripsi adalah 600", 'warning');
        }
        else if (course.sumber.length === 0) {
            swal.fire('Peringatan!', 'Sumber tidak boleh kosong!', 'warning');
        }
        else {
            UpdateCourse()
        }
    }

    const UpdateCourse = () => {
        api.put(`update-course`, {
            id_category: selectedCategory.value,
            nama: course.nama,
            kesulitan: selectedDifficulty.value,
            deskripsi: course.deskripsi,
            sumber: course.sumber,
            status: course.status,
            id_course: id,
            token: token
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success");
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const InsertModul = (e) => {
        e.preventDefault();

        api.post(`insert-modul`, {
            id_course: id,
            nama: namaModul,
            token: token
        }).then((res) => {
            swal.fire("Sukses", res.data.message, "success")
            setNamaModul("")
            getModul()
        })
    }

    const InsertMateri = (e) => {
        e.preventDefault();

        api.post(`insert-materi`, {
            id_modul: idModul,
            nama: namaMateri,
            is_latihan: isLatihan,
            token: token
        }).then((res) => {
            swal.fire("Sukses", res.data.message, "success")
            setIDModul(-1)
            setNamaMateri("")
            setIsLatihan(0)
            getModul()
            setModalTambahMateri(!modalTambahMateri)
        })
    }

    const UpdateModul = (e) => {
        e.preventDefault();

        api.put(`update-modul`, {
            nama: namaModul,
            id_modul: idModul,
            token: token
        }).then((res) => {
            swal.fire("Sukses", res.data.message, "success")
            setIDModul(-1)
            getModul()
        })
    }

    const DeleteModul = (id_modul) => {
        api.delete(`delete-modul`, {
            data: {
                id_modul: id_modul,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success")
                getModul()
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const ConfirmDeleteModul = (nama_modul, id_modul) => {
        swal.fire({
            icon: "warning",
            title: `Peringatan!`,
            html: `Apakah anda yakin ingin menghapus modul "<strong>${nama_modul}</strong>" beserta materi didalamnya?`,
            confirmButtonText: "Yakin",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Tidak"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteModul(id_modul)
            }
        })
    }

    const UpdateMateri = (e) => {
        e.preventDefault()

        api.put(`update-materi`, {
            id_materi: idMateri,
            nama: namaMateri,
            is_latihan: isLatihan,
            token: token
        }).then((res) => {
            swal.fire("Sukses", res.data.message, "success")
            setIDMateri(-1)
            setNamaMateri("")
            setIsLatihan(0)
            getModul()
        })
    }

    const DeleteMateri = (id_materi) => {
        api.delete(`delete-materi`, {
            data: {
                id_materi: id_materi,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success")
                getModul()
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const ConfirmDeleteMateri = (nama_materi, id_materi) => {
        swal.fire({
            icon: "warning",
            title: `Peringatan!`,
            html: `Apakah anda yakin ingin menghapus materi "<strong>${nama_materi}</strong>" ini?`,
            confirmButtonText: "Yakin",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Tidak"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteMateri(id_materi)
            }
        })
    }

    const getDetailCourse = () => {
        api.post(`detail-course-edit/${id}`, {
            token: token
        }).then((res) => {
            setCourse(res.data.result[0])

            setSelectedMainCategory({ value: res.data.result[0].id_main, label: res.data.result[0].main_kategori })
            setSelectedCategory({ value: res.data.result[0].id_category, id_main: res.data.result[0].id_main, label: res.data.result[0].kategori })
            setSelectedDifficulty({ value: res.data.result[0].kesulitan, label: res.data.result[0].kesulitan })

            setLoading(false)
        })
    }

    const getMainCategoriesOptions = () => {
        api.post(`get-maincategories-option`, {
            token: token
        }).then((res) => {
            setMainCategoryOptions(res.data.result);
            setLoading(false)
        })
    }

    const getCategoriesOptions = () => {
        api.post(`get-subcategories-option`, {
            token: token
        }).then((res) => {
            setCategoryOptions(res.data.result);
            setLoading(false)
        })
    }

    const getModul = () => {
        api.post(`get-modul-materi-course/${id}`, {
            token: token,
        }).then((res) => {
            setModul(res.data.formattedResult)
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)

        if (authToken().isa === 0) {
            history.push({ pathname: `../course-dashboard` })
        }

        getDetailCourse();

        getMainCategoriesOptions()
        getCategoriesOptions();

        getModul();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleMainCategoryChange = (selectedOption) => {
        setSelectedMainCategory(selectedOption);
        if (selectedCategory) {
            setSelectedCategory(null);
        }
    };

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <CCard style={{ marginTop: "75px", borderRadius: "10px" }}>
                                <CCardBody>
                                    <CForm method="POST" onSubmit={(e) => validasi(e)}>
                                        <CRow>
                                            <CCol xxs="12" xs="12" sm="12" md="4" >
                                                <div style={{ position: "sticky", top: "100px" }}>
                                                    <CImg
                                                        src={categoryImage(selectedCategory && selectedCategory.label)}
                                                        className="img-fluid mb-2"
                                                        style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.3)", borderRadius: "10px" }}
                                                    />
                                                    <div>
                                                        <CButton
                                                            active
                                                            block
                                                            color="info"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            type="submit"
                                                        >
                                                            Simpan
                                                        </CButton>

                                                        <CButton
                                                            active
                                                            block
                                                            color="secondary"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            onClick={() => {
                                                                history.push({ pathname: `../detail-course/${id}` })
                                                                // history.go(-1)
                                                            }}
                                                        >
                                                            Kembali
                                                        </CButton>
                                                    </div>

                                                    <hr style={{ height: "1px", borderWidth: "0", color: "black", backgroundColor: "black", borderRadius: "60px" }} />

                                                    <CRow>
                                                        <CCol xxs="3" xs="3" sm="3" md="3"></CCol>
                                                        <CCol className="text-center" xxs="6" xs="6" sm="6" md="6" xl="6">
                                                            <FontAwesomeIcon className="fa-1x" icon={course.status ? faEye : faEyeSlash} />

                                                            <span className="ml-2" >
                                                                Visibility - {course.status ?
                                                                    <span style={{ color: "#06D13F" }}>ON</span>
                                                                    :
                                                                    <span style={{ color: "#FF0000" }}>OFF</span>}
                                                            </span>
                                                        </CCol>
                                                        <CCol className="text-right" xxs="3" xs="3" sm="3" md="3">
                                                            <CSwitch className={'mx-1'} size="sm" variant={'3d'} color={'success'} defaultChecked={course.status} onClick={() => handleChangeCourse("status", !course.status)} />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                            </CCol>

                                            <CCol md="8">
                                                <CRow>
                                                    <CCol>
                                                        <CInput
                                                            id="name"
                                                            placeholder="Silahkan isi judul course"
                                                            maxLength={100}
                                                            value={course.nama}
                                                            onChange={(e) => handleChangeCourse("nama", e.target.value)}
                                                        />
                                                    </CCol>

                                                    <CCol className="col-auto">
                                                        <CTooltip
                                                            content="Kembali"
                                                            placement="top"
                                                        >
                                                            <CButton
                                                                active
                                                                color="secondary"
                                                                style={{ fontWeight: "bold" }}
                                                                aria-pressed="true" onClick={() =>
                                                                    history.push({
                                                                        pathname: `../detail-course/${id}`
                                                                    })}
                                                            >
                                                                <FontAwesomeIcon icon={faArrowLeft} />
                                                            </CButton>
                                                        </CTooltip>
                                                    </CCol>
                                                </CRow>
                                                <div className="mt-2">
                                                    <div className="title">
                                                        Kategori:
                                                    </div>
                                                    <CRow>
                                                        <CCol md="4">
                                                            {
                                                                selectedMainCategory &&
                                                                <Select
                                                                    value={selectedMainCategory}
                                                                    onChange={handleMainCategoryChange}
                                                                    options={mainCategoryOptions}
                                                                    placeholder="Pilih Jenis Pemrograman"
                                                                />
                                                            }
                                                        </CCol>

                                                        <CCol md="4">
                                                            <Select
                                                                value={selectedCategory}
                                                                onChange={setSelectedCategory}
                                                                options={categoryOptions.filter((data) => data.id_main === selectedMainCategory.value)}
                                                                placeholder="Pilih Bahasa Pemrograman"
                                                                isDisabled={!selectedMainCategory}
                                                            />

                                                        </CCol>
                                                    </CRow>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="title">
                                                        Tingkat Kesulitan:
                                                    </div>
                                                    <CRow>
                                                        <CCol md="4">
                                                            {
                                                                selectedDifficulty &&
                                                                <Select
                                                                    defaultValue={selectedDifficulty}
                                                                    onChange={setSelectedDifficulty}
                                                                    options={difficultyOptions}
                                                                    placeholder="Pilih Tingkat Kesulitan"
                                                                />
                                                            }
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                                <>
                                                    {/* <CRow className="mt-3">
                                                    <CCol sm="6" md="6" xl="4" className="mb-3">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2 avatar-title rounded">
                                                                    <FontAwesomeIcon className="fa-3x" icon={faUser} />
                                                                </div>
                                                                <div className="flex-grow-1 ml-3">
                                                                    <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                        Diikuti:
                                                                    </p>
                                                                    <div className="mb-0">
                                                                        123 Pelajar
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                    <CCol sm="6" md="6" xl="4" className="mb-3">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2 avatar-title rounded">
                                                                    <CIcon name="cil-layers" alt="Module" height="30" />
                                                                </div>
                                                                <div className="flex-grow-1 ml-3">
                                                                    <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                        Mempelajari:
                                                                    </p>
                                                                    <div className="mb-0">
                                                                        {modul.length} Modul
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                    <CCol sm="12" md="12" xl="4" className="mb-3">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2 avatar-title rounded">
                                                                    <CIcon name="cil-calendar" alt="Module" height="30" />
                                                                </div>
                                                                <div className="flex-grow-1 ml-3">
                                                                    <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                        Diunggah:
                                                                    </p>
                                                                    <div className="mb-0">
                                                                        {moment(course.tgl_dibuat).format("DD MMM YYYY")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow> */}
                                                </>
                                                {/* comment */}

                                                <div className="mt-2">
                                                    <div className="title">
                                                        Deskripsi :
                                                    </div>
                                                    <div className="description">
                                                        <CTextarea
                                                            id="description"
                                                            placeholder="Silahkan isi deskripsi course"
                                                            rows="5"
                                                            style={{ resize: "none" }}
                                                            maxLength={600}
                                                            value={course.deskripsi}
                                                            onChange={(e) => handleChangeCourse("deskripsi", e.target.value)}
                                                        />
                                                        {/* <TextEditor name={course.deskripsi} handleChange={handleChangeCourse} /> */}
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="title">
                                                        Modul :
                                                    </div>
                                                    <div className="mb-3">
                                                        <CButton
                                                            active
                                                            color="success"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            onClick={() => {
                                                                setModalTambahModul(!modalTambahModul);
                                                                setNamaModul("")
                                                            }}
                                                        >
                                                            Tambah Modul
                                                        </CButton>
                                                    </div>
                                                    <div>
                                                        {
                                                            modul.modul.length === 0 ?
                                                                "Belum terdapat modul pada Course ini"
                                                                :
                                                                <div className="accordion" >
                                                                    {modul.modul.map((item, i) => (
                                                                        <div className="item" key={i}>
                                                                            <div className="modul"
                                                                                onMouseEnter={() => { setShowMenuModul(i) }}
                                                                                onMouseLeave={() => { setShowMenuModul(-1) }}
                                                                            >
                                                                                <CRow>
                                                                                    <CCol
                                                                                        onClick={() =>
                                                                                            toggle(i)
                                                                                        }
                                                                                    >
                                                                                        <span>{selected === i ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</span>
                                                                                        <span className="accordion-modul" style={{ fontSize: "16px" }}>{item.nama_modul} ({item.materi.length})</span>
                                                                                    </CCol>

                                                                                    <CCol className="col-auto">
                                                                                        {showMenuModul === i &&
                                                                                            <div>
                                                                                                <CTooltip
                                                                                                    content="Tambah Materi"
                                                                                                    placement="top"
                                                                                                >
                                                                                                    <FontAwesomeIcon
                                                                                                        style={{ fontSize: "12px", outline: "none", cursor: "pointer" }}
                                                                                                        icon={faPlus}
                                                                                                        color="green"
                                                                                                        onClick={() => {
                                                                                                            setNamaModul(item.nama_modul);
                                                                                                            setIDModul(item.id_modul)
                                                                                                            setModalTambahMateri(!modalTambahMateri);
                                                                                                            setNamaMateri("")
                                                                                                        }}
                                                                                                    />
                                                                                                </CTooltip>

                                                                                                <CTooltip
                                                                                                    content="Ubah Modul"
                                                                                                    placement="top"
                                                                                                >
                                                                                                    <FontAwesomeIcon
                                                                                                        style={{ fontSize: "10px", outline: "none", cursor: "pointer" }}
                                                                                                        className="ml-2 mr-2"
                                                                                                        icon={faPen}
                                                                                                        color="blue"
                                                                                                        onClick={() => {
                                                                                                            setNamaModul(item.nama_modul);
                                                                                                            setIDModul(item.id_modul)
                                                                                                            setModalUpdateModul(!modalUpdateModul);
                                                                                                        }}
                                                                                                    />
                                                                                                </CTooltip>

                                                                                                <CTooltip
                                                                                                    content="Hapus Modul"
                                                                                                    placement="top"
                                                                                                >
                                                                                                    <FontAwesomeIcon
                                                                                                        style={{ fontSize: "13px", outline: "none", cursor: "pointer" }}
                                                                                                        icon={faXmark}
                                                                                                        color="red"
                                                                                                        onClick={() => {
                                                                                                            ConfirmDeleteModul(item.nama_modul, item.id_modul)
                                                                                                        }}
                                                                                                    />
                                                                                                </CTooltip>
                                                                                            </div>
                                                                                        }
                                                                                    </CCol>
                                                                                </CRow>
                                                                            </div>

                                                                            <div className={selected === i ? "content show" : "content"}>
                                                                                {
                                                                                    item.materi.map((item, i) => (
                                                                                        <div
                                                                                            className="accordion-materi"
                                                                                            style={{ fontSize: "11px" }}
                                                                                            key={i}
                                                                                            onMouseEnter={() => { setShowMenuMateri(i) }}
                                                                                            onMouseLeave={() => { setShowMenuMateri(-1) }}
                                                                                        >
                                                                                            <CRow>
                                                                                                <CCol>
                                                                                                    - {item.nama_materi}
                                                                                                </CCol>

                                                                                                <CCol className="col-auto">
                                                                                                    {showMenuMateri === i &&
                                                                                                        <div>
                                                                                                            <CTooltip
                                                                                                                content="Ubah Nama Materi"
                                                                                                                placement="top"
                                                                                                            >
                                                                                                                <FontAwesomeIcon
                                                                                                                    style={{ fontSize: "10px", outline: "none", cursor: "pointer" }}
                                                                                                                    className="ml-2 mr-2"
                                                                                                                    icon={faPen}
                                                                                                                    color="blue"
                                                                                                                    onClick={() => {
                                                                                                                        setNamaMateri(item.nama_materi);
                                                                                                                        setIDMateri(item.id_materi)
                                                                                                                        setIsLatihan(item.is_latihan)
                                                                                                                        setModalUpdateMateri(!modalUpdateMateri);
                                                                                                                    }}
                                                                                                                />
                                                                                                            </CTooltip>

                                                                                                            <CTooltip
                                                                                                                content="Hapus Materi"
                                                                                                                placement="top"
                                                                                                            >
                                                                                                                <FontAwesomeIcon
                                                                                                                    style={{ fontSize: "13px", outline: "none", cursor: "pointer" }}
                                                                                                                    icon={faXmark}
                                                                                                                    color="red"
                                                                                                                    onClick={() => {
                                                                                                                        ConfirmDeleteMateri(item.nama_materi, item.id_materi)
                                                                                                                    }}
                                                                                                                />
                                                                                                            </CTooltip>
                                                                                                        </div>
                                                                                                    }
                                                                                                </CCol>
                                                                                            </CRow>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                            <hr style={{ borderRadius: "60px", marginTop: "5px" }} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="title">
                                                        Sumber :
                                                    </div>
                                                    <CInput
                                                        id="sumber"
                                                        placeholder="Silahkan isi sumber course"
                                                        maxLength={100}
                                                        value={course.sumber}
                                                        onChange={(e) => handleChangeCourse("sumber", e.target.value)}
                                                    />
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>

                            <CModal
                                show={modalTambahModul}
                                onClose={setModalTambahModul}
                                color="success"
                                closeOnBackdrop={false}
                            >
                                <CForm method="POST" onSubmit={(e) => { InsertModul(e) }}>
                                    <CModalHeader closeButton>
                                        <CModalTitle>Tambah Modul</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CFormGroup>
                                            <CLabel htmlFor="modul">Nama Modul</CLabel>
                                            <CInput
                                                name="modul"
                                                maxLength="50"
                                                type="text"
                                                id="modul"
                                                value={namaModul}
                                                placeholder="Nama Modul yang akan ditambahkan"
                                                onChange={(e) => { setNamaModul(e.target.value) }}
                                                required
                                            />
                                        </CFormGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton type="submit" onClick={() => setModalTambahModul(!modalTambahModul)} color="success">Tambah Modul</CButton>{' '}
                                        <CButton color="secondary" onClick={() => setModalTambahModul(!modalTambahModul)}>Batal</CButton>
                                    </CModalFooter>
                                </CForm>
                            </CModal>

                            <CModal
                                show={modalTambahMateri}
                                onClose={setModalTambahMateri}
                                color="success"
                            >
                                <CForm method="POST" onSubmit={(e) => { InsertMateri(e) }}>
                                    <CModalHeader closeButton>
                                        <CModalTitle>Tambah Materi</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CFormGroup>
                                            <CLabel htmlFor="modul">Nama Modul</CLabel>
                                            <CInput
                                                name="modul"
                                                disabled
                                                maxLength="50"
                                                type="text"
                                                id="modul"
                                                value={namaModul}
                                                placeholder="Nama Modul yang akan ditambahkan"
                                                required
                                            />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="materi">Nama Materi</CLabel>
                                            <CInput
                                                name="materi"
                                                maxLength="75"
                                                type="text"
                                                id="materi"
                                                value={namaMateri}
                                                placeholder="Nama Materi yang akan ditambahkan"
                                                onChange={(e) => { setNamaMateri(e.target.value) }}
                                                required
                                            />
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CRow>
                                                <CCol>
                                                    <CLabel htmlFor="jenis_materi">Jenis Materi:</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio custom id="inline-radio1" checked={!isLatihan} name="inline-radios" value="0" onChange={(e) => { setIsLatihan(!e.target.checked); }} />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Konten</CLabel>
                                                    </CFormGroup>
                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio custom id="inline-radio2" checked={isLatihan} name="inline-radios" value="1" onChange={(e) => { setIsLatihan(e.target.checked); }} />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Latihan</CLabel>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </CFormGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton type="submit" color="success">Tambah Materi</CButton>{' '}
                                        <CButton color="secondary" onClick={() => setModalTambahMateri(!modalTambahMateri)}>Batal</CButton>
                                    </CModalFooter>
                                </CForm>
                            </CModal>

                            <CModal
                                show={modalUpdateModul}
                                onClose={setModalUpdateModul}
                                color="primary"
                            >
                                <CForm method="POST" onSubmit={(e) => { UpdateModul(e) }}>
                                    <CModalHeader closeButton>
                                        <CModalTitle>Ubah Modul</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CFormGroup>
                                            <CLabel htmlFor="modul">Nama Modul</CLabel>
                                            <CInput
                                                minLength="4"
                                                name="modul"
                                                maxLength="50"
                                                type="text"
                                                id="modul"
                                                value={namaModul}
                                                placeholder="Nama Modul yang akan ditambahkan"
                                                onChange={(e) => { setNamaModul(e.target.value) }}
                                                required />
                                        </CFormGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton type="submit" onClick={() => setModalUpdateModul(!modalUpdateModul)} color="primary">Ubah Modul</CButton>{' '}
                                        <CButton color="secondary" onClick={() => setModalUpdateModul(!modalUpdateModul)}>Batal</CButton>
                                    </CModalFooter>
                                </CForm>
                            </CModal>

                            <CModal
                                show={modalUpdateMateri}
                                onClose={setModalUpdateMateri}
                                color="primary"
                            >
                                <CForm method="POST" onSubmit={(e) => { UpdateMateri(e) }}>
                                    <CModalHeader closeButton>
                                        <CModalTitle>Ubah Materi</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CFormGroup>
                                            <CLabel htmlFor="materi">Nama Materi</CLabel>
                                            <CInput
                                                minLength="4"
                                                name="materi"
                                                maxLength="75"
                                                type="text"
                                                id="materi"
                                                value={namaMateri}
                                                placeholder="Masukkan Nama Materi"
                                                onChange={(e) => { setNamaMateri(e.target.value) }}
                                                required />
                                        </CFormGroup>

                                        <CFormGroup>
                                            <CRow>
                                                <CCol>
                                                    <CLabel htmlFor="jenis_materi">Jenis Materi:</CLabel>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio disabled custom id="inline-radio1" checked={!isLatihan} name="inline-radios" value="0" />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Konten</CLabel>
                                                    </CFormGroup>
                                                    <CFormGroup variant="custom-radio" inline>
                                                        <CInputRadio disabled custom id="inline-radio2" checked={isLatihan} name="inline-radios" value="1" />
                                                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Latihan</CLabel>
                                                    </CFormGroup>

                                                </CCol>
                                            </CRow>
                                        </CFormGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton type="success" onClick={() => setModalUpdateMateri(!modalUpdateMateri)} color="primary">Ubah Materi</CButton>{' '}
                                        <CButton color="secondary" onClick={() => setModalUpdateMateri(!modalUpdateMateri)}>Batal</CButton>
                                    </CModalFooter>
                                </CForm>
                            </CModal>
                        </CContainer >
                    </>
            }
        </div >
    )
}


export default EditCourse;