export type SuppliersResponse = {
	hasNextPage: number;
	page: number;
	pages: number;
	suppliers: {
		id: number;
		SupplierID: string;
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
		HomePage: string;
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

export type SupplierResponse = {
	supplier: {
		id: number;
		SupplierID: string;
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
		HomePage: string;
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
