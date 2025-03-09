import { useCallback, useState } from "react";
import { fetchAllRecords } from "../utils/useSupabaseDB";
import { StudyRecord } from "../models/studyRecord";


export const useAllStudyRecords = (setIsLoading: (loading: boolean) => void) => {
    // const { showMessage } = useMessage();

    const [records, setRecords] = useState<StudyRecord[]>([]);

    const getStudyRecords = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await fetchAllRecords();
            setRecords(data);
        } catch (error) {
            console.log(error);
            // showMessage({ title: "ユーザ取得に失敗しました", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { getStudyRecords, records };
}
