import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  View,
  Heading,
  Text,
  Button,
  ProgressCircle,
  Flex,
  Well,
  Badge,
} from "@adobe/react-spectrum";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "Review pull request", completed: false },
  { id: 2, title: "Write unit tests", completed: true },
  { id: 3, title: "Update documentation", completed: false },
  { id: 4, title: "Deploy to staging", completed: true },
  { id: 5, title: "Fix login page bug", completed: false },
];

function createStoryQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Story: BasicQuery
// ---------------------------------------------------------------------------

function BasicQueryDemo() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return INITIAL_TODOS;
    },
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Todo List (useQuery)</Heading>
      <Text>
        Data is fetched with a simulated 1.2s delay. Click refetch to reload.
      </Text>

      <View marginTop="size-200" marginBottom="size-200">
        <Button variant="primary" onPress={() => void refetch()}>
          Refetch
        </Button>
      </View>

      {isLoading && (
        <Flex alignItems="center" gap="size-100" marginY="size-200">
          <ProgressCircle aria-label="Loading" isIndeterminate size="S" />
          <Text>Loading todos...</Text>
        </Flex>
      )}

      {isError && (
        <Well marginY="size-200">
          <Text>
            <strong>Error:</strong> {error.message}
          </Text>
        </Well>
      )}

      {data && (
        <View marginTop="size-200">
          {data.map((todo) => (
            <Flex
              key={todo.id}
              alignItems="center"
              gap="size-100"
              marginBottom="size-100"
            >
              <Badge variant={todo.completed ? "positive" : "neutral"}>
                {todo.completed ? "Done" : "Pending"}
              </Badge>
              <Text>{todo.title}</Text>
            </Flex>
          ))}
        </View>
      )}
    </View>
  );
}

function BasicQueryWrapper() {
  const [client] = useState(() => createStoryQueryClient());
  return (
    <QueryClientProvider client={client}>
      <BasicQueryDemo />
    </QueryClientProvider>
  );
}

// ---------------------------------------------------------------------------
// Story: LoadingErrorSuccess
// ---------------------------------------------------------------------------

type FetchState = "loading" | "error" | "success";

function LoadingErrorSuccessDemo() {
  const [forcedState, setForcedState] = useState<FetchState>("loading");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["states-demo", forcedState],
    queryFn: async (): Promise<string> => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (forcedState === "error") {
        throw new Error("Something went wrong! (simulated error)");
      }
      return "Data loaded successfully.";
    },
    enabled: true,
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Loading / Error / Success States</Heading>
      <Text>Select which state to demonstrate:</Text>

      <Flex gap="size-100" marginY="size-200">
        <Button
          variant={forcedState === "loading" ? "accent" : "secondary"}
          onPress={() => {
            setForcedState("loading");
          }}
        >
          Loading
        </Button>
        <Button
          variant={forcedState === "error" ? "accent" : "secondary"}
          onPress={() => {
            setForcedState("error");
          }}
        >
          Error
        </Button>
        <Button
          variant={forcedState === "success" ? "accent" : "secondary"}
          onPress={() => {
            setForcedState("success");
          }}
        >
          Success
        </Button>
      </Flex>

      <Well>
        {isLoading && (
          <Flex alignItems="center" gap="size-100">
            <ProgressCircle aria-label="Loading" isIndeterminate size="S" />
            <Text>Fetching data...</Text>
          </Flex>
        )}
        {isError && (
          <Text UNSAFE_style={{ color: "var(--spectrum-negative-color-900)" }}>
            Error: {error.message}
          </Text>
        )}
        {data && (
          <Text UNSAFE_style={{ color: "var(--spectrum-positive-color-900)" }}>
            {data}
          </Text>
        )}
      </Well>
    </View>
  );
}

function LoadingErrorSuccessWrapper() {
  const [client] = useState(() => createStoryQueryClient());
  return (
    <QueryClientProvider client={client}>
      <LoadingErrorSuccessDemo />
    </QueryClientProvider>
  );
}

// ---------------------------------------------------------------------------
// Story: OptimisticMutation
// ---------------------------------------------------------------------------

function OptimisticMutationDemo() {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["mutation-todos"],
    queryFn: async (): Promise<Todo[]> => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return [...INITIAL_TODOS];
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (todoId: number): Promise<Todo> => {
      // Simulate server delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const todo = INITIAL_TODOS.find((t) => t.id === todoId);
      if (!todo) throw new Error("Todo not found");
      return { ...todo, completed: !todo.completed };
    },
    onMutate: async (todoId: number) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["mutation-todos"] });

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData<Todo[]>([
        "mutation-todos",
      ]);

      // Optimistically update
      queryClient.setQueryData<Todo[]>(["mutation-todos"], (old) =>
        old?.map((t) =>
          t.id === todoId ? { ...t, completed: !t.completed } : t,
        ),
      );

      return { previousTodos };
    },
    onError: (_err, _todoId, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(["mutation-todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["mutation-todos"] });
    },
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Optimistic Mutation (useMutation)</Heading>
      <Text>
        Click a todo to toggle its status. The UI updates immediately
        (optimistically) while the server request completes in the background.
      </Text>

      <View marginTop="size-200">
        {todos?.map((todo) => (
          <Flex
            key={todo.id}
            alignItems="center"
            gap="size-100"
            marginBottom="size-100"
          >
            <Button
              variant="secondary"
              onPress={() => {
                toggleMutation.mutate(todo.id);
              }}
              isDisabled={toggleMutation.isPending}
            >
              Toggle
            </Button>
            <Badge variant={todo.completed ? "positive" : "neutral"}>
              {todo.completed ? "Done" : "Pending"}
            </Badge>
            <Text>{todo.title}</Text>
          </Flex>
        )) ?? (
          <Flex alignItems="center" gap="size-100">
            <ProgressCircle aria-label="Loading" isIndeterminate size="S" />
            <Text>Loading...</Text>
          </Flex>
        )}
      </View>

      {toggleMutation.isPending && (
        <Flex alignItems="center" gap="size-100" marginTop="size-200">
          <ProgressCircle aria-label="Saving" isIndeterminate size="S" />
          <Text>Saving change...</Text>
        </Flex>
      )}
    </View>
  );
}

function OptimisticMutationWrapper() {
  const [client] = useState(() => createStoryQueryClient());
  return (
    <QueryClientProvider client={client}>
      <OptimisticMutationDemo />
    </QueryClientProvider>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "TanStack/Query",
  parameters: {
    docs: {
      description: {
        component:
          "Showcases @tanstack/react-query patterns including data fetching with useQuery, loading/error/success state management, and optimistic mutations with useMutation.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicQuery: Story = {
  render: () => <BasicQueryWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates useQuery with a simulated async fetch and a refetch button. Each story gets its own QueryClient to avoid shared state.",
      },
    },
  },
};

export const LoadingErrorSuccess: Story = {
  render: () => <LoadingErrorSuccessWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Allows toggling between loading, error, and success query states to see how each is rendered.",
      },
    },
  },
};

export const OptimisticMutation: Story = {
  render: () => <OptimisticMutationWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows useMutation with optimistic updates. The UI toggles immediately while the mutation resolves, with automatic rollback on failure.",
      },
    },
  },
};
