import { useState } from "react";
import { Table1, Table2 } from "./components/Tables";
import "@mantine/core/styles.css";

const App = () => {
  const [tableSwitchButton, setTableSwitchButton] = useState<boolean>(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button onClick={() => setTableSwitchButton(!tableSwitchButton)}>
          {tableSwitchButton ? "Table 1" : "Table 2"}
        </button>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        {tableSwitchButton ? <Table1 /> : <Table2 />}
      </div>
    </div>
  );
};

export default App;
