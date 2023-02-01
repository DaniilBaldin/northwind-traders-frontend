export type OrdersResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	orders: {
		TotalProductsDiscount: number;
		TotalProductsPrice: number;
		TotalProductsItems: number;
		TotalProducts: number;
		OrderId: string;
		CustomerID: string;
		EmployeeID: string;
		OrderDate: string;
		RequiredDate: string;
		ShippedDate: string;
		ShipVia: string;
		Freight: string;
		ShipName: string;
		ShipAddress: string;
		ShipCity: string;
		ShipRegion: string;
		ShipPostalCode: string;
		ShipCountry: string;
		ProductId: string;
	}[];
	stats: {
		queries: number;
		results: number;
		logs: {
			type: string;
			duration: string;
			timestamp: string;
			database: string;
			query: string;
		}[];
	};
};

export type OrderDetailsResponse = {
	order: {
		ShipViaCompanyName: string;
		TotalProductsDiscount: number;
		TotalProductsPrice: number;
		TotalProductsItems: number;
		TotalProducts: number;
		OrderID: string;
		CustomerID: string;
		EmployeeID: string;
		OrderDate: string;
		RequiredDate: string;
		ShippedDate: string;
		ShipVia: string;
		Freight: string;
		ShipName: string;
		ShipAddress: string;
		ShipCity: string;
		ShipRegion: string;
		ShipPostalCode: string;
		ShipCountry: string;
		ProductID: string;
	};
	products: {
		OrderID: string;
		Quantity: string;
		OrderUnitPrice: string;
		Discount: string;
		ProductID: string;
		ProductName: string;
		SupplierID: string;
		CategoryID: string;
		QuantityPerUnit: string;
		ProductUnitPrice: string;
		UnitsInStock: string;
		UnitsOnOrder: string;
		ReorderLevel: string;
		Discontinued: string;
	}[];
	stats: {
		queries: number;
		results: number;
		logs: {
			type: string;
			duration: string;
			timestamp: string;
			database: string;
			query: string;
		};
	};
};
