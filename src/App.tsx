import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./Components/Layout/Layout";
import { HomePage } from "./Pages/Home/Home";
import { ProductsPage } from "./Pages/Products/Products";
import { DashboardPage } from "./Pages/Dashboard/Dashboard";
import { SuppliersPage } from "./Pages/Suppliers/Suppliers";
import { OrdersPage } from "./Pages/Orders/Orders";
import { EmployeesPage } from "./Pages/Employees/Employees";
import { CustomersPage } from "./Pages/Customers/Customers";
import { SearchPage } from "./Pages/Search/Search";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/suppliers" element={<SuppliersPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
				<Route path="/customers" element={<CustomersPage />} />
				<Route path="/search" element={<SearchPage />} />
			</Route>
		</Routes>
	);
}

export default App;
