import React from 'react'

export default function DevicesItem({ deviceitem, toggleDevice }) {
    return (
        <>
            <div id="devicesItem" onclick={toggleDevice}>
                <img src={deviceitem.image.standard} id="itemPhoto" />
                <div id="itemTitle">{deviceitem.wiki_title}</div>
            </div>
        </>
    )
}
