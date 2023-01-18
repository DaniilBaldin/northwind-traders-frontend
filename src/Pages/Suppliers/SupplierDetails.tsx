/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchHook } from "../../Components/Hooks/fetchHook";
import { SupplierResponse } from "../../Components/Types/Suppliers";
import "./SupplierDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const SupplierDetailsPage: FC = () => {
	const location = useLocation();
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
						<h3>Company Name</h3>
						<p>{data?.CompanyName}</p>
						<h3>Contact Name</h3>
						<p>{data?.ContactName}</p>
						<h3>Contact Title</h3>
						<p>{data?.ContactTitle}</p>
						<h3>Address</h3>
						<p>{data?.Address}</p>
						<h3>City</h3>
						<p>{data?.City}</p>
					</div>
					<div className="column">
						<h3>Region</h3>
						<p>{data?.Region ? data?.Region : <br />}</p>
						<h3>Postal Code</h3>
						<p>{data?.PostalCode}</p>
						<h3>Country</h3>
						<p>{data?.Country}</p>
						<h3>Phone</h3>
						<p>{data?.Phone}</p>
						{data?.Fax ? (
							<>
								<h3>Fax</h3>
								<p>{data?.Fax}</p>
							</>
						) : (
							""
						)}
						{data?.HomePage ? (
							<>
								<h3>Home Page</h3>
								<p>{data?.HomePage}</p>
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
						<ArrowBackIcon />
					</button>
				</div>
			</div>
		</section>
	);
};
