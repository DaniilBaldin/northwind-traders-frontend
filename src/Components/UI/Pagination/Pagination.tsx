/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Pagination.css";

type Pagination = {
	currentPage: any;
	maxPages: number;
	handlePrevious: any;
	handleNext: any;
	setPage: any;
};

export const Pagination: FC<Pagination> = ({ currentPage, maxPages, handlePrevious, handleNext, setPage }) => {
	const [value, setValue] = useState(currentPage);

	return (
		<div>
			<div className="pagination_main">
				<button disabled={currentPage === 1} onClick={handlePrevious} className="pagination_button">
					<ArrowBackIcon />
				</button>
				<p>{currentPage}</p>
				<button disabled={currentPage === maxPages} onClick={handleNext} className="pagination_button">
					<ArrowForwardIcon />
				</button>
				<p className="p">Total Pages: {maxPages}</p>
				<div>
					<input
						name="select"
						className="pagination_input"
						type="number"
						min={1}
						max={maxPages}
						// value={value}
						autoFocus={false}
						placeholder="Page"
						onChange={(event) => {
							const q = parseInt(event.target.value);
							setTimeout(() => {
								if (Number.isNaN(q) === false && q >= 1 && q <= maxPages) {
									setPage(q);
								}
							}, 500);
						}}
					></input>
				</div>
			</div>
		</div>
	);
};
