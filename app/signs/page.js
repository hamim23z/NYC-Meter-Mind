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
} from "@mui/material";

const ITEMS_PER_PAGE = 20;

export default function SignsPage() {
  const [signs, setSigns] = useState([]);
  const [filteredSigns, setFilteredSigns] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://data.cityofnewyork.us/resource/nfid-uabd.json?$limit=1000"
        );
        const data = await res.json();

        const processed = data.map((sign, i) => ({
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
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        NYC Street Signs
      </Typography>

      <TextField
        label="Search by street or description"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {paginated.map((sign, i) => (
          <Grid item xs={12} md={6} key={`${sign.id}-${i}`}>
            <Card>
              <CardContent>
                <Typography variant="h6">{sign.borough}</Typography>
                <Typography variant="body1">
                  {sign.on_street} {sign.on_street_suffix}
                </Typography>
                <Typography variant="body2">
                  From: {sign.from_street} {sign.from_street_suffix}
                  <br />
                  To: {sign.to_street} {sign.to_street_suffix}
                  <br />
                  Side of Street: {sign.side_of_street}
                  <br />
                  Location: {sign.sign_location}
                  <br />
                  Distance from Intersection: {sign.distance_from_intersection}
                  <br />
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {sign.sign_description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Typography variant="body1" sx={{ lineHeight: "40px" }}>
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
    </Box>
  );
}
