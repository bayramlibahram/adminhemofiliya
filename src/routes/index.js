import {
    ManageDashboard,
    ManagePosts,
    ManagePost,
    ManageEditPost,
    ManageNavigations,
    ManageNavigation,
    ManageSponsors,
    ManageSponsor,
    ManageEditSponsor,
    ManageManagements,
    ManageManagement,
    ManageEditManagement,
    AuthPage
} from "../pages";


export const adminRoutes = [
    {path: '/dashboard', component: <ManageDashboard/>, exact: true},
    {path: '/posts', component: <ManagePosts/>, exact: true},
    {path: '/post', component: <ManagePost/>, exact: true},
    {path: '/post/:id', component: <ManageEditPost/>, exact: true},
    {path: '/sponsors', component: <ManageSponsors/>, exact: true},
    {path: '/sponsor', component: <ManageSponsor/>, exact: true},
    {path: '/sponsor/:id', component: <ManageEditSponsor/>, exact: true},
    {path: '/navigations', component: <ManageNavigations/>, exact: true},
    {path: '/navigation', component: <ManageNavigation/>, exact: true},
    {path: '/navigation/:id', component: <ManageNavigation/>, exact: true},
    {path: '/managements', component: <ManageManagements/>, exact: true},
    {path: '/management', component: <ManageManagement/>, exact: true},
    {path: '/management/:id', component: <ManageEditManagement/>, exact: true},
];

export const publicRoutes = [
    {path: "/", component: <AuthPage/>, exact: true},
];
