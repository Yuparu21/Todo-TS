import { FC, memo, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "reset" | "submit" | undefined;
};
export const PrimaryButton: FC<Props> = memo((props) => {
    const { children, onClick, type } = props;
    return (
        <Button
            bg="teal.500"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={onClick}
            type={type}
        >
            {children}
        </Button>
    );
});
