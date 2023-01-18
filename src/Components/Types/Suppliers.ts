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
};

export type SupplierResponse = {
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
