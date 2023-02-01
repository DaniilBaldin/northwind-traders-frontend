/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { addLog } from "../../Redux/actions";

import { SuppliersResponse } from "../../Components/Types/Suppliers";
import { Pagination } from "../../Components/UI/Pagination/Pagination";

import "./Suppliers.css";

import RedoIcon from "@mui/icons-material/Redo";

export const SuppliersPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/suppliers?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<SuppliersResponse>(`${url}${slug}`);
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
		return <h4>Loading Suppliers Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p className="h">Suppliers</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell table_cell-image table_image table_image-s"> </th>
							<th className="table_cell">Company</th>
							<th className="table_cell">Contact</th>
							<th className="table_cell">Title</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Country</th>
							<th className="table_cell"></th>
						</tr>
					</thead>
					<tbody>
						{data?.suppliers.map((e) => (
							<tr key={e.id}>
								<td className="table_cell table_image-s">
									<img
										src={`https://avatars.dicebear.com/v2/initials/${e.ContactName.replace(/\s+/g, "-")}.svg?radius=50`}
										alt={`${e.ContactName.replace(/\s+/g, "-")}`}
									/>
								</td>
								<td className="table_cell table_c">
									<Link className="table_link" to={`/supplier/${e.SupplierID}?page=${page}`}>
										{e.CompanyName}
									</Link>
								</td>
								<td className="table_cell table_c">{e.ContactName}</td>
								<td className="table_cell table_c">{e.ContactTitle}</td>
								<td className="table_cell table_c">{e.City}</td>
								<td className="table_cell table_c">{e.Country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{<Pagination currentPage={page} maxPages={pageCount} setPage={setPage} />}
		</section>
	);
};
