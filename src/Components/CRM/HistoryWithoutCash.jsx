import React, { useState } from "react";
import { IconButton, TextField, Stack } from "@mui/material";
import { Add, Edit, Save } from "@mui/icons-material";

const HistoryWithoutCash = () => {
  const [history, setHistory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleAddClick = () => {
    setIsAdding(true);
    setNewValue("");
  };

  const handleSaveNew = () => {
    if (newValue.trim() !== "") {
      setHistory([...history, newValue.trim()]);
      setIsAdding(false);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedValue(history[index]);
  };

  const handleSaveEdit = () => {
    const updated = [...history];
    updated[editIndex] = editedValue;
    setHistory(updated);
    setEditIndex(null);
  };

  return (
    <Stack spacing={1}>
      {history.map((item, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={1}>
          {editIndex === index ? (
            <>
              <TextField
                size="small"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
              <IconButton onClick={handleSaveEdit} size="small">
                <Save fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <span>{item}</span>
              <IconButton onClick={() => handleEditClick(index)} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      ))}

      {isAdding ? (
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <IconButton onClick={handleSaveNew} size="small">
            <Save fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <IconButton onClick={handleAddClick} size="small">
          <Add fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

export default HistoryWithoutCash;