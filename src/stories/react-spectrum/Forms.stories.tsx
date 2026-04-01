import type { Meta, StoryObj } from "@storybook/react";
import {
  TextField,
  NumberField,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Switch,
  Picker,
  ComboBox,
  TextArea,
  Form,
  Flex,
  Item,
  Heading,
  View,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Forms",
  component: Form,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Form>;

export default meta;

export const TextFields: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-200" maxWidth="size-4600">
      <TextField label="Full Name" />
      <TextField
        label="Email Address"
        type="email"
        isRequired
        necessityIndicator="icon"
      />
      <TextField label="Username" description="Choose a unique username" />
      <TextField label="Password" type="password" />
      <TextField label="Website" />
      <TextField
        label="Invalid Email"
        defaultValue="not-an-email"
        validationState="invalid"
        errorMessage="Please enter a valid email address"
      />
      <TextField label="Disabled Field" value="Cannot edit this" isDisabled />
      <TextField label="Read-Only Field" value="Read only content" isReadOnly />
    </Flex>
  ),
};

export const TextAreas: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-200" maxWidth="size-4600">
      <TextArea label="Bio" />
      <TextArea label="Description" isRequired necessityIndicator="label" />
      <TextArea
        label="Feedback"
        defaultValue="The application runs smoothly on all tested devices."
      />
      <TextArea label="Notes" isDisabled />
    </Flex>
  ),
};

export const NumberFields: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-200" maxWidth="size-4600">
      <NumberField label="Quantity" defaultValue={1} minValue={0} />
      <NumberField
        label="Price"
        defaultValue={29.99}
        formatOptions={{ style: "currency", currency: "USD" }}
      />
      <NumberField
        label="Discount"
        defaultValue={15}
        minValue={0}
        maxValue={100}
        formatOptions={{ style: "percent" }}
      />
      <NumberField
        label="Temperature"
        defaultValue={72}
        formatOptions={{
          style: "unit",
          unit: "fahrenheit",
          unitDisplay: "long",
        }}
      />
      <NumberField label="Step Value" defaultValue={0} step={5} />
      <NumberField label="Disabled" defaultValue={42} isDisabled />
    </Flex>
  ),
};

export const CheckboxesAndRadios: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-400" maxWidth="size-4600">
      <View>
        <Heading level={3}>Checkboxes</Heading>
        <Flex direction="column" gap="size-100">
          <Checkbox defaultSelected>Accept terms and conditions</Checkbox>
          <Checkbox>Subscribe to newsletter</Checkbox>
          <Checkbox isIndeterminate>Select all items</Checkbox>
          <Checkbox isDisabled>Disabled option</Checkbox>
          <Checkbox isDisabled defaultSelected>
            Disabled and checked
          </Checkbox>
        </Flex>
      </View>

      <View>
        <Heading level={3}>Checkbox Group</Heading>
        <CheckboxGroup
          label="Favorite fruits"
          defaultValue={["apple", "banana"]}
        >
          <Checkbox value="apple">Apple</Checkbox>
          <Checkbox value="banana">Banana</Checkbox>
          <Checkbox value="cherry">Cherry</Checkbox>
          <Checkbox value="mango">Mango</Checkbox>
        </CheckboxGroup>
      </View>

      <View>
        <Heading level={3}>Radio Group</Heading>
        <RadioGroup label="Shipping Method" defaultValue="standard">
          <Radio value="standard">Standard (5-7 days) - Free</Radio>
          <Radio value="express">Express (2-3 days) - $9.99</Radio>
          <Radio value="overnight">Overnight (1 day) - $24.99</Radio>
          <Radio value="pickup" isDisabled>
            Store Pickup - Unavailable
          </Radio>
        </RadioGroup>
      </View>

      <View>
        <Heading level={3}>Radio Group with Validation</Heading>
        <RadioGroup
          label="Plan"
          isRequired
          necessityIndicator="icon"
          validationState="invalid"
          errorMessage="Please select a plan to continue"
        >
          <Radio value="free">Free</Radio>
          <Radio value="pro">Pro - $12/mo</Radio>
          <Radio value="enterprise">Enterprise - $49/mo</Radio>
        </RadioGroup>
      </View>
    </Flex>
  ),
};

export const Switches: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-200" maxWidth="size-4600">
      <Switch defaultSelected>Dark Mode</Switch>
      <Switch>Enable Notifications</Switch>
      <Switch defaultSelected>Auto-Save</Switch>
      <Switch>Two-Factor Authentication</Switch>
      <Switch isDisabled>Feature Flag (Admin Only)</Switch>
      <Switch isDisabled defaultSelected>
        System Setting (Locked)
      </Switch>
    </Flex>
  ),
};

export const PickerAndComboBox: StoryObj = {
  render: () => (
    <Flex direction="column" gap="size-300" maxWidth="size-4600">
      <Picker label="Country" placeholder="Select a country">
        <Item key="us">United States</Item>
        <Item key="ca">Canada</Item>
        <Item key="uk">United Kingdom</Item>
        <Item key="de">Germany</Item>
        <Item key="fr">France</Item>
        <Item key="jp">Japan</Item>
        <Item key="au">Australia</Item>
      </Picker>

      <Picker
        label="Priority"
        defaultSelectedKey="medium"
        isRequired
        necessityIndicator="icon"
      >
        <Item key="critical">Critical</Item>
        <Item key="high">High</Item>
        <Item key="medium">Medium</Item>
        <Item key="low">Low</Item>
      </Picker>

      <Picker label="Status" defaultSelectedKey="closed" isDisabled>
        <Item key="open">Open</Item>
        <Item key="in-progress">In Progress</Item>
        <Item key="closed">Closed</Item>
      </Picker>

      <Picker
        label="Category"
        validationState="invalid"
        errorMessage="Category is required"
      >
        <Item key="bug">Bug Report</Item>
        <Item key="feature">Feature Request</Item>
        <Item key="docs">Documentation</Item>
      </Picker>

      <ComboBox
        label="Programming Language"
        defaultItems={[
          { id: "js", name: "JavaScript" },
          { id: "ts", name: "TypeScript" },
          { id: "py", name: "Python" },
          { id: "rs", name: "Rust" },
          { id: "go", name: "Go" },
          { id: "java", name: "Java" },
          { id: "cs", name: "C#" },
          { id: "rb", name: "Ruby" },
        ]}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>

      <ComboBox
        label="City"
        isRequired
        necessityIndicator="icon"
        defaultItems={[
          { id: "nyc", name: "New York" },
          { id: "sf", name: "San Francisco" },
          { id: "la", name: "Los Angeles" },
          { id: "chi", name: "Chicago" },
          { id: "sea", name: "Seattle" },
          { id: "bos", name: "Boston" },
        ]}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ComboBox>
    </Flex>
  ),
};

export const CompleteForm: StoryObj = {
  render: () => (
    <Form maxWidth="size-4600">
      <TextField label="Full Name" isRequired necessityIndicator="icon" />
      <TextField
        label="Email"
        type="email"
        isRequired
        necessityIndicator="icon"
      />
      <NumberField label="Age" minValue={0} maxValue={150} />
      <Picker label="Department" isRequired necessityIndicator="icon">
        <Item key="eng">Engineering</Item>
        <Item key="design">Design</Item>
        <Item key="product">Product</Item>
        <Item key="marketing">Marketing</Item>
        <Item key="sales">Sales</Item>
      </Picker>
      <RadioGroup label="Employment Type" defaultValue="full-time">
        <Radio value="full-time">Full-time</Radio>
        <Radio value="part-time">Part-time</Radio>
        <Radio value="contract">Contract</Radio>
      </RadioGroup>
      <TextArea label="Cover Letter" />
      <CheckboxGroup label="Skills">
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="typescript">TypeScript</Checkbox>
        <Checkbox value="node">Node.js</Checkbox>
        <Checkbox value="python">Python</Checkbox>
      </CheckboxGroup>
      <Switch>Available for remote work</Switch>
      <Checkbox isRequired>I agree to the terms and conditions</Checkbox>
    </Form>
  ),
};
