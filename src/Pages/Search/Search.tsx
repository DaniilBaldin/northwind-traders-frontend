/* eslint-disable no-mixed-spaces-and-tabs */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHook } from "../../Components/Hooks/fetchHook";
import { v4 } from "uuid";

import { productsSearchResponse } from "../../Components/Types/Search";
import { customersSearchResponse } from "../../Components/Types/Search";

import "./Search.css";
import { useDispatch } from "react-redux";
import { addLog } from "../../Redux/actions";

export const SearchPage = () => {
	const [value, setValue] = useState("");
	const [searchTable, setSearchTable] = useState("products");
	const url = import.meta.env.VITE_BACKEND_URL;

	const slug = `/search?q=${value}&table=${searchTable}`;
	const { data, apiRequest } = fetchHook<productsSearchResponse & customersSearchResponse>(`${url}${slug}`);

	const dispatch = useDispatch();

	const valueHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const radioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTable(event.target.value);
	};

	useEffect(() => {
		const getData = async () => {
			await apiRequest();
		};

		void getData();
	}, [searchTable]);

	useEffect(() => {
		if (data && searchTable === "products") {
			dispatch(addLog((data as productsSearchResponse).stats));
		}
		if (data && searchTable === "customers") {
			dispatch(addLog((data as customersSearchResponse).stats));
		}
	}, [data]);

	const formSubmithandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		void apiRequest();
	};

	return (
		<section className="table_container">
			<div className="search_card">
				<h4 className="h4_search">Search Database</h4>
				<form className="form" onSubmit={formSubmithandler}>
					<input
						className="input"
						type="search"
						id="srch"
						placeholder="Enter keyword..."
						autoComplete="off"
						onChange={valueHandler}
						value={value}
					/>
					<h4 className="h4_search">Tables</h4>
					<div className="small-label">
						<input
							type="radio"
							name="radio-group"
							id="products"
							value="products"
							defaultChecked
							onChange={radioChangeHandler}
						/>
						<label htmlFor="products">Products</label>
						<input type="radio" name="radio-group" id="customers" value="customers" onChange={radioChangeHandler} />
						<label htmlFor="customers">Customers</label>
					</div>
				</form>
				<h4 className="h4_bold">Search results</h4>
				<article>
					{!data ? (
						"No results"
					) : (
						<>
							{searchTable === "products"
								? (data as productsSearchResponse).search.map((e, index) => (
										<article key={v4()}>
											<Link className="search_link" to={`/product/${e.CategoryID}`}>
												{e.ProductName}
											</Link>
											<p className="text_grey">
												#{index + 1}, Qt. per unit:{e.QuantityPerUnit}, Price: ${e.UnitPrice}, Stock:{e.UnitsInStock}{" "}
												pcs.{" "}
											</p>
										</article>
								  ))
								: (data as customersSearchResponse).search.map((e, index) => (
										<article key={v4()}>
											<Link className="search_link" to={`/customer/${e.CustomerID}`}>
												{e.CompanyName}
											</Link>
											<p className="text_grey">
												#{index + 1}, Contact: {e.ContactName}, Title: {e.ContactTitle}, Phone:{e.Phone}.
											</p>
										</article>
								  ))}
							{/* {(data as productsSearchResponse)
								? (data as productsSearchResponse).map((e, index) => (
										<article key={v4()}>
											<Link className="table_link" to={`/product/${e.CategoryID}`}>
												{e.ProductName}
											</Link>
											<p className="text_grey">
												#{index + 1}, Qt. per unit:{e.QuantityPerUnit}, Price: ${e.UnitPrice}, Stock:{e.UnitsInStock}{" "}
												pcs.{" "}
											</p>
										</article>
								  ))
								: (data as customersSearchResponse).map((e, index) => (
										<article key={v4()}>
											<Link className="table_link" to={`/customer/${e.CustomerID}`}>
												{e.CompanyName}
											</Link>
											<p className="text_grey">
												#{index + 1}, Contact: {e.ContactName}, Title: {e.ContactTitle}, Phone:{e.Phone}.
											</p>
										</article>
								  ))} */}
						</>
					)}
				</article>
			</div>
		</section>
	);
};
