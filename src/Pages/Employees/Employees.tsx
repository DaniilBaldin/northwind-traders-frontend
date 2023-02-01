/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchHook } from "../../Components/Hooks/fetchHook";
import { Pagination } from "../../Components/UI/Pagination/Pagination";

import { EmployeesResponse } from "../../Components/Types/Employees";

import RedoIcon from "@mui/icons-material/Redo";

import "./Employees.css";
import { useDispatch } from "react-redux";
import { addLog } from "../../Redux/actions";

export const EmployeesPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/employees?page=${page}`;

	const { data, loading, error, apiRequest } = fetchHook<EmployeesResponse>(`${url}${slug}`);

	const dispatch = useDispatch();

	const [logs, setLogs] = useState({});

	useEffect(() => {
		if (data) {
			setPageCount(data.pages);
			setLogs(data.stats);
			dispatch(addLog(logs));
		}
	}, [data]);

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [page]);

	if (!data && loading) {
		return <h4>Loading Employees Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p className="h">Employees</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell table_image table_image-s"></th>
							<th className="table_cell">Name</th>
							<th className="table_cell">Title</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Phone</th>
							<th className="table_cell">Country</th>
							<th className="table_cell"></th>
						</tr>
					</thead>
					<tbody>
						{data?.employees.map((e) => (
							<tr key={e.EmployeeID}>
								<td className="table_image table_cell table_image-s ">
									<img
										src={`https://avatars.dicebear.com/v2/initials/${e.FirstName}-${e.LastName}.svg?radius=50`}
										alt={`${e.FirstName}-${e.LastName}`}
									/>
								</td>
								<td className="table_cell table-data-e table_c">
									<Link className="table_link" to={`/employee/${e.EmployeeID}?page=${page}`}>
										{e.FirstName} {e.LastName}
									</Link>
								</td>
								<td className="table_cell table-data-e table_c">{e.Title}</td>
								<td className="table_cell table-data-e table_c">{e.City}</td>
								<td className="table_cell table-data-e table_c">{e.HomePhone}</td>
								<td className="table_cell table-data-e table_c">{e.Country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{<Pagination currentPage={page} maxPages={pageCount} setPage={setPage} />}
		</section>
	);
};
