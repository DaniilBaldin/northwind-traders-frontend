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
};

export type ProductResponse = {
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
