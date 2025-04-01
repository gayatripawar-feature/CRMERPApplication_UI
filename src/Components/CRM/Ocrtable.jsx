// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
//   Button,
//   Collapse,
//   InputAdornment,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";

  
// const Ocrtable = ({ loans, handleCashWithAVChange, historyCashValues, handleAddClick, expanded, setExpanded, inputValue, setInputValue, handleSave, editingIndex }) => {
//   return (
//     <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
//       <Table style={{ tableLayout: 'auto', width: '100%' }}>
//         <TableHead>
//           <TableRow sx={{ background: "#3621a9" }}>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Flat No.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name Of Allotee</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name Of Co-Allotee</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Type</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Floor</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Email</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Whatsapp No.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Rate</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Agreement Value</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Booking Date</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Parking</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Parking No</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Loan Status</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR Amount</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR Received</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR Balance</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Online</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Cash With AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>History Cash With AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Balance Cash With AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Cash Without AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>History Cash Without AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Balance Cash Without AV</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Received As Per Stage</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Stamp Duty Total</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Stamp Duty Received</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Stamp Duty Balance</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Reg Total</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Reg Received</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Reg Balance</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST Total</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST Received</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Balance GST</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Legal Charges Received</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loans.map((loan) => (
//             <TableRow key={loan.flatNo}>
//               <TableCell>{loan.flatNo}</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell>
//                 <select
//                   style={{
//                     padding: '8px',
//                     backgroundColor: 'white',
//                     border: '1px solid #ccc',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                   }}
//                 >
//                   <option value="">{'Select Status'}</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                   <option value="Non Sanction">Non Sanction</option>
//                 </select>
//               </TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell>
//                 <input
//                   type="number"
//                   value={loan.cashWithAV}
//                   onChange={(e) => handleCashWithAVChange(loan.flatNo, e.target.value)}
//                   style={{
//                     padding: '8px',
//                     backgroundColor: 'white',
//                     border: '1px solid black',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     width: '100%',
//                   }}
//                 />
//               </TableCell>
//               <TableCell>
//                 <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
//                   <IconButton onClick={handleAddClick} style={{ marginBottom: "8px" }}>
//                     <AddIcon />
//                   </IconButton>

//                   {/* Display History Cash Values */}
//                   {historyCashValues.map((value, index) => (
//                     <TextField
//                       key={index}
//                       type="number"
//                       value={value}
//                       disabled
//                       style={{
//                         marginBottom: "1px",
//                         backgroundColor: "white",
//                         borderRadius: "4px",
//                         fontSize: "14px",
//                         width: "80%",
//                         padding: "0px",
//                       }}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => handleEditValue(index)}>
//                               <EditIcon />
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   ))}

//                   {/* Collapsible Input for Adding/Editing */}
//                   <Collapse in={expanded} timeout="auto" unmountOnExit>
//                     <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
//                       <TextField
//                         fullWidth
//                         type="number"
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         sx={{ width: "80%", fontSize: "14px", padding: "0px", height: "20px", marginBottom: "3px" }}
//                         InputProps={{
//                           sx: { height: "28px", fontSize: "12px", padding: "5px" },
//                         }}
//                       />
//                       <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
//                         <Button onClick={() => setExpanded(false)} variant="outlined" size="small">
//                           Cancel
//                         </Button>
//                         <Button onClick={handleSave} variant="contained" size="small">
//                           {editingIndex !== null ? "Update" : "Save"}
//                         </Button>
//                       </div>
//                     </div>
//                   </Collapse>
//                 </div>
//               </TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default Ocrtable;

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
  const [expandedCashWithAV, setExpandedCashWithAV] = useState(null); // Expanded state for Cash With AV
  const [expandedCashWithoutAV, setExpandedCashWithoutAV] = useState(null); // Expanded state for Cash Without AV
  const [historyCashWithAV, setHistoryCashWithAV] = useState([]); // History for Cash With AV
  const [historyCashWithoutAV, setHistoryCashWithoutAV] = useState([]); // History for Cash Without AV
  const [inputValues, setInputValues] = useState({}); // Track input values per flatNo

  // Handle changes for Cash With AV
  const handleCashWithAVChange = (flatNo, value) => {
    setHistoryCashWithAV((prevState) => {
      const updatedState = prevState.map((item) =>
        item.flatNo === flatNo ? { ...item, value } : item
      );
      return updatedState;
    });
  };

  // Handle changes for Cash Without AV
  const handleCashWithoutAVChange = (flatNo, value) => {
    setHistoryCashWithoutAV((prevState) => {
      const updatedState = prevState.map((item) =>
        item.flatNo === flatNo ? { ...item, value } : item
      );
      return updatedState;
    });
  };

  // Handle add or toggle text box visibility for Cash With AV
  const handleAddClickCashWithAV = (flatNo) => {
    if (expandedCashWithAV === flatNo) {
      setExpandedCashWithAV(null); // Close if it's already open
    } else {
      setExpandedCashWithAV(flatNo); // Open the text box for this row only
    }
  };

  // Handle add or toggle text box visibility for Cash Without AV
  const handleAddClickCashWithoutAV = (flatNo) => {
    if (expandedCashWithoutAV === flatNo) {
      setExpandedCashWithoutAV(null); // Close if it's already open
    } else {
      setExpandedCashWithoutAV(flatNo); // Open the text box for this row only
    }
  };

  // Handle value input changes dynamically based on flatNo and type
  const handleInputChange = (flatNo, type, value) => {
    setInputValues((prevState) => ({
      ...prevState,
      [`${flatNo}-${type}`]: value, // Store input value for specific flatNo and type (CashWithAV, CashWithoutAV)
    }));
  };

  // Handle Save functionality for both CashWithAV and CashWithoutAV
  const handleSave = (flatNo, type) => {
    const inputValue = inputValues[`${flatNo}-${type}`]; // Get the correct value based on flatNo and type

    // Save the value to the corresponding history array
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

    // Reset the expanded state after saving
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
