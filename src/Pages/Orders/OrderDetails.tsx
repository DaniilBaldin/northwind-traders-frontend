/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { OrderDetailsResponse } from "../../Components/Types/Orders";

import "./OrderDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const OrderDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/order?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<OrderDetailsResponse>(`${url}${slug}`);

	if (!data && loading) {
		return <h4>Loading Order Data.</h4>;
	}

	if (error) {
		return <h4> An error has occured: {error}</h4>;
	}
	return (
		<section>
			<div className="table_container">
				<div className="sup_header">
					<BallotIcon />
					Order Information
				</div>
				<div className="row">
					<div className="column">
						<h4 className="text_row">Customer Id</h4>
						<Link className="table_link text_row" to={`/customer/${data?.order.CustomerID}`}>
							{data?.order.CustomerID}
						</Link>
						<h4 className="text_row">Ship Name</h4>
						<p className="text_row">{data?.order.ShipName}</p>
						<h4 className="text_row">Total Products</h4>
						<p className="text_row">{data?.order.TotalProducts}</p>
						<h4 className="text_row">Total Quantity</h4>
						<p className="text_row">{data?.order.TotalProductsItems}</p>
						<h4 className="text_row">Total Price</h4>
						<p className="text_row">${data?.order.TotalProductsPrice.toFixed(2)}</p>
						<h4 className="text_row">Total Discount</h4>
						<p className="text_row">${data?.order.TotalProductsDiscount.toFixed(2)}</p>
						<h4 className="text_row">Ship Via</h4>
						<p className="text_row">{data?.order.ShipViaCompanyName}</p>
						<h4 className="text_row">Freight</h4>
						<p className="text_row">${data?.order.Freight}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Order Date</h4>
						<p className="text_row_sec">{data?.order.OrderDate.split(" ")[0]}</p>
						<h4 className="text_row_sec">Required Date</h4>
						<p className="text_row_sec">{data?.order.RequiredDate.split(" ")[0]}</p>
						<h4 className="text_row_sec">Shipped Date</h4>
						<p className="text_row_sec">
							<>
								{data?.order.ShippedDate
									? data?.order.ShippedDate.split(" ")[0]
									: data?.order.RequiredDate.split(" ")[0]}
							</>
						</p>
						<h4 className="text_row_sec">Ship City</h4>
						<p className="text_row_sec">{data?.order.ShipCity}</p>
						<h4 className="text_row_sec">Ship Region</h4>
						<p className="text_row_sec">{!data?.order.ShipRegion ? data?.order.ShipCountry : data?.order.ShipRegion}</p>
						<h4 className="text_row_sec">Ship Postal Code</h4>
						<p className="text_row_sec">{data?.order.ShipPostalCode}</p>
						<h4 className="text_row_sec">Ship Country</h4>
						<p className="text_row_sec">{data?.order.ShipCountry}</p>
					</div>
				</div>
				<div className="sup_header">Products In Order</div>
				<table className="table">
					<thead>
						<tr>
							<th className="table_cell">Product</th>
							<th className="table_cell">Quantity</th>
							<th className="table_cell">Order Price</th>
							<th className="table_cell">Total Price</th>
							<th className="table_cell">Discount</th>
						</tr>
					</thead>
					<tbody>
						{data?.products.map((e) => (
							<tr key={e.OrderID}>
								<td className="table_cell table-data-od">
									<Link className="table_link" to={`/product/${e.ProductID}`}>
										{e.ProductName}
									</Link>
								</td>
								<td className="table_cell table-data-od">{e.Quantity}</td>
								<td className="table_cell table-data-od">${parseFloat(e.OrderUnitPrice).toFixed(2)}</td>
								<td className="table_cell table-data-od">
									${(parseFloat(e.OrderUnitPrice) * parseFloat(e.Quantity)).toFixed(2)}
								</td>
								<td className="table_cell table-data-od">{parseFloat(e.Discount) * 100}%</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="sup_footer">
					<button
						className="sup_button"
						type="button"
						onClick={() => {
							!page ? navigate(-1) : navigate(`/orders?page=${page}`);
						}}
					>
						<p className="bp">Go back</p>
					</button>
				</div>
			</div>
		</section>
	);
};
