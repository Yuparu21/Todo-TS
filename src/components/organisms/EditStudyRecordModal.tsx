import { Box, Center, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useEditStudyRecord } from "../../hooks/useEditStudyRecord";
import { StudyRecord } from "../../models/studyRecord";


type Props = {
    getStudyRecords: () => Promise<void>;
    record: StudyRecord;
};

export const EditStudyRecordModal: FC<Props> = memo(({ getStudyRecords, record }) => {

    const { isLoading, setIsLoading } = useGlobalLoading();
    const { updateStudyRecord } = useEditStudyRecord(setIsLoading);


    type FormValues = {
        recordId: string;
        studyContents: string;
        studyHour: string;
    };

    const { register, handleSubmit, reset, watch, formState: { errors } } =
        useForm<FormValues>({ defaultValues: { studyContents: record?.title, studyHour: String(record?.time) } });
    const studyContents = watch("studyContents");
    const studyHour = watch("studyHour");

    const onClickUpdate: SubmitHandler<FormValues> = async () => {
        await updateStudyRecord(record.id, studyContents, studyHour);
        reset();
        await getStudyRecords();
    };

    if (isLoading) return <Center h="100vh"><Spinner data-testid="spinner" /></Center>

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Box>
                    <PrimaryButton bg="teal.500" >編集</PrimaryButton>
                </Box>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle fontSize="2xl">記録編集</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(onClickUpdate)}>
                        <Stack>
                            <label htmlFor="studyContents">内容</label>
                            <Input
                                type="text"
                                id="studyContents"
                                {...register("studyContents", {
                                    required: "内容の入力は必須です"
                                })}
                            />
                            {errors.studyContents?.message && (
                                <Text color="red">{typeof errors.studyContents.message === "string" ? errors.studyContents.message : ""}</Text>
                            )}
                            <label htmlFor="studyHour">時間（h）</label>
                            <Input
                                type="text"
                                id="studyHour"
                                {...register("studyHour", {
                                    required: "時間の入力は必須です", pattern: {
                                        value: /^[0-9]+$/, // 数値のみ許可
                                        message: "学習時間は数値で入力してください"
                                    }
                                })}
                            />
                            {errors.studyHour?.message && (
                                <Text color="red">{typeof errors.studyHour.message === "string" ? errors.studyHour.message : ""}</Text>
                            )}
                            <Box mt={3} display='flex' justifyContent='center'>
                                <PrimaryButton bg="teal.500" type="submit">
                                    更新
                                </PrimaryButton>
                            </Box>
                        </Stack>
                    </form>
                </DialogBody>
                <DialogCloseTrigger id="closeDialog" />
            </DialogContent>
        </DialogRoot>
    );
});
