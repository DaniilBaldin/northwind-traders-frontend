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
						<h3>Product Name</h3>
						<p>{data?.ProductName}</p>
						<h3>Supplier</h3>
						<Link className="link" to={`/supplier/${data?.SupplierID}`}>
							{data?.SupplierName}
						</Link>
						<h3>Quantity Per Unit</h3>
						<p>{data?.QuantityPerUnit}</p>
						<h3>Unit Price</h3>
						<p>{data?.UnitPrice}</p>
					</div>
					<div className="column">
						<h3>Units In Stock</h3>
						<p>{data?.UnitsInStock}</p>
						<h3>Units On Order</h3>
						<p>{data?.UnitsOnOrder}</p>
						<h3>Reorder Level</h3>
						<p>{data?.ReorderLevel}</p>
						<h3>Discontinued</h3>
						<p>{data?.Discontinued}</p>
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
						<ArrowBackIcon />
					</button>
				</div>
			</div>
		</section>
	);
};
