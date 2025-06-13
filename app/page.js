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
          height: "100vh",
        }}
      >
        {/*left side of the homepage - main text + buttons*/}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#fff",
              letterSpacing: "10px",
            }}
          >
            hello!
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 900,
            }}
          >
            NYC Meter Mind
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              letterSpacing: "10px",
            }}
          >
            Very short text about project goes here
          </Typography>

          <Button
            component="a"
            href="https://console.cloud.google.com/?pli=1"
            target="_blank"
            sx={{
              color: "#fff",
              backgroundColor: "red",
              borderRadius: "50px",
              textTransform: "none",
            }}
          >
            Google Me
          </Button>

          <Button
            component="a"
            href="https://portal.311.nyc.gov/article/?kanumber=KA-01239"
            target="_blank"
            sx={{
              color: "#fff",
              borderRadius: "50%",
              backgroundColor: "red",
              marginLeft: "70px",
              width: "40px",
              height: "40px",
              minWidth: 0,
              padding: 0,
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
              marginLeft: "20px",
              width: "40px",
              height: "40px",
              minWidth: 0,
              padding: 0,
            }}
          >
            <MonetizationOnIcon />
          </Button>
        </Box>

        {/*right side of the page - with all of the images*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
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
          />
        </Box>
      </Box>
    </>
  );
}
