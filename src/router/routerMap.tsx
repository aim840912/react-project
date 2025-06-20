import { lazy } from "react";

const Dashboard = lazy(() => import("../features/dashboard"));
const UserList = lazy(() => import("../features/user/pages/Users"));
const AddUser = lazy(() => import("../features/user/pages/addUser/addUser"));
const Tenement = lazy(() => import("../features/estate/tenement"));
const Room = lazy(() => import("../features/estate/room"));
const Contract = lazy(() => import("../features/finance/pages/contract"));
const Surrender = lazy(() => import("../features/finance/pages/surrender"));
const Bill = lazy(() => import("../features/finance/pages/bill"));
const All = lazy(() => import("../features/operation/overview"));
const Article = lazy(() => import("../features/operation/article"));
const Equipment = lazy(() => import("../features/equipment/pages"));
const Enengy = lazy(() => import("../features/energy"));
const Settings = lazy(() => import("../features/settings"));
const Personal = lazy(() => import("../features/personal"));

export const componentMap: Record<string, React.LazyExoticComponent<React.FC>> = {
    "/dashboard": Dashboard,
    "/users/list": UserList,
    "/users/add": AddUser,
    "/estate/tenement": Tenement,
    "/estate/room": Room,
    "/finance/contract": Contract,
    "/finance/surrender": Surrender,
    "/finance/bill": Bill,
    "/operation/all": All,
    "/operation/article": Article,
    "/equipment": Equipment,
    "/energy": Enengy,
    "/settings": Settings,
    "/personal": Personal,
};
