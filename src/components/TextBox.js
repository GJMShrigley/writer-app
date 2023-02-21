import React from "react";

export default function TextBox(props) {
    const [textBoxData, setTextBoxData] = React.useState(props)
    function changeTextBox(event) {
         const textBoxDataCopy = {...textBoxData};
         const newText = {[event.target.name]: event.target.value};
         Object.assign(textBoxDataCopy, newText)
         setTextBoxData({...textBoxDataCopy});
         props.textBoxChange(textBoxDataCopy, props.id);
     };

    const sizeHandler = (mouseDownEvent) => {
        const textBoxDataCopy = {...textBoxData};
        const startSize = {x: textBoxData.x, y: textBoxData.y};
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY};
        let newSize;
        function onMouseMove(mouseMoveEvent) {
         newSize = {x: (startSize.x - startPosition.x + mouseMoveEvent.pageX), y: (startSize.y - startPosition.y + mouseMoveEvent.pageY)};
         Object.assign(textBoxDataCopy, newSize)  
         setTextBoxData(textBoxDataCopy);
         props.textBoxChange(textBoxDataCopy, props.id)
        }

        function onMouseUp() { 
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);             
        }
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
            document.body.addEventListener("mouseleave", onMouseUp)
        };

    return (
        <div className="contents__text-container" style={{ width: textBoxData.x, height: textBoxData.y }} id={props.id}>
            <textarea className="contents__title-field" style={{ width: (textBoxData.x - 30) }} type="text" placeholder="Enter title" name="title" value={textBoxData.title} onChange={changeTextBox}></textarea>
            <textarea className="contents__text-field" style={{ width: (textBoxData.x - 30), height: (textBoxData.y - 50) }} type="text" placeholder="Enter text" name="body"  value={textBoxData.body} onChange={changeTextBox} ></textarea>
            <div className="contents__bottom-bar">
                <button className="contents__resize" type="button"  onMouseDown={sizeHandler}>></button>
            </div>
        </div>
    )

}