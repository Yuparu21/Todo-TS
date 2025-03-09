import { useState } from "react";

export const useGlobalLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return { isLoading, setIsLoading };
};
