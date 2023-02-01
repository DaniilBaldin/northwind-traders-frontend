export type CustomersResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	customers: {
		id: number;
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
		}[];
	};
};

export type CustomerDetailsresponse = {
	customer: {
		id: number;
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
