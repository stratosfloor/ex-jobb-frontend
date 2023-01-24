import { useEffect, useRef, useState } from 'react';

function Map({ center, zoom }) {
	const ref = useRef(null);
	const [map, setMap] = useState();

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: center,
					zoom: zoom,
					mapTypeId: 'hybrid',
				})
			);
		}
	}, [ref, map]);

	return <div ref={ref} style={{ height: 480, width: 480 }} />;
}

export default Map;
