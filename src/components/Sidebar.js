import React from "react";

import SidebarItem from "./SidebarItem";

export default function Sidebar(props) {
    const [size, setSize] = React.useState({ x: 30 });
    const [storedPages, setStoredPages] = React.useState(props.storedPages);

    let storedPagesMap = storedPages.map((storedPage, index) => {
        return (
          <SidebarItem
          key={storedPage.id}
          id={storedPage.id}
          index={index}
          title={storedPage.title} 
          maximizePage={storedPage.maximizePage}
          text={storedPage.text}
          />
        )
      })

    const mouseHandler = (mouseDownEvent) => {
        const startSize = size;
        const startPosition = { x: mouseDownEvent.pageX };
        
        function onMouseMove(mouseMoveEvent) {
            const newSize = { x: startSize.x - startPosition.x + mouseMoveEvent.pageX }

            if (newSize.x > 30 && newSize.x < (window.innerWidth - 50)) {
                setSize(currentSize => (newSize))
            } else if (newSize.x < 30) {
                setSize(currentSize => ({x: 30}))
            } else if (newSize.x > (window.innerWidth - 50)) {
                setSize(currentSize => ({x: (window.innerWidth - 50)}))
            }
            console.log(window.innerWidth, newSize.x)
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
        }
            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
      };

      React.useEffect(()=> {
        setStoredPages(props.storedPages)
      }, [props])
    
    return (
    <div className="sidebar" >
      <section className="sidebar__items" style={{ width: size.x, height: (window.innerHeight - 45) }}>
          {storedPagesMap}
      </section>
      <button className="sidebar__drag" type="button" onMouseDown={mouseHandler}>></button>
    </div>
    )
}