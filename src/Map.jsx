import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Map({ center, zoom }) {
	const API_URL = 'http://localhost:8080/api/locations';
	const ref = useRef(null);
	const [map, setMap] = useState();
	const [markers, setMarkers] = useState([]);

	const fetchAllLocations = () => {
		axios.get(API_URL).then((response) => {
			setMarkers(response.data);
		});
	};
	useEffect(() => {
		fetchAllLocations();
	}, []);

	const addMarker = (position) => {
		// Check bounderies for markers,
		// I.E. latitud [-90, 90]
		// and longitid [-180, 180]
		if (!(position.lat > -90 || position.lat < 90)) {
			return;
		}
		if (!(position.lng > -180 || position.lng < 180)) {
			return;
		}
		// INFOWINDOW
		const infowindow = new google.maps.InfoWindow({});

		// MARKER
		const marker = new google.maps.Marker({
			position,
			map,
		});

		// LISTENER ON MARKER
		marker.addListener('click', () => {
			console.log('click');
			infowindow.setContent(
				'<p>Du är här<br>' + position.lat + '<br>' + position.lng + '</p>'
			);
			infowindow.open(map, marker);
		});
	};

	const addAllMarkers = (markers) => {
		markers.map((marker) => {
			const position = { lat: marker.x, lng: marker.y };
			addMarker(position);
		});
	};

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

	return <div ref={ref} style={{ height: 480, width: '50%' }} />;
}

export default Map;
