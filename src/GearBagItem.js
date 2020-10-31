import React from 'react'

export default function GearBagItem({ gbitem }) {    
    return (
        <>
            <div id="gearBagItem">
                <img src={gbitem.image.standard} id="itemPhoto" alt="standard"/>
                <div id="itemTitle" className={gbitem.wiki_title}>{gbitem.wiki_title}</div>
            </div>
        </>
    )
}
