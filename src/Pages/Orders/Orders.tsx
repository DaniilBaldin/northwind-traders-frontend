/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";
import { OrdersResponse } from "../../Components/Types/Orders";
import { Pagination } from "../../Components/UI/Pagination/Pagination";

import "./Orders.css";

import RedoIcon from "@mui/icons-material/Redo";

export const OrdersPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/orders?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<OrdersResponse>(`${url}${slug}`);

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
		return <h4>Loading Orders Data.</h4>;
	}

	if (error) {
		return <h4>An Error has occured: {error}.</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p>Orders</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr className="table-row">
							<th className="table_cell">Id</th>
							<th className="table_cell">Total Price</th>
							<th className="table_cell">Products</th>
							<th className="table_cell">Quantity</th>
							<th className="table_cell">Shipped</th>
							<th className="table_cell">Ship Name</th>
							<th className="table_cell">City</th>
							<th className="table_cell">Country</th>
						</tr>
					</thead>
					<tbody>
						{data?.orders.map((e) => (
							<tr key={e.OrderId} className="table-row">
								<td className="table_cell table-data-o">
									<Link className="table_link" to={`/order/${e.OrderId}?page=${page}`}>
										{e.OrderId}
									</Link>
								</td>
								<td className="table_cell table-data-o">${e.TotalProductsPrice.toFixed(2)}</td>
								<td className="table_cell table-data-o">{e.TotalProducts}</td>
								<td className="table_cell table-data-o">{e.TotalProductsItems}</td>
								<>
									{e.ShippedDate ? (
										<td className="table_cell table-data-o">
											{new Date(e.ShippedDate).toISOString().replace(/T.*/, "")}
										</td>
									) : (
										<td className="table_cell table-data-o">
											{new Date(e.OrderDate).toISOString().replace(/T.*/, "")}
										</td>
									)}
								</>
								<td className="table_cell table-data-o">{e.ShipName}</td>
								<td className="table_cell table-data-o">{e.ShipCity}</td>
								<td className="table_cell table-data-o">{e.ShipCountry}</td>
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
