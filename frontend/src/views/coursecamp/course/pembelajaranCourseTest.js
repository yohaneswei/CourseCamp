import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CImg, CTooltip, CButton, CInput, CTextarea } from "@coreui/react"
import React, { useState, useEffect } from "react"
import Navbar from "../dashboard/navbarDashboard"
import '../../style.css'
import { categoryImage } from "src/views/plugins/data"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown, faChevronUp, faPen, faXmark, faFloppyDisk, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from "react-router-dom";
import { api } from '../../plugins/api';
import SyncLoader from "react-spinners/PulseLoader";
import Logo from "../../../gambar/Logo.png"
import Select from 'react-select';
import swal from "sweetalert2"

function PembelajaranCourse() {
    const history = useHistory();
    const id_course = useParams().id_course;
    const id_materi = useParams().id_materi;

    const [edit, setEdit] = useState(false);
    const [course, setCourse] = useState({
        nama_course: "",
        modul: [{
            id_modul: 0,
            nama_modul: "",
            materi: [{
                id_materi: 0,
                nama_materi: ""
            }]
        }]
    })
    const [konten, setKonten] = useState([
        {
            id_konten: 20,
            id_materi: 1,
            text: "",
            URL_GAMBAR: "https://uploads-ssl.webflow.com/6184b461a39ff13bfb8c0556/61de99e8171cc6468145551d_flowchart-symbols-800.png",
            URL_VIDEO: "",
        },
        {
            id_konten: 18,
            id_materi: 1,
            text: "Flowchart atau bagan alur adalah diagram yang menampilkan langkah-langkah dan keputusan untuk melakukan sebuah proses dari suatu program. Setiap langkah digambarkan dalam bentuk diagram dan dihubungkan dengan garis atau arah panah.",
            URL_GAMBAR: "",
            URL_VIDEO: "",
        },
        {
            id_konten: 19,
            id_materi: 1,
            text: "Flowchart berperan penting dalam memutuskan sebuah langkah atau fungsionalitas dari sebuah proyek pembuatan program yang melibatkan banyak orang sekaligus. Selain itu dengan menggunakan bagan alur proses dari sebuah program akan lebih jelas, ringkas, dan mengurangi kemungkinan untuk salah penafsiran. Penggunaan flowchart dalam dunia pemrograman juga merupakan cara yang bagus untuk menghubungkan antara kebutuhan teknis dan non-teknis.",
            URL_GAMBAR: "",
            URL_VIDEO: "",
        },
        {
            id_konten: 20,
            id_materi: 1,
            text: "",
            URL_GAMBAR: "",
            URL_VIDEO: "https://www.youtube-nocookie.com/embed/B1q2q3aDnRY",
        },
    ]);

    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(-1);
    const [selectedKonten, setSelectedKonten] = useState();

    const options = [
        { value: 'Text', label: 'Text' },
        { value: 'Gambar', label: 'Gambar' },
        { value: 'Video', label: 'Video' }
    ];

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(-1);
        }

        setSelected(i)
    }

    function findNextMateriId(data, currentMateriId) {
        for (let modulIndex = 0; modulIndex < data.modul.length; modulIndex++) {
            const modul = data.modul[modulIndex];
            const materiIndex = modul.materi.findIndex(materi => materi.id_materi === currentMateriId);

            if (materiIndex !== -1) {
                if (materiIndex < modul.materi.length - 1) {
                    return modul.materi[materiIndex + 1].id_materi;
                } else {
                    const nextModul = data.modul[modulIndex + 1];
                    toggle(modulIndex + 1)
                    if (nextModul) {
                        return nextModul.materi[0].id_materi;
                    }
                }
            }
        }

        return -1;
    }

    function startingToggle(data, targetId) {// bisa digabung dengan findNextMateriId 
        let moduleIndex = -1;

        for (let modulIndex = 0; modulIndex < data.modul.length; modulIndex++) {
            const modul = data.modul[modulIndex];
            for (let materiIndex = 0; materiIndex < modul.materi.length; materiIndex++) {
                const materi = modul.materi[materiIndex];
                if (materi.id_materi === targetId) {
                    moduleIndex = modulIndex;
                    break;
                }
            }
            if (moduleIndex !== -1) {
                break;
            }
        }

        if (moduleIndex !== -1) {
            toggle(moduleIndex)
        }
    }

    const handleSave = (index, name, value) => {
        const updatedKonten = [...konten];
        updatedKonten[index] = { ...updatedKonten[index], [name]: value };
        console.log(konten[index])
        setKonten(updatedKonten);
    };

    // const validasi = (e, index, value) => {
    //     e.preventDefault()

    //     if (value.length === 0 || value[0] === " ") {
    //         swal.fire('Peringatan!', 'Isi Konten tidak boleh kosong!', 'warning');
    //     }
    //     else {
    //         UpdateMateri(index)
    //     }
    // }

    // const UpdateMateri = (index) => {
    //     api.put(`update-materi`, {
    //         id_materi: konten[index].id_materi,
    //         text: konten[index].text,
    //         URL_IMAGE: konten[index].URL_IMAGE,
    //         URL_VIDEO: konten[index].URL_VIDEO,
    //         token: token
    //     }).then((res) => {
    //         if (res.data.success) {
    //             swal.fire("Sukses!", res.data.message, "success");
    //         } else {
    //             swal.fire("Gagal!", res.data.message, "error")
    //         }
    //     })
    // }

    const DeleteMateri = (index) => {
        api.delete(`delete-materi`, {
            data: {
                id_materi: konten[index].id_materi,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success")
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const ConfirmDeleteMateri = (index) => {
        swal.fire({
            icon: "warning",
            title: `Peringatan!`,
            text: `Apakah anda yakin ingin menghapus materi ini?`,
            confirmButtonText: "Yakin",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Tidak"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteMateri(index)
            }
        })
    }

    useEffect(() => {
        setLoading(true)

        api.post(`get-modul-materi-course/${id_course}`, {
            token: token,
        }).then((res) => {
            let data = res.data.formattedResult;

            if (selected === -1) {
                startingToggle(data, Number(id_materi))
            }

            // setNextId(findNextMateriId(data, Number(id_materi)))
            setCourse(data)
            setLoading(false)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_course, id_materi]);

    return (
        <div className="bg">
            {
                // sebelumnya loading
                false ?
                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", flexDirection: "column" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <img src={Logo} style={{ width: "auto", height: "30px", cursor: "pointer" }} alt="Logo" />
                        </div>
                        <div>
                            <SyncLoader
                                color="#3399FF"
                                loading={loading}
                                size={13}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <CRow style={{ marginTop: "75px" }}>
                                <CCol lg="3">
                                    <div className="overlay">
                                        <CImg
                                            src={categoryImage("C Programming")}
                                            className="img-fluid"
                                            alt={`Logo C Programming`}
                                            style={{ borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", backgroundColor: "white" }}
                                        />

                                        <div className="overlay-title">
                                            <span className="text">{course.nama_course || "judul"}</span>
                                        </div>
                                    </div>

                                    <hr style={{ borderRadius: "30px", marginTop: "-8px" }} />
                                    {
                                        course.modul.length === 0 ?
                                            <div className="accordion bg-white">
                                                Course ini belum memiliki modul
                                            </div>
                                            :
                                            <div className="accordion bg-white" style={{ overflowY: "auto" }}>
                                                {course.modul.map((item, i) => (
                                                    <div className="item" key={i}>
                                                        <div className="modul" onClick={() => toggle(i)}>
                                                            <span>
                                                                <FontAwesomeIcon icon={selected ? faChevronUp : faChevronDown} />
                                                            </span>
                                                            <span className="accordion-modul" style={{ fontSize: "15px" }}>{item.nama_modul} (0/{item.materi.length})</span>
                                                        </div>
                                                        <div className={selected === i ? "content show" : "content"}>
                                                            {
                                                                item.materi.map((item, i) => (
                                                                    <div
                                                                        className="accordion-materi click-materi"
                                                                        style={{ fontSize: "13px" }}
                                                                        key={i}
                                                                        onClick={() => { history.replace(`../../../../course/${id_course}/materi/${item.id_materi}`); }}
                                                                    >
                                                                        <div className={`${item.id_materi === Number(id_materi) && `font-weight-bold`}`}>
                                                                            - {item.nama_materi}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        {/* {data.length - 1 != i && <hr style={{ borderRadius: "60px", marginTop: "5px", marginBottom: "5px" }} />} */}
                                                        <hr style={{ borderRadius: "60px", marginTop: "5px" }} />
                                                    </div>
                                                ))}
                                            </div>
                                    }
                                </CCol>

                                <CCol>
                                    <CCard style={{ borderRadius: "0px 10px 0px 10px", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", maxHeight: "450px", overflowY: "auto" }}>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol>
                                                    <h3 className="d-flex align-items-center">
                                                        {edit === 1 ?
                                                            <CInput
                                                                id="name"
                                                                placeholder="Silahkan isi judul course"
                                                                value={"Apa Itu Flowchart"}
                                                                onChange={() => { }}
                                                            />
                                                            :
                                                            "Apa itu Flowchart"
                                                        }
                                                        {edit ?
                                                            <CTooltip
                                                                content="Simpan"
                                                                placement="top"
                                                            >
                                                                <FontAwesomeIcon
                                                                    style={{ fontSize: "18px", outline: "none", cursor: "pointer" }}
                                                                    className="ml-2 mr-2 icon"
                                                                    icon={faFloppyDisk}
                                                                    color="green"
                                                                    onClick={() => {
                                                                        setEdit(false)
                                                                    }}
                                                                />
                                                            </CTooltip>
                                                            :
                                                            <CTooltip
                                                                content="Ubah"
                                                                placement="top"
                                                            >
                                                                <FontAwesomeIcon
                                                                    style={{ fontSize: "18px", outline: "none", cursor: "pointer" }}
                                                                    className="ml-2 mr-2 icon"
                                                                    icon={faPen}
                                                                    color="blue"
                                                                    onClick={() => {
                                                                        setEdit(true)
                                                                    }}
                                                                />
                                                            </CTooltip>
                                                        }

                                                        <CTooltip
                                                            content="Hapus"
                                                            placement="top"
                                                        >
                                                            <FontAwesomeIcon
                                                                style={{ fontSize: "24px", outline: "none", cursor: "pointer" }}
                                                                icon={faXmark}
                                                                color="red"
                                                                onClick={() => {
                                                                }}
                                                            />
                                                        </CTooltip>
                                                    </h3>
                                                </CCol>
                                                <CCol className="text-right col-auto">
                                                    <CTooltip
                                                        content="Kembali"
                                                        placement="top"
                                                    >
                                                        <CButton
                                                            active
                                                            color="secondary"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            onClick={() => {
                                                                // history.push({ pathname: `../../../../detail-course/${id_course}` })
                                                                history.go(-1)
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowLeft} />
                                                        </CButton>
                                                    </CTooltip>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody >
                                            {
                                                konten.map((item, i) => (
                                                    <div key={i}>
                                                        {
                                                            item.text !== "" ?
                                                                <div>
                                                                    {
                                                                        edit ?
                                                                            <>
                                                                                <CTextarea
                                                                                    id="text"
                                                                                    placeholder="Silahkan isi konten pembahasan"
                                                                                    rows="5"
                                                                                    name="text"
                                                                                    value={item.text}
                                                                                    onChange={(e) => {
                                                                                        handleSave(i, e.target.name, e.target.value);
                                                                                    }}
                                                                                    required
                                                                                />
                                                                                <div>
                                                                                    <CButton
                                                                                        active
                                                                                        color="info"
                                                                                        style={{ fontWeight: "bold" }}
                                                                                        aria-pressed="true"
                                                                                        type="submit"
                                                                                    >
                                                                                        Simpan
                                                                                    </CButton>
                                                                                    <CButton
                                                                                        active
                                                                                        color="danger"
                                                                                        style={{ fontWeight: "bold" }}
                                                                                        aria-pressed="true"
                                                                                        type="submit"
                                                                                        onClick={() => ConfirmDeleteMateri(i)}
                                                                                    >
                                                                                        Hapus
                                                                                    </CButton>
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <p>{item.text}</p>
                                                                    }
                                                                </div>
                                                                :
                                                                item.URL_GAMBAR !== "" ?
                                                                    <div>
                                                                        <div className="text-center">
                                                                            <CImg
                                                                                src={item.URL_GAMBAR}
                                                                                className="img-fluid text-center"
                                                                                alt="gambar konten"
                                                                                style={{ height: "250px" }}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            edit &&
                                                                            <div>
                                                                                <CInput
                                                                                    id="url_gambar"
                                                                                    placeholder="Link gambar"
                                                                                    value={item.URL_GAMBAR}
                                                                                    name="URL_GAMBAR"
                                                                                    onChange={(e) => {
                                                                                        handleSave(i, e.target.name, e.target.value);
                                                                                    }}
                                                                                />
                                                                                <CButton
                                                                                    active
                                                                                    color="info"
                                                                                    style={{ fontWeight: "bold" }}
                                                                                    aria-pressed="true"
                                                                                    type="submit"
                                                                                >
                                                                                    Simpan
                                                                                </CButton>
                                                                                <CButton
                                                                                    active
                                                                                    color="danger"
                                                                                    style={{ fontWeight: "bold" }}
                                                                                    aria-pressed="true"
                                                                                    type="submit"
                                                                                >
                                                                                    Hapus
                                                                                </CButton>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    :
                                                                    (
                                                                        item.URL_VIDEO !== "" &&
                                                                        <div>
                                                                            <div className="text-center">
                                                                                <iframe
                                                                                    width="560"
                                                                                    height="315"
                                                                                    src={`${item.URL_VIDEO}${`?modestbranding=1&rel=0&loop=1&showinfo=0`}`}
                                                                                    style={{ maxWidth: "100%" }}
                                                                                    title="YouTube video player"
                                                                                    frameborder="0"
                                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                    allowfullscreen="allowfullscreen"
                                                                                />
                                                                            </div>
                                                                            {
                                                                                edit &&
                                                                                <div>
                                                                                    <div>
                                                                                        <CInput
                                                                                            id="url_video"
                                                                                            placeholder="Link gambar"
                                                                                            value={item.URL_VIDEO}
                                                                                            name="URL_VIDEO"
                                                                                            onChange={(e) => {
                                                                                                handleSave(i, e.target.name, e.target.value);
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <CButton
                                                                                            active
                                                                                            color="info"
                                                                                            style={{ fontWeight: "bold" }}
                                                                                            aria-pressed="true"
                                                                                            type="submit"
                                                                                        >
                                                                                            Simpan
                                                                                        </CButton>
                                                                                        <CButton
                                                                                            active
                                                                                            color="danger"
                                                                                            style={{ fontWeight: "bold" }}
                                                                                            aria-pressed="true"
                                                                                            type="submit"
                                                                                        >
                                                                                            Hapus
                                                                                        </CButton>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                        }
                                                    </div>
                                                ))
                                            }
                                            {
                                                edit ?
                                                    <div style={{ marginTop: "50px" }}>
                                                        {
                                                            selectedKonten && selectedKonten.value === "Text" ?
                                                                <div>
                                                                    <CTextarea
                                                                        id="text"
                                                                        placeholder="Silahkan isi konten pembahasan"
                                                                        rows="5"
                                                                        name="text"
                                                                        required
                                                                    />
                                                                </div>
                                                                :
                                                                <div>
                                                                    {console.log(selectedKonten)}
                                                                    <CInput
                                                                        id="url_video"
                                                                        placeholder="Link gambar"
                                                                        value=""
                                                                        name="URL_VIDEO"
                                                                        onChange={(e) => {
                                                                        }}
                                                                    />
                                                                </div>
                                                        }
                                                        <Select
                                                            defaultValue={selectedKonten}
                                                            onChange={setSelectedKonten}
                                                            options={options}
                                                            placeholder="Tambah Konten"
                                                            isSearchable={false}
                                                            styles={{
                                                                indicatorSeparator: state => ({
                                                                    display: 'none',
                                                                }),
                                                            }}
                                                        />
                                                    </div>
                                                    :
                                                    <div
                                                        className="content-center"
                                                        style={{ marginTop: "50px" }}
                                                    >
                                                        <CButton
                                                            active
                                                            className="next-button"
                                                            type="submit"
                                                            onClick={() => {
                                                                history.replace(`../../../../course/${id_course}/materi/${findNextMateriId(course, Number(id_materi))}`);
                                                            }}
                                                        >
                                                            Selanjutnya
                                                            <FontAwesomeIcon icon={faAngleRight} style={{ color: "black", fontSize: "20px", marginLeft: "10px" }} />
                                                        </CButton>
                                                    </div>
                                            }
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CContainer >
                    </>
            }
        </div>
    )
}


export default PembelajaranCourse