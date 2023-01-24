import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from './Map';

function App() {
	const status = Status;
	const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
	const render = (status) => {
		<h1>{status}</h1>;
	};

	const [zoom, setZoom] = useState(11);
	const [center, setCenter] = useState({ lat: 57.7177, lng: 11.9727 });

	return (
		<div className={styles.container}>
			<Wrapper apiKey={API_KEY} render={render}>
				<Map center={center} zoom={zoom} />
				<div className={styles.content}>this is content side</div>
			</Wrapper>
		</div>
	);
}

export default App;
