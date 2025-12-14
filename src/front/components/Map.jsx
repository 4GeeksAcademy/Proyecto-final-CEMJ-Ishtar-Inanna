import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";

export default function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyC3LNNrqNP8l6RH6EmjuNSW2h1go_engHk",
        libraries: ["places"],
    });

    const [userLocation, setUserLocation] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Obteniendo tu ubicación…");
    const [searchLocation, setSearchLocation] = useState(null);

    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatusMessage("Geolocalización no soportada. Mostrando ubicación por defecto.");
            setUserLocation({ lat: 40.4168, lng: -3.7038 });
            return;
        }

        const geoTimeout = setTimeout(() => {
            setStatusMessage("No se pudo obtener la ubicación. Mostrando ubicación por defecto.");
            setUserLocation({ lat: 40.4168, lng: -3.7038 });
        }, 10000);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                clearTimeout(geoTimeout);
                setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setStatusMessage("");
            },
            (err) => {
                clearTimeout(geoTimeout);
                console.error("Error:", err);
                setStatusMessage("Error al obtener ubicación. Mostrando ubicación por defecto.");
                setUserLocation({ lat: 40.4168, lng: -3.7038 });
            }
        );
    }, []);

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setSearchLocation(location);
            }
        }
    };

    if (loadError) return <p>Error cargando Google Maps…</p>;
    if (!isLoaded) return <p>Cargando Google Maps…</p>;
    if (!userLocation) return <p>{statusMessage}</p>;

    const mapCenter = searchLocation || userLocation;

    return (
        <div className="container my-4">
            <div className="card shadow rounded mb-4">
                <div className="card-body">
                    <h5 className="card-title text-center mb-3">Ubicación</h5>

                    <div className="mb-3">
                        <Autocomplete
                            onLoad={(ref) => (autocompleteRef.current = ref)}
                            onPlaceChanged={onPlaceChanged}
                        >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Introduce una ubicación"
                            />
                        </Autocomplete>
                    </div>

                    <div
                        className="rounded overflow-hidden"
                        style={{ width: "100%", height: "400px" }}
                    >
                        <GoogleMap
                            center={mapCenter}
                            zoom={15}
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                            <Marker position={userLocation} title="Tu ubicación" />
                            {searchLocation && (
                                <Marker
                                    position={searchLocation}
                                    title="Ubicación buscada"
                                />
                            )}
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
}
