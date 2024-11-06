"use client";
import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});
const MantProvider = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MantProvider;
