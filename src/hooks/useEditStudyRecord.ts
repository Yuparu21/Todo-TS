import { useCallback } from "react";
import { updateRecord } from "../utils/useSupabaseDB";

export const useEditStudyRecord = (setIsLoading: (loading: boolean) => void) => {
    // const { showMessage } = useMessage();

    const updateStudyRecord = useCallback(async (recordId: string, studyContents: string, studyHour: string) => {
        setIsLoading(true);
        try {
            await updateRecord(recordId, studyContents, Number(studyHour));
        } catch (error) {
            console.log("Error insert data:", error);
            // showMessage({ title: "データ更新に失敗しました", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { updateStudyRecord };
}
