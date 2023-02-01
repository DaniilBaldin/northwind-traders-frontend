/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchHook } from "../../Components/Hooks/fetchHook";
import { OrdersResponse } from "../../Components/Types/Orders";
import { Pagination } from "../../Components/UI/Pagination/Pagination";

import "./Orders.css";

import { addLog } from "../../Redux/actions";

import RedoIcon from "@mui/icons-material/Redo";

export const OrdersPage: FC = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/orders?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<OrdersResponse>(`${url}${slug}`);

	const dispatch = useDispatch();

	const [logs, setLogs] = useState({});
	console.log(logs);

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
		return <h4>Loading Orders Data.</h4>;
	}

	if (error) {
		return <h4>An Error has occured: {error}.</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p className="h">Orders</p>
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
							<th className="table_cell"></th>
						</tr>
					</thead>
					<tbody>
						{data?.orders.map((e) => (
							<tr key={e.OrderId} className="table-row">
								<td className="table_cell table-data-o table_c">
									<Link className="table_link" to={`/order/${e.OrderId}?page=${page}`}>
										{e.OrderId}
									</Link>
								</td>
								<td className="table_cell table-data-o table_c">${e.TotalProductsPrice.toFixed(2)}</td>
								<td className="table_cell table-data-o table_c">{e.TotalProducts}</td>
								<td className="table_cell table-data-o table_c">{e.TotalProductsItems}</td>
								<>
									{e.ShippedDate ? (
										<td className="table_cell table-data-o table_c">
											{new Date(e.ShippedDate).toISOString().replace(/T.*/, "")}
										</td>
									) : (
										<td className="table_cell table-data-o table_c">
											{new Date(e.OrderDate).toISOString().replace(/T.*/, "")}
										</td>
									)}
								</>
								<td className="table_cell table-data-o table_c">{e.ShipName}</td>
								<td className="table_cell table-data-o table_c">{e.ShipCity}</td>
								<td className="table_cell table-data-o table_c">{e.ShipCountry}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{<Pagination currentPage={page} maxPages={pageCount} setPage={setPage} />}
		</section>
	);
};
