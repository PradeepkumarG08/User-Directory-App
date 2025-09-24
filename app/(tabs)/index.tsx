import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useTheme } from "../_layout";

const API_BASE = "https://randomuser.me/api/";

export default function UsersScreen() {
  const router = useRouter();
  const { theme, mode, setMode } = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const textColor = theme === "dark" ? "#fff" : "#000";
  const subTextColor = theme === "dark" ? "#ddd" : "#444";

  const fetchUsers = async (p = 1) => {
    const res = await axios.get(`${API_BASE}?results=20&page=${p}`);
    return res.data;
  };

  const load = async ({ refresh }: { refresh: boolean }) => {
    try {
      if (loading) return;
      setLoading(true);
      const p = refresh ? 1 : page;
      const data = await fetchUsers(p);
      const results: User[] = data.results;

      if (refresh) {
        setUsers(results);
        setPage(2);
      } else {
        setUsers((prev) => [...prev, ...results]);
        setPage((prev) => prev + 1);
      }
      setHasMore(results.length > 0);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load({ refresh: true });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    load({ refresh: true });
  };

  const onEndReached = () => {
    if (!loading && hasMore) {
      load({ refresh: false });
    }
  };

const filtered = useMemo(() => {
  if (!query) return users;
  const lowerQuery = query.toLowerCase();
  return users.filter((u) => {
    const name = `${u.name.first} ${u.name.last}`.toLowerCase();
    const email = u.email.toLowerCase();
    return name.includes(lowerQuery) || email.includes(lowerQuery);
  });
}, [users, query]);

  const renderItem = ({ item }: ListRenderItemInfo<User>) => {
    const fullName = `${item.name.first} ${item.name.last}`;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push({
            pathname: "/explore",
            params: { user: JSON.stringify(item) },
          })
        }
      >
        <Image source={{ uri: item.picture.thumbnail }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={[styles.name, { color: textColor }]}>{fullName}</Text>
          <Text style={[styles.email, { color: subTextColor }]}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const toggleTheme = async () => {
    const next = mode === "dark" ? "light" : "dark";
    await setMode(next as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000" : "#fff" }]}>
      <View style={styles.topRow}>
        <TextInput
          placeholder="Search by name or email"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#888"}
          value={query}
          onChangeText={setQuery}
          style={[
            styles.search,
            { backgroundColor: theme === "dark" ? "#111" : "#f2f2f2", color: textColor },
          ]}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
          <Text style={{ fontWeight: "600", color: textColor }}>{mode === "dark" ? "Light" : "Dark"}</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.center}>
          <Text style={{ color: textColor }}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.login.uuid}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={loading  ? <ActivityIndicator style={{ margin: 12 }} /> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
  topRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, marginBottom: 8 },
  search: { flex: 1, padding: 10, borderRadius: 10 },
  themeBtn: { marginLeft: 8, padding: 8 },
  itemContainer: { flexDirection: "row", padding: 12, alignItems: "center", borderBottomWidth: 1, borderColor: "#eee" },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  name: { fontSize: 16, fontWeight: "600" },
  email: { fontSize: 13, color: "#666" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
