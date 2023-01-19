/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { ProductsResponse } from "../../Components/Types/Products";

import { Pagination } from "../../Components/UI/Pagination/Pagination";

import "./Products.css";

import RedoIcon from "@mui/icons-material/Redo";

export const ProductsPage = () => {
	const [search] = useSearchParams();
	const p: any = search.get("page");
	const [page, setPage] = useState(parseInt(p) || 1);
	const [pageCount, setPageCount] = useState(0);
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/products?page=${page}`;
	const { data, loading, error, apiRequest } = fetchHook<ProductsResponse>(`${url}${slug}`);

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [page]);

	useEffect(() => {
		if (data) {
			setPageCount(data.pages);
		}
	}, [data]);

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
		return <h4>Loading Products Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="table_container">
				<div className="table_header">
					<p>Products</p>
					<RedoIcon className="table_header-item" />
				</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell">Name</th>
							<th className="table_cell">Qt per Unit</th>
							<th className="table_cell">Price</th>
							<th className="table_cell">Stock</th>
							<th className="table_cell">Orders</th>
						</tr>
					</thead>
					<tbody>
						{data?.products.map((e) => (
							<tr key={e.id}>
								<td className="table_cell td">
									<Link className="table_link" to={`/product/${e.ProductID}?page=${page}`}>
										{" "}
										{e.ProductName}
									</Link>
								</td>
								<td className="table_cell td"> {e.QuantityPerUnit}</td>
								<td className="table_cell td ">${e.UnitPrice}</td>
								<td className="table_cell td "> {e.UnitsInStock}</td>
								<td className="table_cell td"> {e.UnitsOnOrder}</td>
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
