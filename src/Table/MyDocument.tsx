// MyDocument.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    marginBottom: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
  },
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>User Data</Text>
      </View>
      <View style={styles.body}>
        <Text>Here goes the user data...</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
