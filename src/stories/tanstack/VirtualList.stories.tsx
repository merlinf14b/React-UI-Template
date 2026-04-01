import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { View, Heading, Text, Flex } from "@adobe/react-spectrum";

// ---------------------------------------------------------------------------
// Story: BasicVirtualList - 10,000 uniform rows
// ---------------------------------------------------------------------------

function BasicVirtualListDemo() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 10_000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Virtual List (10,000 items)</Heading>
      <Text>
        Only the visible rows are rendered in the DOM. Scroll to see
        virtualization in action.
      </Text>

      <div
        ref={parentRef}
        style={{
          height: 400,
          overflow: "auto",
          border: "1px solid var(--spectrum-gray-300)",
          borderRadius: 4,
          marginTop: 12,
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualRow.size,
                transform: `translateY(${String(virtualRow.start)}px)`,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                borderBottom: "1px solid var(--spectrum-gray-200)",
                backgroundColor:
                  virtualRow.index % 2 === 0
                    ? "var(--spectrum-gray-50)"
                    : "var(--spectrum-gray-100)",
              }}
            >
              <Text>Row {virtualRow.index + 1}</Text>
            </div>
          ))}
        </div>
      </div>

      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        DOM nodes rendered: {virtualizer.getVirtualItems().length} of 10,000
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Story: VariableHeightRows
// ---------------------------------------------------------------------------

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "TanStack Virtual renders only what is visible, keeping your app fast no matter how large the list.",
  "Short row.",
  "Virtualization is a technique where only items currently visible in the viewport are rendered in the DOM, drastically reducing the number of DOM nodes and improving performance for large datasets.",
  "Hello!",
  "Storybook is a frontend workshop for building UI components and pages in isolation.",
  "This row has medium length content for demonstration purposes.",
];

function getRowContent(index: number): string {
  const sentence = SENTENCES[index % SENTENCES.length] ?? "";
  return `#${String(index + 1)} - ${sentence}`;
}

function VariableHeightDemo() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 10_000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Variable Height Rows</Heading>
      <Text>
        Each row has dynamic content that determines its height. The virtualizer
        measures rows after render.
      </Text>

      <div
        ref={parentRef}
        style={{
          height: 400,
          overflow: "auto",
          border: "1px solid var(--spectrum-gray-300)",
          borderRadius: 4,
          marginTop: 12,
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${String(virtualRow.start)}px)`,
                padding: "8px 12px",
                borderBottom: "1px solid var(--spectrum-gray-200)",
                backgroundColor:
                  virtualRow.index % 2 === 0
                    ? "var(--spectrum-gray-50)"
                    : "var(--spectrum-gray-100)",
              }}
            >
              <Text>{getRowContent(virtualRow.index)}</Text>
            </div>
          ))}
        </div>
      </div>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Story: HorizontalVirtualList
// ---------------------------------------------------------------------------

function HorizontalVirtualListDemo() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    horizontal: true,
    count: 10_000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Horizontal Virtual List</Heading>
      <Text>
        A horizontally scrolling virtualized list with 10,000 columns.
      </Text>

      <div
        ref={parentRef}
        style={{
          width: "100%",
          height: 150,
          overflow: "auto",
          border: "1px solid var(--spectrum-gray-300)",
          borderRadius: 4,
          marginTop: 12,
        }}
      >
        <div
          style={{
            width: virtualizer.getTotalSize(),
            height: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualCol) => (
            <div
              key={virtualCol.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: virtualCol.size,
                transform: `translateX(${String(virtualCol.start)}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid var(--spectrum-gray-200)",
                backgroundColor:
                  virtualCol.index % 2 === 0
                    ? "var(--spectrum-gray-50)"
                    : "var(--spectrum-gray-100)",
              }}
            >
              <Flex direction="column" alignItems="center" gap="size-50">
                <Text UNSAFE_style={{ fontWeight: 600 }}>
                  Col {virtualCol.index + 1}
                </Text>
                <Text UNSAFE_style={{ fontSize: 12, color: "#666" }}>
                  Item data
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>

      <Text UNSAFE_style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
        DOM nodes rendered: {virtualizer.getVirtualItems().length} of 10,000
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "TanStack/VirtualList",
  parameters: {
    docs: {
      description: {
        component:
          "Showcases @tanstack/react-virtual with useVirtualizer for rendering large lists efficiently. Only visible items are in the DOM.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicVirtualList: Story = {
  render: () => <BasicVirtualListDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "A virtual list of 10,000 rows with uniform 40px height. The virtualizer only renders items visible in the scrollable viewport.",
      },
    },
  },
};

export const VariableHeightRows: Story = {
  render: () => <VariableHeightDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Rows have varying content lengths. The virtualizer measures each element after render using measureElement for accurate positioning.",
      },
    },
  },
};

export const HorizontalList: Story = {
  render: () => <HorizontalVirtualListDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "A horizontally scrolling virtualized list with 10,000 columns, using the horizontal option of useVirtualizer.",
      },
    },
  },
};
