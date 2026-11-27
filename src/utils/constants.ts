export const PREFIX_PATH_ADMIN = "/admin";
export const PREFIX_PATH_AUTH = "/auth";

export const ROUTES_LINKS = {
    // AUTH
    signin_route: `${PREFIX_PATH_AUTH}/signin`,
    signup_route: `${PREFIX_PATH_AUTH}/signup`,
    // PANEL ADMIN
    admin_route: `${PREFIX_PATH_ADMIN}`,
    analytics_route: `${PREFIX_PATH_ADMIN}/analytics`,
    clients_route: `${PREFIX_PATH_ADMIN}/clients`,
    schedules_route: `${PREFIX_PATH_ADMIN}/schedules`,
    opending_hours_route: `${PREFIX_PATH_ADMIN}/opening_hours`,
    staff_route: `${PREFIX_PATH_ADMIN}/staff`,
    services_route: `${PREFIX_PATH_ADMIN}/services`
}