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
		// INFOWINDOW
		const infowindow = new google.maps.InfoWindow({
			minWidth: 250,
			content: '<p>Add you popup content here</p>',
		});

		const marker = new google.maps.Marker({
			position: location,
			map: map,
			title: 'titel', //pizziers namn
			// content:
		});
		marker.addListener('click', () => {
			console.log('click');
			infowindow.setContent(
				'<p>THIS IS A EDITED STRING<br>' +
					location.lat +
					'<br>' +
					location.lng +
					'</p>'
			);
			infowindow.open(map, marker);
		});
		google.maps.event.addListener(map, 'click', () => {
			infowindow.close();
		});
	};

	const addAllMarkers = (markers) => {
		markers.map((marker) => {
			const location = { lat: marker.x, lng: marker.y };
			// console.log(location);
			// console.log(mossen);
			addMarker(location);
			addMarker(mossen);
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

	return <div ref={ref} style={{ height: 480, width: 480 }} />;
}

export default Map;
