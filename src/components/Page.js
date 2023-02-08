import React from "react";

export default function Page(props) {

     const [ContentsData, setContentsData] = React.useState(props);
     
     function setTitle(event) {
        const newTitle = event.target.value;
         setContentsData (prevContentsData => {
             return {
                 ...prevContentsData,
                 title: newTitle
             };
         }); 
         props.titleChange(newTitle, props.id);
     }  

     function setContents(event) {
         const newText = event.target.value;
         setContentsData (prevContentsData => {
             return {
                 ...prevContentsData,
                 text: newText
             };
         }); 
         props.textChange(newText, props.id);
     }

    function minimize() {
        props.minimizePage(ContentsData.id, ContentsData.title, ContentsData.text);   
    }

    function close() {
        props.closePage(ContentsData.id);
    }

    return (
        <div className="page">
            <div className="header">
                 <textarea className="header__title" type="text" name="text" value={ContentsData.title} onChange={setTitle}></textarea>
                 <div className="header__buttons">
                    <button className="header__btn header__minimize-btn" onClick={minimize}>_</button>
                    <button className="header__btn header__close-btn" onClick={close}>X</button>
                </div>
            </div>
            <textarea className="page__text-field" type="text" placeholder="Enter text" name="text" value={ContentsData.text} onChange={setContents}></textarea>
        </div>
    )

}