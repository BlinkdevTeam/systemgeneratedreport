import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}

const ReportData = () => {
  const [data, setData] = useState<any[]>([]);

  const columns: string[] = [
    "Full Name",
    "Station/Affiliation",
    "Day 1 Attendance",
    "Day 2 Attendance",
    "Day 3 Attendance",
    "Day 4 Attendance",
    "No. of Days Attended",
  ];

  useEffect(() => {
    const dbRef = ref(database, "users");
    onValue(dbRef, (snapshot: any) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        const formattedData = Object.entries(firebaseData).map(
          ([key, value]) => ({
            id: key,
            ...(value as Record<string, any>),
          })
        );
        setData(formattedData);
      } else {
        setData([]);
      }
    });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("System Generated Report", 10, 10);

    const rows = data.map((item) => {
      const attendedDays = [
        item.day1timeAttended,
        item.day2timeAttended,
        item.day3timeAttended,
        item.day4timeAttended,
      ].filter(Boolean).length;

      return [
        item.fullName,
        item.philriceStation || item.affiliationName || "N/A",
        item.day1timeAttended || "N/A",
        item.day2timeAttended || "N/A",
        item.day3timeAttended || "N/A",
        item.day4timeAttended || "N/A",
        attendedDays.toString(),
      ];
    });

    doc.autoTable({
      head: [columns],
      body: rows,
      styles: {
        lineWidth: 0.5,
        lineColor: [200, 200, 200],
        cellPadding: 3,
      },
      theme: "striped",
    });

    doc.save("report.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">System Generated Report</h1>

      {data.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left border-b font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const attendedDays = [
                  item.day1timeAttended,
                  item.day2timeAttended,
                  item.day3timeAttended,
                  item.day4timeAttended,
                ].filter(Boolean).length;

                return (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">
                      {item.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.philriceStation || item.affiliationName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.day1timeAttended || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.day2timeAttended || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.day3timeAttended || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {item.day4timeAttended || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">{attendedDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={exportToPDF}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Export to PDF
          </button>
        </>
      ) : (
        <p className="mt-4 text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default ReportData;
