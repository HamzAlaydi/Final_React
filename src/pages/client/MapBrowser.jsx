import React ,{useRef,useEffect} from 'react'
import {Container} from '@mui/material'
import Navbar from '../../components/Navbar'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { useStudentMap } from '../../hooks/useStudentMap';
import { useNavigate } from 'react-router-dom';

export default function MapBrowser() {
    const {token,student} = useSelector((state)=>state.student)
    const navigate = useNavigate()

    const {data,isLoading} = useStudentMap(student?.id,token)
    console.log(data)

    const mapRef = useRef(null);

    useEffect(() => {
        if(data)
        {
            const map = L.map(mapRef.current).setView([51.505, -0.09], 7);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 12,
            }).addTo(map);

            // loop through the data and add markers to the map
            data.result.forEach(({ firstName , lastName, lat,long,id }) => {
            L.marker([lat,long]).addTo(map)
                .bindPopup(`<a href="/teacher/${id}">${firstName +" "+lastName}</a>`)
                .openPopup()
            });
        }
    }, [data]);

    return (
        <Navbar>
            <Container sx={{marginBottom:"80px",marginTop:"120px"}}>
                {!isLoading?<div ref={mapRef} style={{ height: '400px' }} />:""}
            </Container>
        </Navbar>
    )
}
