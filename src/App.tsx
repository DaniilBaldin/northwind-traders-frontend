import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./Components/Layout/Layout";
import { HomePage } from "./Pages/Home/Home";
import { ProductsPage } from "./Pages/Products/Products";
import { ProductsDetailsPage } from "./Pages/Products/ProductDetails";
import { DashboardPage } from "./Pages/Dashboard/Dashboard";
import { SuppliersPage } from "./Pages/Suppliers/Suppliers";
import { SupplierDetailsPage } from "./Pages/Suppliers/SupplierDetails";
import { OrdersPage } from "./Pages/Orders/Orders";
import { OrderDetailsPage } from "./Pages/Orders/OrderDetails";
import { EmployeesPage } from "./Pages/Employees/Employees";
import { EmployeeDetailsPage } from "./Pages/Employees/EmployeeDetails";
import { CustomersPage } from "./Pages/Customers/Customers";
import { CustomerDetailsPage } from "./Pages/Customers/CustomerDetails";
import { SearchPage } from "./Pages/Search/Search";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/suppliers" element={<SuppliersPage />} />
				<Route path="/supplier/:id" element={<SupplierDetailsPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/product/:id" element={<ProductsDetailsPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/order/:id" element={<OrderDetailsPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
				<Route path="/employee/:id" element={<EmployeeDetailsPage />} />
				<Route path="/customers" element={<CustomersPage />} />
				<Route path="/customer/:id" element={<CustomerDetailsPage />} />
				<Route path="/search" element={<SearchPage />} />
			</Route>
		</Routes>
	);
}

export default App;
