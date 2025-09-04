import React, { useState , forwardRef }  from "react";
import {Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, IconButton, Tooltip, MenuItem,TextField, Grid, Typography } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useRef } from "react";
  const InventoryTable =  forwardRef(({ inventoryData, handleDelete }, ref) => {
  const [selectedItem, setSelectedItem] = useState(null); 
  const [formValues, setFormValues] = useState({}); 
const [partners, setPartners] = useState([]);
const [editIndex, setEditIndex] = useState(null);
 const unitTypes = ["Residential", "Commercial"];
  const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
  const statusOptions = ["Approved", "Unapproved"];
  const owners = ["Landowner", "Developer", "Investor"];
  const handleEdit = (item,index) => {
    console.log("Editing item:", item);
    setEditIndex(index);
    setSelectedItem(item);
  
    const initialFormData = {
      projectName: item.projectName || '',
      wing: item.wing || '',
      floor: item.floor || '',
      flatNo: item.flatNo || '',
      reraCarpetArea: item.reraCarpetAreaSqMtr || '',
      reraCarpetSqFt: item.reraCarpetAreaSqFt || '',
      totalSaleableArea: item.totalSaleableArea || '',
      carpetAreaRatio: item.saleableToCarpetRatio || '',
      unitType: item.unitType || '',
      configuration: item.configuration || '',
      status: item.status || '',
      owner: item.owner || '',
      terraceCarpetArea: item.terraceArea || '',
      balconyArea: item.balconyArea || '',
      porchArea: item.porchArea || '',
      topTerraceArea: item.topTerraceArea || '',
      superBuiltUpArea: item.superBuiltupArea || '',
      balconySanctioned: item.balconySanctioned || '',
      podiumGarden: item.podiumGarde || ''
    };
  
    console.log("Initial form data:", initialFormData);
  
    setFormData(initialFormData);
  };
  
  const handleSave = () => {
    console.log("Saved Item: ", formValues);
    setSelectedItem(null); 
  };

  const handleCancel = () => {
    setSelectedItem(null); 
  };


  const [formData, setFormData] = useState({
    projectName: '',
    wing: '',
    floor: '',
    flatNo: '',
    reraCarpetArea: '',
    reraCarpetSqFt: '',
    totalSaleableArea: '',
    carpetAreaRatio: '',
    unitType: '',
    configuration: '',
    status: '',
    owner: '',
    terraceCarpetArea: '',
    balconyArea: '',
    porchArea: '',
    topTerraceArea: '',
    superBuiltUpArea: '',
    balconySanctioned: '',
    podiumGarden: ''
  });
  

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Input changed: ${name} = ${value}`);
  };
  
  const [items, setItems] = useState([
    { flatNo: '230', projectName: 'Sales', wing: '90', floor: '1000', reraCarpetArea: '120' }
   
  ]);

  

  
   
  const handleUpdate = () => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.flatNo === formData.flatNo) {
          if (!item || !formData) {
            console.warn("Missing data in update", item, formData);
          }
          return { ...item, ...formData };
        }
        return item;
      });
  
      console.log("Updated items list:", updatedItems);
      return updatedItems;
    });
  };
  
  
  
  return (

    <div ref = {ref} >
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      {selectedItem ? (
        
        <div className="firm-form mt-4 p-3 border rounded" 
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa", 
          border: "1px solid #ccc", 
        }}
        >
          
          <Grid container spacing={2}>
          
            <Grid item xs={4}>
  <TextField
    label="Project Name"
    name="projectName"
    value={formData.projectName || ""}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>

            <Grid item xs={4}>
  <TextField
    label="Wing"
    name="wing"
    value={formData.wing || ""}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>
          
            <Grid item xs={4}>
  <TextField
    label="Floor"
    name="floor"
    value={formData.floor}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    label="Flat No."
    name="flatNo"
    value={formData.flatNo}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>

            
            <Grid item xs={4}>
  <TextField
    type="number"
    label="RERA Carpet Area (Sq Mtr)"
    // name="reraCarpetArea"
    // // value={formData.reraCarpetArea}
    name="reraCarpetAreaSqMtr"   
    value={formData.reraCarpetAreaSqMtr}
    onChange={handleInputChange}
    
    inputProps={{ step: "0.01", min: "0.01" }}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    type="number"
    label="RERA Carpet Area (Sq Ft)"
    name="reraCarpetSqFt"
    value={formData.reraCarpetSqFt}
    onChange={handleInputChange}
    inputProps={{ step: "0.01", min: "0.01" }}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    type="number"
    label="Total Saleable Area (Sq. Fts)"
    name="totalSaleableArea"
    value={formData.totalSaleableArea}
    onChange={handleInputChange}
    inputProps={{ step: "0.01", min: "0.01" }}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    type="number"
    label="Saleable to Carpet Area Ratio (Sq. Fts)"
    name="carpetAreaRatio"
    value={formData.carpetAreaRatio}
    onChange={handleInputChange}
    inputProps={{ step: "0.01", min: "0.01" }}
    fullWidth
  />
</Grid>

           
            <Grid item xs={4}>
  <TextField
    select
    label="Type of Units"
    name="unitType"
    value={formData.unitType}
    onChange={handleInputChange}
    fullWidth
  >
    {unitTypes.map((type, idx) => (
      <MenuItem key={idx} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
</Grid>


         
<Grid item xs={4}>
  <TextField
    select
    label="Configuration"
    name="configuration"
    value={formData.configuration}
    onChange={handleInputChange}
    fullWidth
  >
    {configurations.map((config, idx) => (
      <MenuItem key={idx} value={config}>
        {config}
      </MenuItem>
    ))}
  </TextField>
</Grid>

           

<Grid item xs={4}>
  <TextField
    select
    label="Status"
    name="status"
    value={formData.status}
    onChange={handleInputChange}
    fullWidth
  >
    {statusOptions.map((status, idx) => (
      <MenuItem key={idx} value={status}>
        {status}
      </MenuItem>
    ))}
  </TextField>
</Grid>


          
            <Grid item xs={4}>
  <TextField
    select
    label="Select Owner"
    name="owner"
    value={formData.owner}
    onChange={handleInputChange}
    fullWidth
  >
    {owners.map((owner, idx) => (
      <MenuItem key={idx} value={owner}>
        {owner}
      </MenuItem>
    ))}
  </TextField>
</Grid>


            
         

<Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    name="terraceCarpetArea"
    value={formData.terraceCarpetArea}
    onChange={handleInputChange}
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>


          


<Grid item xs={4}>
  <TextField
    type="number"
    label="Balcony Area/Sitout Carpet Area (Sq Ft)"
    name="balconyArea"
    value={formData.balconyArea}
    onChange={handleInputChange}
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>
<Grid item xs={4}>
  <TextField
    type="number"
    label="Porch Area (Sq Ft)"
    name="porchArea"
    value={formData.porchArea}
    onChange={handleInputChange}
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>
<Grid item xs={4}>
  <TextField
    type="number"
    label="Top Terrace Carpet Area (Sq Ft)"
    name="topTerraceArea"
    value={formData.topTerraceArea}
    onChange={handleInputChange}
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>
<Grid item xs={4}>
  <TextField
    type="number"
    label="Super Built-up Area (Sq Ft)"
    name="superBuiltUpArea"
    value={formData.superBuiltUpArea}
    onChange={handleInputChange}
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="OPEN/ENCLOSED BALCONY AS SANCTIONED"
    name="balconySanctioned"
    value={formData.balconySanctioned}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="PODIUM GARDEN"
    name="podiumGarden"
    value={formData.podiumGarden}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>

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
className="mt-3 m-2"
color="success"
onClick={() => {
  handleUpdate();
setSelectedItem(false);
toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });
}}
>
Update
</Button>
<Button
variant="contained"
className="mt-3 m-2"
color="dark"
onClick={() => {
setSelectedItem(false);

}}
>
Cancel
</Button>

        </div> 
      ) : (
        // Table view
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
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
             <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SUPER BUILTUP</TableCell>
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
                      onClick={() => handleEdit(item,index)} 
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
               <TableCell>{item.reraCarpetAreaSqMtr}</TableCell>
               <TableCell>{item.reraCarpetAreaSqFt}</TableCell>
               <TableCell>{item.totalSaleableArea}</TableCell>
               <TableCell>{item.saleableToCarpetRatio}</TableCell>
               <TableCell>{item.unitType}</TableCell>
               <TableCell>{item.configuration}</TableCell>
               <TableCell>{item.status}</TableCell>
               <TableCell>{item.owner}</TableCell>
               <TableCell>{item.terraceArea}</TableCell>
               <TableCell>{item.balconyArea}</TableCell>
               <TableCell>{item.porchArea}</TableCell>
               <TableCell>{item.topTerraceArea}</TableCell>
               <TableCell>{item.superBuiltupArea}</TableCell>
              
              <TableCell>{item.balconySanctioned}</TableCell>
               <TableCell>{item.podiumGarde}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Box>
      )}
    </TableContainer>
    </div>
  );


}
  
  );


export default InventoryTable;