/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchHook } from "../../Components/Hooks/fetchHook";
import { Pagination } from "../../Components/UI/Pagination/Pagination";

import { EmployeesResponse } from "../../Components/Types/Employees";

import RedoIcon from "@mui/icons-material/Redo";

import "./Employees.css";

export const EmployeesPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/employees?page=${page}`;

	const { data, loading, error, apiRequest } = fetchHook<EmployeesResponse>(`${url}${slug}`);

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
		return <h4>Loading Employees Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p>Employees</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell table_image"></th>
							<th className="table_cell">Name</th>
							<th className="table_cell">Title</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Phone</th>
							<th className="table_cell">Country</th>
						</tr>
					</thead>
					<tbody>
						{data?.orders.map((e) => (
							<tr key={e.EmployeeID}>
								<td className="table_image table_cell">
									<img
										src={`https://avatars.dicebear.com/v2/initials/${e.FirstName}-${e.LastName}.svg?radius=50`}
										alt={`${e.FirstName}-${e.LastName}`}
									/>
								</td>
								<td className="table_cell">
									<Link className="table_link" to={`/employee/${e.EmployeeID}?page=${page}`}>
										{e.FirstName} {e.LastName}
									</Link>
								</td>
								<td className="table_cell">{e.Title}</td>
								<td className="table_cell">{e.City}</td>
								<td className="table_cell">{e.HomePhone}</td>
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
