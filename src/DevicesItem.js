import React from 'react'

export default function DevicesItem({ deviceitem }) {
    function dragStart(element) {
        element.dataTransfer.setData('deviceTitle', deviceitem.wiki_title);
        console.log('dragStart');
    }

    function dragOver(element) {
        element.stopPropagation();
    }

    return (
        <>
            <div id="devicesItem" draggable="true" onDragStart={dragStart} onDragOver={dragOver}>
                <img src={deviceitem.image.standard} id="itemPhoto" alt="standard"/>
                <div id="itemTitle" className={deviceitem.wiki_title}>{deviceitem.wiki_title}</div>
            </div>
        </>
    )
}
