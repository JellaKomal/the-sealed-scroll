# Accordion Component

A customizable, accessible Accordion component built with React and Radix UI's `Accordion` primitive. This component allows users to toggle content visibility with a trigger, supporting multiple styling variants and flexible configurations for diverse use cases.

## Features

- **Variants**: Choose from `default`, `bordered`, or `bottom-border` styles for different visual appearances.
- **Trigger Positioning**: Place the trigger icon on the `left` or `right` side of the title.
- **Controlled and Uncontrolled Modes**: Manage the open state externally (controlled) or internally (uncontrolled) with a default open state.
- **Accessibility**: ARIA attributes ensure compatibility and usability for screen readers.
- **Customizable**: Apply custom classNames for the trigger, content, and wrapper, and pass additional props to the underlying Radix `Accordion` primitive.
- **Icon Support**: Include an optional icon alongside the title for enhanced visual context.
- **Disabled State**: Disable the accordion item to prevent interaction when needed.

## Installation

To use the Accordion component, ensure you have the following dependencies installed in your project:

```bash
npm install @radix-ui/react-accordion
```

The component also relies on a utility function `cn` from `@/lib/utils` for class name concatenation (e.g Advance Utility). You can use libraries like `clsx` and `tailwind-merge` to achieve this:

```bash
npm install clsx tailwind-merge
```

### Example Utility Setup (`@/lib/utils`)

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Place the Accordion component in your project (e.g., `@/components/Accordion.tsx`) and import it as needed.

## Usage

### Basic Example

Render a simple accordion with default styling:

```jsx
import { Accordion } from '@/components/Accordion';

function App() {
  return (
    <Accordion
      title="What is an Accordion?"
      content="An accordion is a UI component that toggles the visibility of content when a trigger is clicked."
    />
  );
}
```

### Advanced Example with Variants and Icons

Use a bordered variant with a custom icon and trigger position:

```jsx
import { Accordion } from '@/components/Accordion';
import { ChevronDown } from 'lucide-react';

function App() {
  return (
    <Accordion
      variant="bordered"
      triggerPosition="left"
      title="Advanced Settings"
      titleIcon={<ChevronDown size={20} />}
      content="Configure advanced settings for your application here."
      defaultOpen={true}
    />
  );
}
```

### Controlled Accordion

Manage the open state externally:

```jsx
import { useState } from 'react';
import { Accordion } from '@/components/Accordion';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      title="Controlled Accordion"
      content="This accordion's state is controlled via props."
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
```

## Props

The `Accordion` component accepts the following props:

| Prop              | Type                           | Default       | Description                                                                 |
|-------------------|--------------------------------|---------------|-----------------------------------------------------------------------------|
| `variant`         | `"default" \| "bordered" \| "bottom-border"` | `"default"` | Styling variant for the accordion.                                          |
| `triggerPosition` | `"left" \| "right"`           | `"right"`     | Position of the trigger icon relative to the title.                         |
| `title`           | `string \| React.ReactNode`   | `"Accordion Title"` | The title of the accordion, can be a string or custom JSX.            |
| `titleIcon`       | `React.ReactNode`             | `undefined`   | Optional icon to display alongside the title.                               |
| `content`         | `string \| React.ReactNode`   | `"Accordion Content"` | The content to display when the accordion is open.                |
| `open`            | `boolean`                     | `undefined`   | Controlled open state. If provided, the component is controlled.            |
| `defaultOpen`     | `boolean`                     | `false`       | Initial open state for uncontrolled mode.                                   |
| `onOpenChange`    | `(open: boolean) => void`     | `undefined`   | Callback triggered when the accordion's open state changes.                 |
| `titleClassName`  | `string`                      | `undefined`   | Additional class names for the trigger element.                             |
| `contentClassName`| `string`                      | `undefined`   | Additional class names for the content element.                             |
| `className`       | `string`                      | `undefined`   | Additional class names for the root accordion element.                      |
| `itemValue`       | `string`                      | `"item-1"`    | Unique value for the accordion item (used for Radix `Accordion` value).     |
| `id`              | `string`                      | `undefined`   | Custom ID for the accordion trigger (defaults to `accordion-trigger-{itemValue}`). |
| `disabled`        | `boolean`                     | `false`       | Disables the accordion item, preventing interaction.                        |
| `triggerProps`    | `React.ButtonHTMLAttributes<HTMLButtonElement>` | `{}` | Additional props to pass to the trigger button.                     |
| `...rest`         | `any`                         | -             | Additional props passed to the Radix `Accordion` primitive.                 |

## Styling

The component uses Tailwind CSS for styling, with the following variant-specific classes:

- **default**: No border, minimal styling.
- **bordered**: Full border with rounded corners and a hover background effect (`hover:bg-[#F5F5F5]`).
- **bottom-border**: Bottom border only with a hover underline effect.

You can extend styles by passing `className`, `titleClassName`, or `contentClassName` props. For example:

```jsx
<Accordion
  className="bg-gray-100"
  titleClassName="text-lg font-bold"
  contentClassName="text-sm text-gray-600"
/>
```

## Accessibility

The component is built with accessibility in mind, leveraging Radix UI's `Accordion` primitive. Key features include:

- **ARIA Attributes**: Proper `aria-expanded`, `aria-controls`, and `role="region"` attributes for screen reader compatibility.
- **Keyboard Navigation**: Supports keyboard interaction (e.g., Enter/Space to toggle).
- **Disabled State**: Properly handles the `disabled` prop to prevent interaction.

Ensure that any custom `titleIcon` or content passed maintains accessibility (e.g., include `aria-label` for icons if needed).

## Notes

- The component depends on `@radix-ui/react-accordion`. Ensure it’s installed and configured correctly.
- The `cn` utility is used for class name management. Replace it with your preferred utility if needed.
- For complex content, pass `React.ReactNode` to `title` or `content` to include custom JSX.
- The `triggerProps` prop allows passing additional attributes (e.g., `onClick`) to the trigger button.

## License

MIT License