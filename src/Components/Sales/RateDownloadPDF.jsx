import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const RateDownloadPdf = ({ projectData }) => {
  return (
    <div id="rate_pdf">
      <h6 className="text-black text-center mb-2">
        RATE APPROVAL FORM (FOR OFFICE USE ONLY)
      </h6>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                PROJECT NAME
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>From :</TableCell>
              <TableCell>{projectData?.from || ""}</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>Date :</TableCell>
              <TableCell>{projectData?.date || ""}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>NAME 1:</TableCell>
              <TableCell>{projectData?.name1 || ""}</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>DOB:</TableCell>
              <TableCell>{projectData?.dob || ""}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>AGE:</TableCell>
              <TableCell>{projectData?.age || ""}</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>PAN 1:</TableCell>
              <TableCell>{projectData?.pan1 || ""}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>OCCUPATION:</TableCell>
              <TableCell>{projectData?.occupation || ""}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RateDownloadPdf;
