


import React from "react";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

// Sample data
const dashboardData = {
  totalLeads: 1200,
  totalVisits: 850,
  pendingFollowups: 35,
  dealsInProgress: 48,
  sources: [
    { name: "Website", value: 500 },
    { name: "Referral", value: 200 },
    { name: "Social Media", value: 300 },
    { name: "Events", value: 200 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const HEADER_COLORS = {
  totalLeads: "#807100ff",
  totalVisits: "#006400",
  conversion: "#4B0082",
  sources: "#FF8C00",
  pendingFollowups: "#B22222",
  dealsInProgress: "#FF4500",
};

export default function Dashboard() {
  const conversionRatio = (
    (dashboardData.totalVisits / dashboardData.totalLeads) * 100
  ).toFixed(1);

  const cards = [
    {
      title: "Total Leads",
      value: dashboardData.totalLeads,
      color: HEADER_COLORS.totalLeads,
      textColor: "primary",
    },
    {
      title: "Total Visits",
      value: dashboardData.totalVisits,
      color: HEADER_COLORS.totalVisits,
      textColor: "success.main",
    },
    {
      title: "Conversion Ratio",
      value: conversionRatio + "%",
      color: HEADER_COLORS.conversion,
      textColor: "secondary",
      subtitle: "Leads converted into Visits",
    },
    {
      title: "Pending Follow-ups",
      value: dashboardData.pendingFollowups,
      color: HEADER_COLORS.pendingFollowups,
      textColor: "error",
      subtitle: "Tasks requiring follow-up",
    },
    {
      title: "Deals in Progress",
      value: dashboardData.dealsInProgress,
      color: HEADER_COLORS.dealsInProgress,
      textColor: "warning.main",
      subtitle: "Ongoing deals or bookings",
    },
  ];

  return (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          style={{ cursor: "pointer" }}
        >
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardHeader
              title={
                <Box
                  sx={{
                    backgroundColor: card.color,
                    color: "white",
                    padding: "8px",
                    borderRadius: "6px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">{card.title}</Typography>
                </Box>
              }
            />
            <CardContent>
              <Typography
                variant="h4"
                color={card.textColor}
                sx={{ fontWeight: "bold" }}
              >
                {card.value}
              </Typography>
              {card.subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {card.subtitle}
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Sources Pie Chart */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardHeader
            title={
              <Box
                sx={{
                  backgroundColor: HEADER_COLORS.sources,
                  color: "white",
                  padding: "8px",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Lead Sources</Typography>
              </Box>
            }
          />
          <CardContent sx={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dashboardData.sources}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {dashboardData.sources.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
