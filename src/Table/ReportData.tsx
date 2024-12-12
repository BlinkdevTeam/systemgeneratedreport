import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../firebase"; // Import the firebase configuration
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Logo from "../image/BCS_LOGO_ALT_OG.png";

interface User {
  affiliationAddress: string;
  affiliationName: string;
  affiliationRegion: string;
  attendanceCheck: string;
  email: string;
  extName: string;
  firstName: string;
  fullName: string;
  id: number;
  lastName: string;
  middleName: string;
  participantType: string;
  philriceEmployee: string;
  philriceName: string;
  philricePosition: string;
  philriceStation: string;
  philriceUnit: string;
  day1timeAttended: string;
  day2timeAttended: string;
  day3timeAttended: string;
  day4timeAttended: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "users");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.values(data) as User[];
        setUsers(usersArray);
      } else {
        console.log("No data available");
      }
    };

    fetchData();
  }, []);

  const chunkArray = (arr: User[], size: number) => {
    const chunks: User[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const userChunks = chunkArray(users, 8);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginTop: 2,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    tableCell: {
      flex: 1,
      padding: 5,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "left",
      fontSize: 10,
    },
    pretableCell: {
      flex: 1,
      padding: 2,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      textAlign: "left",
      fontSize: 10,
    },
    header: {
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
      fontSize: 10,
      textAlign: "center",
      padding: 2,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    headerColumn: {
      flexDirection: "column",
      alignItems: "flex-end",
      textAlign: "right",
    },
    bodyColumn: {
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
    },
    title: {
      fontSize: 10,
      marginLeft: 110,
    },
    body: {
      fontSize: 10,
    },
    time: {
      fontSize: 10,
      marginTop: 10,
    },
    logo: {
      width: "auto",
      height: "auto",
      maxWidth: 100,
      maxHeight: 50,
    },
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const totalParticipants = users.length;
  const totalDay1Attendance = users.filter(
    (user) => user.day1timeAttended
  ).length;
  const totalDay2Attendance = users.filter(
    (user) => user.day2timeAttended
  ).length;
  const totalDay3Attendance = users.filter(
    (user) => user.day3timeAttended
  ).length;
  const totalDay4Attendance = users.filter(
    (user) => user.day4timeAttended
  ).length;

  const MyDocument = () => (
    <Document>
      {userChunks.map((chunk, pageIndex) => (
        <>
          <Page style={styles.page} key={pageIndex}>
            <View style={styles.section}>
              <View style={styles.headerRow}>
                <Image style={styles.logo} src={Logo} />
                <View style={styles.headerColumn}>
                  <Text style={styles.title}>
                    2/F Left Wing, ES Plaza, Lopez Ave, Los Baños Laguna,
                    Philippines
                  </Text>
                  <Text style={styles.title}>
                    inquiries@blinkcreativestudio.com
                  </Text>
                  <Text style={styles.title}>
                    0949 993 7469 / 0915 377 1777
                  </Text>
                  <Text style={styles.title}>www.blinkcreativestudio.com</Text>
                </View>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.bodyColumn}>
                  <Text style={styles.body}>
                    Activity/Event: 36th Ugnay Palay Attendees
                  </Text>
                  <Text style={styles.body}>Date: December 3-5, 2024</Text>
                  <Text style={styles.body}>Venue: DA-PhilRice CES</Text>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.header]}>Name</Text>
                  <Text style={[styles.tableCell, styles.header]}>
                    Office/
                    <br />
                    Agency
                  </Text>
                  <Text style={[styles.tableCell, styles.header]}>Day 1</Text>
                  <Text style={[styles.tableCell, styles.header]}>Day 2</Text>
                  <Text style={[styles.tableCell, styles.header]}>Day 3</Text>
                  <Text style={[styles.tableCell, styles.header]}>Day 4</Text>
                  <Text style={[styles.pretableCell, styles.header]}>
                    No. of Days Present
                  </Text>{" "}
                  {/* New header */}
                </View>
                {chunk.map((user, index) => {
                  const totalAttendance = [
                    user.day1timeAttended,
                    user.day2timeAttended,
                    user.day3timeAttended,
                    user.day4timeAttended,
                  ].filter((day) => day).length; // Count non-empty days

                  return (
                    <View style={styles.tableRow} key={index}>
                      <Text style={styles.tableCell}>{user.fullName}</Text>
                      <Text style={styles.tableCell}>
                        {user.philriceStation || user.affiliationName}
                      </Text>
                      <Text style={styles.tableCell}>
                        {user.day1timeAttended}
                      </Text>
                      <Text style={styles.tableCell}>
                        {user.day2timeAttended}
                      </Text>
                      <Text style={styles.tableCell}>
                        {user.day3timeAttended}
                      </Text>
                      <Text style={styles.tableCell}>
                        {user.day4timeAttended}
                      </Text>
                      <Text style={styles.tableCell}>{totalAttendance}</Text>{" "}
                      {/* Display Total */}
                    </View>
                  );
                })}
              </View>
              <Text style={styles.time}>
                DATE AND TIME PRINTED: {formattedDate} {formattedTime}
              </Text>
            </View>
          </Page>
        </>
      ))}
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Image style={styles.logo} src={Logo} />
            <View style={styles.headerColumn}>
              <Text style={styles.title}>
                2/F Left Wing, ES Plaza, Lopez Ave, Los Baños Laguna,
                Philippines
              </Text>
              <Text style={styles.title}>
                inquiries@blinkcreativestudio.com
              </Text>
              <Text style={styles.title}>0949 993 7469 / 0915 377 1777</Text>
              <Text style={styles.title}>www.blinkcreativestudio.com</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.bodyColumn}>
              <Text style={styles.body}>
                Activity/Event: 36th Ugnay Palay Attendees
              </Text>
              <Text style={styles.body}>Date: December 3-5, 2024</Text>
              <Text style={styles.body}>Venue: DA-PhilRice CES</Text>
            </View>
          </View>
          <Text style={styles.body}>Summary</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.header]}>
                Total Participants
              </Text>
              <Text style={[styles.tableCell, styles.header]}>
                Day 1 Attendance
              </Text>
              <Text style={[styles.tableCell, styles.header]}>
                Day 2 Attendance
              </Text>
              <Text style={[styles.tableCell, styles.header]}>
                Day 3 Attendance
              </Text>
              <Text style={[styles.tableCell, styles.header]}>
                Day 4 Attendance
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{totalParticipants}</Text>
              <Text style={styles.tableCell}>{totalDay1Attendance}</Text>
              <Text style={styles.tableCell}>{totalDay2Attendance}</Text>
              <Text style={styles.tableCell}>{totalDay3Attendance}</Text>
              <Text style={styles.tableCell}>{totalDay4Attendance}</Text>
            </View>
          </View>
          <Text style={styles.time}>
            DATE AND TIME PRINTED: {formattedDate} {formattedTime}
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">User Data</h1>
        <div className="mt-6">
          <h2 className="text-xl mb-4">PDF Preview:</h2>
          <PDFViewer width="100%" height="600px">
            <MyDocument />
          </PDFViewer>
        </div>
        <div className="mt-6">
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="user-data-report.pdf"
          >
            <button className="bg-blue-500 text-white p-2 rounded">
              Export to PDF
            </button>
          </PDFDownloadLink>
        </div>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Office/Agency</th>
              <th className="px-4 py-2 text-left">12/2/2024</th>
              <th className="px-4 py-2 text-left">12/3/2024</th>
              <th className="px-4 py-2 text-left">12/4/2024</th>
              <th className="px-4 py-2 text-left">12/5/2024</th>
              <th className="px-4 py-2 text-left">Total</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const totalAttendance = [
                user.day1timeAttended,
                user.day2timeAttended,
                user.day3timeAttended,
                user.day4timeAttended,
              ].filter((day) => day).length; // Count non-empty days

              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">
                    {user.philriceStation || user.affiliationName}
                  </td>
                  <td className="px-4 py-2">{user.day1timeAttended}</td>
                  <td className="px-4 py-2">{user.day2timeAttended}</td>
                  <td className="px-4 py-2">{user.day3timeAttended}</td>
                  <td className="px-4 py-2">{user.day4timeAttended}</td>
                  <td className="px-4 py-2">{totalAttendance}</td>{" "}
                  {/* Display Total */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
