import { useEffect, useState } from "react";

function AnimatedNumber({
    value,
    duration = 800,
    separator = ",",
}) {

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {

        let start = 0;

        const increment = value / (duration / 16);

        const timer = setInterval(() => {

            start += increment;

            if (start >= value) {
                start = value;
                clearInterval(timer);
            }

            setDisplayValue(Math.floor(start));

        }, 16);

        return () => clearInterval(timer);

    }, [value, duration]);

    return (
        <>
            {displayValue.toLocaleString("en-US")}
        </>
    );
}

export default AnimatedNumber;