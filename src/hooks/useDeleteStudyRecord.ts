import { useCallback } from "react";
import { deleteRecord } from "../utils/useSupabaseDB";

export const useDeleteStudyRecord = (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    // const { showMessage } = useMessage();

    const eraseStudyRecord = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            await deleteRecord(id);
        } catch (error) {
            console.log(error);
            // showMessage({ title: "ユーザ取得に失敗しました", type: "error" });
        } finally {
            setIsLoading(false);
        }
    }, []);
    return { eraseStudyRecord };
}
