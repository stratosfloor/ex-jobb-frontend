import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Map({ center, zoom }) {
	const API_URL = 'http://localhost:8080/api/locations';
	const ref = useRef(null);
	const [map, setMap] = useState();
	const [markers, setMarkers] = useState([]);
	const mossen = {
		lat: 57.682606003178826,
		lng: 11.983962371493599,
	};

	const fetchAllLocations = () => {
		axios.get(API_URL).then((response) => {
			setMarkers(response.data);
		});
	};
	useEffect(() => {
		fetchAllLocations();
	}, []);

	const addMarker = (location) => {
		const marker = new google.maps.Marker({
			position: location,
			map: map,
			// icon: {
			// 	path: google.maps.SymbolPath.CIRCLE,
			// 	scale: 10,
			// },
		});
		marker.addListener('click', () => {
			console.log('click');
		});
	};

	const addAllMarkers = (markers) => {
		markers.map((marker) => {
			const location = { lat: marker.x, lng: marker.y };
			console.log(location);
			console.log(mossen);
			addMarker(location);
			addMarker(mossen);
		});
	};

	//addMarker(mossen);
	useEffect(() => {
		addAllMarkers(markers);
	}, [markers]);

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: center,
					zoom: zoom,
					mapTypeId: 'hybrid',
					mapTypeControl: false,
					rotateControl: false,
					streetViewControl: false,
					fullscreenControl: false,
					panControl: false,
					zoomControl: true,
					draggableCursor: 'pointer',
				})
			);
		}
	}, [ref, map]);

	return <div ref={ref} style={{ height: 480, width: 480 }} />;
}

export default Map;
