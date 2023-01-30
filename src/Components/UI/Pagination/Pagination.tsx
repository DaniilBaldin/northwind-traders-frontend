/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";

import "./Pagination.css";

type Pagination = {
	currentPage: any;
	maxPages: number;
	setPage: any;
};

export const Pagination: FC<Pagination> = ({ currentPage, maxPages, setPage }) => {
	const pages = [];
	if (maxPages <= 5) {
		for (let i = 1; i <= maxPages; i++) {
			pages.push(i);
		}
	} else {
		for (let i = currentPage - 4; i <= currentPage + 4; i++) {
			pages.push(i);
		}
	}

	return (
		<div>
			{maxPages !== 1 ? (
				<div className="pagination_main">
					<div>
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
						<button hidden={currentPage >= maxPages - 10} className={"pagination_button_inactive"}>
							...
						</button>
						<button
							disabled={currentPage === maxPages}
							onClick={() => {
								setPage(maxPages);
							}}
							className={"pagination_button" + (currentPage === maxPages ? "_active" : "")}
						>
							{maxPages}
						</button>
					</div>
					<div>
						<p className="p">
							Page {currentPage} of {maxPages}
						</p>
					</div>
				</div>
			) : (
				<div className="pagination_secondary">
					<p className="q">
						Page {currentPage} of {maxPages}
					</p>
				</div>
			)}
		</div>
	);
};
