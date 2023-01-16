export type DashboardResponse = {
	geoData: {
		ip_adress: string;
		city: string;
		city_geoname_id: string;
		region: string;
		region_iso_code: string;
		region_geoname_id: number;
		postal_code: string;
		country: string;
		country_code: string;
		country_geoname_id: number;
		country_is_eu: boolean;
		continent: string;
		continent_code: number;
		continent_geoname_id: string;
		longtitude: string;
		latitude: number;
		security: { is_vpn: boolean };
		timezone: {
			name: string;
			abbreviation: string;
			gmt_offset: number;
			current_time: string;
			is_dst: boolean;
		};
		flag: {
			emoji: string;
			unicode: string;
			png: string;
			svg: string;
		};
		currency: { currency_name: string; currency_code: string };
		connection: {
			autonomous_system_number: number;
			autonomous_system_organization: string;
			connection_type: string;
			isp_name: string;
			organization_name: string;
		};
	};
	query_count: number;
	select: number;
	select_where: number;
	select_left: number;
	result_count: number;
	logs: {
		id: number;
		result_count: string;
		type: string;
		date: string;
		database_name: string;
		time_passed: string;
		query: string;
	}[];
};
