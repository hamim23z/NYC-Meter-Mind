"use client";
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Modal,
} from "@mui/material";

const ITEMS_PER_PAGE = 20;

export default function SignsPage() {
  const [signs, setSigns] = useState([]);
  const [filteredSigns, setFilteredSigns] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const PAGE_LIMIT = 50000;
      const BASE_URL = "https://data.cityofnewyork.us/resource/nfid-uabd.json";
      let offset = 0;
      let allData = [];
      let hasMore = true;

      try {
        while (hasMore) {
          const res = await fetch(
            `${BASE_URL}?$limit=${PAGE_LIMIT}&$offset=${offset}`
          );
          const batch = await res.json();

          if (batch.length === 0) {
            hasMore = false;
          } else {
            allData = allData.concat(batch);
            offset += PAGE_LIMIT;
          }
        }

        const processed = allData.map((sign, i) => ({
          id: `${
            sign.order_number ||
            `sign-${i}-${Math.random().toString(36).substring(2, 8)}`
          }`,
          borough: sign.borough || "Unknown",
          on_street: sign.on_street || "",
          on_street_suffix: sign.on_street_suffix || "",
          from_street: sign.from_street || "",
          from_street_suffix: sign.from_street_suffix || "",
          to_street: sign.to_street || "",
          to_street_suffix: sign.to_street_suffix || "",
          side_of_street: sign.side_of_street || "",
          sign_description: sign.sign_description || "",
          sign_location: sign.sign_location || "",
          distance_from_intersection: sign.distance_from_intersection || "",
          arrow_direction: sign.arrow_direction || "",
          facing_direction: sign.facing_direction || "",
        }));

        setSigns(processed);
        setFilteredSigns(processed);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const results = signs.filter(
      (sign) =>
        sign.on_street.toLowerCase().includes(term) ||
        sign.sign_description.toLowerCase().includes(term)
    );
    setFilteredSigns(results);
    setPage(1);
  }, [search, signs]);

  const totalPages = Math.ceil(filteredSigns.length / ITEMS_PER_PAGE);
  const paginated = filteredSigns.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ padding: 4, backgroundColor: "#000", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#fff", textAlign: "center" }}
      >
        NYC Street Signs
      </Typography>

      <TextField
        label="Search by street or description"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          backgroundColor: "#333",
          borderRadius: 1,
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
            lg: "50%",
          },
          mx: "auto",
          display: "block",
        }}
        InputProps={{
          style: { color: "#fff" },
        }}
        InputLabelProps={{
          style: { color: "#ccc" },
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            sx={{
              paddingTop: "40px",
              justifyContent: "center",
            }}
          >
            {paginated.map((sign, i) => (
              <Grid item xs={12} md={4} key={`${sign.id}-${i}`}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: 180,
                    width: {
                      xs: 340,
                      sm: 300,
                      md: 350,
                      lg: 400,
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedSign(sign)}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ textAlign: "center", fontWeight: 700 }}
                    >
                      {sign.borough}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      <strong>STREET:</strong> {sign.on_street}{" "}
                      {sign.on_street_suffix}
                      <br />
                      <strong>FROM:</strong> {sign.from_street}
                      <br />
                      <strong>TO:</strong> {sign.to_street}
                      <br />
                      <strong>DESCRIPTION:</strong>{" "}
                      {sign.sign_description.length > 80
                        ? sign.sign_description.slice(0, 30) + "..."
                        : sign.sign_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Typography
              variant="body1"
              sx={{ lineHeight: "40px", color: "#fff" }}
            >
              Page {page} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </Box>
        </>
      )}

      {/*modal */}
      <Modal open={!!selectedSign} onClose={() => setSelectedSign(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          {selectedSign && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: 700 }}
              >
                {selectedSign.borough}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Street:</strong> {selectedSign.on_street}{" "}
                {selectedSign.on_street_suffix}
                <br />
                <strong>From:</strong> {selectedSign.from_street}{" "}
                {selectedSign.from_street_suffix}
                <br />
                <strong>To:</strong> {selectedSign.to_street}{" "}
                {selectedSign.to_street_suffix}
                <br />
                <strong>Side:</strong> {selectedSign.side_of_street}
                <br />
                <strong>Location:</strong> {selectedSign.sign_location}
                <br />
                <strong>Distance:</strong>{" "}
                {selectedSign.distance_from_intersection}
                <br />
                <strong>Description:</strong> {selectedSign.sign_description}
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => alert("More info clicked!")}
                >
                  More Info
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSelectedSign(null)}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
