import React from 'react'

export default function GearBagItem({ gbitem, gbitems, setGearBag}) {
    function deviceDelete() {
        let copygbitems = [...gbitems];
        copygbitems = copygbitems.filter(device => device.id !== gbitem.id);
        setGearBag(copygbitems)
    }

    function dragStart(element) {
        element.dataTransfer.setData('deviceUuid', gbitem.id);
        console.log('dragStart');
    }

    function dragOver(element) {
        element.stopPropagation();
    }

    return (
        <>
            <div id="gearBagItem" draggable="true" onDragStart={dragStart} onDragOver={dragOver}>
                <img src={gbitem.image.standard} id="itemPhotoGear" alt="standard"/>
                <img src={`${window.location.origin}/redX.png`} id="redXLogo" alt='X' onClick={deviceDelete}/>
                <div id="itemTitle" className={gbitem.wiki_title}>{gbitem.wiki_title}</div>
            </div>
        </>
    )
}
