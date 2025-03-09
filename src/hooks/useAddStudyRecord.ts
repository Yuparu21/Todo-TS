import { useCallback } from "react";
import { createRecord } from "../utils/useSupabaseDB";

export const useAddStudyRecord = (setIsLoading: (loading: boolean) => void) => {
    // const { showMessage } = useMessage();

    const addStudyRecord = useCallback(async (studyContents: string, studyHour: string) => {
        setIsLoading(true);
        try {
            await createRecord(studyContents, Number(studyHour));
        } catch (error) {
            console.log("Error insert data:", error);
            // showMessage({ title: "データ取得に失敗しました", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { addStudyRecord };
}
