import departmentRoutes from "./department";
import fileRoutes from './file';
import userRoutes from './user';
import roleRoutes from './role';

export default function (app) {
    // USER API ENDPOINTS
    userRoutes(app);
    // DEPARTMENT API ENDPOINTS
    departmentRoutes(app);
    // FILE API ENDPOINTS
    fileRoutes(app);
    // ROLE API ENDPOINTS
    roleRoutes(app);
}