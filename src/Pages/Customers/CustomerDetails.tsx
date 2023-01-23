import React, { FC } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";
import { CustomerDetailsresponse } from "../../Components/Types/Customers";

import "./CustomerDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CustomerDetailsPage = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/customer?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<CustomerDetailsresponse>(`${url}${slug}`);

	if (!data && loading) {
		return <h4>Loading Customer Data.</h4>;
	}

	if (error) {
		return <h4>An Error has occured: {error}</h4>;
	}

	return (
		<section>
			<div>
				<div className="cstmr_header">
					<BallotIcon />
					<p>Customer Information</p>
				</div>
				<div className="row">
					<div className="column">
						<h3>Company Name</h3>
						<p>{data?.CompanyName}</p>
						<h3>Contact Name</h3>
						<p>{data?.ContactName}</p>
						<h3>Company Title</h3>
						<p>{data?.ContactTitle}</p>
						<h3>Address</h3>
						<p>{data?.Address}</p>
						<h3>City</h3>
						<p>{data?.City}</p>
					</div>
					<div className="column">
						<h3>Postal Code</h3>
						<p>{data?.PostalCode}</p>
						<h3>Region</h3>
						<p>{data?.Region}</p>
						<h3>Country</h3>
						<p>{data?.Country}</p>
						<h3>Phone</h3>
						<p>{data?.Phone}</p>
						<h3>Fax</h3>
						<p>{data?.Fax}</p>
					</div>
				</div>
				<div className="cstmr_footer">
					<button
						className="cstmr_button"
						type="button"
						onClick={() => {
							navigate(`/customers?page=${page}`);
						}}
					>
						<ArrowBackIcon />
					</button>
				</div>
			</div>
		</section>
	);
};
