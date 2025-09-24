import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function UserDetail() {
  const { user } = useLocalSearchParams<{ user: string }>();
  const router = useRouter();

  if (!user) return <Text>No user found</Text>;

  const parsed = JSON.parse(user);
  const fullName = `${parsed.name.first} ${parsed.name.last}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: parsed.picture.large }} style={styles.avatar} />
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.email}>{parsed.email}</Text>
      <Text style={styles.text}>Phone: {parsed.phone}</Text>
      <Text style={styles.text}>Location: {parsed.location.city}, {parsed.location.country}</Text>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  avatar: { width: 300, height: 300, borderRadius: 150, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  email: { fontSize: 16, marginBottom: 12 },
  text: { fontSize: 16, marginBottom: 6 },
  backBtn: { marginTop: 20, backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  backText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
