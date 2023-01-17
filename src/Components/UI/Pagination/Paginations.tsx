/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Pagination.css";

type Pagination = {
	currentPage: number;
	maxPages: number;
	handlePrevious: any;
	handleNext: any;
	setPage: any;
};

export const Pagination: FC<Pagination> = ({ currentPage, maxPages, handlePrevious, handleNext, setPage }) => {
	return (
		<div className="pagination_main">
			<button disabled={currentPage === 1} onClick={handlePrevious} className="pagination_button">
				<ArrowBackIcon />
			</button>
			<input
				name="select"
				className="pagination_input"
				type="number"
				min={1}
				max={maxPages}
				value={currentPage}
				onChange={(event) => {
					setPage(parseInt(event.target.value));
				}}
			></input>
			<button disabled={currentPage === maxPages} onClick={handleNext} className="pagination_button">
				<ArrowForwardIcon />
			</button>
			<p>Total Pages: {maxPages}</p>
		</div>
	);
};
