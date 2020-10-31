import React from 'react'
import GearBagItem from './GearBagItem'

export default function GearBagList({ gbitems }) {
    return (
        gbitems.map(gbitem => {
            return <GearBagItem key={gbitem.id} gbitem={gbitem} />  
        })
    )
}
