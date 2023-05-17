import React, {useEffect, useState} from 'react';
import './App.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import mushrooms, {Mushroom} from './front-end api';

const App: React.FC = () => {
    const [mushroomData, setMushroomData] = useState<Mushroom[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await mushrooms();
                setMushroomData(response);
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Code Challenge Fungus Friends</h1>
            <MapContainer center={[52.081, 5.236]} zoom={23} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mushroomData.map((mushrooms) => (
                    <Marker
                        key={mushrooms.name}
                        position={mushrooms.latlng}>
                        <Popup>
                            <h4>{mushrooms.name}</h4>
                            {/*<p>Spots: {mushrooms.spots}</p>*/}
                            {/*<p>Color: {mushrooms.color}</p>*/}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;
