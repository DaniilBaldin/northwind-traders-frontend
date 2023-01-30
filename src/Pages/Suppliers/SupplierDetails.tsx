/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchHook } from "../../Components/Hooks/fetchHook";
import { SupplierResponse } from "../../Components/Types/Suppliers";
import "./SupplierDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const SupplierDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();

	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/supplier?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<SupplierResponse>(`${url}${slug}`);

	if (!data && loading) {
		return <h4>Loading Supplier Data.</h4>;
	}

	if (error) {
		return <h4>An error has occured: {error}</h4>;
	}

	const page = search.get("page");

	return (
		<section>
			<div>
				<div className="sup_header">
					<BallotIcon />
					Supplier Information
				</div>
				<div className="row">
					<div className="column">
						<h4 className="text_row">Company Name</h4>
						<p className="text_row">{data?.CompanyName}</p>
						<h4 className="text_row">Contact Name</h4>
						<p className="text_row">{data?.ContactName}</p>
						<h4 className="text_row">Contact Title</h4>
						<p className="text_row">{data?.ContactTitle}</p>
						<h4 className="text_row">Address</h4>
						<p className="text_row">{data?.Address}</p>
						<h4 className="text_row">City</h4>
						<p className="text_row">{data?.City}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Region</h4>
						<p className="text_row_sec">{data?.Region ? data?.Region : "-"}</p>
						<h4 className="text_row_sec">Postal Code</h4>
						<p className="text_row_sec">{data?.PostalCode}</p>
						<h4 className="text_row_sec">Country</h4>
						<p className="text_row_sec">{data?.Country}</p>
						<h4 className="text_row_sec">Phone</h4>
						<p className="text_row_sec">{data?.Phone}</p>
						{data?.Fax ? (
							<>
								<h4 className="text_row_sec">Fax</h4>
								<p className="text_row_sec">{data?.Fax}</p>
							</>
						) : (
							""
						)}
						{data?.HomePage ? (
							<>
								<h4 className="text_row_sec">Home Page</h4>
								<p className="text_row_sec">{data?.HomePage}</p>
							</>
						) : (
							""
						)}
					</div>
				</div>
				<div className="sup_footer">
					<button
						className="sup_button"
						type="button"
						onClick={() => {
							!page ? navigate(-1) : navigate(`/suppliers?page=${page}`);
						}}
					>
						<p className="bp">Go back</p>
					</button>
				</div>
			</div>
		</section>
	);
};
