
// const RolePermissions = {
//   admin: [
//     {to: "/dashboard", label: "Dashboard" },
   
//   ],
//   sales: [
      
//     { label: "Sales", to: "/sales" },
//     { label: "Dashboard",  to: "/sales/salesdashboard" },
//     { label: "Calendar",  to: "/sales/salescalander" },
//     { label: "Share Space",  to: "/sales/sharespace" },
//     { label: "Shared By Developer",  to: "/sales/sharedbydeveloper" },
//     { label: "Leads",  to: "/sales/leads" },
//     { label: "Leads Follow Up",  to: "/sales/leadsfollowup" },
//     { label: "Lost Leads",  to: "/sales/lostleads" },
//     { label: "First Visit",  to: "/sales/firstvisits" },
//     { label: "First Visit Follow Up",  to: "/sales/firstvisitfollowup" },
//     { label: "First Visit Steps", to: "/sales/firstvisitsteps" },
//     { label: "Lost Visits",  to: "/sales/saleslostvisits" },
//     { label: "Templates",  to: "/sales/salestemplates" },
//     { label: "Booking Form", to: "/sales/bookingform" },
//     { label: "Channel Partner",  to: "/sales/channelpartner" },
//   ],
//   Developer: [
   

//       { label: "Share Space",to: "/developer/sharespace",  },
//     {label: "Basic Information", to: "/developer/basicinfo",  },
//     { label: "Project Inventory" ,  to: "/developer/projectinventory", },
//     { label: "Cost Sheet Details" ,  to: "/developer/costsheet", },
//     { label: "Sales MIS",to: "/developer/salesmis",  },
//     { label: "Marketing" , to: "/developer/marketing",  }
//   ],
// };

// export default RolePermissions;





import {
  FaUserShield,
  FaUserTie,
  FaLandmark,
  FaCode,
  FaInfoCircle,
  FaBuilding,
  FaFileInvoiceDollar,
  FaChartLine,
  FaBullhorn,
  FaCalendarAlt,
  FaPeopleArrows,
  FaUsers,
  FaClipboardList,
  FaCalendarCheck,
  FaRegTimesCircle,
  FaRegHandshake,
  FaRegClock,
  FaTasks,
  FaClipboard,
  FaRegEdit,
  FaCogs,
  FaHome,
  FaUserCheck,
  FaFileAlt,
  FaFileSignature,
  FaStamp,
  FaDraftingCompass,
  FaBell,
  FaMoneyBillWave,
  FaChartBar,
  FaParking,
  FaTachometerAlt
} from "react-icons/fa";

const RolePermissions = {
  admin: [
    {
      label: "Admin Section",
      icon: <FaUserShield />,
      subItems: [
        { to: "/dashboard/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
        { to: "/dashboard/admin/banker", icon: <FaLandmark />, label: "Banker Details" },
      ],
    },
  ],
  developer: [
    {
      label: "Developer Module",
      icon: <FaCode />,
      subItems: [
        { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
        { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
        { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
        { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
        { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
        { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
      ],
    },
  ],
  sales: [
    {
      label: "Sales Module",
      icon: <FaChartLine />,
      subItems: [
        // { to: "/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
        { to: "/dashboard/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },

        { to: "/dashboard/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" },
        { to: "/dashboard/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" },
        { to: "/dashboard/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
        { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
        { to: "/dashboard/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
        { to: "/dashboard/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
        { to: "/dashboard/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
        { to: "/dashboard/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
        { to: "/dashboard/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
        { to: "/dashboard/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
        { to: "/dashboard/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
        { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
        { to: "/dashboard/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },
      ],
    },
  ],
  crm: [
    {
      label: "CRM Module",
      icon: <FaCogs />,
      subItems: [
       
        { to: "/dashboard/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
        { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
        { to: "/dashboard/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
        { to: "/dashboard/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
        { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
        { to: "/dashboard/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
        { to: "/dashboard/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
        { to: "/dashboard/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
        { to: "/dashboard/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotement Report" },
        { to: "/dashboard/crm/parkingreport", icon: <FaParking />, label: "Parking Report" },
        { to: "/dashboard/crm/misreport", icon: <FaChartBar />, label: "MIS Report" },
      ],
    },
  ],
};

export default RolePermissions;
