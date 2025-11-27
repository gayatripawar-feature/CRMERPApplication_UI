
import React, { useState, useEffect } from 'react';
import {
  Input, Table, TableBody, TableCell, TableContainer, Typography, IconButton,
  TableHead, TableRow, Paper, Box, Tabs, Tab, Button, TextField, Grid,
  MenuItem, FormControl, Select, InputLabel, useMediaQuery, useTheme,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import FollowupHistoryTable from './FollowupHistoryTable';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';
import Lostleadstable from "./Lostleadstable";
import LostVisitTable from './LostVisitTable';
import BookingFormTable from './BookingFormTable';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaRegUser } from "react-icons/fa";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Constants from '../Constants';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const sections = [
  { label: "Booking Display", icon: <FaBuilding size={20} />, createLabel: "Create Firm" },
];
const tabNames = ["firm"];

const BookingForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [enquiries, setEnquiries] = useState([]);
  // Main state management
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("firm");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form data state
  const [formData, setFormData] = useState({
    enquiryNo: "",
    projectName: "",
    dateOfFlatBooking: "",
    nameOfAllottee: "",
    sourceName: "",
    dateOfBirth: "",
    occupation: "",
    panNo: "",
    aadharNo: "",
    mobileNo: "",
    alternateMobileNo: "",
    whatsAppNo: "",
    emailId: "",
    address: "",

    mobileEmail: "",
    carpetArea: "",
    wing: "",
    flatNo: "",
    type: "",
    soldRate: "",
    enclosedBalcony: "",
    openBalcony: "",
    terrace: "",
    parking: "",
    floor: "",
    totalConsideration: "",
    bookingAmount: "",
    stampDuty: "",
    registrationFee: "",
    gstAmount: "",
    paymentMode: "",
    chequeNo: "",
    chequeDate: "",
    bankName: "",
    bankDetails: ""
  });


  //  State variables for documents of main allottee
  const [allotteeDocuments, setAllotteeDocuments] = useState({
    panCard: [],
    aadhaarCard: [],
    marriageCertificate: [],
    passportPhoto: [],
    otherDocuments: []
  });

  //  State variables for documents of co-allottees
  const [coAllotteesDocuments, setCoAllotteesDocuments] = useState([
    {
      panCard: [],
      aadhaarCard: [],
      marriageCertificate: [],
      passportPhoto: [],
      otherDocuments: []
    }
  ]);

  // State for managing multiple co-allottees
  const [coAllottees, setCoAllottees] = useState([
    {
      name: "",
      dob: "",
      occupation: "",
      pan: "",
      aadhar: "",
      mobileEmail: ""
    }
  ]);


  // File states
  const [panCardFiles, setPanCardFiles] = useState([]);
  const [aadhaarCard, setAadhaarCard] = useState([]);
  const [marriageCertificate, setMarriageCertificate] = useState([]);
  const [passportPhoto, setPassportPhoto] = useState([]);
  const [otherDocuments, setOtherDocuments] = useState([]);

  // Error states
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Initialize filtered data
  useEffect(() => {
    setFilteredData(submittedData);
    setCurrentPage(0);
  }, [submittedData]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle date filter changes
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");

    setCurrentPage(0);
  };

  // Combined filtering effect
  // useEffect(() => {
  //   let filtered = submittedData;

  //   // Apply date filters
  //   if (fromDate || toDate) {
  //     filtered = filtered.filter(item => {
  //       const itemDate = item.dateOfFlatBooking ? new Date(item.dateOfFlatBooking) : null;
  //       if (!itemDate) return false;

  //       const from = fromDate ? new Date(fromDate) : null;
  //       const to = toDate ? new Date(toDate) : null;

  //       let valid = true;
  //       if (from) valid = valid && itemDate >= from;
  //       if (to) {
  //         const toDateEnd = new Date(to);
  //         toDateEnd.setHours(23, 59, 59, 999);
  //         valid = valid && itemDate <= toDateEnd;
  //       }
  //       return valid;
  //     });
  //   }

  //   // Apply search filter
  //   if (searchTerm.trim()) {
  //     const lowercasedTerm = searchTerm.toLowerCase();
  //     filtered = filtered.filter(item =>
  //       (item.enquiryNo && item.enquiryNo.toString().toLowerCase().includes(lowercasedTerm)) ||
  //       (item.nameOfAllottee && item.nameOfAllottee.toLowerCase().includes(lowercasedTerm)) ||
  //       (item.mobileNo && item.mobileNo.toString().toLowerCase().includes(lowercasedTerm))
  //     );
  //   }

  //   setFilteredData(filtered);
  //   setCurrentPage(0);
  // }, [fromDate, toDate, searchTerm, submittedData]);
  useEffect(() => {
    let filtered = submittedData;

    // Apply date filters first
    if (fromDate || toDate) {
      filtered = filtered.filter(item => {
        const itemDate = item.dateOfFlatBooking ? new Date(item.dateOfFlatBooking) : null;
        if (!itemDate) return false;

        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        let valid = true;
        if (from) valid = valid && itemDate >= from;
        if (to) {
          const toDateEnd = new Date(to);
          toDateEnd.setHours(23, 59, 59, 999);
          valid = valid && itemDate <= toDateEnd;
        }
        return valid;
      });
    }

    // Apply search filter on the date-filtered data
    if (searchTerm.trim()) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        (item.enquiryNo && item.enquiryNo.toString().toLowerCase().includes(lowercasedTerm)) ||
        (item.nameOfAllottee && item.nameOfAllottee.toLowerCase().includes(lowercasedTerm)) ||
        (item.mobileNo && item.mobileNo.toString().toLowerCase().includes(lowercasedTerm)) ||
        (item.emailId && item.emailId.toLowerCase().includes(lowercasedTerm)) ||
        (item.flatNo && item.flatNo.toString().toLowerCase().includes(lowercasedTerm))
      );
    }

    setFilteredData(filtered);
    setCurrentPage(0);
  }, [fromDate, toDate, searchTerm, submittedData]);

  // Pagination calculations
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startEntry = totalEntries === 0 ? 0 : currentPage * rowsPerPage + 1;
  const endEntry = Math.min((currentPage + 1) * rowsPerPage, totalEntries);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const handleToggleSection = (index) => {
    setExpandedSection(index);
    setShowFirmForm(false);
  };


  //  Handlers for co-allottees
  // const handleAddCoAllottee = () => {
  //   setCoAllottees([
  //     ...coAllottees,
  //     {
  //       name: "",
  //       dob: "",
  //       occupation: "",
  //       pan: "",
  //       aadhar: "",
  //       mobileEmail: ""
  //     }
  //   ]);
  // };
  const handleAddCoAllottee = () => {
    setCoAllottees([
      ...coAllottees,
      {
        name: "",
        dob: "",
        occupation: "",
        pan: "",
        aadhar: "",
        mobileEmail: ""
      }
    ]);

    setCoAllotteesDocuments([
      ...coAllotteesDocuments,
      {
        panCard: [],
        aadhaarCard: [],
        marriageCertificate: [],
        passportPhoto: [],
        otherDocuments: []
      }
    ]);
  };


  // Handler for  main allottee documents
  const handleAllotteeDocumentChange = (documentType, files) => {
    setAllotteeDocuments(prev => ({
      ...prev,
      [documentType]: [...prev[documentType], ...files]
    }));
  };

  // Handler for  co-allottee documents
  const handleCoAllotteeDocumentChange = (index, documentType, files) => {
    const updatedCoAllotteesDocuments = [...coAllotteesDocuments];
    updatedCoAllotteesDocuments[index] = {
      ...updatedCoAllotteesDocuments[index],
      [documentType]: [...updatedCoAllotteesDocuments[index][documentType], ...files]
    };
    setCoAllotteesDocuments(updatedCoAllotteesDocuments);
  };


  // const handleRemoveCoAllottee = (index) => {
  //   if (coAllottees.length > 1) {
  //     setCoAllottees(coAllottees.filter((_, i) => i !== index));
  //   }
  // };
  const handleRemoveCoAllottee = (index) => {
    if (coAllottees.length > 1) {
      setCoAllottees(coAllottees.filter((_, i) => i !== index));
      setCoAllotteesDocuments(coAllotteesDocuments.filter((_, i) => i !== index));
    }
  };

  const handleCoAllotteeChange = (index, field, value) => {
    const updatedCoAllottees = [...coAllottees];
    updatedCoAllottees[index][field] = value;
    setCoAllottees(updatedCoAllottees);

    // Clear error when user starts typing
    if (errors[`coAllottee${field}${index}`]) {
      setErrors(prev => ({
        ...prev,
        [`coAllottee${field}${index}`]: ""
      }));
    }

    // Validation for specific fields
    if (field === "aadhar" && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        [`coAllotteeAadhar${index}`]: "Aadhar number cannot exceed 12 digits."
      }));
    }
  };


  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // Validation for specific fields
    if (field === "nameOfAllottee" && /[^a-zA-Z\s]/.test(value)) {
      setErrors(prev => ({
        ...prev,
        nameOfAllottee: "Name should only contain letters and spaces."
      }));
    }

    if (field === "mobileNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        mobileNo: "Mobile number cannot exceed 10 digits."
      }));
    }

    if (field === "alternateMobileNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        alternateMobileNo: "Alternate mobile number cannot exceed 10 digits."
      }));
    }

    if (field === "whatsAppNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        whatsAppNo: "WhatsApp number cannot exceed 10 digits."
      }));
    }

    if (field === "aadharNo" && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        aadharNo: "Aadhar number cannot exceed 12 digits."
      }));
    }

    if (field === "coAllotteeAadhar" && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        coAllotteeAadhar: "Co-allottee Aadhar number cannot exceed 12 digits."
      }));
    }

    if (field === "panNo") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (value.length === 10 && !panRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          panNo: "Invalid PAN format. Format should be: AAAAA1234A"
        }));
      }
    }
  };

  // Handle select changes
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // File handlers
  const handlePanCardChange = (e) => {
    const files = Array.from(e.target.files);
    setPanCardFiles(prev => [...prev, ...files]);
  };

  const handleAadhaarCardChange = (e) => {
    const files = Array.from(e.target.files);
    setAadhaarCard(prev => [...prev, ...files]);
  };

  const handleMarriageCertificateChange = (e) => {
    const files = Array.from(e.target.files);
    setMarriageCertificate(prev => [...prev, ...files]);
  };

  const handlePassportPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPassportPhoto(prev => [...prev, ...files]);
  };

  const handleOtherDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    setOtherDocuments(prev => [...prev, ...files]);
  };

  // Validate form
  // const validateForm = () => {
  //   const newErrors = {};
  // // Required field validations
  //   if (!formData.enquiryNo.trim()) newErrors.enquiryNo = "Enquiry number is required";
  //   if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
  //   if (!formData.nameOfAllottee.trim()) newErrors.nameOfAllottee = "Name of allottee is required";
  //   if (!formData.mobileNo.trim()) newErrors.mobileNo = "Mobile number is required";
  //   if (!formData.dateOfFlatBooking) newErrors.dateOfFlatBooking = "Date of flat booking is required";
  //  setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Helper: safely trim any value
  const safeTrim = (value) => (value ?? "").toString().trim();

  const validateForm = () => {
    const newErrors = {};

    // Required field validations using safeTrim
    if (safeTrim(formData.enquiryNo) === "")
      newErrors.enquiryNo = "Enquiry number is required";

    if (safeTrim(formData.projectName) === "")
      newErrors.projectName = "Project name is required";

    if (safeTrim(formData.nameOfAllottee) === "")
      newErrors.nameOfAllottee = "Name of allottee is required";

    if (safeTrim(formData.mobileNo) === "")
      newErrors.mobileNo = "Mobile number is required";

    if (!formData.dateOfFlatBooking)
      newErrors.dateOfFlatBooking = "Date of flat booking is required";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const resetForm = () => {
    setFormData({
      enquiryNo: "",
      projectName: "",
      dateOfFlatBooking: "",
      nameOfAllottee: "",
      sourceName: "",
      dateOfBirth: "",
      occupation: "",
      panNo: "",
      aadharNo: "",
      mobileNo: "",
      alternateMobileNo: "",
      whatsAppNo: "",
      emailId: "",
      address: "",
      carpetArea: "",
      wing: "",
      flatNo: "",
      type: "",
      soldRate: "",
      enclosedBalcony: "",
      openBalcony: "",
      terrace: "",
      parking: "",
      floor: "",
      totalConsideration: "",
      bookingAmount: "",
      stampDuty: "",
      registrationFee: "",
      gstAmount: "",
      paymentMode: "",
      chequeNo: "",
      chequeDate: "",
      bankName: "",
      bankDetails: ""
    });

    setCoAllottees([{
      name: "",
      dob: "",
      occupation: "",
      pan: "",
      aadhar: "",
      mobileEmail: ""
    }]);

    setAllotteeDocuments({
      panCard: [],
      aadhaarCard: [],
      marriageCertificate: [],
      passportPhoto: [],
      otherDocuments: []
    });

    setCoAllotteesDocuments([{
      panCard: [],
      aadhaarCard: [],
      marriageCertificate: [],
      passportPhoto: [],
      otherDocuments: []
    }]);

    setErrors({});
  };





  // const handleSubmit = () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill all required fields!", { position: "top-right" });
  //     return;
  //   }

  //   const newRecord = {
  //     id: Date.now(),
  //     timestamp: new Date().toLocaleString(),
  //     enquiryNo: formData.enquiryNo,
  //     projectName: formData.projectName,
  //     dateOfFlatBooking: formData.dateOfFlatBooking,
  //     nameOfAllottee: formData.nameOfAllottee,
  //     sourceName: formData.sourceName,
  //     dateOfBirth: formData.dateOfBirth,
  //     occupation: formData.occupation,
  //     panNo: formData.panNo,
  //     aadharNo: formData.aadharNo,
  //     mobileNo: formData.mobileNo,
  //     alternateMobileNo: formData.alternateMobileNo,
  //     whatsappNo: formData.whatsAppNo,
  //     emailId: formData.emailId,
  //     address: formData.address,
  //     // Multiple co-allottees
  //     coAllottees: coAllottees,
  //     flatNo: formData.flatNo,
  //     type: formData.type,
  //     wing: formData.wing,
  //     soldRate: formData.soldRate,
  //     carpetAreaSqMtr: formData.carpetArea,
  //     enclosedBalconySqMtr: formData.enclosedBalcony,
  //     openBalconySqMtr: formData.openBalcony,
  //     terraceSqMtr: formData.terrace,
  //     parking: formData.parking,
  //     floor: formData.floor,
  //     totalConsideration: formData.totalConsideration,
  //     bookingAmount: formData.bookingAmount,
  //     stampDuty: formData.stampDuty,
  //     registrationFee: formData.registrationFee,
  //     gstAmount: formData.gstAmount,
  //     paymentMode: formData.paymentMode,
  //     chequeTrnNo: formData.chequeNo,
  //     chequeTrnDate: formData.chequeDate,
  //     bankName: formData.bankName,
  //     bankDetails: formData.bankDetails,
  //     // File references
  //     panCardBoth: panCardFiles.map(file => file.name).join(', '),
  //     aadharCardBoth: aadhaarCard.map(file => file.name).join(', '),
  //     marriageCertificate: marriageCertificate.map(file => file.name).join(', '),
  //     passportSizePhotoBoth: passportPhoto.map(file => file.name).join(', '),
  //     anyOther: otherDocuments.map(file => file.name).join(', ')
  //   };

  //   setSubmittedData(prev => [...prev, newRecord]);

  //   toast.success("Booking details submitted successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   resetForm();
  //   setShowFirmForm(false);
  // };

  // const handleSubmit = () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill all required fields!", { position: "top-right" });
  //     return;
  //   }

  //   const newRecord = {
  //     id: Date.now(),
  //     timestamp: new Date().toLocaleString(),
  //     enquiryNo: formData.enquiryNo,
  //     projectName: formData.projectName,
  //     dateOfFlatBooking: formData.dateOfFlatBooking,
  //     nameOfAllottee: formData.nameOfAllottee,
  //     sourceName: formData.sourceName,
  //     dateOfBirth: formData.dateOfBirth,
  //     occupation: formData.occupation,
  //     panNo: formData.panNo,
  //     aadharNo: formData.aadharNo,
  //     mobileNo: formData.mobileNo,
  //     alternateMobileNo: formData.alternateMobileNo,
  //     whatsappNo: formData.whatsAppNo,
  //     emailId: formData.emailId,
  //     address: formData.address,

  //     // Allottee documents
  //     allotteePanCard: allotteeDocuments.panCard.map(file => file.name).join(', '),
  //     allotteeAadhaarCard: allotteeDocuments.aadhaarCard.map(file => file.name).join(', '),
  //     allotteeMarriageCertificate: allotteeDocuments.marriageCertificate.map(file => file.name).join(', '),
  //     allotteePassportPhoto: allotteeDocuments.passportPhoto.map(file => file.name).join(', '),
  //     allotteeOtherDocuments: allotteeDocuments.otherDocuments.map(file => file.name).join(', '),

  //     // Co-allottees with their documents
  //     coAllottees: coAllottees.map((coAllottee, index) => ({
  //       ...coAllottee,
  //       panCard: coAllotteesDocuments[index]?.panCard.map(file => file.name).join(', ') || '',
  //       aadhaarCard: coAllotteesDocuments[index]?.aadhaarCard.map(file => file.name).join(', ') || '',
  //       marriageCertificate: coAllotteesDocuments[index]?.marriageCertificate.map(file => file.name).join(', ') || '',
  //       passportPhoto: coAllotteesDocuments[index]?.passportPhoto.map(file => file.name).join(', ') || '',
  //       otherDocuments: coAllotteesDocuments[index]?.otherDocuments.map(file => file.name).join(', ') || ''
  //     })),

  //     flatNo: formData.flatNo,
  //     type: formData.type,
  //     wing: formData.wing,
  //     soldRate: formData.soldRate,
  //     carpetAreaSqMtr: formData.carpetArea,
  //     enclosedBalconySqMtr: formData.enclosedBalcony,
  //     openBalconySqMtr: formData.openBalcony,
  //     terraceSqMtr: formData.terrace,
  //     parking: formData.parking,
  //     floor: formData.floor,
  //     totalConsideration: formData.totalConsideration,
  //     bookingAmount: formData.bookingAmount,
  //     stampDuty: formData.stampDuty,
  //     registrationFee: formData.registrationFee,
  //     gstAmount: formData.gstAmount,
  //     paymentMode: formData.paymentMode,
  //     chequeTrnNo: formData.chequeNo,
  //     chequeTrnDate: formData.chequeDate,
  //     bankName: formData.bankName,
  //     bankDetails: formData.bankDetails
  //   };

  //   setSubmittedData(prev => [...prev, newRecord]);

  //   toast.success("Booking details submitted successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   resetForm();
  //   setShowFirmForm(false);
  // };
  // const handleSubmit = () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill all required fields!", { position: "top-right" });
  //     return;
  //   }

  //   const newRecord = {
  //     id: Date.now(),
  //     timestamp: new Date().toLocaleString(),
  //     enquiryNo: formData.enquiryNo,
  //     projectName: formData.projectName,
  //     dateOfFlatBooking: formData.dateOfFlatBooking,
  //     nameOfAllottee: formData.nameOfAllottee,
  //     sourceName: formData.sourceName,
  //     dateOfBirth: formData.dateOfBirth,
  //     occupation: formData.occupation,
  //     panNo: formData.panNo,
  //     aadharNo: formData.aadharNo,
  //     mobileNo: formData.mobileNo,
  //     alternateMobileNo: formData.alternateMobileNo,
  //     whatsappNo: formData.whatsAppNo,
  //     emailId: formData.emailId,
  //     address: formData.address,

  //     // Allottee documents with file objects for preview
  //     allotteePanCard: allotteeDocuments.panCard,
  //     allotteeAadhaarCard: allotteeDocuments.aadhaarCard,
  //     allotteeMarriageCertificate: allotteeDocuments.marriageCertificate,
  //     allotteePassportPhoto: allotteeDocuments.passportPhoto,
  //     allotteeOtherDocuments: allotteeDocuments.otherDocuments,

  //     // Co-allottees with their documents
  //     coAllottees: coAllottees.map((coAllottee, index) => ({
  //       ...coAllottee,
  //       panCard: coAllotteesDocuments[index]?.panCard || [],
  //       aadhaarCard: coAllotteesDocuments[index]?.aadhaarCard || [],
  //       marriageCertificate: coAllotteesDocuments[index]?.marriageCertificate || [],
  //       passportPhoto: coAllotteesDocuments[index]?.passportPhoto || [],
  //       otherDocuments: coAllotteesDocuments[index]?.otherDocuments || []
  //     })),

  //     flatNo: formData.flatNo,
  //     type: formData.type,
  //     wing: formData.wing,
  //     soldRate: formData.soldRate,
  //     carpetAreaSqMtr: formData.carpetArea,
  //     enclosedBalconySqMtr: formData.enclosedBalcony,
  //     openBalconySqMtr: formData.openBalcony,
  //     terraceSqMtr: formData.terrace,
  //     parking: formData.parking,
  //     floor: formData.floor,
  //     totalConsideration: formData.totalConsideration,
  //     bookingAmount: formData.bookingAmount,
  //     stampDuty: formData.stampDuty,
  //     registrationFee: formData.registrationFee,
  //     gstAmount: formData.gstAmount,
  //     paymentMode: formData.paymentMode,
  //     chequeTrnNo: formData.chequeNo,
  //     chequeTrnDate: formData.chequeDate,
  //     bankName: formData.bankName,
  //     bankDetails: formData.bankDetails
  //   };

  //   setSubmittedData(prev => [...prev, newRecord]);

  //   toast.success("Booking details submitted successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   resetForm();
  //   setShowFirmForm(false);
  // };
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields!", { position: "top-right" });
      return;
    }

    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      enquiryNo: formData.enquiryNo,
      projectName: formData.projectName,
      dateOfFlatBooking: formData.dateOfFlatBooking,
      nameOfAllottee: formData.nameOfAllottee,
      sourceName: formData.sourceName,
      dateOfBirth: formData.dateOfBirth,
      occupation: formData.occupation,
      panNo: formData.panNo,
      aadharNo: formData.aadharNo,
      mobileNo: formData.mobileNo,
      alternateMobileNo: formData.alternateMobileNo,
      whatsappNo: formData.whatsAppNo,
      emailId: formData.emailId,
      address: formData.address,

      // Allottee documents - store File objects directly
      allotteePanCard: [...allotteeDocuments.panCard],
      allotteeAadhaarCard: [...allotteeDocuments.aadhaarCard],
      allotteeMarriageCertificate: [...allotteeDocuments.marriageCertificate],
      allotteePassportPhoto: [...allotteeDocuments.passportPhoto],
      allotteeOtherDocuments: [...allotteeDocuments.otherDocuments],

      // Co-allottees with their documents
      coAllottees: coAllottees.map((coAllottee, index) => ({
        ...coAllottee,
        panCard: [...(coAllotteesDocuments[index]?.panCard || [])],
        aadhaarCard: [...(coAllotteesDocuments[index]?.aadhaarCard || [])],
        marriageCertificate: [...(coAllotteesDocuments[index]?.marriageCertificate || [])],
        passportPhoto: [...(coAllotteesDocuments[index]?.passportPhoto || [])],
        otherDocuments: [...(coAllotteesDocuments[index]?.otherDocuments || [])]
      })),

      flatNo: formData.flatNo,
      type: formData.type,
      wing: formData.wing,
      soldRate: formData.soldRate,
      carpetAreaSqMtr: formData.carpetArea,
      enclosedBalconySqMtr: formData.enclosedBalcony,
      openBalconySqMtr: formData.openBalcony,
      terraceSqMtr: formData.terrace,
      parking: formData.parking,
      floor: formData.floor,
      totalConsideration: formData.totalConsideration,
      bookingAmount: formData.bookingAmount,
      stampDuty: formData.stampDuty,
      registrationFee: formData.registrationFee,
      gstAmount: formData.gstAmount,
      paymentMode: formData.paymentMode,
      chequeTrnNo: formData.chequeNo,
      chequeTrnDate: formData.chequeDate,
      bankName: formData.bankName,
      bankDetails: formData.bankDetails
    };

    setSubmittedData(prev => [...prev, newRecord]);

    toast.success("Booking details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    resetForm();
    setShowFirmForm(false);
  };


  const handleUpdateData = (updatedItem) => {
    setSubmittedData(prev =>
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
  };

  // PDF download functionality
  const handleDownloadPDFBooking = () => {
    const dataToDownload = filteredData.length > 0 ? filteredData : submittedData;

    if (dataToDownload.length === 0) {
      toast.info("No data available to download", { position: "top-right" });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);

    let headerText = "Booking Details Report";
    if (fromDate || toDate || searchTerm) {
      headerText += " (Filtered Data)";
    }
    doc.text(headerText, 14, 15);

    let filterDetails = "";
    if (fromDate || toDate) {
      filterDetails += `Date Range: ${fromDate || "Any"} to ${toDate || "Any"}`;
    }
    if (searchTerm) {
      filterDetails += `${filterDetails ? " | " : ""}Search: "${searchTerm}"`;
    }

    if (filterDetails) {
      doc.setFontSize(10);
      doc.text(filterDetails, 14, 25);
    }

    const tableColumn = [
      "S.NO.", "ENQUIRY NO", "PROJECT NAME", "DATE OF BOOKING", "NAME",
      "MOBILE NO", "EMAIL", "FLAT NO", "TYPE", "BOOKING AMOUNT"
    ];

    const tableRows = dataToDownload.map((row, index) => [
      index + 1,
      row.enquiryNo || "-",
      row.projectName || "-",
      row.dateOfFlatBooking ? new Date(row.dateOfFlatBooking).toLocaleDateString() : "-",
      row.nameOfAllottee || "-",
      row.mobileNo || "-",
      row.emailId || "-",
      row.flatNo || "-",
      row.type || "-",
      row.bookingAmount || "-"
    ]);

    autoTable(doc, {
      startY: filterDetails ? 35 : 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    let filename = "Booking_Details_Report";
    if (fromDate || toDate || searchTerm) {
      filename += "_Filtered";
    }
    doc.save(`${filename}.pdf`);

    let successMessage = "PDF downloaded successfully";
    if (fromDate || toDate || searchTerm) {
      successMessage += " with applied filters";
    }
    toast.success(successMessage, { position: "top-right", autoClose: 3000 });
  };

  const dummyData = [
    {
      action: "Edit",
      lastFollowUp: "",
      status: "",
      remark: "",
      nextFollowUp: "",
      assignTo: "",
      enquiryNo: "",
      leadNo: "",
      name: "",
      salesExe: "",
      mobile: "",
      whatsapp: "",
      alternateContact: "",
      email: "",
      address: "",
      occupation: "",
      company: "",
      interested: "",
      budget: "",
      reason: "",
      reference: "",
      nameOfCP: "",
      planningToBuy: "",
      followupDetails: "",
    },
  ];


  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch("https://localhost:5289/sales/api/enquiries", {
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) throw new Error("Failed to fetch enquiries");

        const data = await response.json();

        // API gives pagedRecords array
        const enquiryList = Array.isArray(data.pagedRecords) ? data.pagedRecords : [];

        setEnquiries(enquiryList);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleEnquirySelect = (enquiryId) => {
    const selected = enquiries.find(e => e.id === enquiryId);

    setFormData((prev) => ({
      ...prev,
      enquiryNo: enquiryId,
      nameOfAllottee: selected?.name || "",
      mobileNo: selected?.phone || "",
      alternateMobileNo: selected?.alternateNo || "",
      whatsAppNo: selected?.whatsapp || "",
      emailId: selected?.email || "",
      address: selected?.address || "",
      dateOfBirth: selected?.dateOfBirth || "",
      occupation: selected?.occupation || "",
      panNo: selected?.panNo || "",
      aadharNo: selected?.aadharNo || ""
    }));
  };


  return (
    <div className="main-content" style={{ padding: isMobile ? "10px" : "20px" }}>
      <h6 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "15px" }}>
        Sales Module / Booking Management
      </h6>

      {/* Section Header with Download PDF Button */}
      <div
        className="d-flex align-items-center justify-content-between mb-3"
        style={{
          flexWrap: isMobile ? "wrap" : "nowrap",
          gap: isMobile ? "10px" : "15px",
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            flex: isMobile ? "0 0 100%" : 1,
            marginBottom: isMobile ? "10px" : "0"
          }}
        >
          {sections.map((section, index) => (
            <Button
              key={index}
              onClick={() => handleToggleSection(index)}
              variant="outlined"
              color="success"
              className="my-3"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: Constants.primaryColor,
                padding: isMobile ? "6px 12px" : "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
                minWidth: isMobile ? "40px" : "50px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: isMobile ? "12px" : "14px",
                justifyContent: "flex-start",
                textTransform: "none",
                boxShadow:
                  "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
                width:
                  expandedSection === index
                    ? isMobile
                      ? "160px"
                      : isTablet
                        ? "180px"
                        : "200px"
                    : isMobile
                      ? "40px"
                      : "50px",
                height: isMobile ? "40px" : "auto",
              }}
              startIcon={<FaEye size={isMobile ? 18 : 24} color="white" />}
            >
              {expandedSection === index && (
                <span
                  style={{
                    color: "white",
                    fontSize: isMobile ? "12px" : "16px",
                    marginLeft: isMobile ? "4px" : "8px",
                  }}
                >
                  {section.label}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Download PDF Button */}
        <Button
          variant="contained"
          sx={{
            background: Constants.primaryColor,
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            padding: isMobile ? "8px 16px" : "8px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: isMobile ? "100%" : "auto",
            minWidth: isMobile ? "100%" : "auto",
            marginLeft: isMobile ? "0" : "auto",
          }}
          onClick={handleDownloadPDFBooking}
          size={isMobile ? "small" : "medium"}
        >
          <FaFileDownload size={isMobile ? 16 : 18} />
          {isMobile ? "Download PDF" : "Download PDF"}
        </Button>
      </div>

      {expandedSection === 0 && selectedTab === "firm" && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div
                className={`d-flex ${isMobile ? "flex-column" : "flex-row"
                  } gap-2 w-100 align-items-${isMobile ? "stretch" : "center"}`}
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={`d-flex ${isMobile ? "flex-column" : "flex-row"
                    } gap-2 align-items-center`}
                  style={{ width: isMobile ? "100%" : "auto", flexWrap: "wrap" }}
                >
                  {/* New Booking Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: Constants.primaryColor,
                      width: isMobile ? "100%" : "auto",
                    }}
                    className="fw-bold"
                    onClick={() => setShowFirmForm(true)}
                    size={isMobile ? "small" : "medium"}
                  >
                    + New Booking
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      flexDirection: isMobile ? "column" : "row",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <TextField
                      label="From"
                      type="date"
                      size="small"
                      value={fromDate}
                      onChange={handleFromDateChange}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: isMobile ? "100%" : 150,
                        border: Constants.formInputBorderColor,
                      }}
                    />
                    <TextField
                      label="To"
                      type="date"
                      size="small"
                      value={toDate}
                      onChange={handleToDateChange}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: isMobile ? "100%" : 150,
                        border: Constants.formInputBorderColor,
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        background: Constants.primaryColor,
                        width: isMobile ? "100%" : "auto",
                      }}
                      className="fw-bold"
                      onClick={handleClearFilters}
                      size={isMobile ? "small" : "medium"}
                    >
                      Clear
                    </Button>
                  </Box>
                </div>

                {/* Search and Pagination Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "flex-start" : "flex-end",
                    width: isMobile ? "100%" : "auto",
                    marginTop: isMobile ? "10px" : "0",
                  }}
                >
                  <TextField
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: isMobile ? "100%" : "180px",
                      "& .MuiInputBase-root": {
                        padding: "0px 8px",
                      },
                      border: Constants.formInputBorderColor,
                    }}
                  />

                  {/* Pagination Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      color: "#800000",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>Rows per page:</span>

                    <select
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      style={{
                        border: "1px solid #800000",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        outline: "none",
                        color: "#800000",
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>

                    <span>
                      {totalEntries === 0 ? "0–0" : `${startEntry}–${endEntry}`}{" "}
                      of {totalEntries}
                      {searchTerm && ` (filtered from ${submittedData.length})`} entries
                    </span>

                    {/* Navigation arrows */}
                    <button
                      onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: currentPage === 0 ? "not-allowed" : "pointer",
                        color: currentPage === 0 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage >= totalPages - 1}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
                        color: currentPage >= totalPages - 1 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3" style={{ overflowX: "auto", width: "100%" }}>

                <BookingFormTable
                  data={paginatedData.length > 0 ? paginatedData : submittedData}
                  onUpdate={handleUpdateData}
                />
              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => {
                setShowFirmForm(false);
                resetForm();
              }}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
              sx={{
                '& .MuiDialog-paper': {
                  maxHeight: '90vh',
                  overflow: 'auto'
                }
              }}
            >
              <DialogTitle>New Booking Form</DialogTitle>


              <DialogContent  >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {/* Section 1: Personal Information */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 2, color: Constants.primaryColor }}>
                    Section 1: Personal Information
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    <Grid item xs={12} sm={6}>

                      <FormControl fullWidth size="small" sx={{ mb: 2, border: Constants.formInputBorderColor }}>
                        <InputLabel required>Enquiry No</InputLabel>
                        <Select
                          value={formData.enquiryNo}
                          label="Enquiry No"
                          onChange={(e) => handleEnquirySelect(e.target.value)}
                        >
                          {enquiries.map((enq) => (
                            <MenuItem key={enq.id} value={enq.id}>
                              {enq.id} — {enq.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor }}>
                        <InputLabel id="project-name-label" required>Project Name</InputLabel>
                        <Select
                          labelId="project-name-label"
                          value={formData.projectName}
                          onChange={(e) => handleSelectChange("projectName", e.target.value)}
                          label="Project Name"
                          error={!!errors.projectName}
                          sx={{ '& .MuiSelect-icon': { color: Constants.primaryColor } }}

                        >
                          <MenuItem value="Project A">Project A</MenuItem>
                          <MenuItem value="Project B">Project B</MenuItem>
                          <MenuItem value="Project C">Project C</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        label="Date Of Flat Booking"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        required
                        value={formData.dateOfFlatBooking}
                        onChange={(e) =>
                          handleInputChange("dateOfFlatBooking", e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dateOfFlatBooking}
                        helperText={errors.dateOfFlatBooking}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>



                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name Of Allottee"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.nameOfAllottee}
                        onChange={(e) => handleInputChange("nameOfAllottee", e.target.value)}
                        error={!!errors.nameOfAllottee}
                        helperText={errors.nameOfAllottee}
                        required
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="datetime-local"
                        label="Source Name"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.sourceName}
                        onChange={(e) => handleInputChange("sourceName", e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        label="Date Of Birth"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                        error={!!errors?.dateOfBirth}
                        helperText={errors?.dateOfBirth}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor, }}>
                        <InputLabel id="occupation-label" required>Occupation</InputLabel>
                        <Select
                          labelId="occupation-label"
                          value={formData.occupation}
                          onChange={(e) => handleSelectChange("occupation", e.target.value)}
                          label="Occupation"
                        
                        >
                          <MenuItem value="Business">Business</MenuItem>
                          <MenuItem value="Service">Service</MenuItem>
                          <MenuItem value="Professional">Professional</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="PAN No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.panNo}
                        onChange={(e) => handleInputChange("panNo", e.target.value.toUpperCase())}
                        error={!!errors.panNo}
                        helperText={errors.panNo}
                        inputProps={{ maxLength: 10 }}
                        sx={{ border: Constants.formInputBorderColor }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="AADHAR No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.aadharNo}
                        onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                        error={!!errors.aadharNo}
                        helperText={errors.aadharNo}
                        inputProps={{ maxLength: 12 }}
                        sx={{ border: Constants.formInputBorderColor, }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile No"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                        required
                        inputProps={{ maxLength: 10 }}
                        sx={{ border: Constants.formInputBorderColor, }}
                       
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Alternate Mobile No"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.alternateMobileNo}
                        onChange={(e) => handleInputChange("alternateMobileNo", e.target.value)}
                        error={!!errors.alternateMobileNo}
                        helperText={errors.alternateMobileNo}
                        inputProps={{ maxLength: 10 }}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="WhatsApp No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.whatsAppNo}
                        onChange={(e) => handleInputChange("whatsAppNo", e.target.value)}
                        error={!!errors.whatsAppNo}
                        helperText={errors.whatsAppNo}
                        inputProps={{ maxLength: 10 }}
                        sx={{ border: Constants.formInputBorderColor, }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email ID"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.emailId}
                        onChange={(e) => handleInputChange("emailId", e.target.value)}
                        type="email"
                        sx={{ border: Constants.formInputBorderColor, }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Address"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        multiline
                        sx={{ border: Constants.formInputBorderColor, }}
                        required
                      />
                    </Grid>

                    {/* Documents for Main Allottee */}

                    {[
                      { type: "panCard", label: "PAN Card" },
                      { type: "aadhaarCard", label: "AADHAR Card" },
                      { type: "marriageCertificate", label: "MARRIAGE CERTIFICATE (If Available)" },
                      { type: "passportPhoto", label: "PASSPORT SIZE PHOTO" },
                      { type: "otherDocuments", label: "Any Other" }
                    ].map((doc, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="body2" gutterBottom>{doc.label}</Typography>
                        <Button
                          variant="outlined"
                          component="label"
                          size={isMobile ? "small" : "medium"}
                          fullWidth
                          startIcon={<FaUpload />}
                          sx={{ background: Constants.primaryColor, color: "white" }}
                        >
                          Choose Files
                          <input
                            type="file"
                            multiple
                            hidden
                            onChange={(e) => handleAllotteeDocumentChange(doc.type, Array.from(e.target.files))}
                          />
                        </Button>
                        {allotteeDocuments[doc.type].length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            {allotteeDocuments[doc.type].map((file, fileIndex) => (
                              <Typography key={fileIndex} variant="body2" sx={{ fontSize: '0.75rem' }}>
                                {file.name}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Grid>
                    ))}


                  </Grid>

                  {/* Section 2: Co-Allottees with Documents */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 2: Co-Allottees
                  </Typography>

                  {coAllottees.map((coAllottee, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: Constants.primaryColor }}>
                          Co-Allottee {index + 1}
                        </Typography>
                        {coAllottees.length > 1 && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleRemoveCoAllottee(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </Box>

                      <Grid container spacing={isMobile ? 1 : 2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Name of Co-Allottee"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.name}
                            onChange={(e) => handleCoAllotteeChange(index, "name", e.target.value)}
                            sx={{ border: Constants.formInputBorderColor, }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            type="date"
                            label="Date Of Birth (Co-Allottee)"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.dob}
                            onChange={(e) => handleCoAllotteeChange(index, "dob", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ border: Constants.formInputBorderColor, }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Occupation (Co-Allottee)"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.occupation}
                            onChange={(e) => handleCoAllotteeChange(index, "occupation", e.target.value)}
                            sx={{ border: Constants.formInputBorderColor, }}
                            
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="PAN No. (Co-Allottee)"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.pan}
                            onChange={(e) => handleCoAllotteeChange(index, "pan", e.target.value.toUpperCase())}
                            inputProps={{ maxLength: 10 }}
                            sx={{ border: Constants.formInputBorderColor, }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="AADHAR No. (Co-Allottee)"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.aadhar}
                            onChange={(e) => handleCoAllotteeChange(index, "aadhar", e.target.value)}
                            error={!!errors[`coAllotteeAadhar${index}`]}
                            helperText={errors[`coAllotteeAadhar${index}`]}
                            inputProps={{ maxLength: 12 }}
                            sx={{ border: Constants.formInputBorderColor, }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="MOBILE No. & EMAIL (Co-Allottee)"
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={coAllottee.mobileEmail}
                            onChange={(e) => handleCoAllotteeChange(index, "mobileEmail", e.target.value)}
                            sx={{ border: Constants.formInputBorderColor, }}
                          />
                        </Grid>

                        {/* Documents for each Co-Allottee */}
                        {[
                          { type: "panCard", label: "PAN Card" },
                          { type: "aadhaarCard", label: "AADHAR Card" },
                          { type: "marriageCertificate", label: "MARRIAGE CERTIFICATE (If Available)" },
                          { type: "passportPhoto", label: "PASSPORT SIZE PHOTO" },
                          { type: "otherDocuments", label: "Any Other" }
                        ].map((doc, docIndex) => (
                          <Grid item xs={12} sm={6} key={docIndex}>
                            <Typography variant="body2" gutterBottom>{doc.label} (Co-Allottee {index + 1})</Typography>
                            <Button
                              variant="outlined"
                              component="label"
                              size={isMobile ? "small" : "medium"}
                              fullWidth
                              startIcon={<FaUpload />}
                              sx={{ background: Constants.primaryColor, color: "white" }}
                            >
                              Choose Files
                              <input
                                type="file"
                                multiple
                                hidden
                                onChange={(e) => handleCoAllotteeDocumentChange(index, doc.type, Array.from(e.target.files))}
                              />
                            </Button>
                            {coAllotteesDocuments[index]?.[doc.type]?.length > 0 && (
                              <Box sx={{ mt: 1 }}>
                                {coAllotteesDocuments[index][doc.type].map((file, fileIndex) => (
                                  <Typography key={fileIndex} variant="body2" sx={{ fontSize: '0.75rem' }}>
                                    {file.name}
                                  </Typography>
                                ))}
                              </Box>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleAddCoAllottee}
                      startIcon={<FaPlus />}
                      sx={{ borderColor: Constants.primaryColor, color: Constants.primaryColor }}
                    >
                      Add Another Co-Allottee
                    </Button>
                  </Box>



                  {/* Section 3: Particulars of Flat */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 3: Particulars of Flat
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                      { field: "carpetArea", label: "Carpet Area in (Sq.foot)", type: "select", options: ["100", "150", "200", "250"] },
                      { field: "wing", label: "Wing", type: "select", options: ["A", "B", "C"] },
                      { field: "flatNo", label: "FLAT No.", type: "select", options: ["101", "102", "103"] },
                      { field: "type", label: "Type", type: "select", options: ["2BHK", "3BHK", "4BHK"] },
                      { field: "soldRate", label: "Sold Rate", type: "number" },
                      { field: "enclosedBalcony", label: "Enclosed Balcony in (Sq. foot)", type: "select", options: ["10", "15", "20"] },
                      { field: "openBalcony", label: "Open Balcony in (Sq. foot)", type: "select", options: ["5", "10", "15"] },
                      { field: "terrace", label: "Terrace in (Sq.foot)", type: "select", options: ["30", "40", "50"] },
                     
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        {item.type === "select" ? (
                          <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} 
                          sx={{ border: Constants.formInputBorderColor, }} required>
                            <InputLabel>{item.label}</InputLabel>
                            <Select
                              value={formData[item.field]}
                              onChange={(e) => handleSelectChange(item.field, e.target.value)}
                              label={item.label}
                            >
                              {item.options.map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                            label={item.label}
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={formData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            type={item.type}
                            sx={{ border: Constants.formInputBorderColor, }}
                            required
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>Section 4 : Parking Details</Typography>




                  <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                      { field: "parking", label: "Parking", type: "select", options: ["Stack Parking", "Open car parking", "Covered car parking", "Basement car parking", "Other"] },
                      { field: "floor", label: "Floor", type: "select", options: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"] },
                      { field: "parkingNo", label: "Parking No", type: "text" },
                    ].map((item, index) => (<Grid item xs={12} sm={6} key={index}>
                      {item.type === "select" ? (
                        <TextField
                          select
                          label={item.label}
                          fullWidth
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData[item.field] || ""}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          // sx={{
                          //   "& .MuiOutlinedInput-root": {
                          //     "& fieldset": {
                          //       borderColor: Constants.primaryColor,
                          //     },
                          //     "&:hover fieldset": {
                          //       borderColor: Constants.primaryColor,
                          //     },
                          //     "&.Mui-focused fieldset": {
                          //       borderColor: Constants.primaryColor,
                          //     },
                          //   },
                          // }}
                          sx={{
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Constants.primaryColor,
    },
    "&:hover fieldset": {
      borderColor: Constants.primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: Constants.primaryColor,
    },
  },

  // Input text color
  "& .MuiInputBase-input": {
    color: Constants.primaryColor,
  },

  // Label color
  "& .MuiInputLabel-root": {
    color: Constants.primaryColor,
  },

  // Label focused color
  "& .MuiInputLabel-root.Mui-focused": {
    color: Constants.primaryColor,
  },
}}


                        >
                          {item.options.map((option, i) => (<MenuItem value={option} key={i}>
                            {option} </MenuItem>
                          ))} </TextField>
                      ) : (
                        <TextField
                          label={item.label}
                          fullWidth
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData[item.field] || ""}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          type={item.type}
                       sx={{
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Constants.primaryColor,
    },
    "&:hover fieldset": {
      borderColor: Constants.primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: Constants.primaryColor,
    },
  },

  // Input text color
  "& .MuiInputBase-input": {
    color: Constants.primaryColor,
  },

  // Label color
  "& .MuiInputLabel-root": {
    color: Constants.primaryColor,
  },

  // Label focused color
  "& .MuiInputLabel-root.Mui-focused": {
    color: Constants.primaryColor,
  },
}}


                        />
                      )} </Grid>
                    ))}
                  </Grid>



                  {/* Section 4: Consideration */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 5: Consideration
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                      { field: "totalConsideration", label: "Total Consideration / Agreement Value", type: "number" },
                      { field: "bookingAmount", label: "Booking Amount / Advance Payment", type: "number" },
                      { field: "stampDuty", label: "Stamp Duty (7% of Agreement Cost)", type: "number" },
                      { field: "registrationFee", label: "Registration Fee(Auto Calculated)", type: "number" },
                      { field: "gstAmount", label: "GST Amount(Auto Calculated)", type: "number" }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <TextField
                          label={item.label}
                          fullWidth
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData[item.field]}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          type={item.type}
                          sx={{ border: Constants.formInputBorderColor, }}
                        />
                      </Grid>
                    ))}
                  </Grid>


                  {/* Section 5: Booking Payment Mode */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 6: Booking Payment Mode
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Booking Amount"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.bookingAmount}
                        onChange={(e) => handleInputChange("bookingAmount", e.target.value)}
                        type="number"
                        sx={{ border: Constants.formInputBorderColor, }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}
                       sx={{ border: Constants.formInputBorderColor, }}
                       required
                       >
                        <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
                        <Select
                          labelId="payment-mode-label"
                          value={formData.paymentMode}
                          onChange={(e) => handleSelectChange("paymentMode", e.target.value)}
                          label="Payment Mode"
                        >
                          <MenuItem value="Cheque">Cheque</MenuItem>
                          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cheque/TRN No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.chequeNo}
                        onChange={(e) => handleInputChange("chequeNo", e.target.value)}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        label="Cheque/TRN Date"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        required
                        value={formData.chequeDate}
                        onChange={(e) =>
                          handleInputChange("chequeDate", e.target.value)
                        }
                        InputLabelProps={{ shrink: true }}
                        error={!!errors?.chequeDate}
                        helperText={errors?.chequeDate}
                        sx={{ border: Constants.formInputBorderColor, }}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor, }}>
                        <InputLabel id="bank-name-label">Bank Name</InputLabel>
                        <Select
                          labelId="bank-name-label"
                          value={formData.bankName}
                          onChange={(e) => handleSelectChange("bankName", e.target.value)}
                          label="Bank Name"
                        >
                          <MenuItem value="State Bank of India (SBI)">State Bank of India (SBI)</MenuItem>
                          <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                          <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                          <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Bank Details"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.bankDetails}
                        onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                        sx={{ border: Constants.formInputBorderColor, }}

                      />
                    </Grid> */}
                  </Grid>
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setShowFirmForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Constants.primaryColor,
                    color: "#ecf0f1",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookingForm;