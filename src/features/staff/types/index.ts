export interface StaffMetrics {
    total: number;
    status: {
        active: number;
        inactive: number;
        leave: number;
        dayOff: number
    };
    staffActive: {
        percentaje: number;
    };
}   