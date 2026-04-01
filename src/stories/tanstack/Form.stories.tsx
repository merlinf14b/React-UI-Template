import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "@tanstack/react-form";
import {
  View,
  Heading,
  Text,
  TextField,
  Button,
  Flex,
  Well,
  Badge,
} from "@adobe/react-spectrum";

// ---------------------------------------------------------------------------
// Story: FieldLevelValidation
// ---------------------------------------------------------------------------

function FieldLevelValidationDemo() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
    onSubmit: ({ value }) => {
      setSubmitted(value);
    },
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Field-Level Validation</Heading>
      <Text>
        Each field has its own validation rules that run on change and on blur.
        Try submitting the form with invalid data.
      </Text>

      <View marginTop="size-200" maxWidth="size-6000">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <Flex direction="column" gap="size-200">
            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return "Name is required";
                  if (value.trim().length < 2)
                    return "Name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Name"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return "Email is required";
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Invalid email format";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Email"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="bio"
              validators={{
                onBlur: ({ value }) => {
                  if (value.length > 0 && value.length < 10)
                    return "Bio must be at least 10 characters if provided";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Bio (optional)"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <View marginTop="size-100">
              <Button type="submit" variant="accent">
                Submit
              </Button>
            </View>
          </Flex>
        </form>

        {submitted && (
          <Well marginTop="size-200">
            <Heading level={4}>Submitted Values</Heading>
            <Flex direction="column" gap="size-50">
              <Text>
                <strong>Name:</strong> {submitted.name}
              </Text>
              <Text>
                <strong>Email:</strong> {submitted.email}
              </Text>
              <Text>
                <strong>Bio:</strong> {submitted.bio || "(empty)"}
              </Text>
            </Flex>
          </Well>
        )}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Story: FormLevelValidation
// ---------------------------------------------------------------------------

function FormLevelValidationDemo() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      if (value.password !== value.confirmPassword) {
        setFormError("Passwords do not match");
        return;
      }
      setFormError(null);
      setSubmitted(value);
    },
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Form-Level Validation</Heading>
      <Text>
        Form-level validation runs on submit and can cross-validate multiple
        fields together (e.g. password confirmation).
      </Text>

      <View marginTop="size-200" maxWidth="size-6000">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFormError(null);
            void form.handleSubmit();
          }}
        >
          <Flex direction="column" gap="size-200">
            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 8)
                    return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value))
                    return "Password must contain an uppercase letter";
                  if (!/[0-9]/.test(value))
                    return "Password must contain a number";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Password"
                    type="password"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Please confirm your password";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            {formError && <Badge variant="negative">{formError}</Badge>}

            <View marginTop="size-100">
              <Button type="submit" variant="accent">
                Set Password
              </Button>
            </View>
          </Flex>
        </form>

        {submitted && (
          <Well marginTop="size-200">
            <Flex alignItems="center" gap="size-100">
              <Badge variant="positive">Success</Badge>
              <Text>Password has been set.</Text>
            </Flex>
          </Well>
        )}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Story: AsyncValidation
// ---------------------------------------------------------------------------

function AsyncValidationDemo() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );

  const TAKEN_USERNAMES = ["admin", "root", "user", "test", "moderator"];

  const form = useForm({
    defaultValues: {
      username: "",
      displayName: "",
    },
    onSubmit: ({ value }) => {
      setSubmitted(value);
    },
  });

  return (
    <View padding="size-300">
      <Heading level={2}>Async Validation</Heading>
      <Text>
        The username field performs an async check (simulated server call with a
        500ms delay) to verify the username is not already taken. Try typing
        &quot;admin&quot;, &quot;root&quot;, or &quot;test&quot;.
      </Text>

      <View marginTop="size-200" maxWidth="size-6000">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <Flex direction="column" gap="size-200">
            <form.Field
              name="username"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return "Username is required";
                  if (value.length < 3)
                    return "Username must be at least 3 characters";
                  if (!/^[a-zA-Z0-9_]+$/.test(value))
                    return "Username can only contain letters, numbers, and underscores";
                  return undefined;
                },
                onBlurAsync: async ({ value }) => {
                  // Simulate API call
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  if (TAKEN_USERNAMES.includes(value.toLowerCase())) {
                    return `Username "${value}" is already taken`;
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Username"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    description="Try 'admin', 'root', or 'test' to see async validation"
                    width="100%"
                  />
                  {field.state.meta.isValidating && (
                    <Text
                      UNSAFE_style={{
                        fontSize: 12,
                        color: "#888",
                        marginTop: 4,
                      }}
                    >
                      Checking availability...
                    </Text>
                  )}
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                  {!field.state.meta.isValidating &&
                    field.state.meta.errors.length === 0 &&
                    field.state.value.length >= 3 && (
                      <Text
                        UNSAFE_style={{
                          color: "var(--spectrum-positive-color-900)",
                          fontSize: 12,
                          marginTop: 4,
                        }}
                      >
                        Username is available
                      </Text>
                    )}
                </View>
              )}
            </form.Field>

            <form.Field
              name="displayName"
              validators={{
                onBlur: ({ value }) => {
                  if (!value.trim()) return "Display name is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <View>
                  <TextField
                    label="Display Name"
                    value={field.state.value}
                    onChange={(v) => {
                      field.handleChange(v);
                    }}
                    onBlur={field.handleBlur}
                    {...(field.state.meta.errors.length > 0
                      ? { isInvalid: true }
                      : {})}
                    width="100%"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <Text
                      UNSAFE_style={{
                        color: "var(--spectrum-negative-color-900)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <View marginTop="size-100">
              <Button type="submit" variant="accent">
                Create Account
              </Button>
            </View>
          </Flex>
        </form>

        {submitted && (
          <Well marginTop="size-200">
            <Heading level={4}>Account Created</Heading>
            <Flex direction="column" gap="size-50">
              <Text>
                <strong>Username:</strong> {submitted.username}
              </Text>
              <Text>
                <strong>Display Name:</strong> {submitted.displayName}
              </Text>
            </Flex>
          </Well>
        )}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "TanStack/Form",
  parameters: {
    docs: {
      description: {
        component:
          "Showcases @tanstack/react-form with field-level validation, form-level cross-field validation, and async validation. Forms are rendered with React Spectrum components.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FieldLevelValidation: Story = {
  render: () => <FieldLevelValidationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates field-level validators for required fields, minimum length, and email format. Validation runs on blur and errors display beneath each field.",
      },
    },
  },
};

export const FormLevelValidation: Story = {
  render: () => <FormLevelValidationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows form-level validation that cross-validates the password and confirm password fields on submit. Individual fields also have their own validators.",
      },
    },
  },
};

export const AsyncValidation: Story = {
  render: () => <AsyncValidationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "The username field uses onBlurAsync to simulate a server-side availability check with a 500ms delay. Try reserved names like 'admin' or 'test' to trigger validation errors.",
      },
    },
  },
};
