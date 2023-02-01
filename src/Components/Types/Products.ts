export type ProductsResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	products: {
		id: number;
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
		}[];
	};
};

export type ProductResponse = {
	product: {
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
		SupplierName: string;
	};
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
