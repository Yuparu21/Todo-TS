import { useState } from "react";

export const useTotalStudyHour = () => {
    const [totalStudyHour, setTotalStudyHour] = useState<number>(Number(localStorage.getItem("studyTotalHour")) || 0);
    return { totalStudyHour, setTotalStudyHour };
};
