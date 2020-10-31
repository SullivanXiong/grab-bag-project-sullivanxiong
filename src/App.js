import React, { useState, useRef, useEffect } from 'react';
import GearBagList from './GearBagList'
import DevicesList from './DevicesList'
import uuidv4 from 'uuid/v4';
import $ from 'jquery'

const LOCAL_STORAGE_KEY_GRAB_BAG = 'grabBag';
const LOCAL_STORAGE_KEY_DEVICES = 'devices';

function App() {
    const [gearBag, setGearBag] = useState([]);
    const [devices, setDevices] = useState([]);
    const [pageNumber, setPageNumber] = useState([0]);
    var deviceTitles = []

    const nextRef = useRef();
    const prevRef = useRef();
    const gearBagRef = useRef();
    const gearBagFrameRef = useRef();

    // Load our Gear bag devices from local storage
    useEffect(() => {
        const storedGearBag = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_GRAB_BAG));
        if (storedGearBag) {
            setGearBag(storedGearBag);
        }

        prevRef.current.style = "display: None;";

        $.get('https://www.ifixit.com/api/2.0/categories', (data) => {
            function recurAPICall(key, value) {
                let ret = [];
                let lengthOfValue = Object.keys(value).length;

                if (lengthOfValue > 0) {
                    for (const valueKey in value)
                        ret = ret.concat(recurAPICall(valueKey, value[valueKey]));
                    return ret
                }
                else 
                    return [key]
            }

            for (const key in data)
                deviceTitles = deviceTitles.concat(recurAPICall(key, data[key]));
        }).then(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY_DEVICES, JSON.stringify(deviceTitles));
            toggleDevice(pageNumber[0]);
        });
    }, []);

    // Store our Gear bag devices to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_GRAB_BAG, JSON.stringify(gearBag));
        resizeGearBag();
    }, [gearBag]);

    function prevPage() {
        const copyPageNumber = [...pageNumber];
        copyPageNumber[0] = copyPageNumber[0] - 1
        setPageNumber(copyPageNumber);
        if (copyPageNumber[0] === 0)
            prevRef.current.style = "display: None;";
        else
            prevRef.current.style = "display: block;";
        toggleDevice(copyPageNumber[0]);
    }

    function nextPage() {
        const copyPageNumber = [...pageNumber];
        copyPageNumber[0] = copyPageNumber[0] + 1
        setPageNumber(copyPageNumber);
        if (copyPageNumber[0] === 0)
            prevRef.current.style = "display: None;";
        else
            prevRef.current.style = "display: block;";
        toggleDevice(copyPageNumber[0]);
    }

    function toggleDevice(pageNum) {
        let newDevices = []
        let deviceTitles = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DEVICES));
        for (let i = 0; i < 14; i++) {
            let idxFromPage = i + (14 * pageNum);
            console.log(idxFromPage);
            console.log(deviceTitles[idxFromPage]);
            $.get(`https://www.ifixit.com/api/2.0/categories/${deviceTitles[idxFromPage]}`, (data) => newDevices = [...newDevices, data])
                .then(() => {
                    setDevices(newDevices);
                })
        }
    }

    function resizeGearBag() {
        let rows = Math.floor(gearBag.length / 7)
        gearBagFrameRef.current.style = `height: ${((rows + 1) * 26) + 3}vh;`
        gearBagRef.current.style = `height: ${(rows + 1) * 23}vh;`
    }

    function toggleGearBag(title) {
        let newGearBag = [...gearBag]
        
        $.get(`https://www.ifixit.com/api/2.0/categories/${title}`, (data) => {
            data.id = uuidv4();
            newGearBag = [...newGearBag, data];
        })
            .then(() => {
                setGearBag(newGearBag);
            });
        resizeGearBag();
    }

    function drop(element) {
        element.preventDefault();
        const device_title = element.dataTransfer.getData('deviceTitle');

        toggleGearBag(device_title);
        console.log('Drop');
    }

    function dragOver(element) {
        element.preventDefault();
    }

    function deviceDelete(element) {
        element.preventDefault();
        const deviceUuid = element.dataTransfer.getData('deviceUuid');
        
        let copyGearBag = [...gearBag]
        copyGearBag = copyGearBag.filter(device => device.id !== deviceUuid);
        setGearBag(copyGearBag)
    }


    return (
        <>
            <div ref={gearBagFrameRef} id="gearBagFrame" onDrop={drop} onDragOver={dragOver}>
                <h2 id="title">My Gear Bag</h2>
                <div id="gearBag" ref={gearBagRef}>
                    <GearBagList gbitems={gearBag} toggleGearBag={toggleGearBag} setGearBag={setGearBag}/>
                </div>
            </div>
            <div id="devicesFrame" onDrop={deviceDelete} onDragOver={dragOver}>
                <h2 id="title">Devices</h2>
                <div id="devices" onDrop={deviceDelete} onDragOver={dragOver}>
                    <DevicesList  deviceitems={devices} deviceDelete={deviceDelete} dragOver={dragOver}/>
                </div>
                <button ref={prevRef} id="prevButton" onClick={prevPage}>PREV</button>
                <button ref={nextRef} id="nextButton" onClick={nextPage}>NEXT</button>
            </div>
        </>
    )
}

export default App;
