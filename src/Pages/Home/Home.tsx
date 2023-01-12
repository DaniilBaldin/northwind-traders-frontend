import React, { FC } from "react";

import "./Home.css";

export const HomePage: FC = () => {
	return (
		<section className="home_main">
			<div className="home_text">
				<h2 className="home_title">Welcome to Northwind Traders</h2>
				<p className="home_text home_text-grey">Running on Cloudflare&apos;s D1</p>
				<p className="home_text">
					This is a demo of the Northwind dataset, running on{" "}
					<a href="https://workers.cloudflare.com/" target="_blank" rel="noreferrer noopener" className="home_link">
						Cloudflare Workers
					</a>{" "}
					, and D1 - cloudflare&apos;s newest SQL database, running on SQLite.
				</p>
				<p className="home_text">
					Read our{" "}
					<a
						href="https://blog.cloudflare.com/introducing-d1"
						target="_blank"
						rel="noreferrer noopener"
						className="home_link"
					>
						D1 announcements
					</a>{" "}
					to learn more about D1.
				</p>
				<p className="home_text">
					This dataset was sourced from{" "}
					<a
						href="https://github.com/jpwhite3/northwind-SQLite3"
						target="_blank"
						rel="noreferrer noopener"
						className="home_link"
					>
						northwind-SQLite3
					</a>{" "}
					.
				</p>
				<p className="">
					You can use the UI to explore Suppliers, Orders, Customers and Products, or you can use search if you know
					what you&apos;re looking for.
				</p>
			</div>
			<div className="home_pic">
				<img src="/public.webp" width="800" height="450" alt="db" className="home_pic-img" aria-hidden="true" />
			</div>
		</section>
	);
};
