/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";
import { Pagination } from "../../Components/UI/Pagination/Pagination";
import { CustomersResponse } from "../../Components/Types/Customers";

import "./Customers.css";

import RedoIcon from "@mui/icons-material/Redo";
import { useDispatch } from "react-redux";
import { addLog } from "../../Redux/actions";

export const CustomersPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/customers?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<CustomersResponse>(`${url}${slug}`);
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
		return <h4>Loading Customers Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p className="h">Customers</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell table_image table_image-s"></th>
							<th className="table_cell">Company</th>
							<th className="table_cell">Contact</th>
							<th className="table_cell">Title</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Country</th>
							<th className="table_cell"></th>
						</tr>
					</thead>
					<tbody>
						{data?.customers.map((e) => (
							<tr key={e.id}>
								<td className="table_image table_cell table_image-s">
									<img
										src={`https://avatars.dicebear.com/v2/initials/${e.ContactName.replace(/\s+/g, "-")}.svg?radius=50`}
										alt={`${e.ContactName.replace(/\s+/g, "-")}`}
									/>
								</td>
								<td className="table_cell table-data-c table_c">
									<Link className="table_link " to={`/customer/${e.CustomerID}?page=${page}`}>
										{e.CompanyName}
									</Link>
								</td>
								<td className="table_cell table-data-c table_c">{e.ContactName}</td>
								<td className="table_cell table-data-c table_c">{e.ContactTitle}</td>
								<td className="table_cell table-data-c table_c">{e.City}</td>
								<td className="table_cell table-data-c table_c">{e.Country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{<Pagination currentPage={page} maxPages={pageCount} setPage={setPage} />}
		</section>
	);
};
