/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { EmployeeResponse } from "../../Components/Types/Employees";

import "./EmployeeDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const EmployeeDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/employee?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<EmployeeResponse>(`${url}${slug}`);

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [id]);

	if (!data && loading) {
		return <h4>Loading Employee Data.</h4>;
	}

	if (error) {
		return <h4> An error has occured: {error}</h4>;
	}

	return (
		<section>
			<div>
				<div className="empl_header">
					<BallotIcon />
					Employee Information
				</div>
				<div className="row">
					<div className="column">
						<h3>Name</h3>
						<p>
							{data?.FirstName} {data?.LastName}
						</p>
						<h3>Title</h3>
						<p>{data?.Title}</p>
						<h3>Title Of Courtesy</h3>
						<p>{data?.TitleOfCourtesy}</p>
						<h3>Birth Date</h3>
						<p>{data?.BirthDate}</p>
						<h3>Hire Date</h3>
						<p>{data?.HireDate}</p>
						<h3>Address</h3>
						<p>{data?.Address}</p>
						<h3>City</h3>
						<p>{data?.City}</p>
					</div>
					<div className="column">
						<h3>Postal Code</h3>
						<p>{data?.PostalCode}</p>
						<h3>Country</h3>
						<p>{data?.Country}</p>
						<h3>Home Phone</h3>
						<p>{data?.HomePhone}</p>
						<h3>Extension</h3>
						<p>{data?.Extension}</p>
						<h3>Address</h3>
						<p>{data?.Address}</p>
						<h3>Notes</h3>
						<p>{data?.Notes}</p>
						{data?.ReportsTo ? (
							<>
								<h3>Reports To</h3>
								<Link className="empl_link" to={`/employee/${data?.ReportsTo}?page=${page}`}>
									{data?.ReportFirstName} {data?.ReportLastName}
								</Link>
							</>
						) : (
							""
						)}
					</div>
				</div>
				<div className="empl_footer">
					<button
						className="empl_button"
						type="button"
						onClick={() => {
							navigate(-1);
						}}
					>
						<ArrowBackIcon />
					</button>
				</div>
			</div>
		</section>
	);
};
