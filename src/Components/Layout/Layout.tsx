/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

import HomeIcon from "@mui/icons-material/Home";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkIcon from "@mui/icons-material/Link";

import { Clock } from "../UI/Clock/Clock";

export const Layout: FC = () => {
	const [isOpenAside, setOpenAside] = useState(false);
	const [isOpenLinks, setOpenLinks] = useState(false);

	const asideRef = useRef<HTMLDivElement>(null);

	const linksHandler = () => {
		setOpenLinks((prev) => !prev as any);
	};
	const sideHandler = () => {
		setOpenAside((prev) => !prev as any);
	};

	useEffect(() => {
		const click = (event: Event) => {
			if (event.target === asideRef.current && asideRef.current?.className === "sidebar sidebar--active") {
				setOpenAside(false);
			}
		};

		window.addEventListener("click", click);

		return () => window.removeEventListener("click", click);
	}, []);

	return (
		<div className="container">
			<aside ref={asideRef} className={`sidebar ${isOpenAside ? "sidebar--active" : ""}`}>
				<section className="sidebar_container">
					<header className="sidebar_header">
						<p className="sidebar_title">
							<span className="sidebar_bold">Northwind</span> Traders
						</p>
					</header>
					<nav>
						<h2 className="sidebar_sub">General</h2>
						<ul className="sidebar_ul">
							<li className="sidebar_li">
								<NavLink
									to="/"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<HomeIcon />
									Home
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/dashboard"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<DisplaySettingsIcon />
									Dashboard
								</NavLink>
							</li>
							<h2 className="sidebar_sub">Backoffice</h2>
							<li className="sidebar_li">
								<NavLink
									to="/suppliers"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<InventoryIcon />
									Suppliers
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/products"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<ProductionQuantityLimitsIcon />
									Products
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/orders"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<ShoppingCartIcon />
									Orders
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/employees"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<BadgeIcon />
									Employees
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/customers"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<PeopleIcon />
									Customers
								</NavLink>
							</li>
							<li className="sidebar_li">
								<NavLink
									to="/search"
									onClick={sideHandler}
									className={({ isActive }) => (isActive ? "sidebar_link sidebar_li--active" : "sidebar_link")}
								>
									<SearchIcon />
									Search
								</NavLink>
							</li>
						</ul>
					</nav>
				</section>
			</aside>
			<header className="header">
				<Clock />
				<button className="header_menu" aria-label="Navigation" onClick={sideHandler}>
					<MenuIcon />
				</button>
				<button className={`header_side_menu ${isOpenLinks ? "header_side_menu--open" : ""}`} onClick={linksHandler}>
					<MenuIcon />
					<p className="hsm">SQLite Links</p>
					<KeyboardArrowDownIcon />
				</button>
				<div className={`header_links ${isOpenLinks ? "header_links--open" : ""} `}>
					<a
						href="https://blog.cloudflare.com/introducing-d1"
						target="_blank"
						rel="noreferrer noopener"
						className="link"
					>
						<LinkIcon />
						Introducing D1
					</a>
					<a href="https://www.sqlite.org/lang.html" target="_blank" rel="noreferrer noopener" className="link">
						<LinkIcon />
						SQLite SQL Flavour
					</a>
					<a
						href="https://developers.cloudflare.com/workers/learning/using-durable-objects/"
						target="_blank"
						rel="noreferrer noopener"
						className="link"
					>
						<LinkIcon />
						Durable Objects
					</a>
				</div>
			</header>
			<main className="main">
				<Outlet />
			</main>
		</div>
	);
};
