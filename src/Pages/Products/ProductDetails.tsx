/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { ProductResponse } from "../../Components/Types/Products";

import "./ProductDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ProductsDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/product?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<ProductResponse>(`${url}${slug}`);

	if (!data && loading) {
		return <h4>Loading Product Data.</h4>;
	}

	if (error) {
		return <h4> An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div>
				<div className="prdct_header">
					<BallotIcon />
					Product information
				</div>
				<div className="row">
					<div className="column">
						<h4 className="text_row">Product Name</h4>
						<p className="text_row">{data?.ProductName}</p>
						<h4 className="text_row">Supplier</h4>
						<Link className="prdct_link text_row" to={`/supplier/${data?.SupplierID}`}>
							{data?.SupplierName}
						</Link>
						<h4 className="text_row">Quantity Per Unit</h4>
						<p className="text_row">{data?.QuantityPerUnit}</p>
						<h4 className="text_row">Unit Price</h4>
						<p className="text_row">${data?.UnitPrice}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Units In Stock</h4>
						<p className="text_row_sec">{data?.UnitsInStock}</p>
						<h4 className="text_row_sec">Units On Order</h4>
						<p className="text_row_sec">{data?.UnitsOnOrder}</p>
						<h4 className="text_row_sec">Reorder Level</h4>
						<p className="text_row_sec">{data?.ReorderLevel}</p>
						<h4 className="text_row_sec">Discontinued</h4>
						<p className="text_row_sec">{data?.Discontinued}</p>
					</div>
				</div>
				<div className="prdct_footer">
					<button
						className="prdct_button"
						type="button"
						onClick={() => {
							!page ? navigate(-1) : navigate(`/products?page=${page}`);
						}}
					>
						<p className="bp">Go back</p>
					</button>
				</div>
			</div>
		</section>
	);
};
