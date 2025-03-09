import { FC, memo } from "react";
import { Input } from "@chakra-ui/react";

type Props = {
    title: string;
    value: number;
    onChange: () => void;
};

export const RecordInput: FC<Props> = memo((props) => {
    const { title, value, onChange } = props;
    return (
        <div>
            <label>{title}</label>
            <Input value={value} onChange={onChange} />
        </div>
    );
});
