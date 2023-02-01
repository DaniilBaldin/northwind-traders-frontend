/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { ProductsResponse } from "../../Components/Types/Products";

import { Pagination } from "../../Components/UI/Pagination/Pagination";

import { addLog } from "../../Redux/actions";

import "./Products.css";

import RedoIcon from "@mui/icons-material/Redo";
import { useDispatch } from "react-redux";

export const ProductsPage = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/products?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<ProductsResponse>(`${url}${slug}`);

	const dispatch = useDispatch();

	const [logs, setLogs] = useState({});

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [page]);

	useEffect(() => {
		if (data) {
			setPageCount(data.pages);
			setLogs(data.stats);
			dispatch(addLog(logs));
		}
	}, [data]);

	if (!data && loading) {
		return <h4>Loading Products Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p className="h">Products</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell">Name</th>
							<th className="table_cell">Qt Per Unit</th>
							<th className="table_cell">Price</th>
							<th className="table_cell">Stock</th>
							<th className="table_cell">Orders</th>
							<th className="table_cell"></th>
						</tr>
					</thead>
					<tbody>
						{data?.products.map((e) => (
							<tr key={e.id}>
								<td className="table_cell table-data-p table_c">
									<Link className="table_link c " to={`/product/${e.ProductID}?page=${page}`}>
										{" "}
										{e.ProductName}
									</Link>
								</td>
								<td className="table_cell table-data-p table_c"> {e.QuantityPerUnit}</td>
								<td className="table_cell table-data-p table_c">${parseFloat(e.UnitPrice)}</td>
								<td className="table_cell table-data-p table_c"> {e.UnitsInStock}</td>
								<td className="table_cell table-data-p table_c"> {e.UnitsOnOrder}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{<Pagination currentPage={page} maxPages={pageCount} setPage={setPage} />}
		</section>
	);
};
