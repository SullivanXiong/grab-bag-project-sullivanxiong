import React from 'react'

export default function GearBagItem({ gbitem, toggleGrabBag }) {
    return (
        <>
            <div id="gearBagItem" onclick={toggleGrabBag}>
                <img src={gbitem.image.standardPhoto} id="itemPhoto" />
                <div id="itemTitle">{gbitem.title}</div>
            </div>
        </>
    )
}
