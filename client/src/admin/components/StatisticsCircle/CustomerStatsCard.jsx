import "./CustomerStats.css";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function CustomerStatsCard({
    title,
    value,
    growth,
    type,
}) {
    return (
        <div className="customer-card">
            <div className="customerInfo">
                <p className="title">
                    {title}
                </p>
                <h2 className="value">
                    {value}
                </h2>

                <span className="growth">
                    {growth >= 0 ? "+" : ""}
                    {growth}% this month
                </span>
            </div>

            <div
                className={`icon ${type === "new"
                        ? "blue"
                        : "green"
                    }`}
            >
                {type === "new" ? (
                    <PersonAddAlt1Icon />
                ) : (
                    <PeopleAltIcon />
                )}
            </div>
        </div>
    );
}

export default CustomerStatsCard;