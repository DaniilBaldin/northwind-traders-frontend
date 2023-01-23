export type CustomersResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	suppliers: {
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
};

export type CustomerDetailsresponse = {
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
