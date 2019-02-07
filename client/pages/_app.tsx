import { MuiThemeProvider } from "@material-ui/core";
import App, { Container } from "next/app";
import React from "react";
import "../styles/default.scss";
import theme from "../util/theme";

class CustomApp extends App {

  public render() {
    const { Component } = this.props;
    return (
      <Container>
        <MuiThemeProvider theme={theme}>
          <Component />
        </MuiThemeProvider>
      </Container>
    );
  }
}

export default CustomApp;
