import React from "react";

const AlertBox = ({ message, type = "warning" }) => {
    if (!message) return null;

    const color = type === "error" ? "red" : "yellow";
    const icon = type === "error" ? "⚠️" : "ℹ️";

    return (
        <div
            className={`text-${color}-800 font-semibold bg-${color}-100 border border-${color}-400 px-4 py-2 rounded mt-2`}
        >
            {icon} {message}
        </div>
    );
};

export default AlertBox;
