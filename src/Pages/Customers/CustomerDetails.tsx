/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";
import { CustomerDetailsresponse } from "../../Components/Types/Customers";

import "./CustomerDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { addLog } from "../../Redux/actions";

export const CustomerDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const dispatch = useDispatch();

	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/customer?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<CustomerDetailsresponse>(`${url}${slug}`);

	if (data) {
		dispatch(addLog(data?.stats));
	}

	if (!data && loading) {
		return <h4>Loading Customer Data.</h4>;
	}

	if (error) {
		return <h4>An Error has occured: {error}</h4>;
	}

	return (
		<section>
			<div className="details_container">
				<div className="cstmr_header">
					<BallotIcon />
					Customer Information
				</div>
				<div className="row">
					<div className="column">
						<h4 className="text_row">Company Name</h4>
						<p className="text_row">{data?.customer.CompanyName}</p>
						<h4 className="text_row">Contact Name</h4>
						<p className="text_row">{data?.customer.ContactName}</p>
						<h4 className="text_row">Contact Title</h4>
						<p className="text_row">{data?.customer.ContactTitle}</p>
						<h4 className="text_row">Address</h4>
						<p className="text_row">{data?.customer.Address}</p>
						<h4 className="text_row">City</h4>
						<p className="text_row">{data?.customer.City}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Postal Code</h4>
						<p className="text_row_sec">{data?.customer.PostalCode}</p>
						<h4 className="text_row_sec">Region</h4>
						<p className="text_row_sec">{data?.customer.Region}</p>
						<h4 className="text_row_sec">Country</h4>
						<p className="text_row_sec">{data?.customer.Country}</p>
						<h4 className="text_row_sec">Phone</h4>
						<p className="text_row_sec">{data?.customer.Phone}</p>
						<h4 className="text_row_sec">Fax</h4>
						<p className="text_row_sec">{data?.customer.Fax}</p>
					</div>
				</div>
				<div className="cstmr_footer">
					<button
						className="cstmr_button"
						type="button"
						onClick={() => {
							!page ? navigate(-1) : navigate(`/customers?page=${page}`);
						}}
					>
						<p className="bp">Go back</p>
					</button>
				</div>
			</div>
		</section>
	);
};
