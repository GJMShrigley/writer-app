import React from "react";
import Page from "./components/Page";
import SidebarItem from "./components/SidebarItem";

import './App.css';

export default function App() {
  
  //Store data in state

  const [pageCount, setPageCount] = React.useState(0);
  const [displayData, setDisplayData] = React.useState([]);
  const [storedPagesData, setStoredPagesData] = React.useState([]);

  //Handle changes to display page

  function newPage() {
    const storedPagesDataCopy = storedPagesData;

    if (storedPagesDataCopy) {
    setStoredPagesData(prevstoredPagesData => {
      return [...prevstoredPagesData, {
        id: (pageCount),
        title: "New Page",
      }];
    });
    } else {
      setStoredPagesData([{
        id: (pageCount),
        title: "New Page",
      }])
    }

    setPageCount(prevPageCount => prevPageCount + 1);
     setDisplayData([{
        id: (pageCount),
        title: "New Page",    
      }]
    );
  }

  function minimizePage(pageId, title, text) {
    const storedPagesDataCopy = storedPagesData;
    // const match = storedPagesDataCopy.find(storedPage => storedPage.id === pageId);
   
      for (let i = 0; i < storedPagesDataCopy.length; i++) {
        if (storedPagesDataCopy[i].id === pageId) {
          storedPagesDataCopy[i].title = title;
          storedPagesDataCopy[i].text = text;
          setStoredPagesData(storedPagesDataCopy);
      } else {
        //do nothing
      }
    };
    setDisplayData([]);
  }

  function maximizePage(pageId) {
    const storedPagesDataCopy = storedPagesData;
    const displayDataCopy = displayData[0];
      //display the selected page from the stored pages
      for (let i = 0; i < storedPagesDataCopy.length; i++) {
        if (storedPagesDataCopy[i].id === pageId) {
          setDisplayData([{
            id: pageId,
            title: storedPagesDataCopy[i].title,
            text: storedPagesDataCopy[i].text
          }])
      }
    };
  }

  function closePage(pageId) {
    const storedPagesDataCopy = storedPagesData;
    
    //remove the selected page from the stored pages
      for (let i = 0; i < storedPagesDataCopy.length; i++) {
        if (storedPagesDataCopy[i].id === pageId) {
         storedPagesDataCopy.splice(i, 1);
        }
      }
      //remove the page from display
       setDisplayData([]);
       setStoredPagesData(storedPagesDataCopy);
  }

  function titleChange(newTitle, id) {
    const storedPagesDataCopy = storedPagesData;
    const displayDataCopy = displayData;
    const titleData = newTitle;
    const pageId = id;
    for (let i = 0; i < displayDataCopy.length; i++) {
       if (displayDataCopy[i].id === pageId) {
        displayDataCopy[i].title = titleData;
      } else {
        //do nothing
      }
    }
    for (let i = 0; i < storedPagesDataCopy.length; i++) {
      if (storedPagesDataCopy[i].id === pageId) {
        storedPagesDataCopy[i].title = titleData;
    } else {
      //do nothing
    }
  };
  setDisplayData(displayDataCopy);
  setStoredPagesData(storedPagesDataCopy);
  }

  function textChange(newText, id) {
    const storedPagesDataCopy = storedPagesData;
    const displayDataCopy = displayData;
    const textData = newText;
    const pageId = id;
    for (let i = 0; i < displayDataCopy.length; i++) {
       if (displayDataCopy[i].id === pageId) {
        displayDataCopy[i].text = textData;
      }
    }
    for (let i = 0; i < storedPagesDataCopy.length; i++) {
      if (storedPagesDataCopy[i].id === pageId) {
        storedPagesDataCopy[i].text = newText;
    } else {
      //do nothing
    }}
    setDisplayData(displayDataCopy);
    setStoredPagesData(storedPagesDataCopy);
  }
  
  //Display contents of state objects
  const displayPages = displayData.map((page) => {
    return (
      <Page
      key={page.id}
      id={page.id}
      title={page.title} 
      text={page.text}
      minimizePage={minimizePage}
      closePage={closePage}
      titleChange={titleChange}
      textChange={textChange}
      />
    )
  })

  let storedPages = storedPagesData.map((storedPage, index) => {
    return (
      <SidebarItem
      key={storedPage.id}
      id={storedPage.id}
      index={index}
      title={storedPage.title} 
      maximizePage={maximizePage}
      text={storedPage.text}
      />
    )
  })

  //Render
  return (
    <div className="window">
    <div className="top-menu">
      <section className="top-menu-buttons">
        <button className="top-menu-buttons__new-page" onClick={newPage}>CREATE A NEW PAGE</button>
      </section>
    </div>
    <section className="sidebar">
        {storedPages}
      </section>
      <section className="display">
        {displayPages}
      </section>
    </div>
  )
}
