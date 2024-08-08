import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const usePasswordToggle = () => {
    const [visibility, setVisibility] = useState(false);

    const Icon = (
        <FontAwesomeIcon
            icon={visibility ? faEye : faEyeSlash}
            onClick={() => setVisibility(!visibility)}
        />
    );

    const InputType = visibility ? "text" : "password";

    return [InputType, Icon]
}

export default usePasswordToggle;