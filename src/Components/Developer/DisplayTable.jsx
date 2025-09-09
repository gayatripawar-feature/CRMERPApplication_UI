import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  IconButton,
  Box,
  TablePagination,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  FaEye,
  FaBuilding,
  FaFileDownload,
  FaPlus,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Constants from "../Constants";
const DisplayTable = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [firmName, setFirmName] = useState("");
  const [firmNameError, setFirmNameError] = useState("");
  const [phases, setPhases] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const data1 = [
    {
      action: "Edit",
      firmName: "ABC Firm",
      timestamp: "2025-03-31 10:00 AM",
      projectName: "Project X",
      projectAddress: "123, Street, City",
      oldSurveyNumber: "12345",
      newSurveyNumber: "54321",
      village: "Village A",
      taluka: "Taluka B",
      district: "District C",
      sanctionAuthority: "Authority 1",
      east: "10m",
      west: "20m",
      north: "15m",
      south: "30m",
      latitude: "28.7041° N",
      longitude: "77.1025° E",
      landmark: "Near Park",
      phaseNo: "Phase 1",
      wingNo: "Wing A",
      mahareraNo: "MH123456",
    },
  ];
  const [rows, setRows] = useState(data1);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };
  const handleDelete = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
     toast.success("Row deleted successfully!", {
       position: "top-right",
       autoClose: 3000,
     });
  };

  const [formValues, setFormValues] = useState({
    firmName: "",
    projectName: "",
    projectAddress: "",
    oldSurveyNumber: "",
    newSurveyNumber: "",
    village: "",
    taluka: "",
    district: "",
    sanctionAuthority: "",
    east: "",
    west: "",
    north: "",
    south: "",
    latitude: "",
    longitude: "",
    landmark: "",
  });

  const handleAddPhase = () => {
    setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); // Add default empty phase
  };

  const handleRemovePhase = (index) => {
    setPhases(phases.filter((_, i) => i !== index));
  };

  const handleFirmNameChange = (e) => {
    const value = e.target.value;

    if (/\d/.test(value)) {
      setFirmNameError("Firm Name should only contain letters");
    } else {
      setFirmNameError("");
    }

    setFirmName(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Item: ", selectedItem);
    setSelectedItem(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      {selectedItem ? (
        <div
          className="project-form mt-4 p-3"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <Paper
            className="p-4"
            elevation={4}
            style={{ borderRadius: "12px", paddingBottom: "20px" }}
          >
            <Typography variant="h5" gutterBottom>
              Project Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Firm Name"
                  fullWidth
                  variant="outlined"
                  value={firmName}
                  onChange={handleFirmNameChange}
                  error={!!firmNameError}
                  helperText={firmNameError}
                />
              </Grid>

              {/* Other fields */}
              {[
                "Project Name",
                "Project Address",
                "Old Survey Number",
                "New Survey Number",
                "Village",
                "Taluka",
                "District",
                "Sanction Authority",
                "East",
                "West",
                "North",
                "South",
                "Latitude",
                "Longitude",
                "Landmark",
              ].map((label, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    label={label}
                    fullWidth
                    variant="outlined"
                    value={formValues[label.toLowerCase().replace(/ /g, "")]}
                    onChange={(e) => handleChange(e, label)}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography variant="h5" className="mt-4" gutterBottom>
              Phase Details
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phase No</TableCell>
                    <TableCell>Wing No</TableCell>
                    <TableCell>Maharera No</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phases.map((phase, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={phase.phaseNo}
                          onChange={(e) =>
                            setPhases(
                              phases.map((p, i) =>
                                i === index
                                  ? { ...p, phaseNo: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={phase.wingNo}
                          onChange={(e) =>
                            setPhases(
                              phases.map((p, i) =>
                                i === index
                                  ? { ...p, wingNo: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={phase.mahareraNo}
                          onChange={(e) =>
                            setPhases(
                              phases.map((p, i) =>
                                i === index
                                  ? { ...p, mahareraNo: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleRemovePhase(index)}
                        >
                          <FaTrash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                className="m-2"
                variant="contained"
                color="primary"
                onClick={handleAddPhase}
              >
                <FaPlus /> Add Row
              </Button>

              <Button
                variant="contained"
                className="mt-3"
                color="success"
                onClick={() => {
                  // setShowFirmForm(false);
                  setSelectedItem(false);
                  toast.success("details are Updated!", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                }}
              >
                Update
              </Button>
            </div>
          </Paper>
        </div>
      ) : (
        // Table view
        <Box sx={{ position: "relative", height: "400px", overflow: "auto" }}>
          <Box
            sx={{
              maxHeight: "400px",
              overflow: "auto",
              border: "1px solid #ccc",
              display: "block",
            }}
          ></Box>
          <Table>
            <TableHead>
              <TableRow sx={{ background: Constants.primaryColor }}>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  ACTION
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  TIMESTAMP
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  FIRM NAME
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  PROJECT NAME
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  PROJECT ADDRESS
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  OLD SURVEY NUMBER
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  NEW SURVEY NUMBER
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  VILLAGE
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  TALUKA
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  DISTRICT
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  SANCTION AUTHORITY
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  EAST
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  WEST
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  NORTH
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  SOUTH
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  LATITUDE
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  LONGITUDE
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  LANDMARK
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  PHASE NO
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  WING NO
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  MAHARERA NO
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor:Constants.primaryColor,
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor:Constants.primaryColor },
                          }}
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: Constants.primaryColor,
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor:Constants.primaryColor },
                          }}
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash style={{ fontSize: "16px" }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{item.firmName}</TableCell>
                  <TableCell>{item.projectName}</TableCell>
                  <TableCell>{item.projectAddress}</TableCell>
                  <TableCell>{item.oldSurveyNumber}</TableCell>
                  <TableCell>{item.newSurveyNumber}</TableCell>
                  <TableCell>{item.village}</TableCell>
                  <TableCell>{item.taluka}</TableCell>
                  <TableCell>{item.district}</TableCell>
                  <TableCell>{item.sanctionAuthority}</TableCell>
                  <TableCell>{item.east}</TableCell>
                  <TableCell>{item.west}</TableCell>
                  <TableCell>{item.north}</TableCell>
                  <TableCell>{item.south}</TableCell>
                  <TableCell>{item.latitude}</TableCell>
                  <TableCell>{item.longitude}</TableCell>
                  <TableCell>{item.landmark}</TableCell>
                  <TableCell>{item.phaseNo}</TableCell>
                  <TableCell>{item.wingNo}</TableCell>
                  <TableCell>{item.mahareraNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      <Box
        sx={{
          position: "sticky",
          bottom: 0, // Fix the pagination at the bottom of the table
          backgroundColor: "white",
          zIndex: 1000, // Ensures pagination stays above the table
          borderTop: "1px solid #ccc",
          width: "100%", // Ensures the pagination spans the entire width
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={data1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>

    
    </TableContainer>
  );
};

export default DisplayTable;
