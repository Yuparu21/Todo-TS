import { useCallback, useState } from "react";
import { fetchRecord } from "../utils/useSupabaseDB";
import { StudyRecord } from "../models/studyRecord";


export const useStudyRecord = (setIsLoading: (loading: boolean) => void) => {
    // const { showMessage } = useMessage();

    const [record, setRecord] = useState<StudyRecord>();

    const getStudyRecord = useCallback(async (recordId: string) => {
        setIsLoading(true);
        try {
            const { data } = await fetchRecord(recordId);
            console.log(data);
            setRecord(data);
        } catch (error) {
            console.log(error);
            // showMessage({ title: "ユーザ取得に失敗しました", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { getStudyRecord, record };
}
