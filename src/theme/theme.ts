import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
    globalCss: {
        body: {
            color: "gray.800",
        },
    },
});
