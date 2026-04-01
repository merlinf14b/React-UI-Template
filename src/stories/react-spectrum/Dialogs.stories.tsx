import type { Meta, StoryObj } from "@storybook/react";
import {
  DialogTrigger,
  Dialog,
  AlertDialog,
  Button,
  ButtonGroup,
  Heading,
  Content,
  Text,
  Divider,
  Flex,
  TextField,
  TextArea,
  Form,
  View,
} from "@adobe/react-spectrum";

const meta = {
  title: "React Spectrum/Dialogs",
  component: DialogTrigger,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DialogTrigger>;

export default meta;

export const BasicDialog: StoryObj = {
  render: () => (
    <DialogTrigger>
      <Button variant="accent">Open Dialog</Button>
      {(close) => (
        <Dialog>
          <Heading>Welcome to the Project</Heading>
          <Divider />
          <Content>
            <Text>
              Thank you for joining the team. This dialog provides a brief
              overview of your project setup and the next steps to get started.
              Please review the onboarding checklist before proceeding.
            </Text>
          </Content>
          <ButtonGroup>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button variant="accent" onPress={close}>
              Get Started
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  ),
};

export const FormDialog: StoryObj = {
  render: () => (
    <DialogTrigger>
      <Button variant="primary">Create New Task</Button>
      {(close) => (
        <Dialog>
          <Heading>New Task</Heading>
          <Divider />
          <Content>
            <Form>
              <TextField label="Task Name" isRequired autoFocus />
              <TextArea label="Description" />
              <TextField label="Assignee" />
            </Form>
          </Content>
          <ButtonGroup>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button variant="accent" onPress={close}>
              Create Task
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  ),
};

export const DismissableDialog: StoryObj = {
  render: () => (
    <DialogTrigger isDismissable>
      <Button variant="secondary">View Details</Button>
      <Dialog>
        <Heading>Server Status Report</Heading>
        <Divider />
        <Content>
          <Flex direction="column" gap="size-150">
            <Text>
              <strong>Region:</strong> US East (Virginia)
            </Text>
            <Text>
              <strong>Uptime:</strong> 99.98% over the last 30 days
            </Text>
            <Text>
              <strong>Active Connections:</strong> 12,847
            </Text>
            <Text>
              <strong>CPU Usage:</strong> 42%
            </Text>
            <Text>
              <strong>Memory:</strong> 68% of 32 GB allocated
            </Text>
            <Text>
              All systems are operating normally. No incidents reported in the
              last 72 hours.
            </Text>
          </Flex>
        </Content>
      </Dialog>
    </DialogTrigger>
  ),
};

export const ConfirmationAlertDialog: StoryObj = {
  render: () => (
    <Flex gap="size-200" wrap>
      <DialogTrigger>
        <Button variant="negative">Delete Project</Button>
        <AlertDialog
          title="Delete Project"
          variant="destructive"
          primaryActionLabel="Delete"
          secondaryActionLabel="Keep"
          cancelLabel="Cancel"
        >
          Are you sure you want to delete the project &quot;Acme
          Dashboard&quot;? This action is permanent and cannot be undone. All
          associated tasks, files, and history will be removed.
        </AlertDialog>
      </DialogTrigger>

      <DialogTrigger>
        <Button variant="primary">Publish Changes</Button>
        <AlertDialog
          title="Publish to Production"
          variant="confirmation"
          primaryActionLabel="Publish"
          cancelLabel="Cancel"
        >
          You are about to publish 14 changes to the production environment.
          Please ensure all changes have been reviewed and tested before
          proceeding.
        </AlertDialog>
      </DialogTrigger>

      <DialogTrigger>
        <Button variant="secondary">Check Status</Button>
        <AlertDialog
          title="Deployment Complete"
          variant="information"
          primaryActionLabel="OK"
          cancelLabel="Dismiss"
        >
          Version 2.4.1 has been successfully deployed to all regions. The new
          features are now live and available to all users.
        </AlertDialog>
      </DialogTrigger>
    </Flex>
  ),
};

export const WarningAlertDialog: StoryObj = {
  render: () => (
    <Flex gap="size-200" wrap>
      <DialogTrigger>
        <Button variant="primary">Transfer Ownership</Button>
        <AlertDialog
          title="Transfer Project Ownership"
          variant="warning"
          primaryActionLabel="Transfer"
          cancelLabel="Cancel"
        >
          Transferring ownership to another user will revoke your admin
          privileges. You will retain contributor access unless the new owner
          changes your permissions.
        </AlertDialog>
      </DialogTrigger>

      <DialogTrigger>
        <Button variant="negative">Reset All Data</Button>
        <AlertDialog
          title="Reset Application Data"
          variant="destructive"
          primaryActionLabel="Reset Everything"
          secondaryActionLabel="Reset Settings Only"
          cancelLabel="Cancel"
        >
          This will erase all user data, preferences, and cached content. You
          may choose to reset only settings, which preserves your saved content.
        </AlertDialog>
      </DialogTrigger>
    </Flex>
  ),
};

export const MultipleDialogSizes: StoryObj = {
  render: () => (
    <Flex gap="size-200" wrap>
      <DialogTrigger>
        <Button variant="secondary">Small Dialog</Button>
        {(close) => (
          <Dialog size="S">
            <Heading>Quick Confirmation</Heading>
            <Divider />
            <Content>
              <Text>Save your changes before leaving?</Text>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                Discard
              </Button>
              <Button variant="accent" onPress={close}>
                Save
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>

      <DialogTrigger>
        <Button variant="secondary">Medium Dialog</Button>
        {(close) => (
          <Dialog size="M">
            <Heading>Edit User Profile</Heading>
            <Divider />
            <Content>
              <Form>
                <TextField label="Display Name" defaultValue="Jane Cooper" />
                <TextField
                  label="Email"
                  defaultValue="jane.cooper@example.com"
                />
                <TextArea
                  label="Bio"
                  defaultValue="Senior product designer with 8 years of experience in enterprise software."
                />
              </Form>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button variant="accent" onPress={close}>
                Save Profile
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>

      <DialogTrigger>
        <Button variant="secondary">Large Dialog</Button>
        {(close) => (
          <Dialog size="L">
            <Heading>Release Notes - Version 3.0</Heading>
            <Divider />
            <Content>
              <Flex direction="column" gap="size-200">
                <View>
                  <Heading level={4}>New Features</Heading>
                  <Text>
                    Redesigned dashboard with customizable widgets, real-time
                    collaboration tools, and a new dark mode theme. Added
                    support for 12 additional languages.
                  </Text>
                </View>
                <View>
                  <Heading level={4}>Improvements</Heading>
                  <Text>
                    Improved page load times by 40%, reduced bundle size by 25%,
                    and enhanced accessibility across all components. Search now
                    supports fuzzy matching and filters.
                  </Text>
                </View>
                <View>
                  <Heading level={4}>Bug Fixes</Heading>
                  <Text>
                    Fixed 23 reported issues including table sorting errors,
                    notification delays, and form validation edge cases.
                  </Text>
                </View>
              </Flex>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                Close
              </Button>
              <Button variant="accent" onPress={close}>
                Update Now
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
    </Flex>
  ),
};
