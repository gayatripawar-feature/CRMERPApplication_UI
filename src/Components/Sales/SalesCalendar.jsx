

// import React, { useState } from 'react';

// const SalesCalendar = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState('month'); // Default view

//   const events = [
//     { title: "Team Meeting", date: "2024-04-03" },
//     { title: "Client Call", date: "2024-04-05" },
//     { title: "Project Deadline", date: "2024-04-10" }
//   ];

//   const selectedDateFormatted = selectedDate.toISOString().split('T')[0];
//   const todayEvents = events.filter(event => event.date === selectedDateFormatted);
//   const upcomingEvents = events.filter(event => event.date > selectedDateFormatted);

//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//   const handlePrevMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
//   };

//   const handleDateClick = (day) => {
//     if (day) {
//       setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
//     }
//   };

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//     if (mode === 'today') {
//       setSelectedDate(new Date());
//     } else if (mode === 'week') {
//       setSelectedDate(new Date());
//     }
//   };

//   const renderCalendar = () => {
//     const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
//     const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

//     let days = [];
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
//     while (days.length % 7 !== 0) {
//       days.push(null);
//     }

//     if (viewMode === 'today') {
//       return (
//         <div className="row justify-content-center mb-3">
//           <div className="col d-flex justify-content-center align-items-center">
//             <div className="square-block bg-info text-white">{selectedDate.getDate()}</div>
//           </div>
//         </div>
//       );
//     }

//     if (viewMode === 'week') {
//       const today = new Date();
//       const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
//       const weekDays = Array.from({ length: 7 }, (_, i) => {
//         let day = new Date(startOfWeek);
//         day.setDate(startOfWeek.getDate() + i);
//         return day.getDate();
//       });

//       return (
//         <div className="row justify-content-center mb-3">
//           {weekDays.map((day, i) => (
//             <div key={i} className="col d-flex justify-content-center align-items-center">
//               <div className="square-block bg-warning text-white">{day}</div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     return days.reduce((weeks, day, i) => {
//       if (i % 7 === 0) weeks.push([]);
//       weeks[weeks.length - 1].push(day);
//       return weeks;
//     }, []).map((week, index) => (
//       <div key={index} className="row justify-content-center mb-3">
//         {week.map((day, i) => (
//           <div key={i} className="col d-flex justify-content-center align-items-center" onClick={() => handleDateClick(day)}>
//             <div className={`square-block ${day && selectedDate.getDate() === day ? 'bg-info text-white' : ''}`}>
//               {day || ''}
//             </div>
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4 bg-success text-white p-3 rounded">
//         <button className="btn btn-outline-primary bg-primary text-white btn-lg" onClick={handlePrevMonth}>
//           {"<"}
//         </button>
//         <span className="h3 text-center">
//           {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//           <div className="d-flex gap-2 mt-2">
//             <button className={`btn ${viewMode === 'today' ? 'btn-dark' : 'btn-primary'}`} onClick={() => handleViewChange('today')}>Today</button>
//             <button className={`btn ${viewMode === 'week' ? 'btn-dark' : 'btn-primary'}`} onClick={() => handleViewChange('week')}>Week</button>
//             <button className={`btn ${viewMode === 'month' ? 'btn-dark' : 'btn-primary'}`} onClick={() => handleViewChange('month')}>Month</button>
//           </div>
//         </span>
//         <button className="btn btn-outline-primary bg-primary text-white btn-lg" onClick={handleNextMonth}>
//           {">"}
//         </button>
//       </div>

//       <div className="container-fluid mt-4">
//         <div className="row">
//           <div className="col-md-7">
//             <div className="calendar-grid">
//               <div className="row text-center font-weight-bold mb-2">
//                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                   <div key={day} className="col square-day">{day}</div>
//                 ))}
//               </div>
//               {renderCalendar()}
//             </div>
//           </div>

//           <div className="col-md-5">
//             <div className="p-3 bg-light shadow rounded">
//               <h4 className="text-primary">📅 Upcoming Events</h4>
//               <ul className="list-group">
//                 {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
//                   <li key={index} className="list-group-item">{event.title} - {event.date}</li>
//                 )) : <li className="list-group-item text-muted">No upcoming events</li>}
//               </ul>

//               <h4 className="text-danger mt-3">🔥 Events for {selectedDate.toDateString()}</h4>
//               <ul className="list-group">
//                 {todayEvents.length > 0 ? todayEvents.map((event, index) => (
//                   <li key={index} className="list-group-item">{event.title} - {event.date}</li>
//                 )) : <li className="list-group-item text-muted">No events scheduled</li>}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalesCalendar;









import React, { useState, useEffect } from 'react';

const SalesCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const [events, setEvents] = useState([]);
  const selectedDateFormatted = selectedDate.getFullYear() + "-" + String(selectedDate.getMonth() + 1).padStart(2, "0") + "-" + String(selectedDate.getDate()).padStart(2, "0");
  const selected = new Date(selectedDateFormatted + "T00:00:00");

  // Events for selected date
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date + "T00:00:00");
    return eventDate.toDateString() === selected.toDateString();
  });

  // Events after selected date
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date + "T00:00:00");
    return eventDate > selected;
  });

  const displayedUpcoming = showAllUpcoming ? upcomingEvents : upcomingEvents.slice(0, 3);

  //  FETCH BOTH APIs AND MERGE EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  // To get the First dat of month:
  useEffect(() => {
    // Whenever month changes, auto-select first day of that month
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
  }, [currentMonth]);


  const fetchEvents = async () => {
    try {
      //  Only enquiry API (lead removed)
      const enquiryRes = await fetch("https://localhost:5289/sales/api/enquiries", {
        credentials: "include",
      });

      //  Safe JSON parser — prevents crash on 500 errors
      const parseJSON = async (response) => {
        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch {
          console.error(" Not valid JSON from API:", text);
          return null;
        }
      };

      const enquiryData = await parseJSON(enquiryRes);

      let finalEvents = [];

      // ENQUIRY FOLLOW-UPS & VISITS ONLY
      if (enquiryData && Array.isArray(enquiryData.pagedRecords)) {
        enquiryData.pagedRecords.forEach((enq) => {
          enq.enquiryEnagagements?.forEach((e) => {
            //FOLLOW-UP
            if (e.nextFollowUpDate) {
              console.log("ADDING ENQUIRY FOLLOW-UP:", e.nextFollowUpDate);
              finalEvents.push({
                title: `Enquiry Follow-up - ${enq.name}`,
                date: e.nextFollowUpDate.split("T")[0],
              });
            }

            //  VISIT SCHEDULED
            if (e.nextVisitScheduledDate) {
              console.log("ADDING ENQUIRY VISIT:", e.nextVisitScheduledDate);
              finalEvents.push({
                title: `Enquiry Visit Scheduled - ${enq.name}`,
                date: e.nextVisitScheduledDate.split("T")[0],
              });
            }
          });
        });
      }

      //  Final clean result (unique events)
      const uniqueEvents = Array.from(
        new Map(finalEvents.map((e) => [`${e.title}-${e.date}`, e])).values()
      );

      console.log(" FINAL ENQUIRY EVENTS:", uniqueEvents);

      setEvents(uniqueEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    if (mode === 'today' || mode === 'week') {
      setSelectedDate(new Date());
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    let days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    while (days.length % 7 !== 0) days.push(null);

    if (viewMode === 'today') {
      return (
        <div className="row justify-content-center mb-3">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="square-block bg-info text-white">{selectedDate.getDate()}</div>
          </div>
        </div>
      );
    }

    if (viewMode === 'week') {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const weekDays = Array.from({ length: 7 }, (_, i) => {
        let day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day.getDate();
      });

      return (
        <div className="row justify-content-center mb-3">
          {weekDays.map((day, i) => (
            <div key={i} className="col d-flex justify-content-center align-items-center">
              <div className="square-block bg-warning text-white">{day}</div>
            </div>
          ))}
        </div>
      );
    }

    return days
      .reduce((weeks, day, i) => {
        if (i % 7 === 0) weeks.push([]);
        weeks[weeks.length - 1].push(day);
        return weeks;
      }, [])
      .map((week, index) => (
        <div key={index} className="row justify-content-center mb-3">
          {week.map((day, i) => (
            <div
              key={i}
              className="col d-flex justify-content-center align-items-center"
              onClick={() => handleDateClick(day)}
            >
              <div className={`square-block ${day && selectedDate.getDate() === day ? 'bg-info text-white' : ''}`}>
                {day || ''}
              </div>
            </div>
          ))}
        </div>
      ));
  };



  return (
    <div className="container">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-success text-white p-3 rounded">
        <button className="btn btn-primary" onClick={handlePrevMonth}>{"<"}</button>

        <span className="h3 text-center">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          <div className="d-flex gap-2 mt-2">
            <button className={`btn ${viewMode === 'today' ? 'btn-dark' : 'btn-primary'}`}
              onClick={() => handleViewChange('today')}>Today</button>

            <button className={`btn ${viewMode === 'week' ? 'btn-dark' : 'btn-primary'}`}
              onClick={() => handleViewChange('week')}>Week</button>

            <button className={`btn ${viewMode === 'month' ? 'btn-dark' : 'btn-primary'}`}
              onClick={() => handleViewChange('month')}>Month</button>
          </div>
        </span>

        <button className="btn btn-primary" onClick={handleNextMonth}>{">"}</button>
      </div>

      {/* Calendar + Events UI */}
      <div className="row">
        <div className="col-md-7">
          <div className="calendar-grid">
            <div className="row text-center font-weight-bold mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="col square-day">{day}</div>
              ))}
            </div>
            {renderCalendar()}
          </div>
        </div>

        <div className="col-md-5">

          <div className="p-3 bg-light shadow rounded">

            {/* Upcoming Events Header with Show More / Show Less button */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-primary mb-0">📅 Upcoming Events</h4>
              {upcomingEvents.length > 3 && (
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => setShowAllUpcoming(prev => !prev)}
                >
                  {showAllUpcoming ? 'Show Less ▲' : 'Show More ▼'}
                </button>
              )}
            </div>

            <ul className="list-group mt-2">
              {displayedUpcoming.length > 0
                ? displayedUpcoming.map((event, i) => (
                  <li key={i} className="list-group-item">
                    {event.title} - {event.date}
                  </li>
                ))
                : <li className="list-group-item text-muted">No upcoming events</li>
              }
            </ul>

            <h4 className="text-danger mt-3">🔥 Events for {selectedDate.toDateString()}</h4>
            <ul className="list-group">
              {todayEvents.length > 0
                ? todayEvents.map((event, i) => (
                  <li key={i} className="list-group-item">{event.title} - {event.date}</li>
                ))
                : <li className="list-group-item text-muted">No events scheduled</li>}
            </ul>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SalesCalendar;