import MainLayout from "../mainlayout";
import ManageLayout from "../managelayout";
import {AppRoutes} from "../../components";

const LayoutManager = ({isAuthenticated}) => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return (
                <MainLayout>
                    <AppRoutes/>
                </MainLayout>
        );
    }

    return (
        <ManageLayout>
            <AppRoutes isAuthenticated={isAuthenticated}/>
        </ManageLayout>
    );
};

export default LayoutManager;