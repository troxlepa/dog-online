import React from "react";

import Container from "@mui/material/Container";

import Loading from "../components/Loading";

function LoadingPage() {
  return (
    <Container sx={{ p: 6, textAlign: 'center' }}>
      <Loading />
    </Container>
  );
}

export default LoadingPage;
