/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { DashboardResponse } from "../../Components/Types/Dashboard";

import "./Dashboard.css";

export const DashboardPage: FC = () => {
	const globalStats = useSelector((state) => (state as any).logsReducer);
	const unique = globalStats.logs.filter((m: any) => m.payload.logs);
	// console.log(unique);
	const globalLogs: any[] = [];
	let select = 0;
	let select_where = 0;
	let select_left = 0;
	let result_count = 0;
	let query_count = 0;
	unique.forEach((e: any) => {
		result_count = result_count + e.payload.results;
		if (e.payload.logs.length === 2) {
			e.payload.logs.forEach((e: any) => {
				globalLogs.push(e);
				switch (true) {
					case e.type === "select":
						select = select + 1;
						query_count = query_count + 1;
						break;
					case e.type === "select_where":
						select_where = select_where + 1;
						query_count = query_count + 1;
						break;
					case e.type === "select_left":
						select_left = select_left + 1;
						query_count = query_count + 1;
						break;
				}
			});
		} else {
			globalLogs.push(e.payload.logs);
			switch (true) {
				case e.payload.logs.type === "select":
					select = select + 1;
					query_count = query_count + 1;
					break;
				case e.payload.logs.type === "select_where":
					select_where = select_where + 1;
					query_count = query_count + 1;
					break;
				case e.payload.logs.type === "select_left":
					select_left = select_left + 1;
					query_count = query_count + 1;
					break;
			}
		}
	});
	// console.log(globalLogs);

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
		<section className="table_container">
			<div className="dashboard">
				<div className="dash">
					<p className="dash_title">Worker</p>
					<p className="dash_text">Colo: KBP</p>
					<p className="dash_text">Country: {data?.geoData.country_code}</p>
				</div>
				<div>
					<p className="dash_title">SQL Metrics</p>
					<p className="dash_text">Query count: {query_count}</p>
					<p className="dash_text">Results count: {result_count}</p>
					<p className="dash_text"># SELECT: {select}</p>
					<p className="dash_text"># SELECT WHERE: {select_where}</p>
					<p className="dash_text"># SELECT LEFT JOIN: {select_left}</p>
				</div>
				<div className="log">
					<p className="dash_title-main">Activity log</p>
					<p className="dash_title-sec"> Explore the app and see metrics here:</p>
					{globalLogs.reverse().map((e) => (
						<article key={v4()} className="dash_article">
							<p className="dash_text-small">
								Date: {e.timestamp}, Database Name: {e.database}, Time Passed:
								{e.duration}
							</p>
							<p className="dash_text-log"> {e.query}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};
