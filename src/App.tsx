import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChakraProvider value={system}>

        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </ChakraProvider>
    </>
  )
}
