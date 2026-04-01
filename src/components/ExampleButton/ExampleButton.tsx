import { Button } from "@adobe/react-spectrum";
import type { SpectrumButtonProps } from "@adobe/react-spectrum";

export type ExampleButtonProps = Omit<SpectrumButtonProps, "variant"> & {
  readonly variant?: SpectrumButtonProps["variant"];
};

export function ExampleButton({
  variant = "accent",
  children,
  ...props
}: ExampleButtonProps) {
  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
}
