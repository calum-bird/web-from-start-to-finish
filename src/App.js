import { useLocalStorage } from "@uidotdev/usehooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import NewEntry from "./components/NewEntry";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [entries, setEntries] = useLocalStorage("entries", []);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState(false);

  const handleSave = (entry) => {
    let combinedEntries = entries;
    combinedEntries.append(entry);
    setEntries(combinedEntries);
  };

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

        <Button onClick={() => setIsNewEntryFormOpen(true)}>
          Add New Entry
        </Button>
        <NewEntry
          cancel={() => {
            setIsNewEntryFormOpen(false);
          }}
          handleSave={handleSave}
          open={isNewEntryFormOpen}
        />
      </Box>
    </>
  );
}

export default App;
