import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

import App from "../src/App";

describe("Componentテスト", () => {
    it("タイトルが表示されること", () => {
        // App コンポーネントをレンダリング
        render(<App />);
        // <h1> タグを取得
        const headingElement = screen.getByRole("heading", { level: 1 });
        // <h1> タグの内容が "学習記録アプリ" であることを確認
        expect(headingElement).toHaveTextContent("Vite + React");
    });
});
