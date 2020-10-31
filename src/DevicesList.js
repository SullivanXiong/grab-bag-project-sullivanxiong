import React from 'react'
import DevicesItem from './DevicesItem'

export default function DevicesList({ deviceitems, deviceDropDelete, dragOver } ) {
    return (
        deviceitems.map(deviceitem => {
            return <DevicesItem key={deviceitem.image.id} onDrop={deviceDropDelete} onDragOver={dragOver} deviceitem={deviceitem} />  
        })
    )
}
