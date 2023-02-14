import React from "react";
import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
// import SidebarItem from "./components/SidebarItem";

export default function App() {
  //access stylesheet for manipulation
  const stylesheet = document.styleSheets[0].cssRules;

  //create sidebar variable for manipulation
  let sidebar
  for(var i = 0; i < stylesheet.length; i++) {
    var cssStyles = stylesheet[i];
    if(cssStyles.selectorText === ".sidebar") {
      sidebar = cssStyles;
    }
  }

  const [pageCount, setPageCount] = React.useState(0);
  const [displayData, setDisplayData] = React.useState([]);
  const [storedPages, setStoredPages] = React.useState([]);
  

  function newPage() {
    const storedPagesCopy = storedPages;
    const sidebarLength = Math.ceil(storedPagesCopy.length / 20);
    
    //add new page to storedPages state
    if (storedPagesCopy) {
    setStoredPages(prevstoredPages => {
      return [...prevstoredPages, {
        id: (pageCount),
        title: "New Page",
      }];
    });
    } else {
      setStoredPages([{
        id: (pageCount),
        title: "New Page",
      }])
    }
    //update pageCount state to generate new page ids
    setPageCount(prevPageCount => prevPageCount + 1);
    //update displayData state with an empty page
     setDisplayData([{
        id: (pageCount),
        title: "New Page",    
      }]
    );
    //add new column to sidebar when current column is full
    for(var i = 0; i < stylesheet.length; i++) {
      var cssStyles = stylesheet[i];
      if(cssStyles.selectorText === ".sidebar__items") {
        cssStyles.style.gridTemplateColumns = `repeat(${sidebarLength},1fr)`;
      }
    }
  }

  function minimizePage() {
    //update displayData state with empty array
    setDisplayData([]);
  }

  function maximizePage(pageId) {
    const storedPagesCopy = storedPages;
      //display the selected page from the stored pages
      for (let i = 0; i < storedPagesCopy.length; i++) {
        if (storedPagesCopy[i].id === pageId) {
          setDisplayData([{
            id: pageId,
            title: storedPagesCopy[i].title,
            text: storedPagesCopy[i].text
          }])
      }
    };
  }

  function closePage(pageId) {
    const storedPagesCopy = storedPages;
    //remove the selected page from the stored pages
      for (let i = 0; i < storedPagesCopy.length; i++) {
        if (storedPagesCopy[i].id === pageId) {
         storedPagesCopy.splice(i, 1);
        }}
      //remove the page from display
       setDisplayData([]);
       //update the storedPages state with updated array
       setStoredPages(storedPagesCopy);
  }

  function titleChange(newTitle, id) {
    const storedPagesCopy = storedPages;
    const titleData = {title: newTitle};
    const pageId = id;
    //update the displayed page with new title data
    for (let i = 0; i < storedPagesCopy.length; i++) {
      if (storedPagesCopy[i].id === pageId) {
        setDisplayData(
          [...storedPagesCopy.slice(0, i),
           Object.assign(storedPagesCopy[i], titleData),
           ...storedPagesCopy.slice(i + 1)
          ]
      );
          } else {
            //do nothing
          }
    }
    //update the stored pages state with the updated array
    setStoredPages(storedPagesCopy);
  }

  function textChange(newText, id) {
    const storedPagesCopy = storedPages;
    const displayDataCopy = displayData;
    const textData = newText;
    const pageId = id;
    for (let i = 0; i < displayDataCopy.length; i++) {
       if (displayDataCopy[i].id === pageId) {
        displayDataCopy[i].text = textData;
      }
    }
    for (let i = 0; i < storedPagesCopy.length; i++) {
      if (storedPagesCopy[i].id === pageId) {
        storedPagesCopy[i].text = textData;
    } else {
      //do nothing
    }}
    setDisplayData(displayDataCopy);
    setStoredPages(storedPagesCopy);
  }

  
  
  //display contents of state objects
  const displayPagesMap = displayData.map((page) => {
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

  //render
  return (
    <div className="window">
    <div className="top-menu">
      <section className="top-menu-buttons">
        <button className="top-menu-buttons__new-page" onClick={newPage}>CREATE A NEW PAGE</button>
      </section>
    </div>
    <Sidebar 
      storedPages={storedPages}
      maximizePage={maximizePage}
      />
    <section className="display">
      {displayPagesMap}
    </section>
    </div>
  )
}