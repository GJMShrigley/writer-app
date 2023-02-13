import React from "react";

export default function SidebarItem(props) {
    const [title, setTitle] = React.useState(props.title);

    React.useEffect(() => {
        setTitle(props.title)
    }, [props])

    function maximize() {
        props.maximizePage(props.id);
    }

    return (
        <div className="sidebar__item" onClick={maximize}>{title}</div>
    )
}