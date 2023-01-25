export type productsSearchResponse = {
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

export type customersSearchResponse = {
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
