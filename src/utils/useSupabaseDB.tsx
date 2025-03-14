import { supabase } from "./supabase";
import { StudyRecord } from "../models/studyRecord";

//「study_record」TBLの全レコード取得
export const fetchAllRecords = async (): Promise<{ data: StudyRecord[] }> => {
    const { data, error } = await supabase.from("study_record").select("*").order("id", { ascending: false });;
    if (error || !data) throw new Error("データの取得に失敗しました");
    return { data };
};

//「study_record」TBLのレコード取得
export const fetchRecord = async (id: string): Promise<{ data: StudyRecord }> => {
    const { data, error } = await supabase.from("study_record").select("*").eq("id", id).single();
    if (error || !data) throw new Error("データの取得に失敗しました");
    return { data };
};

//「study_record」TBLにレコード挿入
export const createRecord = async (title: string, time: number): Promise<void> => {
    const { error } = await supabase
        .from("study_record")
        .insert({ title: title, time: time });
    if (error) throw new Error("データの挿入に失敗しました");
}

//「study_record」TBLのDBレコード削除
export const deleteRecord = async (id: string): Promise<void> => {
    const { error } = await supabase.from("study_record").delete().eq("id", id);
    if (error) throw new Error("レコード削除に失敗しました");
};

//「study_record」TBLのレコード更新挿入
export const updateRecord = async (id: string, title: string, time: number): Promise<void> => {
    const { error } = await supabase
        .from("study_record")
        .update({ title: title, time: time })
        .eq("id", id);
    if (error) throw new Error("データの更新に失敗しました");
}
