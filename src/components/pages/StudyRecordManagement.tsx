import { useEffect, memo } from "react";
import { Box, Center, Heading, Spinner, Table, VStack } from "@chakra-ui/react";
import { useAllStudyRecords } from "../../hooks/useAllStudyRecords";
import { useDeleteStudyRecord } from "../../hooks/useDeleteStudyRecord";
import { useGlobalLoading } from "../../hooks/useGlobalLoading";
import { AddStudyRecordModal } from "../organisms/AddStudyRecordModal";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { EditStudyRecordModal } from "../organisms/EditStudyRecordModal";

export const StudyRecordManagement = memo(() => {

    const { isLoading, setIsLoading } = useGlobalLoading();
    const { getStudyRecords, records } = useAllStudyRecords(setIsLoading);
    const { eraseStudyRecord } = useDeleteStudyRecord(setIsLoading);

    useEffect(() => {
        getStudyRecords();
    }, []);

    const onClickDelete = async (id: string) => {
        await eraseStudyRecord(id);
        await getStudyRecords();
    };

    if (isLoading) return <Center h="100vh" ><Spinner data-testid="spinner" /></Center>

    return (
        <>
            <Heading as="h1" size="5xl" textAlign="center" margin={5} >
                学習記録アプリ
            </Heading >
            <VStack>
                <AddStudyRecordModal getStudyRecords={getStudyRecords} />
                <Box w={{ base: "400px", md: "600px" }} marginTop={5} >
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader textAlign="center" fontWeight="bold">学習内容</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" fontWeight="bold">学習時間</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" fontWeight="bold"></Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" fontWeight="bold"></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {records.map((record) => (
                                <Table.Row key={record.id}>
                                    <Table.Cell textAlign="center" w="40%">{record.title}</Table.Cell>
                                    <Table.Cell textAlign="center" w="40%">{record.time}h</Table.Cell>
                                    <Table.Cell textAlign="center" w="10%">
                                        <EditStudyRecordModal getStudyRecords={getStudyRecords} record={record} />
                                    </Table.Cell>
                                    <Table.Cell textAlign="center" w="10%">
                                        <PrimaryButton bg="grey" onClick={() => onClickDelete(record.id)}>削除</PrimaryButton>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </VStack>
        </>
    );
})
