/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

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

	useEffect(() => {
		if (data) {
			setPageCount(data.pages);
		}
	}, [data]);

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [page]);

	const handlePrevious = () => {
		setPage((p) => {
			if (p === 1) return p;
			return p - 1;
		});
	};

	const handleNext = () => {
		setPage((p) => {
			if (p === pageCount) return p;
			return p + 1;
		});
	};

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
					<p>Suppliers</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell table_image table_image-s"> </th>
							<th className="table_cell">Company</th>
							<th className="table_cell">Contact</th>
							<th className="table_cell">Title</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Country</th>
						</tr>
					</thead>
					<tbody>
						{data?.suppliers.map((e) => (
							<tr key={e.id}>
								<td className=" table_cell table_image-s">
									<img
										src={`https://avatars.dicebear.com/v2/initials/${e.ContactName.replace(/\s+/g, "-")}.svg?radius=50`}
										alt={`${e.ContactName.replace(/\s+/g, "-")}`}
									/>
								</td>
								<td className="table_cell">
									<Link className="table_link" to={`/supplier/${e.SupplierID}?page=${page}`}>
										{e.CompanyName}
									</Link>
								</td>
								<td className="table_cell">{e.ContactName}</td>
								<td className="table_cell">{e.ContactTitle}</td>
								<td className="table_cell">{e.City}</td>
								<td className="table_cell">{e.Country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{
				<Pagination
					currentPage={page}
					maxPages={pageCount}
					handlePrevious={handlePrevious}
					handleNext={handleNext}
					setPage={setPage}
				/>
			}
		</section>
	);
};
