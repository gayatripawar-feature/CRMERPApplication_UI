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
      ]
    },
    {
        // Developer :
         label: "Developer",
      icon: <FaCode />,
      subItems: [
       { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
        { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
        { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
        { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
        { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
        { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
      ]
    },
        // Sales :
        {
       label: "Sales",
      icon: <FaChartLine />,
      subItems: [
        
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
      ]
    },

        // CRM :
        
          {
label: "CRM",
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

  developer: [
    {
      label: "Admin Section",
      icon: <FaUserShield />,
      subItems: [
        { to: "/dashboard/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
        { to: "/dashboard/admin/banker", icon: <FaLandmark />, label: "Banker Details" },
      ]
    },
    {
      label: "Developer",
      icon: <FaCode />,
      subItems: [
        { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
        { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
        { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
        { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
        { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
        { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
      ]
    },
    {
      label: "Sales",
      icon: <FaChartLine />,
      subItems: [
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
      ]
    },
    {
      label: "CRM",
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
      ]
    },
  ],
  sales: [
    {
      label: "Sales Module",
      icon: <FaChartLine />,
      subItems: [
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
  receiptionist:[
    {
        label: "Sales Module",
      icon: <FaChartLine />,
      subItems: [
       { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
      ],
}
  ],
};

export default RolePermissions;
