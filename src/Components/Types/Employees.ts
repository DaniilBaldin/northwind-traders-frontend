export type EmployeesResponse = {
	page: number;
	pages: number;
	hasNextPage: boolean;
	employees: {
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

export type EmployeeResponse = {
	employee: {
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
