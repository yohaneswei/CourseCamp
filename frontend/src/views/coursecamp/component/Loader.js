import React from "react";
import SyncLoader from "react-spinners/PulseLoader";
import Logo from "../../gambar/Logo.png"

function Loader(props) {
    return (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", flexDirection: "column" }}>
            <div style={{ marginBottom: "20px" }}>
                <img src={Logo} style={{ width: "auto", height: "30px", cursor: "pointer" }} alt="Logo" />
            </div>
            <div>
                <SyncLoader
                    color="#3399FF"
                    loading={props.loading}
                    size={13}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader;