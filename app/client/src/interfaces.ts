export interface priceRange {
	priceStart: string;
	priceEnd: string;
}

export interface CustomError {
	message: string;
	response?: {
		status: number;
		data: any;
	};
	config?: any;
}
