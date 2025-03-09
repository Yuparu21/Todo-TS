import { ChakraProvider } from "@chakra-ui/react";
import { StudyRecordManagement } from "./components/pages/StudyRecordManagement";
import { system } from "./theme/theme";

export const App = () => {
  return (
    <>
      <ChakraProvider value={system}>
        <StudyRecordManagement />
      </ChakraProvider>
    </>
  );
};
