
// import React from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button,IconButton ,Tooltip } from "@mui/material";
// import { FaTrash } from "react-icons/fa";
// import EditIcon from '@mui/icons-material/Edit';
// import { Delete as DeleteIcon } from "@mui/icons-material";

// const InventoryTable = ({ inventoryData, handleDelete }) => {
//   return (
//     <TableContainer component={Paper} sx={{ mt: 3 }}>
//       <Table>
//         <TableHead>
        
//           <TableRow sx={{ background: "linear-gradient(180deg, #3621a9 0%,rgb(139, 115, 243) 100%)" }}>
//             <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>ACTION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>PROJECT NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WING</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLOOR</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RERA CARPET AREA (Sq Mtr)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>RERA CARPET AREA (Sq Ft)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOTAL SALEABLE AREA (Sq. Fts)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SALEABLE RATIO</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>UNIT TYPE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CONFIGURATION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>STATUS</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OWNERSHIP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ATT. TERRACE CARPET AREA</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BALCONY AREA/SITOUT CARPET AREA</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PORCH AREA</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOP TERRACE CARPET AREA</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SUPER BUILTUP AREA</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OPEN/ENCLOSED BALCONY AS SANCTIONED</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PODIUM GARDE</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {inventoryData.map((item, index) => (
//             <TableRow key={index}>
//              <TableCell>
//   <Tooltip title="Edit">
//     <IconButton
//       size="small"
//       sx={{
//         backgroundColor: '#1976D2', // Blue background color for edit
//         color: 'white', // Set the icon color to white
//         borderRadius: '50%', // Make the icon circular
//         '&:hover': { backgroundColor: '#1565C0' }, // Darker blue on hover
//       }}
//       onClick={() => handleEdit(row)} // Ensure you add an edit handler if needed
//     >
//       <EditIcon sx={{ fontSize: '18px' }} />
//     </IconButton>
//   </Tooltip>
// </TableCell>

//               <TableCell>{item.timestamp}</TableCell>
//               <TableCell>{item.projectName}</TableCell>
//               <TableCell>{item.wing}</TableCell>
//               <TableCell>{item.floor}</TableCell>
//               <TableCell>{item.flatNo}</TableCell>
//               <TableCell>{item.reraCarpetSqMtr}</TableCell>
//               <TableCell>{item.reraCarpetSqFt}</TableCell>
//               <TableCell>{item.totalSaleableArea}</TableCell>
//               <TableCell>{item.saleableRatio}</TableCell>
//               <TableCell>{item.unitType}</TableCell>
//               <TableCell>{item.configuration}</TableCell>
//               <TableCell>{item.status}</TableCell>
//               <TableCell>{item.ownership}</TableCell>
//               <TableCell>{item.attTerraceArea}</TableCell>
//               <TableCell>{item.balconyArea}</TableCell>
//               <TableCell>{item.porchArea}</TableCell>
//               <TableCell>{item.topTerraceArea}</TableCell>
//               <TableCell>{item.superBuiltupArea}</TableCell>
//               <TableCell>{item.openEnclosedBalcony}</TableCell>
//               <TableCell>{item.podiumGarde}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default InventoryTable;


import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, IconButton, Tooltip, MenuItem,TextField, Grid, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from "@mui/icons-material";

const InventoryTable = ({ inventoryData, handleDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [formValues, setFormValues] = useState({}); // State for form values
const [partners, setPartners] = useState([]);

  const unitTypes = ["Residential", "Commercial"];
  const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
  const statusOptions = ["Approved", "Unapproved"];
  const owners = ["Landowner", "Developer", "Investor"];

  const handleEdit = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setFormValues(item); // Initialize form values with the selected item
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Item: ", formValues);
    setSelectedItem(null); // Close the form after saving
  };

  const handleCancel = () => {
    setSelectedItem(null); // Close the form without saving
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      {selectedItem ? (
        // Form for editing the selected item
        <div className="firm-form mt-4 p-3 border rounded" 
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa", 
          border: "1px solid #ccc", 
        }}
        >
          
          <Grid container spacing={2}>
            <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
            <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
            <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
            <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
            <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
            inputProps={{ step: "0.01", min: "0.01" }}
            /></Grid>
            <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
            /></Grid>
            <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
            /></Grid>
            <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

            {/* Type of Units Dropdown */}
            <Grid item xs={4}>
              <TextField select label="Type of Units" fullWidth>
                {unitTypes.map((type, idx) => (
                  <MenuItem key={idx} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Configuration Dropdown */}
            <Grid item xs={4}>
              <TextField select label="Configuration" fullWidth>
                {configurations.map((config, idx) => (
                  <MenuItem key={idx} value={config}>{config}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Status Dropdown */}
            <Grid item xs={4}>
              <TextField select label="Status" fullWidth>
                {statusOptions.map((status, idx) => (
                  <MenuItem key={idx} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Select Owner Dropdown */}
            <Grid item xs={4}>
              <TextField select label="Select Owner" fullWidth>
                {owners.map((owner, idx) => (
                  <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* <Grid item xs={4}><TextField type="number" label="ATT. Terrace Carpet Area (Sq Ft)" fullWidth /></Grid> */}
            <Grid item xs={4}>
<TextField
type="number"
label="ATT. Terrace Carpet Area (Sq Ft)"
fullWidth
inputProps={{ step: "0.01", min: "0.01" }}
/>
</Grid>

            <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
            inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
            <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
            inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
            <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
            /></Grid>
            <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
            /></Grid>
            <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
            <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
          </Grid>

          {/* Partner Details */}
       
          {partners.map((_, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
              <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
              <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                  <FaTrash />
                </Button>
              </Grid>
            </Grid>
          ))}

         

      

<Button
variant="contained"
className="mt-3"
color="success"
onClick={() => {
setSelectedItem(false);
toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });
}}
>
Update
</Button>


        </div> 
      ) : (
        // Table view
        <Table>
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(180deg, #3621a9 0%,rgb(139, 115, 243) 100%)" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>PROJECT NAME</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WING</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLOOR</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RERA CARPET AREA (Sq Mtr)</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>RERA CARPET AREA (Sq Ft)</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOTAL SALEABLE AREA (Sq. Fts)</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SALEABLE RATIO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>UNIT TYPE</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CONFIGURATION</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>STATUS</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OWNERSHIP</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ATT. TERRACE CARPET AREA</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BALCONY AREA/SITOUT CARPET AREA</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PORCH AREA</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOP TERRACE CARPET AREA</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SUPER BUILTUP AREA</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OPEN/ENCLOSED BALCONY AS SANCTIONED</TableCell>
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PODIUM GARDE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: '#1976D2',
                        color: 'white',
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: '#1565C0' },
                      }}
                      onClick={() => handleEdit(item)} // Set item for editing
                    >
                      <EditIcon sx={{ fontSize: '18px' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.timestamp}</TableCell>
               <TableCell>{item.projectName}</TableCell>
               <TableCell>{item.wing}</TableCell>
               <TableCell>{item.floor}</TableCell>
               <TableCell>{item.flatNo}</TableCell>
               <TableCell>{item.reraCarpetSqMtr}</TableCell>
               <TableCell>{item.reraCarpetSqFt}</TableCell>
               <TableCell>{item.totalSaleableArea}</TableCell>
               <TableCell>{item.saleableRatio}</TableCell>
               <TableCell>{item.unitType}</TableCell>
               <TableCell>{item.configuration}</TableCell>
               <TableCell>{item.status}</TableCell>
               <TableCell>{item.ownership}</TableCell>
               <TableCell>{item.attTerraceArea}</TableCell>
               <TableCell>{item.balconyArea}</TableCell>
               <TableCell>{item.porchArea}</TableCell>
               <TableCell>{item.topTerraceArea}</TableCell>
               <TableCell>{item.superBuiltupArea}</TableCell>
              <TableCell>{item.openEnclosedBalcony}</TableCell>
               <TableCell>{item.podiumGarde}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default InventoryTable;
