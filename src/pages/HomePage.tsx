import { Heading, Content, View } from "@adobe/react-spectrum";
import { Link } from "@tanstack/react-router";

export function HomePage() {
  return (
    <View>
      <Heading level={1}>React UI Template</Heading>
      <Content>
        <p>
          Welcome to your new React SPA. This template includes React Spectrum,
          TanStack Router, Query, Virtual, Table, and Form.
        </p>
        <p>
          <Link to="/about">About this template</Link>
        </p>
      </Content>
    </View>
  );
}
