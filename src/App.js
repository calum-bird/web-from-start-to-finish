import { Box, Card, Fab, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LineChart } from "@mui/x-charts";
import { useLocalStorage } from "@uidotdev/usehooks";
import NewEntry from "./components/NewEntry";
import NavBar from "./components/Navbar";

import { useState } from "react";

function App() {
  const [entries, setEntries] = useLocalStorage("entries", []);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState(false);

  const addEntryAndClose = (entry) => {
    // check if there is a duplicate entry for the date
    const existingEntry = entries.find((e) => e.createdAt === entry.createdAt);
    if (existingEntry) {
      // if there is, remove it from the array
      const newEntries = entries.filter(
        (e) => e.createdAt !== existingEntry.createdAt
      );
      setEntries([...newEntries, entry]);
    } else {
      setEntries([...entries, entry]);
      setIsNewEntryFormOpen(false);
    }
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <NavBar />
      <Toolbar />
      <Card elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          History
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {entries.length > 0 ? (
            <LineChart
              dataset={entries}
              xAxis={[
                {
                  tickLabelStyle: { marginLeft: 16 },
                  data: entries.map((entry) => {
                    return new Date(entry.createdAt);
                  }),
                  scaleType: "time",
                  valueFormatter: (value) => {
                    const date = value;
                    return `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`;
                  },
                },
              ]}
              yAxis={[
                {
                  id: "Feeling",
                  data: [0, 5, 10],
                  scaleType: "linear",
                  valueFormatter: (value) => {
                    switch (value) {
                      case 0:
                        return "Feeling Bad";
                      case 5:
                        return "Doing Okay";
                      case 10:
                        return "Feeling Great";
                      default:
                        return "";
                    }
                  },
                },
              ]}
              series={[
                {
                  color: "#8884d8",
                  connectNulls: true,
                  dataKey: "feeling",
                  valueFormatter: (value) =>
                    `${value}/10: ${
                      entries.find((entry) => entry.feeling === value)?.notes ||
                      "No notes for this entry"
                    }`,
                },
              ]}
              height={500}
            />
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              No entries yet. Add one to get started!
            </Typography>
          )}
        </Box>
        <Fab
          color="primary"
          variant="extended"
          aria-label="Add New Entry"
          onClick={() => setIsNewEntryFormOpen(true)}
        >
          <AddIcon />
          Add New Entry
        </Fab>
      </Card>
      <NewEntry
        addEntryAndClose={addEntryAndClose}
        cancel={() => setIsNewEntryFormOpen(false)}
        open={isNewEntryFormOpen}
      />
    </Box>
  );
}

export default App;
