import React from "react";
import TextBox from "./TextBox";

export default function Page(props) {
     const [itemCount, setItemCount] = React.useState(1);
     const [pageData, setPageData] = React.useState(props);
     const [textBoxes, setTextBoxes] = React.useState(props.textContents);
    
     function setTitle(event) {
         setPageData (prevPageData => {
             return {
                 ...prevPageData,
                 title: event.target.value
             };
         }); 
         props.titleChange(event.target.value, props.id);
     }; 

     function minimize() {
        props.minimizePage();   
     };

     function close() {
        props.closePage(pageData.id);
     };

     function addTextBox() {
        const id = `text${itemCount}`
        setItemCount(itemCount + 1);
        setTextBoxes(prevTextContents => {
            return [
                ...prevTextContents,
                {
                key: id,
                id: id,
                boxTitle: "",
                body: "",
                x: (window.innerWidth - 50),
                y: 200
            }];
        });
         props.contentsChange(textBoxes, props.id)
     };

     function textBoxChange(textBoxBody, textBoxId) {
        const textBoxesCopy = textBoxes;
        for (let i = 0; i < textBoxesCopy.length; i++) {
            if (textBoxesCopy[i].id === textBoxId) {
                setTextBoxes(
                  [...textBoxesCopy.slice(0, i),
                   Object.assign(textBoxesCopy[i], textBoxBody),
                   ...textBoxesCopy.slice(i + 1)
                  ]
              );
                  } else {
                    //do nothing
                  }
        }
        props.contentsChange(textBoxes, props.id)
     };

     const textBoxesMap = textBoxes.map((textBox) => {
        return (
            <TextBox 
            id={textBox.key}
            key={textBox.id}
            title={textBox.title}
            body={textBox.body}
            x={textBox.x}
            y={textBox.y}
            textBoxChange={textBoxChange}
            />
        )
     });

     React.useEffect(()=> {
        setPageData(props)
     }, [props]);

    return (
        <div className="page">
            <div className="header">
                 <textarea className="header__title" type="text" name="title" value={pageData.title} onChange={setTitle}></textarea>
                 <div className="header__buttons">
                    <button className="header__btn header__minimize-btn" onClick={minimize}>_</button>
                    <button className="header__btn header__close-btn" onClick={close}>X</button>
                </div>
            </div>
            <div className="sub-header">
                <button className="sub-header__button" onClick={addTextBox}>Add Text Box</button>
            </div>
            <div className="contents">
                {textBoxesMap}
            </div>
        </div>
    )
}