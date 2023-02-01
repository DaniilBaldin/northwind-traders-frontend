export type productsSearchResponse = {
	search: {
		ProductID: string;
		ProductName: string;
		SupplierID: string;
		CategoryID: string;
		QuantityPerUnit: string;
		UnitPrice: string;
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

export type customersSearchResponse = {
	search: {
		CustomerID: string;
		CompanyName: string;
		ContactName: string;
		ContactTitle: string;
		Address: string;
		City: string;
		Region: string;
		PostalCode: string;
		Country: string;
		Phone: string;
		Fax: string;
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
