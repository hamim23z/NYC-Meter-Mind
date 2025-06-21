"use client"
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function BasicHomePage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
          bgcolor: "#000",
        }}
      >
        {/* left side */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", md: "left" },
            px: 2,
            py: { xs: 10, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
            }}
          >
            NYC Meter Mind
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              letterSpacing: "10px",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              mt: 1,
            }}
          >
            find out where and when you can park
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              component="a"
              href="/signs"
              sx={{
                color: "#fff",
                backgroundColor: "red",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 900,
                px: 3,
              }}
            >
              Start exploring
            </Button>

            <Button
              component="a"
              href="https://portal.311.nyc.gov/article/?kanumber=KA-01239"
              target="_blank"
              sx={{
                color: "#fff",
                borderRadius: "50%",
                backgroundColor: "red",
                width: 40,
                height: 40,
                minWidth: 0,
                p: 0,
              }}
            >
              <LocalParkingIcon />
            </Button>

            <Button
              component="a"
              href="https://www.nyc.gov/site/finance/vehicles/services.page"
              target="_blank"
              sx={{
                color: "#fff",
                borderRadius: "50%",
                backgroundColor: "red",
                width: 40,
                height: 40,
                minWidth: 0,
                p: 0,
              }}
            >
              <MonetizationOnIcon />
            </Button>
          </Box>
        </Box>

        {/* right side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            width: { xs: "100%", md: "40%" },
            pl: { md: 2 },
            gap: 2,
          }}
        >
          <Image
            src="/white_car.png"
            alt="white car"
            width={200}
            height={200}
          />

          <Image
            src="/white_van.png"
            alt="white van"
            width={200}
            height={200}
            style={{
              marginLeft: "200px",
            }}
            className="van-img"
          />

          <Image
            src="/blue_bus.png"
            alt="blue hydrogen bus"
            width={200}
            height={200}
          />

          <Image
            src="/red_racecar.png"
            alt="red formula 1 racecar"
            width={200}
            height={200}
            style={{
              marginLeft: "200px",
            }}
            className="racecar-img"
          />
        </Box>

        {/* Responsive overrides for mobile */}
        <style jsx global>{`
          @media (max-width: 900px) {
            .van-img,
            .racecar-img {
              margin-left: 0 !important;
            }
          }
        `}</style>
      </Box>
    </>
  );
}
