import React from 'react'
import DevicesItem from './DevicesItem'

export default function DevicesList({ deviceitems } ) {
    return (
        deviceitems.map(deviceitem => {
            return <DevicesItem key={deviceitem.image.id} deviceitem={deviceitem} />  
        })
    )
}
