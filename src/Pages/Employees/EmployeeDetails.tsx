/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchHook } from "../../Components/Hooks/fetchHook";

import { EmployeeResponse } from "../../Components/Types/Employees";

import "./EmployeeDetails.css";

import BallotIcon from "@mui/icons-material/Ballot";
import { useDispatch } from "react-redux";
import { addLog } from "../../Redux/actions";

export const EmployeeDetailsPage: FC = () => {
	const navigate = useNavigate();
	const [search] = useSearchParams();
	const { id } = useParams();
	const dispatch = useDispatch();

	const page = search.get("page");
	const url = import.meta.env.VITE_BACKEND_URL;
	const slug = `/employee?id=${id}`;
	const { data, loading, error, apiRequest } = fetchHook<EmployeeResponse>(`${url}${slug}`);

	const [logs, setLogs] = useState({});

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};
		void getData();
	}, [id]);

	useEffect(() => {
		if (data) {
			setLogs(data.stats);
			dispatch(addLog(logs));
		}
	}, [data]);

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
							{data?.employee.FirstName} {data?.employee.LastName}
						</p>
						<h4 className="text_row">Title</h4>
						<p className="text_row">{data?.employee.Title}</p>
						<h4 className="text_row">Title Of Courtesy</h4>
						<p className="text_row">{data?.employee.TitleOfCourtesy}</p>
						<h4 className="text_row">Birth Date</h4>
						<p className="text_row">{data?.employee.BirthDate}</p>
						<h4 className="text_row">Hire Date</h4>
						<p className="text_row">{data?.employee.HireDate}</p>
						<h4 className="text_row">Address</h4>
						<p className="text_row">{data?.employee.Address}</p>
						<h4 className="text_row">City</h4>
						<p className="text_row">{data?.employee.City}</p>
					</div>
					<div className="column">
						<h4 className="text_row_sec">Postal Code</h4>
						<p className="text_row_sec">{data?.employee.PostalCode}</p>
						<h4 className="text_row_sec">Country</h4>
						<p className="text_row_sec">{data?.employee.Country}</p>
						<h4 className="text_row_sec">Home Phone</h4>
						<p className="text_row_sec">{data?.employee.HomePhone}</p>
						<h4 className="text_row_sec">Extension</h4>
						<p className="text_row_sec">{data?.employee.Extension}</p>
						<h4 className="text_row_sec">Notes</h4>
						<p className="text_row_sec">{data?.employee.Notes}</p>
						{data?.employee.ReportsTo ? (
							<>
								<h4 className="text_row_sec">Reports To</h4>
								<Link className="empl_link text_row_sec" to={`/employee/${data?.employee.ReportsTo}?page=${page}`}>
									{data?.employee.ReportFirstName} {data?.employee.ReportLastName}
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
