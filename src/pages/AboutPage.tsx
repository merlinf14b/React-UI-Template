import { Heading, Content, View } from "@adobe/react-spectrum";
import { Link } from "@tanstack/react-router";

export function AboutPage() {
  return (
    <View>
      <Heading level={1}>About</Heading>
      <Content>
        <p>
          This is a reusable React SPA template with React Spectrum, TanStack
          ecosystem, TypeScript strict mode, and comprehensive testing.
        </p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </Content>
    </View>
  );
}
