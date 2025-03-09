import "@testing-library/jest-dom"
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddStudyRecordModal } from "../src/components/organisms/AddStudyRecordModal";
import { useGlobalLoading } from "../src/hooks/useGlobalLoading";
import { useAllStudyRecords } from "../src/hooks/useAllStudyRecords";
import { useAddStudyRecord } from "../src/hooks/useAddStudyRecord";
import { ChakraProvider } from "@chakra-ui/react";
import { StudyRecordManagement } from "../src/components/pages/StudyRecordManagement";
import { system } from "../src/theme/theme";
import { useDeleteStudyRecord } from "../src/hooks/useDeleteStudyRecord";

// モックを用意する
jest.mock("../src/hooks/useGlobalLoading", () => ({
    useGlobalLoading: jest.fn(),
}));
jest.mock("../src/hooks/useAllStudyRecords", () => ({
    useAllStudyRecords: jest.fn(),
}));
jest.mock("../src/hooks/useAddStudyRecord", () => ({
    useAddStudyRecord: jest.fn(),
}));
jest.mock("../src/hooks/useDeleteStudyRecord", () => ({
    useDeleteStudyRecord: jest.fn(),
}));

describe("Componentテスト", () => {
    beforeEach(() => {
        // useGlobalLoading フックのモックを設定
        (useGlobalLoading as jest.Mock).mockReturnValue({
            isLoading: false,
            setIsLoading: jest.fn(),
        });
        (useAllStudyRecords as jest.Mock).mockReturnValue({
            getStudyRecords: jest.fn(),
            records: [{ id: "1", studyContents: "Reactの勉強", studyHour: "2" }],
        });

        (useAddStudyRecord as jest.Mock).mockReturnValue({
            addStudyRecord: jest.fn(),
        });
        (useDeleteStudyRecord as jest.Mock).mockReturnValue({
            eraseStudyRecord: jest.fn(),
        });
    });
    it("タイトルが表示されること", async () => {
        render(
            <ChakraProvider value={system}>
                <StudyRecordManagement />
            </ChakraProvider>
        );
        // <h1> タグを取得
        const headingElement = await screen.findByRole("heading", { level: 1 });
        // <h1> タグの内容が "学習記録アプリ" であることを確認
        expect(headingElement).toHaveTextContent("学習記録アプリ");
    });
    it("「新規登録」ボタンが表示されること", async () => {
        render(
            <ChakraProvider value={system}>
                <StudyRecordManagement />
            </ChakraProvider>
        );
        // Buttonタグを取得
        const buttonElement = await screen.getByRole("button", { name: "新規登録" })
        // <h1> タグの内容が "新規登録" であることを確認
        expect(buttonElement).toBeInTheDocument();
    });
    it("学習一覧が表示されること", async () => {
        render(
            <ChakraProvider value={system}>
                <StudyRecordManagement />
            </ChakraProvider>
        );
        // テーブルのヘッダーが表示されているか確認
        expect(await screen.findByText("学習内容")).toBeInTheDocument();
        expect(await screen.findByText("学習時間")).toBeInTheDocument();
    });
    it("ローディング画面が表示されること", async () => {
        (useGlobalLoading as jest.Mock).mockReturnValue({
            isLoading: true,
            setIsLoading: jest.fn(),
        });
        render(
            <ChakraProvider value={system}>
                <StudyRecordManagement />
            </ChakraProvider>
        );
        // スピナーが表示されていることを確認
        expect(await screen.findByTestId("spinner")).toBeInTheDocument();
    });
});

describe("機能テスト", () => {
    let getStudyRecordsMock: jest.Mock;
    let addStudyRecordMock: jest.Mock;
    let eraseStudyRecordMock: jest.Mock;
    // モックの準備
    beforeEach(() => {
        getStudyRecordsMock = jest.fn();
        addStudyRecordMock = jest.fn();
        eraseStudyRecordMock = jest.fn();

        (useGlobalLoading as jest.Mock).mockReturnValue({
            isLoading: false,
            setIsLoading: jest.fn(),
        });
        (useAllStudyRecords as jest.Mock).mockReturnValue({
            getStudyRecords: getStudyRecordsMock,
            records: [{ id: "1", studyContents: "Reactの勉強", studyHour: "2" }],
        });
        (useAddStudyRecord as jest.Mock).mockReturnValue({
            addStudyRecord: addStudyRecordMock,
        });
        (useDeleteStudyRecord as jest.Mock).mockReturnValue({
            eraseStudyRecord: eraseStudyRecordMock,
        });
    });
    it("学習記録を登録できること", async () => {
        render(
            <ChakraProvider value={system}>
                <AddStudyRecordModal getStudyRecords={getStudyRecordsMock} />
            </ChakraProvider>
        );
        // 学習内容と学習時間を入力
        fireEvent.click(screen.getByText("新規登録"));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText("内容"), { target: { value: "Reactの勉強" } });
            fireEvent.change(screen.getByLabelText("時間（h）"), { target: { value: "2" } });
        });
        // 登録ボタンをクリック
        fireEvent.click(screen.getByText("登録"));
        // addStudyRecord が正しく呼ばれることを確認
        await waitFor(() => {
            expect(addStudyRecordMock).toHaveBeenCalledWith("Reactの勉強", "2");
        });
        // 一覧が更新されることを確認
        await waitFor(() => {
            expect(getStudyRecordsMock).toHaveBeenCalled();
        });
    });
    it("学習記録を削除できること", async () => {
        // ここにテストを記載
        render(
            <ChakraProvider value={system}>
                <StudyRecordManagement />
            </ChakraProvider>
        );

        // 削除ボタンを取得
        const deleteButton = await screen.getByRole("button", { name: "削除" })
        expect(deleteButton).toBeInTheDocument();

        // 削除ボタンをクリック
        fireEvent.click(deleteButton);

        // onClickDelete が呼ばれることを確認
        await waitFor(() => {
            expect(eraseStudyRecordMock).toHaveBeenCalledWith("1"); // 削除対象のID
        });

        // 削除後に学習記録が表示されていないことを確認
        expect(screen.queryByText("Reactの勉強")).not.toBeInTheDocument();
    });
});


describe("エラーテスト", () => {
    let getStudyRecordsMock: jest.Mock;
    let addStudyRecordMock: jest.Mock;
    // モックの準備
    beforeEach(() => {
        getStudyRecordsMock = jest.fn();
        addStudyRecordMock = jest.fn();

        (useGlobalLoading as jest.Mock).mockReturnValue({
            isLoading: false,
            setIsLoading: jest.fn(),
        });
        (useAllStudyRecords as jest.Mock).mockReturnValue({
            getStudyRecords: getStudyRecordsMock,
            records: [{ id: "1", studyContents: "Reactの勉強", studyHour: "2" }],
        });
        (useAddStudyRecord as jest.Mock).mockReturnValue({
            addStudyRecord: addStudyRecordMock,
        });
        (useDeleteStudyRecord as jest.Mock).mockReturnValue({
            eraseStudyRecord: jest.fn(),
        });
    });
    it("学習内容がないときに登録するとエラーがでること", async () => {
        render(
            <ChakraProvider value={system}>
                <AddStudyRecordModal getStudyRecords={getStudyRecordsMock} />
            </ChakraProvider>
        );
        // 学習内容と学習時間を入力
        fireEvent.click(screen.getByText("新規登録"));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText("時間（h）"), { target: { value: "2" } });
        });
        // 登録ボタンをクリック
        fireEvent.click(screen.getByText("登録"));

        // // 学習内容が空の場合のエラーメッセージ
        expect(await screen.findByText("内容の入力は必須です")).toBeInTheDocument();
    });
    it("学習時間がないときに登録するとエラーがでること", async () => {
        render(
            <ChakraProvider value={system}>
                <AddStudyRecordModal getStudyRecords={getStudyRecordsMock} />
            </ChakraProvider>
        );
        // 学習内容と学習時間を入力
        fireEvent.click(screen.getByText("新規登録"));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText("内容"), { target: { value: "Reactの勉強" } });
        });
        // 登録ボタンをクリック
        fireEvent.click(screen.getByText("登録"));

        // // 学習内容が空の場合のエラーメッセージ
        expect(await screen.findByText("時間の入力は必須です")).toBeInTheDocument();
    });
    it("学習時間に数字以外を登録するとエラーがでること", async () => {
        render(
            <ChakraProvider value={system}>
                <AddStudyRecordModal getStudyRecords={getStudyRecordsMock} />
            </ChakraProvider>
        );
        // 学習内容と学習時間を入力
        fireEvent.click(screen.getByText("新規登録"));
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText("時間（h）"), { target: { value: "hoge" } });
        });
        // 登録ボタンをクリック
        fireEvent.click(screen.getByText("登録"));

        // // 学習内容が空の場合のエラーメッセージ
        expect(await screen.findByText("学習時間は数値で入力してください")).toBeInTheDocument();
    });
});
