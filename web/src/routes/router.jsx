import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Fleet from "../pages/Fleet";

const router = createBrowserRouter([
{
path: "/",
element: <MainLayout />,
children: [
{
index: true,
element: <Dashboard orders={[]} />,
},
{
path: "fleet",
element: <Fleet />,
},
],
},
]);

export default router;