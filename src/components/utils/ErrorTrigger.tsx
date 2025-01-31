import { useState } from "react";

const ErrorTrigger = () => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        throw new Error("Manually triggered error!");
    }

    return (
        <button onClick={() => setHasError(true)} className="btn bg-red-500 text-white">
            Trigger Error
        </button>
    );
};

export default ErrorTrigger;
