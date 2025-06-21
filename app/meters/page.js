"use client";

import * as React from "react";
import { Typography, Box } from "@mui/material";
import Image from "next/image";

export default function Meters() {
  return (
    <>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "30px"
          }}
        >
          <Typography
            variant="h2"
          >
            COMING SOON!
          </Typography>

          <Image
            src={"/mechanic.png"}
            alt="Mechanic - Signifying site is down"
            width={200} height={200}
            />
        </Box>
    </>
  );
}
