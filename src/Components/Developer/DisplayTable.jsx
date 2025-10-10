// import React, { useState } from "react";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Tooltip,
//   IconButton,
//   Box,
//   TablePagination,
//   TextField,
//   Button,
//   Grid,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   FaEye,
//   FaBuilding,
//   FaFileDownload,
//   FaPlus,
//   FaTrash,
//   FaUpload,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Constants from "../Constants";
// const DisplayTable = ({ data }) => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [firmName, setFirmName] = useState("");
//   const [firmNameError, setFirmNameError] = useState("");
//   const [phases, setPhases] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(6);
//   const data1 = [
//     {
//       action: "Edit",
//       firmName: "ABC Firm",
//       timestamp: "2025-03-31 10:00 AM",
//       projectName: "Project X",
//       projectAddress: "123, Street, City",
//       oldSurveyNumber: "12345",
//       newSurveyNumber: "54321",
//       village: "Village A",
//       taluka: "Taluka B",
//       district: "District C",
//       sanctionAuthority: "Authority 1",
//       east: "10m",
//       west: "20m",
//       north: "15m",
//       south: "30m",
//       latitude: "28.7041° N",
//       longitude: "77.1025° E",
//       landmark: "Near Park",
//       phaseNo: "Phase 1",
//       wingNo: "Wing A",
//       mahareraNo: "MH123456",
//     },
//   ];
//   const [rows, setRows] = useState(data1);

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//   };
//   const handleDelete = (index) => {
//     setRows((prevRows) => prevRows.filter((_, i) => i !== index));
//      toast.success("Row deleted successfully!", {
//        position: "top-right",
//        autoClose: 3000,
//      });
//   };

//   const [formValues, setFormValues] = useState({
//     firmName: "",
//     projectName: "",
//     projectAddress: "",
//     oldSurveyNumber: "",
//     newSurveyNumber: "",
//     village: "",
//     taluka: "",
//     district: "",
//     sanctionAuthority: "",
//     east: "",
//     west: "",
//     north: "",
//     south: "",
//     latitude: "",
//     longitude: "",
//     landmark: "",
//   });

//   const handleAddPhase = () => {
//     setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); // Add default empty phase
//   };

//   const handleRemovePhase = (index) => {
//     setPhases(phases.filter((_, i) => i !== index));
//   };

//   const handleFirmNameChange = (e) => {
//     const value = e.target.value;

//     if (/\d/.test(value)) {
//       setFirmNameError("Firm Name should only contain letters");
//     } else {
//       setFirmNameError("");
//     }

//     setFirmName(value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedItem((prevItem) => ({
//       ...prevItem,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     console.log("Saved Item: ", selectedItem);
//     setSelectedItem(null);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   return (
//     <TableContainer component={Paper}>
//       {selectedItem ? (
//         <div
//           className="project-form mt-4 p-3"
//           style={{
//             maxHeight: "500px",
//             overflowY: "auto",
//             paddingRight: "10px",
//           }}
//         >
//           <Paper
//             className="p-4"
//             elevation={4}
//             style={{ borderRadius: "12px", paddingBottom: "20px" }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Project Details
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Firm Name"
//                   fullWidth
//                   variant="outlined"
//                   value={firmName}
//                   onChange={handleFirmNameChange}
//                   error={!!firmNameError}
//                   helperText={firmNameError}
//                 />
//               </Grid>

//               {/* Other fields */}
//               {[
//                 "Project Name",
//                 "Project Address",
//                 "Old Survey Number",
//                 "New Survey Number",
//                 "Village",
//                 "Taluka",
//                 "District",
//                 "Sanction Authority",
//                 "East",
//                 "West",
//                 "North",
//                 "South",
//                 "Latitude",
//                 "Longitude",
//                 "Landmark",
//               ].map((label, index) => (
//                 <Grid item xs={6} key={index}>
//                   <TextField
//                     label={label}
//                     fullWidth
//                     variant="outlined"
//                     value={formValues[label.toLowerCase().replace(/ /g, "")]}
//                     onChange={(e) => handleChange(e, label)}
//                   />
//                 </Grid>
//               ))}
//             </Grid>

//             <Typography variant="h5" className="mt-4" gutterBottom>
//               Phase Details
//             </Typography>

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Phase No</TableCell>
//                     <TableCell>Wing No</TableCell>
//                     <TableCell>Maharera No</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {phases.map((phase, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <TextField
//                           fullWidth
//                           value={phase.phaseNo}
//                           onChange={(e) =>
//                             setPhases(
//                               phases.map((p, i) =>
//                                 i === index
//                                   ? { ...p, phaseNo: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           fullWidth
//                           value={phase.wingNo}
//                           onChange={(e) =>
//                             setPhases(
//                               phases.map((p, i) =>
//                                 i === index
//                                   ? { ...p, wingNo: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           fullWidth
//                           value={phase.mahareraNo}
//                           onChange={(e) =>
//                             setPhases(
//                               phases.map((p, i) =>
//                                 i === index
//                                   ? { ...p, mahareraNo: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => handleRemovePhase(index)}
//                         >
//                           <FaTrash />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginTop: "20px",
//               }}
//             >
//               <Button
//                 className="m-2"
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddPhase}
//               >
//                 <FaPlus /> Add Row
//               </Button>

//               <Button
//                 variant="contained"
//                 className="mt-3"
//                 color="success"
//                 onClick={() => {
//                   // setShowFirmForm(false);
//                   setSelectedItem(false);
//                   toast.success("details are Updated!", {
//                     position: "top-right",
//                     autoClose: 3000,
//                   });
//                 }}
//               >
//                 Update
//               </Button>
//             </div>
//           </Paper>
//         </div>
//       ) : (
//         // Table view
//         <Box sx={{ position: "relative", height: "400px", overflow: "auto" }}>
//           <Box
//             sx={{
//               maxHeight: "400px",
//               overflow: "auto",
//               border: "1px solid #ccc",
//               display: "block",
//             }}
//           ></Box>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: Constants.primaryColor }}>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   ACTION
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   TIMESTAMP
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM NAME
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PROJECT NAME
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PROJECT ADDRESS
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   OLD SURVEY NUMBER
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   NEW SURVEY NUMBER
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   VILLAGE
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   TALUKA
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   DISTRICT
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   SANCTION AUTHORITY
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   EAST
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   WEST
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   NORTH
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   SOUTH
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   LATITUDE
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   LONGITUDE
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   LANDMARK
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PHASE NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   WING NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   MAHARERA NO
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           size="small"
//                           sx={{
//                             backgroundColor:Constants.primaryColor,
//                             color: "white",
//                             borderRadius: "50%",
//                             "&:hover": { backgroundColor:Constants.primaryColor },
//                           }}
//                           onClick={() => handleEdit(item)}
//                         >
//                           <EditIcon sx={{ fontSize: "18px" }} />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton
//                           size="small"
//                           sx={{
//                             backgroundColor: Constants.primaryColor,
//                             color: "white",
//                             borderRadius: "50%",
//                             "&:hover": { backgroundColor:Constants.primaryColor },
//                           }}
//                           onClick={() => handleDelete(index)}
//                         >
//                           <FaTrash style={{ fontSize: "16px" }} />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                   <TableCell>{item.timestamp}</TableCell>
//                   <TableCell>{item.firmName}</TableCell>
//                   <TableCell>{item.projectName}</TableCell>
//                   <TableCell>{item.projectAddress}</TableCell>
//                   <TableCell>{item.oldSurveyNumber}</TableCell>
//                   <TableCell>{item.newSurveyNumber}</TableCell>
//                   <TableCell>{item.village}</TableCell>
//                   <TableCell>{item.taluka}</TableCell>
//                   <TableCell>{item.district}</TableCell>
//                   <TableCell>{item.sanctionAuthority}</TableCell>
//                   <TableCell>{item.east}</TableCell>
//                   <TableCell>{item.west}</TableCell>
//                   <TableCell>{item.north}</TableCell>
//                   <TableCell>{item.south}</TableCell>
//                   <TableCell>{item.latitude}</TableCell>
//                   <TableCell>{item.longitude}</TableCell>
//                   <TableCell>{item.landmark}</TableCell>
//                   <TableCell>{item.phaseNo}</TableCell>
//                   <TableCell>{item.wingNo}</TableCell>
//                   <TableCell>{item.mahareraNo}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       )}
//       <Box
//         sx={{
//           position: "sticky",
//           bottom: 0, // Fix the pagination at the bottom of the table
//           backgroundColor: "white",
//           zIndex: 1000, // Ensures pagination stays above the table
//           borderTop: "1px solid #ccc",
//           width: "100%", // Ensures the pagination spans the entire width
//         }}
//       >
//         <TablePagination
//           rowsPerPageOptions={[10]}
//           component="div"
//           count={data1.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//         />
//       </Box>

    
//     </TableContainer>
//   );
// };

// export default DisplayTable;







import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
  Tooltip,
  TableFooter,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Constants from "../Constants";

const DisplayTable = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const safeData = data || [];
  const paginatedData = safeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Enhanced column headers with better phase handling
  const columnHeaders = [
    {
      label: "ACTIONS",
      key: "actions",
      render: (value, item, index) => renderActions(item, index),
    },
    { label: "TIMESTAMP", key: "timestamp" },
    { label: "FIRM NAME", key: "firmName" },
    { label: "PROJECT NAME", key: "projectName" },
    { label: "PROJECT ADDRESS", key: "projectAddress" },
    { label: "OLD SURVEY NUMBER", key: "oldSurveyNumber" },
    { label: "NEW SURVEY NUMBER", key: "newSurveyNumber" },
    { label: "VILLAGE", key: "village" },
    { label: "TALUKA", key: "taluka" },
    { label: "DISTRICT", key: "district" },
    { label: "SANCTION AUTHORITY", key: "sanctionAuthority" },
    { label: "EAST", key: "east" },
    { label: "WEST", key: "west" },
    { label: "NORTH", key: "north" },
    { label: "SOUTH", key: "south" },
    { label: "LATITUDE", key: "latitude" },
    { label: "LONGITUDE", key: "longitude" },
    { label: "LANDMARK", key: "landmark" },
    {
      label: "PHASE NO",
      key: "phaseNo",
      render: (value) => renderPhaseDetails(value, "phaseNo"),
    },
    {
      label: "WING NO",
      key: "wingNo",
      render: (value) => renderPhaseDetails(value, "wingNo"),
    },
    {
      label: "MAHARERA NO",
      key: "mahareraNo",
      render: (value) => renderPhaseDetails(value, "mahareraNo"),
    },
  ];

  // Function to render phase details with simple text formatting
  const renderPhaseDetails = (value, type) => {
    if (!value || value === "-") return "-";

    // If it's a string with commas, split and display as simple text
    if (typeof value === "string" && value.includes(",")) {
      const items = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {items.map((item, index) => (
            <Typography key={index} variant="body2" sx={{ fontSize: "12px" }}>
              {item}
            </Typography>
          ))}
        </Box>
      );
    }

    // Single value - return as plain text
    return value;
  };

  // Function to render action buttons
  const renderActions = (item, index) => {
    return (
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={() => onEdit && onEdit(item)}
          >
            <EditIcon sx={{ fontSize: isMobile ? "14px" : "18px" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
            onClick={() => onDelete && onDelete(item)}
          >
            <DeleteIcon sx={{ fontSize: isMobile ? "14px" : "18px" }} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  // Function to get cell value with proper formatting
  const getCellValue = (item, header) => {
    if (header.key === "actions") {
      return header.render(null, item, safeData.indexOf(item));
    }

    const value = item[header.key] || "-";

    // Use custom renderer if available
    if (header.render) {
      return header.render(value, item, safeData.indexOf(item));
    }

    return value;
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: isMobile ? 400 : 600,
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: Constants.primaryColor,
            borderRadius: "3px",
          },
        }}
      >
        <Table
          sx={{
            minWidth: "100%", // Use full width instead of fixed minWidth
            tableLayout: "auto", // Changed to auto for dynamic column widths
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {columnHeaders.map((header) => (
                <TableCell
                  key={header.key}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    background: Constants.primaryColor,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    fontSize: isMobile ? "12px" : "14px",
                    padding: isMobile ? "8px 4px" : "12px 8px",
                    textAlign: "center",
                    whiteSpace: "nowrap", // Prevent text from wrapping vertically
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: header.key === "actions" ? "100px" : "auto", // Minimal width for actions column
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      whiteSpace: "nowrap", // Ensure header text stays horizontal
                    }}
                  >
                    {header.label}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {columnHeaders.map((header) => (
                    <TableCell
                      key={header.key}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: isMobile ? "12px" : "14px",
                        padding: isMobile ? "6px 4px" : "8px 6px",
                        lineHeight: isMobile ? "1.2" : "1.5",
                        verticalAlign: "top",
                        textAlign: header.key === "actions" ? "center" : "left",
                      }}
                    >
                      {getCellValue(item, header)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnHeaders.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body1" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columnHeaders.length}
                sx={{ padding: 0, border: "none" }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <TablePagination
                    rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25, 50]}
                    component="div"
                    count={safeData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DisplayTable;
