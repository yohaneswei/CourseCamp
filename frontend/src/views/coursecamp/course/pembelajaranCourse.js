import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CImg, CTooltip, CButton, CInput, CCardFooter, CFormGroup, CLabel, CInputRadio, CModal, CModalBody, CModalFooter, CModalTitle, CForm, CModalHeader, CInputCheckbox } from "@coreui/react"
import React, { useState, useEffect } from "react"
import '../style.css'
import { categoryImage } from "src/views/plugins/data"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronDown, faChevronUp, faPen, faAngleRight, faCheck, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from "react-router-dom";
import { api, authToken } from '../../plugins/api';
import Select from 'react-select';
import swal from "sweetalert2"
import Loader from "../component/Loader";
import parse from "html-react-parser"
import TextEditor from "../component/TextEditor";
import NotFound from "../../gambar/main_category/Not_Found.jpg"
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

function PembelajaranCourse() {
    const history = useHistory();
    const id_course = useParams().id_course;
    const id_materi = useParams().id_materi;

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(-1);

    const [currentMateri, setCurrentMateri] = useState();
    const [availableMateri, setAvailableMateri] = useState();
    const [course, setCourse] = useState({
        nama_course: "",
        nama_kategori: "",
        sumber: "",
        modul: [{
            id_modul: 0,
            nama_modul: "",
            materi: [{
                id_materi: 0,
                nama_materi: "",
                is_latihan: 0,
                skor: 0,
                status: 0
            }]
        }]
    })
    const [indexPertanyaan, setIndexPertanyaan] = useState(0)
    const [startLatihan, setStartLatihan] = useState(false)
    const [hasilLatihan, setHasilLatihan] = useState({
        benar: 0,
        jumlah: 0,
        skor: 0
    })

    const token = localStorage.getItem("token");
    const [imageWidth, setImageWidth] = useState(null);

    const handleImageLoad = (event) => {
        setImageWidth(event.target.width + 10);
    }

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
                    if (nextModul) {
                        toggle(modulIndex + 1)
                        return nextModul.materi[0].id_materi;
                    }
                }
            }
        }

        return -1;
    }

    function getNamaMateriAndIndexById(data, idMateri) {
        for (const [index, modul] of data.modul.entries()) {
            const foundMateri = modul.materi.find((materi) => materi.id_materi === idMateri);
            if (foundMateri) {
                foundMateri.index_modul = index;
                return foundMateri;
            }
        }
        return null;
    }

    const UpdateProgress = () => {
        if (!(currentMateri.status)) {
            if (currentMateri.is_latihan) {
                if (currentMateri.skor >= 75) {
                    const nextId = findNextMateriId(course, Number(id_materi))

                    api.post(`update-progress`, {
                        id_user: authToken().uid,
                        id_course: id_course,
                        id_materi: id_materi,
                        token: token
                    }).then(() => {
                        history.replace(`../../../../course/${id_course}/materi/${nextId}`);
                    })
                } else {
                    swal.fire("", "Untuk menuju ke materi selanjutnya, anda harus memiliki skor minimal 75", "error")
                }
            } else {
                const nextId = findNextMateriId(course, Number(id_materi))

                api.post(`update-progress`, {
                    id_user: authToken().uid,
                    id_course: id_course,
                    id_materi: id_materi,
                    token: token
                }).then(() => {
                    history.replace(`../../../../course/${id_course}/materi/${nextId}`);
                })
            }
        } else {
            const nextId = findNextMateriId(course, Number(id_materi))

            if (nextId >= 0) {
                history.replace(`../../../../course/${id_course}/materi/${nextId}`)
            } else {
                api.put(`complete-course`, {
                    id_course: id_course,
                    token: token
                }).then(() => {
                    swal.fire("Selamat!", "Selamat! Anda berhasil menyelesaikan kursus ini. Silahkan beri penilaian Anda tentang course ini. Terima kasih!", "success").then(() => {
                        history.replace(`../../../../course/${id_course}/materi/${nextId}`)
                    })
                })
            }
        }
    }

    useEffect(() => {
        setLoading(true)

        api.post(`get-progress-learn`, {
            id_user: authToken().uid,
            id_course: id_course,
            token: token,
        }).then((res) => {
            let data = res.data.formattedResult;
            let foundMateri = getNamaMateriAndIndexById(data, Number(id_materi))

            if (foundMateri) {
                if (selected === -1) {
                    toggle(foundMateri.index_modul)
                }
                // setHasilLatihan({
                //     benar: 0,
                //     jumlah: 0,
                //     skor: 0
                // })
                setCurrentMateri(foundMateri)
                setCourse(data)
                setLoading(false)
            } else {
                history.replace(`../../../../detail-course/${id_course}`);
            }
        })

        api.post(`next-progress-learn`, {
            id_user: authToken().uid,
            id_course: id_course,
            token: token
        }).then((res) => {
            if (res.data.result[0]) {
                setAvailableMateri(res.data.result[0].id_materi)
            }
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_course, id_materi]);

    return (
        <div className="bg">
            {
                false ?
                    <Loader loading={loading} />
                    :
                    <div>
                        <CRow>
                            <CCol className="col-auto" style={{ paddingRight: "0px", maxWidth: `${imageWidth}px` }}>
                                <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
                                    <div className="overlay" style={{ marginBottom: "10px" }}>
                                        <CImg
                                            onLoad={handleImageLoad}
                                            src={categoryImage(course.nama_kategori)}
                                            className="img-fluid"
                                            alt={`Logo C Programming`}
                                            style={{ borderRadius: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.25)", backgroundColor: "white", height: "300px" }}
                                        />
                                        <div className="overlay-title">
                                            <span className="text">{course.nama_course || "judul course"}</span>
                                        </div>
                                    </div>
                                    {
                                        course.modul.length === 0 ?
                                            <div className="accordion bg-white">
                                                Course ini belum memiliki modul
                                            </div>
                                            :
                                            <div className="accordion bg-white">
                                                {course.modul.map((item, i) => (
                                                    <div className="item" key={i}>
                                                        <div className="modul" onClick={() => toggle(i)}>
                                                            <span>
                                                                <FontAwesomeIcon icon={selected === i ? faChevronUp : faChevronDown} />
                                                            </span>
                                                            <span className="accordion-modul" style={{ fontSize: "15px" }}>{item.nama_modul} ({item.materi.filter((item) => item.status === 1).length}/{item.materi.length})</span>
                                                        </div>
                                                        <div className={selected === i ? "content show" : "content"}>
                                                            {
                                                                item.materi.map((item, i) => (
                                                                    <div
                                                                        className="accordion-materi click-materi"
                                                                        style={{ fontSize: "13px" }}
                                                                        key={i}
                                                                        onClick={() => {
                                                                            if (!authToken().isa) {  // Cek apakah pengguna adalah pelajar
                                                                                if (item.status || item.id_materi === availableMateri) {
                                                                                    history.replace(`../../../../course/${id_course}/materi/${item.id_materi}`);
                                                                                } else {
                                                                                    swal.fire("Peringatan!", "Silahkan menyelesaikan materi ini terlebih dahulu untuk mengakses materi ini", "warning");
                                                                                }
                                                                            } else {
                                                                                if (edit) {
                                                                                    swal.fire("Peringatan!", "Silahkan menonaktifkan mode ubah jika anda ingin berpindah materi", "warning");
                                                                                } else {
                                                                                    history.replace(`../../../../course/${id_course}/materi/${item.id_materi}`);
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className={`${item.id_materi === Number(id_materi) && `materi-current`} ${item.status && "materi-complete"}`}>
                                                                            - {item.nama_materi}
                                                                        </div>
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
                            </CCol>

                            <CCol style={{ height: "100vh" }}>
                                <CCard style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.25)", heigh: "100vh", maxHeight: "100vh", padding: "0px", margin: "0px" }}>
                                    <CCardHeader>
                                        <CRow>
                                            <CCol>
                                                <div className="d-flex align-items-center">
                                                    <h3 className="m-0">
                                                        {(currentMateri && currentMateri.nama_materi) || "nama materi"}
                                                    </h3>
                                                    {
                                                        authToken().isa ?
                                                            (
                                                                edit ?
                                                                    <span>
                                                                        <CTooltip
                                                                            content="Selesai Ubah"
                                                                            placement="bottom"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                style={{ fontSize: "20px", outline: "none", cursor: "pointer" }}
                                                                                className="ml-2 mr-2 icon"
                                                                                icon={faCheck}
                                                                                color="green"
                                                                                onClick={() => {
                                                                                    setEdit(!edit)
                                                                                }}
                                                                            />
                                                                        </CTooltip>
                                                                    </span>
                                                                    :
                                                                    <span>
                                                                        <CTooltip
                                                                            content="Mode Ubah"
                                                                            placement="bottom"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                style={{ fontSize: "18px", outline: "none", cursor: "pointer" }}
                                                                                className="ml-2 mr-2 icon"
                                                                                icon={faPen}
                                                                                color="blue"
                                                                                onClick={() => {
                                                                                    setEdit(!edit)
                                                                                }}
                                                                            />
                                                                        </CTooltip>
                                                                    </span>
                                                            )
                                                            :
                                                            ""
                                                    }
                                                    {
                                                        ((currentMateri && (currentMateri.is_latihan)) && (!(edit))) ?
                                                            <div className="ml-2">
                                                                (Pertanyaan ke-{indexPertanyaan} dari {hasilLatihan.jumlah} pertanyaan)
                                                            </div>
                                                            :
                                                            ""
                                                    }
                                                </div>
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
                                                            history.push({ pathname: `../../../../detail-course/${id_course}` })
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faArrowLeft} />
                                                    </CButton>
                                                </CTooltip>
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>

                                    <CCardBody
                                        // className={`${currentMateri && currentMateri.is_latihan && !startLatihan ? "content-end" : ""}`}
                                        style={{ height: "100vh", overflowY: "auto" }}
                                    >
                                        <CContainer>
                                            {
                                                (currentMateri && (!(currentMateri.is_latihan))) ?
                                                    <Materi edit={edit} id_materi={id_materi} />
                                                    :
                                                    <Latihan
                                                        edit={edit}
                                                        id_materi={id_materi}
                                                        id_course={id_course}
                                                        indexPertanyaan={indexPertanyaan}
                                                        setIndexPertanyaan={setIndexPertanyaan}
                                                        startLatihan={startLatihan}
                                                        setStartLatihan={setStartLatihan}
                                                        hasilLatihan={hasilLatihan}
                                                        setHasilLatihan={setHasilLatihan}
                                                        currentMateri={currentMateri}
                                                        setCurrentMateri={setCurrentMateri}
                                                    />
                                            }
                                        </CContainer>
                                    </CCardBody>
                                    {!edit &&
                                        <CCardFooter>
                                            <div className="content-container">
                                                <div>
                                                    Course ini diambil dari <u>{course.sumber}</u>
                                                </div>
                                                <div className="content-right">
                                                    {
                                                        (currentMateri && (currentMateri.is_latihan)) ?
                                                            (
                                                                <div className="mr-2">
                                                                    Skor Tertinggi: {currentMateri.skor}
                                                                </div>
                                                            )
                                                            :
                                                            ""
                                                    }
                                                    <CButton
                                                        active
                                                        className="next-button"
                                                        type="submit"
                                                        disabled={startLatihan}
                                                        onClick={() => {
                                                            UpdateProgress()
                                                        }}
                                                    >
                                                        Materi Selanjutnya
                                                        <FontAwesomeIcon icon={faAngleRight} style={{ color: "black", fontSize: "20px", marginLeft: "10px" }} />
                                                    </CButton>
                                                </div>
                                            </div>
                                        </CCardFooter>
                                    }
                                </CCard>
                            </CCol>
                        </CRow>
                    </div>
            }
        </div >
    )
}

function Materi(props) {
    const [selectedKonten, setSelectedKonten] = useState();

    const [konten, setKonten] = useState([]);
    const [text, setText] = useState("")
    const [Url_Gambar, setUrl_Gambar] = useState("")
    const [Url_Video, setUrl_Video] = useState("")

    const token = localStorage.getItem("token");

    const validasi = (index, value) => {
        if (!value.length || value[0] === " ") {
            swal.fire('Peringatan!', 'Isi Konten tidak boleh kosong!', 'warning');
        } else if (index >= 0) {
            UpdateKonten(index)
        } else if (index < 0) {
            AddKonten()
        }
    }

    const AddKonten = () => {
        api.post(`add-konten`, {
            id_materi: props.id_materi,
            text: text,
            url_gambar: Url_Gambar,
            url_video: Url_Video,
            token: token,
        }).then((res) => {
            swal.fire("Sukses!", "Konten berhasil ditambahkan", "success").then(() => {
                setText("");
                setUrl_Gambar("");
                setUrl_Video("");
                // getKonten();
            })
        })
    }

    const UpdateKonten = (index) => {
        api.put(`update-konten`, {
            id_materi: konten[index].id_materi,
            id_konten: konten[index].id_konten,
            text: konten[index].text,
            url_gambar: konten[index].url_gambar,
            url_video: konten[index].url_video,
            token: token
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success");
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const DeleteKonten = (index) => {
        api.delete(`delete-konten`, {
            data: {
                id_konten: konten[index].id_konten,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success").then(() => {
                    // getKonten()
                })
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const ConfirmDeleteKonten = (index) => {
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
                DeleteKonten(index)
            }
        })
    }

    const handleSave = (index, name, value) => {
        const updatedKonten = [...konten];
        updatedKonten[index] = { ...updatedKonten[index], [name]: value };
        setKonten(updatedKonten);
    };

    const options = [
        { value: 'Text', label: 'Text' },
        { value: 'Gambar', label: 'Gambar' },
        { value: 'Video', label: 'Video' }
    ];



    const getKonten = () => {
        api.post(`get-konten`, {
            id_materi: props.id_materi,
            token: token,
        }).then((res) => {
            setKonten(res.data.result)
        })
    }

    useEffect(() => {
        getKonten()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id_materi]);

    return (
        <>
            {
                konten.length ?
                    konten.map((item, i) => (
                        <div key={i}>
                            {
                                item.text !== "" ?
                                    <div>
                                        {
                                            props.edit ?
                                                <div>
                                                    <CFormGroup>
                                                        <CLabel htmlFor="text" className="font-weight-bold mb-0"><h5>Konten Penjelasan</h5></CLabel>
                                                        <TextEditor value={item.text} handleSave={handleSave} index={i} name="text" />
                                                        <div className="mt-2 d-flex justify-content-end">
                                                            <CButton
                                                                active
                                                                color="info"
                                                                style={{ fontWeight: "bold", marginRight: "5px" }}
                                                                aria-pressed="true"
                                                                type="submit"
                                                                onClick={() => {
                                                                    validasi(i, item.text)
                                                                }}
                                                            >
                                                                Simpan
                                                            </CButton>
                                                            <CButton
                                                                active
                                                                color="danger"
                                                                style={{ fontWeight: "bold" }}
                                                                aria-pressed="true"
                                                                type="submit"
                                                                onClick={() => ConfirmDeleteKonten(i)}
                                                            >
                                                                Hapus
                                                            </CButton>
                                                        </div>
                                                    </CFormGroup>
                                                </div>
                                                :
                                                <div style={{
                                                    textAlign: "justify",
                                                    // textIndent: "20px"
                                                }}>
                                                    {parse(item.text)}
                                                </div>
                                        }
                                    </div>
                                    :
                                    item.url_gambar !== "" ?
                                        <div>

                                            <div className="text-center">
                                                <CImg
                                                    src={item.url_gambar}
                                                    className="img-fluid text-center mb-3"
                                                    onError={(e) =>
                                                        e.target.src = NotFound
                                                    }
                                                    alt="gambar tidak ditemukan"
                                                    style={{ height: "250px" }}
                                                />
                                            </div>
                                            {
                                                props.edit &&
                                                <div>
                                                    <CFormGroup>
                                                        <CLabel htmlFor="url_gambar">Link Gambar</CLabel>
                                                        <CInput
                                                            id="url_gambar"
                                                            placeholder="Link gambar"
                                                            value={item.url_gambar}
                                                            name="url_gambar"
                                                            onChange={(e) => {
                                                                handleSave(i, e.target.name, e.target.value);
                                                            }}
                                                        />
                                                        <div className="mt-2 d-flex justify-content-end">
                                                            <CButton
                                                                active
                                                                color="info"
                                                                style={{ fontWeight: "bold", marginRight: "5px" }}
                                                                aria-pressed="true"
                                                                type="submit"
                                                                onClick={(e) => {
                                                                    validasi(i, item.url_gambar)
                                                                }}
                                                            >
                                                                Simpan
                                                            </CButton>
                                                            <CButton
                                                                active
                                                                color="danger"
                                                                style={{ fontWeight: "bold" }}
                                                                aria-pressed="true"
                                                                type="submit"
                                                                onClick={() => ConfirmDeleteKonten(i)}
                                                            >
                                                                Hapus
                                                            </CButton>
                                                        </div>
                                                    </CFormGroup>
                                                </div>
                                            }
                                        </div>
                                        :
                                        (
                                            item.url_video !== "" &&
                                            <div>
                                                <div className="text-center">
                                                    <iframe
                                                        width="560" // Width of the video
                                                        height="315" // Height of the video
                                                        src={`${item.url_video}${`?modestbranding=1&rel=0&loop=1&showinfo=0`}`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        title="Video Player"
                                                    />
                                                </div>
                                                {
                                                    props.edit &&
                                                    <div>
                                                        <CFormGroup>
                                                            <CLabel htmlFor="url_video">Link Video</CLabel>
                                                            <CInput
                                                                id="url_video"
                                                                placeholder="Link gambar"
                                                                value={item.url_video}
                                                                name="url_video"
                                                                onChange={(e) => {
                                                                    handleSave(i, e.target.name, e.target.value);
                                                                }}
                                                            />
                                                            <div className="mt-2 d-flex justify-content-end">
                                                                <CButton
                                                                    active
                                                                    color="info"
                                                                    style={{ fontWeight: "bold", marginRight: "5px" }}
                                                                    aria-pressed="true"
                                                                    type="submit"
                                                                    onClick={(e) => {
                                                                        validasi(i, item.url_video)
                                                                    }}
                                                                >
                                                                    Simpan
                                                                </CButton>
                                                                <CButton
                                                                    active
                                                                    color="danger"
                                                                    style={{ fontWeight: "bold" }}
                                                                    aria-pressed="true"
                                                                    type="submit"
                                                                    onClick={() => ConfirmDeleteKonten(i)}
                                                                >
                                                                    Hapus
                                                                </CButton>
                                                            </div>
                                                        </CFormGroup>
                                                    </div>
                                                }
                                            </div>
                                        )
                            }
                        </div >
                    ))
                    :
                    <>
                        Materi ini masih belum diisi oleh Admin. Harap kembali lagi! Terima kasih.
                    </>
            }
            {
                props.edit &&
                <div>
                    <div className="text-center" style={{ marginTop: "50px" }}>
                        <h3>
                            ----------- Tambah Konten -----------
                        </h3>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                        <CLabel htmlFor="select_konten">Pilih Jenis Konten yang ingin ditambahkan</CLabel>
                        <Select
                            id="select_konten"
                            defaultValue={selectedKonten}
                            onChange={(e) => {
                                setSelectedKonten(e);
                                setText("");
                                setUrl_Gambar("");
                                setUrl_Video("");
                            }}
                            options={options}
                            placeholder="Pilih Jenis Konten"
                            isSearchable={false}
                            isClearable={true}
                            styles={{
                                indicatorSeparator: state => ({
                                    display: 'none',
                                }),
                            }}
                        />
                        {
                            selectedKonten &&
                            (
                                <div>
                                    <div style={{ marginTop: "20px" }}>
                                        {
                                            selectedKonten.value === "Text" ?
                                                <>
                                                    <CLabel htmlFor="text">Tambah Konten Penjelasan</CLabel>
                                                    <TextEditor value={text} setValue={setText} />
                                                </>
                                                :
                                                selectedKonten.value === "Gambar"
                                                    ?
                                                    <>
                                                        <CLabel htmlFor="url_Gambar">Tambah Konten Gambar</CLabel>
                                                        <CInput
                                                            id="url_Gambar"
                                                            placeholder="Link Url Gambar"
                                                            value={Url_Gambar}
                                                            name="URL_Gambar"
                                                            onChange={(e) => {
                                                                setUrl_Gambar(e.target.value)
                                                            }}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <CLabel htmlFor="url_video">Tambah Konten Video</CLabel>
                                                        <CInput
                                                            id="url_video"
                                                            placeholder="Link Url Video"
                                                            value={Url_Video}
                                                            name="URL_Video"
                                                            onChange={(e) => {
                                                                setUrl_Video(e.target.value)
                                                            }}
                                                        />
                                                    </>

                                        }
                                    </div>
                                    <div className="mt-2">
                                        <CButton
                                            active
                                            color="success"
                                            style={{ fontWeight: "bold" }}
                                            aria-pressed="true"
                                            type="submit"
                                            onClick={() => {
                                                validasi(-1, text || Url_Gambar || Url_Video)
                                            }}
                                        >
                                            Tambah
                                        </CButton>
                                    </div>
                                </div>
                            )
                        }
                        <div style={{ height: "100px" }}></div>
                    </div>
                </div>
            }
        </>
    )
}

function Latihan(props) {
    const [latihan, setLatihan] = useState([])
    const [latihanTemp, setLatihanTemp] = useState([])
    const [currentPertanyaan, setCurrentPertanyaan] = useState(null);
    const [jawabanPilihan, setJawabanPilihan] = useState("")

    const [pertanyaan, setPertanyaan] = useState("")
    const [selectedPertanyaan, setSelectedPertanyaan] = useState()

    const [modalTambahPertanyaan, setModalTambahPertanyaan] = useState(false)
    const [modalTambahPilihan, setModalTambahPilihan] = useState(false)
    const [modalUpdatePertanyaan, setModalUpdatePertanyaan] = useState(false)

    const token = localStorage.getItem("token");

    const getLatihan = () => {
        api.post(`get-latihan`, {
            id_materi: props.id_materi,
            token: token
        }).then((res) => {
            const data = res.data.formattedResult;

            setLatihan(
                data.map((item, index) => {
                    return { ...item, no: index + 1, showed: 0 };
                })
            )

            props.setHasilLatihan({ ...props.hasilLatihan, jumlah: data.filter((item) => item.status === 1).length })
        })
    }

    const TambahPertanyaan = (e) => {
        e.preventDefault();

        api.post(`add-pertanyaan`, {
            id_materi: props.id_materi,
            pertanyaan: pertanyaan,
            token: token
        }).then(() => {
            swal.fire("Sukses", "Pertanyaan baru berhasil ditambahkan!", "success")
            setModalTambahPertanyaan(!modalTambahPertanyaan)
            getLatihan()
        })
    }

    const ConfirmHapusPertanyaan = (id_latihan) => {
        swal.fire({
            icon: "warning",
            title: `Peringatan!`,
            html: `Apakah anda yakin ingin menghapus pertanyaan ini?`,
            confirmButtonText: "Yakin",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Tidak"
        }).then((result) => {
            if (result.isConfirmed) {
                DeletePertanyaan(id_latihan)
            }
        })
    }

    const DeletePertanyaan = (id_latihan) => {
        api.delete(`delete-pertanyaan`, {
            data: {
                id_latihan: id_latihan,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success")
                getLatihan()
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const tambahPilihan = (e) => {
        e.preventDefault()

        selectedPertanyaan.jumlah_pilihan.forEach((data, index) => {
            if (!data.id_pilihan) {
                api.post(`add-pilihan`, {
                    id_latihan: selectedPertanyaan.aksi,
                    pilihan: data.pilihan,
                    is_jawaban: data.is_jawaban,
                    token: token
                }).then(() => {
                    getLatihan()
                })
            }
        })

        if (selectedPertanyaan.jumlah_pilihan.length > 0) {
            swal.fire("Sukses", "Pilihan Baru berhasil ditambahkan!", "success")
        }

        setModalTambahPilihan(!modalTambahPilihan)
    }

    const UpdatePertanyaan = (e) => {
        e.preventDefault()

        api.put(`update-pertanyaan`, {
            id_latihan: selectedPertanyaan.aksi,
            pertanyaan: selectedPertanyaan.pertanyaan,
            status: selectedPertanyaan.status,
            token: token
        }).then((res) => {
            setModalUpdatePertanyaan(!modalUpdatePertanyaan)
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success");
                getLatihan()
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const UpdatePilihan = (index) => {
        api.put(`update-pilihan`, {
            pilihan: selectedPertanyaan.jumlah_pilihan[index].pilihan,
            is_jawaban: selectedPertanyaan.jumlah_pilihan[index].is_jawaban,
            id_pilihan: selectedPertanyaan.jumlah_pilihan[index].id_pilihan,
            token: token
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success");
                getLatihan()
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const hapusPilihan = (id, index) => {
        api.delete(`delete-pilihan`, {
            data: {
                id_pilihan: id,
                token: token
            }
        }).then((res) => {
            getLatihan()
        })

        const updatedJumlahPilihan = selectedPertanyaan.jumlah_pilihan.filter((item, i) => i !== index);
        setSelectedPertanyaan({
            ...selectedPertanyaan,
            jumlah_pilihan: updatedJumlahPilihan
        });
    }

    function randomPertanyaan(data) {
        const pertanyaan = data.filter(item => item.status === 1 && item.showed === 0);
        const randomIndex = Math.floor(Math.random() * pertanyaan.length);
        const randomPertanyaan = pertanyaan[randomIndex]

        if (randomPertanyaan) {
            props.setIndexPertanyaan(props.indexPertanyaan + 1)
            randomPertanyaan.jumlah_pilihan.sort(() => Math.random() - Math.random())
        }

        return randomPertanyaan;
    }

    const handleNextPertanyaan = (data) => {
        const nextPertanyaan = randomPertanyaan(data);

        setCurrentPertanyaan(nextPertanyaan);
    }

    const validateJawaban = (e) => {
        e.preventDefault()

        const jawabanBenar = currentPertanyaan.jumlah_pilihan.some(
            (pilihan) => pilihan.is_jawaban === 1 && pilihan.pilihan === jawabanPilihan
        );

        const jumlahBenar = jawabanBenar ? props.hasilLatihan.benar + 1 : props.hasilLatihan.benar;

        const updatedLatihan = latihanTemp.map(item => {
            if (item.aksi === currentPertanyaan.aksi) {
                return {
                    ...item,
                    showed: 1
                };
            }
            return item;
        });

        if (!(updatedLatihan.some((item) => item.showed === 0))) {
            const skor = (jumlahBenar / props.hasilLatihan.jumlah) * 100
            props.setHasilLatihan({ ...props.hasilLatihan, benar: jumlahBenar, skor: skor });
            props.setStartLatihan(false)
            swal.fire(`Anda mendapatkan skor ${skor}`);

            if (skor > props.currentMateri.skor) {
                api.put(`update-high-score`, {
                    skor: skor,
                    id_course: props.id_course,
                    id_user: authToken().uid,
                    id_materi: props.id_materi,
                    token: token
                }).then(() => {
                    props.setCurrentMateri({ ...props.currentMateri, skor: skor })
                })
            }

            props.setIndexPertanyaan(0);
        } else {
            props.setHasilLatihan({ ...props.hasilLatihan, benar: jumlahBenar });
        }

        setLatihanTemp(updatedLatihan);
        handleNextPertanyaan(updatedLatihan)
        setJawabanPilihan("")
    }

    useEffect(() => {
        props.setIndexPertanyaan(0)
        props.setStartLatihan(false)

        getLatihan()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id_materi]);

    return (
        <>
            {
                props.edit ?
                    <>
                        <div className="mt-2">
                            <CButton
                                active
                                color="success"
                                style={{ fontWeight: "bold" }}
                                aria-pressed="true"
                                type="submit"
                                onClick={() => {
                                    setModalTambahPertanyaan(!modalTambahPertanyaan)
                                    setPertanyaan("")
                                }}
                            >
                                Tambah Pertanyaan
                            </CButton>
                        </div>
                        <Grid
                            data={latihan}
                            columns={[
                                {
                                    name: 'Pertanyaan',
                                    formatter: (cell) => _(
                                        <div>
                                            {cell.length > 38 ? `${cell.substring(0, 38)}...` : cell}
                                        </div>
                                    )
                                },
                                {
                                    name: 'Status',
                                    formatter: (cell) => _(
                                        <div>
                                            {cell ? "Tampil" : "Tidak Tampil"}
                                        </div>
                                    )
                                },
                                {
                                    name: 'Jumlah_Pilihan',
                                    formatter: (cell) => _(
                                        <div>
                                            {cell.length}
                                        </div>
                                    )
                                },
                                {
                                    name: 'Aksi',
                                    formatter: (cell) => _(
                                        <div className="text-center">
                                            <CButton
                                                color="success"
                                                onClick={() => {
                                                    setSelectedPertanyaan(latihan.find((data) => data.aksi === cell))
                                                    setModalTambahPilihan(!modalTambahPilihan);
                                                }}
                                            >
                                                Tambah
                                            </CButton>
                                            <CButton
                                                color="primary"
                                                className="m-1"
                                                onClick={() => {
                                                    setSelectedPertanyaan(latihan.find((data) => data.aksi === cell))
                                                    setModalUpdatePertanyaan(!modalUpdatePertanyaan);
                                                }}
                                            >
                                                Ubah
                                            </CButton>
                                            <CButton
                                                color="danger"
                                                onClick={() => {
                                                    ConfirmHapusPertanyaan(cell);
                                                }}
                                            >
                                                Hapus
                                            </CButton>
                                        </div>
                                    )
                                },
                            ]}
                            search={true}
                            sort={true}
                            pagination={{ enabled: true, limit: 5, }}
                        />
                    </>
                    :
                    <>
                        {
                            props.startLatihan && (
                                currentPertanyaan && (
                                    <>
                                        <CForm onSubmit={(e) => { validateJawaban(e); }}>
                                            <h5 style={{ textDecoration: "underline", marginBottom: "20px", fontSize: "24" }}>Pilihlah jawaban yang benar dari pertanyaan dibawah ini! </h5 >
                                            <CLabel style={{ fontSize: "15px" }}>
                                                {currentPertanyaan.pertanyaan}
                                            </CLabel>
                                            {
                                                currentPertanyaan.jumlah_pilihan.map((d, i) =>
                                                (
                                                    <CFormGroup variant="checkbox" key={i}>
                                                        <CInputRadio
                                                            className="form-check-input"
                                                            name="radios"
                                                            value={`${d.pilihan}`}
                                                            checked={jawabanPilihan === `${d.pilihan}`}
                                                            onChange={(e) => setJawabanPilihan(e.target.value)}
                                                            required
                                                        />
                                                        <CLabel variant="checkbox">{d.pilihan}</CLabel>
                                                    </CFormGroup>
                                                ))
                                            }
                                            <div className="content-center">
                                                <CButton
                                                    active
                                                    className="next-button"
                                                    style={{ marginTop: "50px" }}
                                                    type="submit"
                                                >
                                                    Pertanyaan Selanjutnya
                                                </CButton>
                                            </div>
                                        </CForm>
                                    </>
                                )
                            )
                        }
                        {
                            props.hasilLatihan.jumlah <= 0 ?
                                "Silahkan menunggu admin untuk menambah latihan ini"
                                :
                                (!props.startLatihan && (
                                    <div className="content-center">
                                        <CButton
                                            active
                                            className="next-button"
                                            onClick={() => {
                                                props.setHasilLatihan({ ...props.hasilLatihan, benar: 0, skor: 0, index: 0 })
                                                props.setStartLatihan(true)
                                                setLatihanTemp(latihan);
                                                handleNextPertanyaan(latihan);
                                            }}
                                        >
                                            Mulai Latihan
                                        </CButton>

                                    </div>
                                ))
                        }
                    </>
            }
            <CModal
                show={modalTambahPertanyaan}
                onClose={() => setModalTambahPertanyaan(!modalTambahPertanyaan)}
                closeOnBackdrop={false}
                color="success"
            >
                <CForm method="POST" onSubmit={(e) => TambahPertanyaan(e)}>
                    <CModalHeader closeButton>
                        <CModalTitle>Tambah Pertanyaan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup>
                            <CLabel htmlFor="pertanyaan">Pertanyaan</CLabel>
                            <CInput
                                minLength="4"
                                name="pertanyaan"
                                type="text"
                                id="pertanyaan"
                                value={pertanyaan}
                                placeholder="Masukkan Pertanyaan"
                                onChange={(e) => { setPertanyaan(e.target.value) }}
                                required />
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="success">Tambah</CButton>{' '}
                        <CButton color="secondary" onClick={() => setModalTambahPertanyaan(!modalTambahPertanyaan)}>Cancel</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>

            <CModal
                show={modalTambahPilihan}
                onClose={() => setModalTambahPilihan(!modalTambahPilihan)}
                closeOnBackdrop={false}
                color="success"
            >
                <CForm method="POST" onSubmit={(e) => { tambahPilihan(e); }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Tambah Pilihan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup>
                            <CLabel htmlFor="pertanyaan">Pertanyaan</CLabel>
                            <CInput
                                disabled
                                minLength="4"
                                name="pertanyaan"
                                type="text"
                                id="pertanyaan"
                                value={(selectedPertanyaan && selectedPertanyaan.pertanyaan) || ""}
                                placeholder="Masukkan Pertanyaan"
                                onChange={(e) => { setSelectedPertanyaan({ ...selectedPertanyaan, pertanyaan: e.target.value }) }}
                                required
                            />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="pertanyaan">Pilihan Jawaban <small>(untuk mengatur jawaban terdapat pada menu ubah)</small></CLabel>
                            {
                                selectedPertanyaan && selectedPertanyaan.jumlah_pilihan.map((d, i) => (
                                    <CRow className="mb-2" key={i}>
                                        <CCol>
                                            <CInput
                                                disabled={d.id_pilihan}
                                                name="pilihan"
                                                type="text"
                                                id="pilihan"
                                                value={d.pilihan || ""}
                                                placeholder="Masukkan Pilihan Jawaban"
                                                onChange={(e) => {
                                                    const updatedJumlahPilihan = [...selectedPertanyaan.jumlah_pilihan];
                                                    updatedJumlahPilihan[i] = {
                                                        ...updatedJumlahPilihan[i],
                                                        pilihan: e.target.value
                                                    };
                                                    setSelectedPertanyaan({
                                                        ...selectedPertanyaan,
                                                        jumlah_pilihan: updatedJumlahPilihan
                                                    });
                                                }}
                                                required
                                            />
                                        </CCol>
                                    </CRow>
                                ))
                            }
                        </CFormGroup>

                        <div className="tambah-pilihan" onClick={() =>
                            setSelectedPertanyaan({
                                ...selectedPertanyaan,
                                jumlah_pilihan: [
                                    ...selectedPertanyaan.jumlah_pilihan,
                                    { pilihan: "", is_jawaban: 0 }
                                ]
                            })
                        }
                        >
                            <FontAwesomeIcon icon={faCirclePlus} />
                            {" "}
                            <span>
                                Tambah Opsi Pilihan
                            </span>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="success">Tambahkan</CButton>{' '}
                        <CButton color="secondary" onClick={() => setModalTambahPilihan(!modalTambahPilihan)}>Cancel</CButton>
                    </CModalFooter>
                </CForm>
            </CModal >

            <CModal
                show={modalUpdatePertanyaan}
                onClose={() => setModalUpdatePertanyaan(!modalUpdatePertanyaan)}
                closeOnBackdrop={false}
                color="primary"
            >
                <CForm method="POST" onSubmit={(e) => { UpdatePertanyaan(e) }}>
                    <CModalHeader closeButton>
                        <CModalTitle>Update Pertanyaan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CFormGroup>
                            <CLabel htmlFor="pertanyaan">Pertanyaan</CLabel>
                            <CInput
                                minLength="4"
                                name="pertanyaan"
                                type="text"
                                id="pertanyaan"
                                value={(selectedPertanyaan && selectedPertanyaan.pertanyaan) || ""}
                                placeholder="Masukkan Pertanyaan"
                                onChange={(e) => { setSelectedPertanyaan({ ...selectedPertanyaan, pertanyaan: e.target.value }) }}
                                required
                            />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel htmlFor="pertanyaan">Pilihan Jawaban<small>(berikan centang untuk jawaban yang benar)</small></CLabel>
                            {
                                selectedPertanyaan && selectedPertanyaan.jumlah_pilihan.map((d, i) => (
                                    <CRow className="mb-2" key={i}>
                                        <CCol className="col-auto pr-0 d-flex align-items-center" >
                                            <CFormGroup variant="checkbox" className="checkbox">
                                                <CInputCheckbox
                                                    id="checkbox1"
                                                    name="checkbox1"
                                                    checked={d.is_jawaban}
                                                    style={{ position: "relative" }}
                                                    onChange={(e) => {
                                                        const updatedJumlahPilihan = [...selectedPertanyaan.jumlah_pilihan];
                                                        updatedJumlahPilihan[i] = {
                                                            ...updatedJumlahPilihan[i],
                                                            is_jawaban: e.target.checked
                                                        };
                                                        setSelectedPertanyaan({
                                                            ...selectedPertanyaan,
                                                            jumlah_pilihan: updatedJumlahPilihan
                                                        });
                                                    }}
                                                />
                                            </CFormGroup>
                                        </CCol>

                                        <CCol>
                                            <CInput
                                                name="pilihan"
                                                type="text"
                                                id="pilihan"
                                                value={d.pilihan || ""}
                                                placeholder="Masukkan Pilihan Jawaban"
                                                onChange={(e) => {
                                                    const updatedJumlahPilihan = [...selectedPertanyaan.jumlah_pilihan];
                                                    updatedJumlahPilihan[i] = {
                                                        ...updatedJumlahPilihan[i],
                                                        pilihan: e.target.value
                                                    };
                                                    setSelectedPertanyaan({
                                                        ...selectedPertanyaan,
                                                        jumlah_pilihan: updatedJumlahPilihan
                                                    });
                                                }}
                                                required
                                            />
                                        </CCol>

                                        <CCol className="col-auto pl-0 pr-2">
                                            <CButton
                                                active
                                                block
                                                color="primary"
                                                style={{ fontWeight: "bold" }}
                                                aria-pressed="true"
                                                onClick={() =>
                                                    UpdatePilihan(i)
                                                }
                                            >
                                                Ubah
                                            </CButton>
                                        </CCol>
                                        <CCol className="col-auto pl-0">
                                            {" "}
                                            <CButton
                                                active
                                                block
                                                color="danger"
                                                style={{ fontWeight: "bold" }}
                                                aria-pressed="true"
                                                onClick={() =>
                                                    hapusPilihan(d.id_pilihan, i)
                                                }
                                            >
                                                Hapus
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                ))
                            }
                        </CFormGroup>

                        <CFormGroup>
                            <CRow>
                                <CCol>
                                    <CLabel htmlFor="jenis_materi">Status Pertanyaan:</CLabel>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom id="inline-radio2"
                                            checked={(selectedPertanyaan && selectedPertanyaan.status)}
                                            name="inline-radios"
                                            value="1"
                                            onChange={(e) => {
                                                setSelectedPertanyaan({ ...selectedPertanyaan, status: e.target.checked })
                                            }}
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="inline-radio2"
                                        >
                                            Tampil
                                        </CLabel>
                                    </CFormGroup>

                                    <CFormGroup variant="custom-radio" inline>
                                        <CInputRadio
                                            custom id="inline-radio1"
                                            checked={(selectedPertanyaan && !selectedPertanyaan.status)}
                                            name="inline-radios"
                                            value="0"
                                            onChange={(e) => {
                                                setSelectedPertanyaan({ ...selectedPertanyaan, status: !e.target.checked })
                                            }}
                                        />
                                        <CLabel
                                            variant="custom-checkbox"
                                            htmlFor="inline-radio1"
                                        >
                                            Tidak Tampil
                                        </CLabel>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="primary">Ubah</CButton>{' '}
                        <CButton color="secondary" onClick={() => setModalUpdatePertanyaan(!modalUpdatePertanyaan)}>Cancel</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}

export default PembelajaranCourse