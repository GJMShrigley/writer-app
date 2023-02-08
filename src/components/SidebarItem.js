import React from "react";

export default function SidebarItem(props) {

    function maximize() {
        props.maximizePage(props.id);
    }

    return (
        <div className="sidebar__item" onClick={maximize}>{props.title}</div>
    )
}