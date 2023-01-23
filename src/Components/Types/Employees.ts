export type EmployeesResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	orders: {
		EmployeeID: string;
		LastName: string;
		FirstName: string;
		Title: string;
		TitleOfCourtesy: string;
		BirthDate: string;
		HireDate: string;
		Address: string;
		City: string;
		Region: string;
		PostalCode: string;
		Country: string;
		HomePhone: string;
		Extension: string;
		Notes: string;
		ReportsTo: string;
	}[];
};

export type EmployeeResponse = {
	ReportId: string;
	ReportFirstName: string;
	ReportLastName: string;
	EmployeeID: string;
	LastName: string;
	FirstName: string;
	Title: string;
	TitleOfCourtesy: string;
	BirthDate: string;
	HireDate: string;
	Address: string;
	City: string;
	Region: string;
	PostalCode: string;
	Country: string;
	HomePhone: string;
	Extension: string;
	Notes: string;
	ReportsTo: string;
};
