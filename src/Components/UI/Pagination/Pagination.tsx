/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { v4 } from "uuid";

import "./Pagination.css";

type Pagination = {
	currentPage: any;
	maxPages: number;
	handlePrevious: any;
	handleNext: any;
	setPage: any;
};

export const Pagination: FC<Pagination> = ({ currentPage, maxPages, handlePrevious, handleNext, setPage }) => {
	const pages = [];
	if (maxPages <= 5) {
		for (let i = 1; i <= maxPages; i++) {
			pages.push(i);
		}
	} else {
		pages.push(currentPage - 4);
		pages.push(currentPage - 3);
		pages.push(currentPage - 2);
		pages.push(currentPage - 1);
		pages.push(currentPage);
		pages.push(currentPage + 1);
		pages.push(currentPage + 2);
		pages.push(currentPage + 3);
		pages.push(currentPage + 4);
	}

	console.log(pages);

	return (
		<div>
			{maxPages !== 1 ? (
				<div className="pagination_main">
					<button disabled={currentPage === 1} onClick={handlePrevious} className="pagination_button">
						<ArrowBackIcon />
					</button>
					<button
						disabled={currentPage === 1}
						onClick={() => {
							setPage(1);
						}}
						className={"pagination_button" + (currentPage === 1 ? "_active" : "")}
					>
						{1}
					</button>
					<>
						{pages.map((e) => (
							<button
								key={e}
								disabled={e === currentPage}
								hidden={e >= maxPages || e <= 1}
								className={"pagination_button" + (e === currentPage ? "_active" : "")}
								onClick={() => {
									setPage(e);
								}}
							>
								{e}
							</button>
						))}
					</>
					<button
						disabled={currentPage === maxPages}
						onClick={() => {
							setPage(maxPages);
						}}
						className={"pagination_button" + (currentPage === maxPages ? "_active" : "")}
					>
						{maxPages}
					</button>
					<button disabled={currentPage === maxPages} onClick={handleNext} className="pagination_button ">
						<ArrowForwardIcon />
					</button>
					<div>
						<p className="p">
							Page {currentPage} of {maxPages}
						</p>
					</div>
				</div>
			) : (
				<div className="pagination_main">
					<p className="q">
						Page {currentPage} of {maxPages}
					</p>
				</div>
			)}
		</div>
	);
};

// export const Pagination: FC<Pagination> = ({ currentPage, maxPages, handlePrevious, handleNext, setPage }) => {
// 	return (
// 		<div>
// 			<div className="pagination_main">
// 				<button disabled={currentPage === 1} onClick={handlePrevious} className="pagination_button">
// 					<ArrowBackIcon />
// 				</button>
// 				<p>{currentPage}</p>
// 				<button disabled={currentPage === maxPages} onClick={handleNext} className="pagination_button">
// 					<ArrowForwardIcon />
// 				</button>
// 				<div className="q">
// 					<p className="p">Total Pages: {maxPages}</p>
// 					<p className="p">Select Page:</p>
// 					<input
// 						name="select"
// 						className="pagination_input"
// 						type="number"
// 						min={1}
// 						max={maxPages}
// 						// value={currentPage}
// 						autoFocus={false}
// 						placeholder="Page"
// 						onChange={(event) => {
// 							const q = parseInt(event.target.value);
// 							setTimeout(() => {
// 								if (Number.isNaN(q) === false && q >= 1 && q <= maxPages) {
// 									setPage(q);
// 								}
// 							}, 500);
// 						}}
// 					></input>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
