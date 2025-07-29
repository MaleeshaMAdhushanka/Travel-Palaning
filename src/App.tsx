import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import {Provider} from "react-redux";
import store from "./store";
import PublicRoute from "./components/PublicRoutes.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import NotFound from "./pages/NotFound.tsx";
import AuthRoute from "./components/AuthRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AdminDashboard from "./pages/auth/admin/AdminDasboard.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import Index from "./pages";
import AddPackagePage from "./pages/auth/admin/AddPackage.tsx";
import ViewPackagesPage from "./pages/auth/admin/ViewPackagesPage.tsx";
import EditPackagePage from "./pages/auth/admin/EditPackagePage.tsx";

// BrowserRouter is used in React applications to enable client-side routing. It provides the routing context needed for components like Link and Route from react-router-dom to work properly. Without BrowserRouter, navigation and route matching will not function, and components like Link will throw errors because they rely on the router context.
/*
Enables navigation without full page reloads.
Provides routing context for route-aware components.
Required for Link, Route, and other router features to work.
 */
/*
Provider is a component from react-redux that makes the Redux store available to all React components in your app. It wraps your app and passes the store down via React context,
allowing components to access state and dispatch actions using hooks like useSelector and useDispatch.
 */
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />}/>
                    <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute> } />
                    <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>} />
                    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword/></PublicRoute>} />
                    <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword/></PublicRoute>} />

                    {/*User naviagte the Dashbord*/}
                    <Route path="/dashboard" element={<AuthRoute> <Dashboard /> </AuthRoute>}/>

                    {/*Admin pages*/}
                    <Route path="/admin-dashboard" element={<AdminRoute>{ <AdminDashboard /> }</AdminRoute>}/>
                    <Route path="/admin/packages/add" element={<AdminRoute>{ <AddPackagePage /> }</AdminRoute>}/>
                    <Route path="/admin/packages" element={<AdminRoute>{ <ViewPackagesPage /> }</AdminRoute>}/>
                    <Route path="/admin/packages/edit/:id" element={<AdminRoute>{ <EditPackagePage /> }</AdminRoute>}/>





                    {/*<Route path="/profile" element={ <AuthRoute> <Profile/></AuthRoute>}/>*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>

    );
}

export default App;