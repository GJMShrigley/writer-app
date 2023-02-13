import React from "react";
import Page from "./components/Page";
import SidebarItem from "./components/SidebarItem";

export default function App() {
  
  // const sidebar = document.getElementsByClassName('sidebar__drag')[0];

  const [pageCount, setPageCount] = React.useState(0);
  const [displayData, setDisplayData] = React.useState([]);
  const [storedPages, setStoredPages] = React.useState([]);
  const [size, setSize] = React.useState({ x: 400, y: 300 });

  function newPage() {
    const storedPagesCopy = storedPages;
    const sidebarLength = Math.ceil(storedPagesCopy.length / 20);
    const stylesheet = document.styleSheets[0].rules;
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
      var selector = stylesheet[i];
      if(selector.selectorText === ".sidebar") {
       selector.style.gridTemplateColumns = `repeat(${sidebarLength},1fr)`;
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

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    
    function onMouseMove(mouseMoveEvent) {
      console.log(mouseMoveEvent.pageX, mouseMoveEvent.pageY)
      setSize(currentSize => ({ 
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX, 
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY 
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  
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

  const storedPagesMap = storedPages.map((storedPage, index) => {
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

  //add event listeners
  // const moveSidebar = sidebar.addEventListener('mousedown', resizeSidebar());


  //render
  return (
    <div className="window">
    <div className="top-menu">
      <section className="top-menu-buttons">
        <button className="top-menu-buttons__new-page" onClick={newPage}>CREATE A NEW PAGE</button>
      </section>
    </div>
    <div className="sidebar" style={{ width: size.x, height: size.y }}>
      <section className="sidebar__items">
          {storedPagesMap}
      </section>
      <button className="sidebar__drag" type="button" onMouseDown={handler}></button>
    </div>
    <section className="display">
      {displayPagesMap}
    </section>
    </div>
  )
}