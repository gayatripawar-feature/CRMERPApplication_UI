import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton, Box,
} from '@mui/material';
import { FaEdit, FaWhatsapp } from 'react-icons/fa';
import Constants from '../Constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from '../SessionContext';
const PendingFollowuptable = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { id: userId, name: userName } = useSession() || {};



  const [firms] = useState([
    {
      leadNo: 'LD001',
      name: 'John Doe',
      mobileNo: '9876543210',
      mailId: 'john@example.com',
      nextFollowUp: '2025-09-28',
      lastFollowUp: '2025-09-20',
      status: 'Pending',
      remark: 'Call scheduled',
      assignTo: 'Manager 1',
      leadType: '2 BHK',
      sourceName: 'Facebook Ads',
    },
  ]);

  const handleEditClick = (firm) => {
    setEditingItem(firm); // set the row to edit   
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const filteredFirms = firms.filter((firm) => {
    if (!startDate && !endDate) return true;
    const nextFollowUpDate = new Date(firm.nextFollowUp);
    if (startDate && nextFollowUpDate < new Date(startDate)) return false;
    if (endDate && nextFollowUpDate > new Date(endDate)) return false;
    return true;
  });



  // const userLeads = data?.filter((lead) =>
  //   lead.leadEnagagements &&
  //   lead.leadEnagagements.some(
  //     (eng) => eng.assignedTo === userId
  //   )
  // );

  console.log(" userId:", userId);
  console.log(" All leads:", data);
  console.log(" Filtered leads:", userLeads);

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: Constants.primaryColor }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACTION</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LEAD NO</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO. / WHATSAPP NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>EMAIL</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NEXT FOLLOW UP</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LAST FOLLOW UP</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>STATUS</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>REMARK</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ASSIGN TO</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>YOU ARE LOOKING FOR?</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>SOURCE NAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* { filteredFirms
      .map((firm, index) => ( */}
              {userLeads.map((firm, index) => (

                <TableRow key={index} onClick={() => handleSelectItem(firm)}>
                  <TableCell sx={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(firm)}
                          sx={{
                            backgroundColor: Constants.primaryColor,
                            padding: '5px',
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '18px',
                          }}
                        >
                          <FaEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="WhatsApp" arrow>
                        <IconButton
                          color="success"
                          onClick={() => window.open(`https://wa.me/${firm.mobileNo || ''}`, '_blank')}
                          sx={{
                            backgroundColor: Constants.primaryColor,
                            padding: '5px',
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '18px',
                          }}
                        >
                          <FaWhatsapp />
                        </IconButton>
                      </Tooltip>

                    </div>
                  </TableCell>


                  <TableCell>{firm.leadNo || '-'}</TableCell>
                  <TableCell>{firm.name || '-'}</TableCell>
                  <TableCell>{firm.mobileNo || '-'}</TableCell>
                  <TableCell>{firm.mailId || '-'}</TableCell>
                  <TableCell>{firm.nextFollowUp || '-'}</TableCell>
                  <TableCell>{firm.lastFollowUp || '-'}</TableCell>
                  <TableCell>{firm.status || '-'}</TableCell>
                  <TableCell>{firm.remark || '-'}</TableCell>
                  <TableCell>{firm.assignTo || '-'}</TableCell>
                  <TableCell>{firm.leadType || '-'}</TableCell>
                  <TableCell>{firm.sourceName || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Box>
      </TableContainer>
      <ToastContainer />
    </>
  );
};

export default PendingFollowuptable;
