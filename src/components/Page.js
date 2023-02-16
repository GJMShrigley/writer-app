import React from "react";

export default function Page(props) {
     const [itemCount, setItemCount] = React.useState(1);
     const [ContentsData, setContentsData] = React.useState(props);
     const [textContents, setTextContents] = React.useState(props.textContents);

     function setTitle(event) {
         setContentsData (prevContentsData => {
             return {
                 ...prevContentsData,
                 title: event.target.value
             };
         }); 
         props.titleChange(event.target.value, props.id);
     }  

     function addTextBox() {
        const id = `text${itemCount}`
        setItemCount(itemCount + 1);
        setTextContents(prevTextContents => {
            return [
                ...prevTextContents,
                {
                key:id,
                id: id,
                boxTitle: "",
                body: ""}
            ]
        })
        props.contentsChange(textContents, props.id)
     }

     function setTextBoxContents(event) {
        const textContentsCopy = textContents;
        const newText = {body: event.target.value};
        const boxId = event.target.id;

         for (let i = 0; i < textContentsCopy.length; i++) {
            if (textContentsCopy[i].id === boxId) {
                setTextContents(
                [...textContentsCopy.slice(0, i),
                 Object.assign(textContentsCopy[i], newText),
                 ...textContentsCopy.slice(i + 1)
                ]
            );
                } else {
                  //do nothing
                }
          }
        setContentsData(prevContentsData => {
            return {
                ...prevContentsData,
                textContents
            }
        })
        props.contentsChange(textContents, props.id);
     }

    function minimize() {
        props.minimizePage();   
    }

    function close() {
        props.closePage(ContentsData.id);
    }
    
    const textBoxesMap = textContents.map((textBox) => {
        return (
            <textarea className="contents__text-field" type="text" placeholder="Enter text" name="text" id={textBox.id} key={textBox.key} value={textBox.body} onChange={setTextBoxContents}></textarea>
        )
    })

    React.useEffect(()=> {
        setContentsData(props)
      }, [props]);

    return (
        <div className="page">
            <div className="header">
                 <textarea className="header__title" type="text" name="title" value={ContentsData.title} onChange={setTitle}></textarea>
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