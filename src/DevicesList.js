import React from 'react'
import DevicesItem from './DevicesItem'

export default function DevicesList({ deviceitems, toggleDevice }) {
    return (
        deviceitems.map(deviceitem => {
            return <DevicesItem key={deviceitem.image.id} toggleDevice={toggleDevice} deviceitem={deviceitem} />  
        })
    )
}
