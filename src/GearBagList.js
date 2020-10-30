import React from 'react'
import GearBagItem from './GearBagItem'

export default function GearBagList({ gbitems, toggleGrabBag }) {
    return (
        gbitems.map(gbitem => {
            return <GearBagItem key={gbitem.id} toggleGrabBag={toggleGrabBag} gbitem={gbitem} />  
        })
    )
}
