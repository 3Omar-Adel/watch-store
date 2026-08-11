import "./Dashboard.css"

import { useThemeContext } from "../../../context/ThemeContext";
import DashboardCard from "./DashboardCard";
import SalesChart from "./SalesChart";
import BestSeller from "./BestSeller";

function Dashboard() {
    const { darkMode, toggleTheme } = useThemeContext();
    return (
        <>
            <DashboardCard />
            <div className="chartBest">
                <SalesChart />
                <div id="bestSeller">
                    <BestSeller />
                </div>
            </div>
        </>
    )
}
export default Dashboard;