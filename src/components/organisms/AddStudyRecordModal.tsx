import { Box, Center, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddStudyRecord } from "../../hooks/useAddStudyRecord";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { PrimaryButton } from "../atoms/PrimaryButton";


type Props = {
    getStudyRecords: () => Promise<void>;
};

export const AddStudyRecordModal: FC<Props> = memo(({ getStudyRecords }) => {

    const { isLoading, setIsLoading } = useGlobalLoading();
    const { addStudyRecord } = useAddStudyRecord(setIsLoading);

    type FormValues = {
        studyContents: string;
        studyHour: string;
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

    const onClickRegisteration: SubmitHandler<FormValues> = async (data) => {
        await addStudyRecord(data.studyContents, data.studyHour);
        reset();
        await getStudyRecords();
    };

    if (isLoading) return <Center h="100vh"><Spinner role="status" /></Center>

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Box>
                    <PrimaryButton>新規登録</PrimaryButton>
                </Box>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle fontSize="2xl">学習内容</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(onClickRegisteration)}>
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
                            <Box mt={3} display="flex" justifyContent="center">
                                <PrimaryButton type="submit">
                                    登録
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
