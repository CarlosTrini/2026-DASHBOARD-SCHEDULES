export const PREFIX_PATH_ADMIN = "/admin";
export const PREFIX_PATH_AUTH = "/auth";

export const ROUTES_LINKS = {
    // RUTA BASE
    base_route: '/',
    // AUTH
    signin_route: `${PREFIX_PATH_AUTH}/signin`,
    signup_route: `${PREFIX_PATH_AUTH}/signup`,
    // PANEL ADMIN

    overlay_route: `${PREFIX_PATH_ADMIN}/overlay`,
    admin_route: `${PREFIX_PATH_ADMIN}`,
    analytics_route: `${PREFIX_PATH_ADMIN}/analytics`,
    clients_route: `${PREFIX_PATH_ADMIN}/clients`,
    schedules_route: `${PREFIX_PATH_ADMIN}/schedules`,
    opending_hours_route: `${PREFIX_PATH_ADMIN}/opening_hours`,  // PENDIENTE DE DEFINIR PERMANENCIA
    staff_route: `${PREFIX_PATH_ADMIN}/staff`,
    permissions_route: `${PREFIX_PATH_ADMIN}/permissions`,
    services_route: `${PREFIX_PATH_ADMIN}/services` // PENDIENTE DE DEFINIR PERMANENCIA
}