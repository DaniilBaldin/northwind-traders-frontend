import React, { useEffect, useState } from "react";
import "./Clock.css";

export const Clock = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString("en-GB"));

	useEffect(() => {
		const time = () => {
			const event = new Date();
			setTime(event.toLocaleTimeString("en-GB"));
		};
		const interval = setInterval(time, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="clock">
			<p>{time}</p>
		</div>
	);
};
