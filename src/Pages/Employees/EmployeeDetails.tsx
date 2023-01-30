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
						<h4 className="text_row">Name</h4>
						<p className="text_row">
							{data?.FirstName} {data?.LastName}
						</p>
						<h4 className="text_row">Title</h4>
						<p className="text_row">{data?.Title}</p>
						<h4 className="text_row">Title Of Courtesy</h4>
						<p className="text_row">{data?.TitleOfCourtesy}</p>
						<h4 className="text_row">Birth Date</h4>
						<p className="text_row">{data?.BirthDate}</p>
						<h4 className="text_row">Hire Date</h4>
						<p className="text_row">{data?.HireDate}</p>
						<h4 className="text_row">Address</h4>
						<p className="text_row">{data?.Address}</p>
						<h4 className="text_row">City</h4>
						<p className="text_row">{data?.City}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Postal Code</h4>
						<p className="text_row_sec">{data?.PostalCode}</p>
						<h4 className="text_row_sec">Country</h4>
						<p className="text_row_sec">{data?.Country}</p>
						<h4 className="text_row_sec">Home Phone</h4>
						<p className="text_row_sec">{data?.HomePhone}</p>
						<h4 className="text_row_sec">Extension</h4>
						<p className="text_row_sec">{data?.Extension}</p>
						<h4 className="text_row_sec">Notes</h4>
						<p className="text_row_sec">{data?.Notes}</p>
						{data?.ReportsTo ? (
							<>
								<h4 className="text_row_sec">Reports To</h4>
								<Link className="empl_link text_row_sec" to={`/employee/${data?.ReportsTo}?page=${page}`}>
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
						<p className="bp"> Go back</p>
					</button>
				</div>
			</div>
		</section>
	);
};
