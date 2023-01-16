import React, { FC } from "react";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { DashboardResponse } from "../../Components/Types/Dashboard";

import "./Dashboard.css";

export const DashboardPage: FC = () => {
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = "/dashboard";
	const { data, loading, error } = fetchHook<DashboardResponse>(`${url}${slug}`);

	if (!data && loading) {
		return <h4>Loading Dashboard Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section className="dashboard">
			<div className="dash">
				<p className="dash_title">Worker</p>
				<p className="dash_text">Colo: KBP</p>
				<p className="dash_text">Country: {data?.geoData.country}</p>
			</div>
			<div>
				<p className="dash_title">SQL Metrics</p>
				<p className="dash_text">Query Count: {data?.query_count}</p>
				<p className="dash_text">Results count: {data?.result_count}</p>
				<p className="dash_text"># SELECT: {data?.select}</p>
				<p className="dash_text"># SELECT_WHERE: {data?.select_where}</p>
				<p className="dash_text"># SELECT_LEFT: {data?.select_left}</p>
			</div>
			<div className="log">
				<p className="dash_title">Activity Log</p>
				<p className="dash_text"> Explore the app and see metrics here:</p>
				{data?.logs.map((e) => (
					<article key={e.id} className="dash_article">
						<p className="dash_text-small">
							Result count: {e.result_count}, Type: {e.type}, Database Name: {e.database_name}, Time Passed:
							{e.time_passed}
						</p>
						<p className="dash_text-log">Query: {e.query}</p>
					</article>
				))}
			</div>
		</section>
	);
};
