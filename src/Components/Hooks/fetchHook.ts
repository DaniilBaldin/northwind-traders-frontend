/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

export const fetchHook = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const apiRequest = async () => {
		setError(null);
		setLoading(true);
		setData(null);

		try {
			const response = await fetch(`${url}`);
			const data = await response.json();

			if (!data.success) {
				setLoading(false);
				throw new Error("Error!");
			}

			if (data.success) {
				setData(data.data);
				setLoading(false);
			}
		} catch (error) {
			setError((error as Error).message);
		}
	};

	useEffect(() => {
		apiRequest();
	}, []);

	return { loading, error, data };
};
