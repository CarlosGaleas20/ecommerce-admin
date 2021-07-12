/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorCustom = ({val, name, setVal, activeVal}) => {

    const [editor, setEditor] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(activeVal)
        )
    ));
    const editorChange = (editor) => {
        setEditor(editor);
        setVal({
            ...val,
            [name]: editor.getCurrentContent().getPlainText(),
        });
    }

    return (
        <div>
            <Editor
                editorState={editor}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={editorChange}
                toolbar={{
                    options: ['fontSize', 'fontFamily', 'textAlign', 'colorPicker'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
                editorStyle={{
                    border: '1px solid #ab47bc',
                    marginBottom: 20,
                    height: 150,
                    padding: 10,
                }}
                
            />
        </div>
    )
}

export default EditorCustom;
