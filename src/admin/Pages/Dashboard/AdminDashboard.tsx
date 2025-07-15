import { useEffect } from 'react';
import AdminRoutes from '../../../Routes/AdminRoutes';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchHomeCategories } from '../../../State/admin/adminSlice';
import AdminDrawerList from '../components/AdminDrawerList';

const AdminDashboard = () => {
    const toggleDrawer = () => {};
    const dispatch = useAppDispatch();

    const user = useAppSelector((store) => store.auth.user);

    useEffect(() => {
        dispatch(fetchHomeCategories());
    }, [dispatch]);

    const isOnDashboardRoute = window.location.pathname === "/admin";

    return (
        <div>
            <div className="lg:flex lg:h-[90vh]">
                <section className="hidden lg:block h-full">
                    <AdminDrawerList toggleDrawer={toggleDrawer} />
                </section>

                <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
                    {isOnDashboardRoute && (
                        <div className="flex items-center justify-center h-full">
                            <div className="bg-white p-10 rounded-xl shadow-md text-center">
                                <h2 className="text-2xl font-bold text-blue-900 mb-4">Welcome Admin!</h2>
                                {user && (
                                    <div className="text-gray-700 space-y-1">
                                        <p>
                                    <span className="font-semibold"> Name:</span> {user.fullName}
                                </p>
                                <p>
                                    <span className="font-semibold"> Email:</span> {user.email}
                                </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!isOnDashboardRoute && <AdminRoutes />}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
