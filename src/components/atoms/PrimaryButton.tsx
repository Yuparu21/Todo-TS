import { FC, memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
    children: ReactNode;
    bg?: string;
    onClick?: () => void;
    type?: "button" | "reset" | "submit" | undefined;
};
export const PrimaryButton: FC<Props> = memo((props) => {
    const { children, bg, onClick, type } = props;
    return (
        <Button
            bg={bg}
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={onClick}
            type={type}
        >
            {children}
        </Button>
    );
});
