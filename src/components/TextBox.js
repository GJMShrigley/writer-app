import React from "react";

export default function TextBox(props) {
    const [textBoxData, setTextBoxData] = React.useState(props)
    function changeTextBox(event) {
         let textBoxDataCopy = textBoxData;
         let newBody = {body: event.target.value};
         Object.assign(textBoxDataCopy, newBody)
        setTextBoxData(textBoxDataCopy);
        props.textBoxChange(textBoxData, props.id);
        console.log(textBoxDataCopy, newBody)
     };

    const sizeHandler = (mouseDownEvent) => {
        const startSize = {x: textBoxData.x, y: textBoxData.y};
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY};
        
        function onMouseMove(mouseMoveEvent) {
            const x = startSize.x - startPosition.x + mouseMoveEvent.pageX
            const y =  startSize.y - startPosition.y + mouseMoveEvent.pageY    
            setTextBoxData(prevBodyData => {
                    return {
                        ...prevBodyData,
                        x,
                        y
                    };
                });
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
            props.textBoxChange(textBoxData, props.id)
        }
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);

        };
        // React.useEffect(() => {
        //     setTextBoxData(props)
        // }, [props]
        // )

    return (
        <textarea className="contents__text-field" type="text" placeholder="Enter text" name="text" style={{ width: textBoxData.x, height: textBoxData.y }} id={props.id} value={textBoxData.body} onChange={changeTextBox} onMouseDown={sizeHandler}></textarea>
    )

}