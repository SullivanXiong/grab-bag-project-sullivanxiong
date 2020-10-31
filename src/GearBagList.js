import React from 'react'
import GearBagItem from './GearBagItem'

export default function GearBagList({ gbitems, setGearBag }) {
    return (
        gbitems.map(gbitem => {
            return <GearBagItem key={gbitem.id} gbitem={gbitem} gbitems={gbitems} setGearBag={setGearBag} />  
        })
    )
}
