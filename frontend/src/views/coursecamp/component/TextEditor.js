import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor(props) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", 'italic', "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
            ],
            ["link"]
        ]
    }

    return (
        <>
            <ReactQuill
                theme="snow"
                value={props.value}
                onChange={(value) => {
                    props.setValue ?
                        props.setValue(value)
                        :
                        props.handleSave(props.index, props.name, value)
                }}
                modules={modules}
            />
        </>
    )
}

export default TextEditor;