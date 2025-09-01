import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Collapse,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const Ocrtable = ({ loans }) => {
  const [expandedCashWithAV, setExpandedCashWithAV] = useState(null); 
  const [expandedCashWithoutAV, setExpandedCashWithoutAV] = useState(null); 
  const [historyCashWithAV, setHistoryCashWithAV] = useState([]); 
  const [historyCashWithoutAV, setHistoryCashWithoutAV] = useState([]); 
  const [inputValues, setInputValues] = useState({}); 

  
  const handleCashWithAVChange = (flatNo, value) => {
    setHistoryCashWithAV((prevState) => {
      const updatedState = prevState.map((item) =>
        item.flatNo === flatNo ? { ...item, value } : item
      );
      return updatedState;
    });
  };

  
  const handleCashWithoutAVChange = (flatNo, value) => {
    setHistoryCashWithoutAV((prevState) => {
      const updatedState = prevState.map((item) =>
        item.flatNo === flatNo ? { ...item, value } : item
      );
      return updatedState;
    });
  };

 
  const handleAddClickCashWithAV = (flatNo) => {
    if (expandedCashWithAV === flatNo) {
      setExpandedCashWithAV(null); 
    } else {
      setExpandedCashWithAV(flatNo); 
    }
  };

  const handleAddClickCashWithoutAV = (flatNo) => {
    if (expandedCashWithoutAV === flatNo) {
      setExpandedCashWithoutAV(null); 
    } else {
      setExpandedCashWithoutAV(flatNo); 
    }
  };

  
  const handleInputChange = (flatNo, type, value) => {
    setInputValues((prevState) => ({
      ...prevState,
      [`${flatNo}-${type}`]: value, 
    }));
  };

 
  const handleSave = (flatNo, type) => {
    const inputValue = inputValues[`${flatNo}-${type}`]; 

   
    if (type === "CashWithAV") {
      setHistoryCashWithAV((prevState) =>
        prevState.map((item) =>
          item.flatNo === flatNo ? { ...item, value: inputValue } : item
        )
      );
    } else if (type === "CashWithoutAV") {
      setHistoryCashWithoutAV((prevState) =>
        prevState.map((item) =>
          item.flatNo === flatNo ? { ...item, value: inputValue } : item
        )
      );
    }

    
    setExpandedCashWithAV(null);
    setExpandedCashWithoutAV(null);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
      <Table style={{ tableLayout: "auto", width: "100%" }}>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            {/* Table Headers */}
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Flat No.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Cash With AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>History Cash With AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Balance Cash With AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Cash Without AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>History Cash Without AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Balance Cash Without AV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.flatNo}>
              <TableCell>{loan.flatNo}</TableCell>

              {/* Cash With AV Column */}
              <TableCell>
                <input
                  type="number"
                  value={inputValues[`${loan.flatNo}-CashWithAV`] || historyCashWithAV[loan.flatNo] || ""}
                  onChange={(e) =>
                    handleInputChange(loan.flatNo, "CashWithAV", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "100%",
                  }}
                />
              </TableCell>

              {/* History Cash With AV */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <IconButton onClick={() => handleAddClickCashWithAV(loan.flatNo)} style={{ marginBottom: "8px" }}>
                    <AddIcon />
                  </IconButton>
                  {expandedCashWithAV === loan.flatNo && (
                    <Collapse in={expandedCashWithAV === loan.flatNo} timeout="auto" unmountOnExit>
                      <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <TextField
                          fullWidth
                          type="number"
                          value={inputValues[`${loan.flatNo}-CashWithAV`] || ""}
                          onChange={(e) =>
                            handleInputChange(loan.flatNo, "CashWithAV", e.target.value)
                          }
                          sx={{
                            width: "80%",
                            fontSize: "14px",
                            padding: "0px",
                            height: "20px",
                            marginBottom: "3px",
                          }}
                          InputProps={{
                            sx: { height: "28px", fontSize: "12px", padding: "5px" },
                          }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                          <Button onClick={() => setExpandedCashWithAV(null)} variant="outlined" size="small">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleSave(loan.flatNo, "CashWithAV")}
                            variant="contained"
                            size="small"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </Collapse>
                  )}
                </div>
              </TableCell>

              {/* Cash Without AV Column */}
              <TableCell>
                <input
                  type="number"
                  value={inputValues[`${loan.flatNo}-CashWithoutAV`] || historyCashWithoutAV[loan.flatNo] || ""}
                  onChange={(e) =>
                    handleInputChange(loan.flatNo, "CashWithoutAV", e.target.value)
                  }
                  style={{
                    padding: "8px",
                    backgroundColor: "white",
                    border: "1px solid black",
                    borderRadius: "4px",
                    fontSize: "14px",
                    width: "100%",
                  }}
                />
              </TableCell>

              {/* History Cash Without AV */}
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <IconButton onClick={() => handleAddClickCashWithoutAV(loan.flatNo)} style={{ marginBottom: "8px" }}>
                    <AddIcon />
                  </IconButton>
                  {expandedCashWithoutAV === loan.flatNo && (
                    <Collapse in={expandedCashWithoutAV === loan.flatNo} timeout="auto" unmountOnExit>
                      <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <TextField
                          fullWidth
                          type="number"
                          value={inputValues[`${loan.flatNo}-CashWithoutAV`] || ""}
                          onChange={(e) =>
                            handleInputChange(loan.flatNo, "CashWithoutAV", e.target.value)
                          }
                          sx={{
                            width: "80%",
                            fontSize: "14px",
                            padding: "0px",
                            height: "20px",
                            marginBottom: "3px",
                          }}
                          InputProps={{
                            sx: { height: "28px", fontSize: "12px", padding: "5px" },
                          }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
                          <Button onClick={() => setExpandedCashWithoutAV(null)} variant="outlined" size="small">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleSave(loan.flatNo, "CashWithoutAV")}
                            variant="contained"
                            size="small"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </Collapse>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Ocrtable;
