# Alert Component

A versatile, accessible Alert component built with React and Radix UI's `Alert` primitive. This component displays notifications with customizable types, variants, positions, and actions, suitable for warnings, errors, informational messages, or success confirmations.

## Features

- **Alert Types**: Supports `warning`, `error`, `info`, and `success` types, each with distinct default icons and colors.
- **Variants**: Choose from `solid`, `outline`, `soft`, or `bordered` styles for different visual appearances.
- **Positioning**: Place alerts at `top-left`, `top-right`, `bottom-left`, `bottom-right`, or `center` of the screen.
- **Actions**: Include optional confirmation buttons, custom actions, and a close button with various styles.
- **Auto-Dismiss**: Automatically close the alert after a specified duration using the `dismissAfter` prop.
- **Controlled Visibility**: Manage the alert’s visibility with the `open` prop or internally via state.
- **Accessibility**: ARIA attributes ensure compatibility with screen readers, with configurable `role` and `aria-live` settings.
- **Customizable**: Apply custom classNames for the wrapper, icon, title, and description, and pass additional props to the Radix `Alert` primitive.

## Installation

To use the Alert component, ensure the following dependencies are installed in your project:

```bash
npm install @radix-ui/react-alert clsx lucide-react
```

The component uses `clsx` for class name management. If you’re using Tailwind CSS, you may also need `tailwind-merge` for the `cn` utility (if referenced in your project):

```bash
npm install tailwind-merge
```

### Example Utility Setup (`@/lib/utils`)

If your project uses a `cn` utility for class names (as in the Accordion component), set it up like this:

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Place the Alert component in your project (e.g., `@/components/Alert.tsx`) and import it as needed. Ensure the `Button` component from `@/components/ui/button` is available or replaced with your preferred button component.

## Usage

### Basic Example

Render a simple info alert with default settings:

```jsx
import { Alert } from '@/components/Alert';

function App() {
  return (
    <Alert
      title="Information"
      description="This is an informational message."
      alertType="info"
    />
  );
}
```

### Alert with Auto-Dismiss and Custom Position

Display a success alert that auto-dismisses after 3 seconds, positioned at the top-right:

```jsx
import { Alert } from '@/components/Alert';

function App() {
  return (
    <Alert
      alertType="success"
      title="Success!"
      description="Your action was completed successfully."
      position="top-right"
      dismissAfter={3000}
    />
  );
}
```

### Alert with Confirmation and Close Buttons

Create an alert with a confirmation button and a custom close button style:

```jsx
import { Alert } from '@/components/Alert';

function App() {
  return (
    <Alert
      alertType="warning"
      title="Confirm Action"
      description="Are you sure you want to proceed?"
      confirmationButtonText="Confirm"
      closeButtonType="text"
      onConfirm={() => console.log('Confirmed!')}
      onClose={() => console.log('Closed!')}
      actionVariant="right-bottom"
    />
  );
}
```

### Controlled Alert

Manage the alert’s visibility externally:

```jsx
import { useState } from 'react';
import { Alert } from '@/components/Alert';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Alert
      alertType="error"
      title="Error"
      description="An error occurred. Please try again."
      open={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
```

## Props

The `Alert` component accepts the following props:

| Prop                    | Type                                   | Default              | Description                                                                 |
|-------------------------|----------------------------------------|----------------------|-----------------------------------------------------------------------------|
| `iconType`              | `"default" \| "bordered"`             | `"default"`          | Style of the icon wrapper (bordered adds a border around the icon).         |
| `alertType`             | `"warning" \| "error" \| "info" \| "success"` | `"info"`       | Type of alert, determining default icon and border color.                   |
| `actionVariant`         | `"right" \| "right-bottom" \| "right-justify"` | `"right-justify"` | Layout of action buttons (confirmation, close, or custom actions).          |
| `title`                 | `string`                              | `"Notice"`           | The title of the alert.                                                    |
| `description`           | `string`                              | `"This is an alert message."` | The description text of the alert.                                |
| `icon`                  | `React.ReactNode`                     | `undefined`          | Custom icon to replace the default alert-type icon.                         |
| `closeButton`           | `boolean`                             | `true`               | Whether to show a close button.                                            |
| `confirmationButtonText`| `string`                              | `undefined`          | Text for the confirmation button (if provided, shows the button).           |
| `closeButtonTextType`   | `"default" \| "underline"`            | `"default"`          | Style of the close button text.                                            |
| `confirmButtonTextType` | `"default" \| "underline"`            | `"default"`          | Style of the confirmation button text.                                     |
| `onConfirm`             | `() => void`                          | `undefined`          | Callback triggered when the confirmation button is clicked.                 |
| `onClose`               | `() => void`                          | `undefined`          | Callback triggered when the close button is clicked or auto-dismiss occurs. |
| `open`                  | `boolean`                             | `true`               | Controlled visibility state. If provided, the component is controlled.      |
| `actions`               | `React.ReactNode`                     | `undefined`          | Custom action elements to render alongside buttons.                         |
| `variant`               | `"solid" \| "outline" \| "soft" \| "bordered"` | `"outline"` | Visual style of the alert.                                                 |
| `dismissAfter`          | `number`                              | `undefined`          | Duration (in milliseconds) after which the alert auto-dismisses.            |
| `position`              | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "center"` | `undefined` | Screen position for fixed alerts.                                          |
| `closeButtonType`       | `"icon" \| "ghost-text" \| "text" \| "outline"` | `"icon"` | Style of the close button (e.g., icon-only or text).                        |
| `confirmButtonType`     | `"ghost-text" \| "primary-text" \| "outline"` | `"ghost-text"` | Style of the confirmation button.                                          |
| `wrapperClassName`      | `string`                              | `undefined`          | Additional class names for the alert wrapper.                               |
| `iconWrapperClassName`  | `string`                              | `undefined`          | Additional class names for the icon wrapper.                                |
| `titleClassName`        | `string`                              | `undefined`          | Additional class names for the title.                                       |
| `descriptionClassName`  | `string`                              | `undefined`          | Additional class names for the description.                                 |
| `role`                 | `string`                              | `"alert"`            | ARIA role for accessibility (e.g., `alert` or `alertdialog`).               |
| `ariaLabel`             | `string`                              | `undefined`          | ARIA label for accessibility.                                               |
| `ariaLive`              | `"polite" \| "assertive"`             | `"polite"`           | ARIA live region setting for screen readers.                               |

## Styling

The component uses Tailwind CSS for styling, with the following configurations:

- **Alert Types**: Each type (`warning`, `error`, `info`, `success`) applies specific border or icon colors (e.g., `border-[#EF4444]` for `error`).
- **Variants**:
  - `solid`: Semi-transparent background with no border.
  - `outline`: Border with white background.
  - `soft`: Light gray background with a subtle border.
  - `bordered`: Border with white background and type-specific border color.
- **Positioning**: Fixed positioning styles for `top-left`, `top-right`, `bottom-left`, `bottom-right`, or `center` (with transform for centering).

Customize styles using `wrapperClassName`, `iconWrapperClassName`, `titleClassName`, or `descriptionClassName`. For example:

```jsx
<Alert
  wrapperClassName="bg-blue-50"
  titleClassName="text-lg font-bold"
  descriptionClassName="text-sm text-gray-700"
/>
```

## Accessibility

The component is designed for accessibility, leveraging Radix UI’s `Alert` primitive:

- **ARIA Attributes**: Configurable `role`, `aria-label`, and `aria-live` (`polite` or `assertive`) for screen reader compatibility.
- **Keyboard Navigation**: Close and confirmation buttons are keyboard-accessible (e.g., Enter/Space to activate).
- **Icons**: Default icons from `lucide-react` include appropriate colors for visual distinction.

Ensure custom `icon` or `actions` maintain accessibility (e.g., provide `aria-label` for icons if needed).

## Notes

- The component depends on `@radix-ui/react-alert` and `lucide-react` for icons. Ensure they are installed.
- The `Button` component from `@/components/ui/button` is required for close and confirmation buttons. Replace it with your preferred button component if needed.
- Use `dismissAfter` for temporary alerts (e.g., toast notifications).
- For fixed-position alerts, ensure the parent container doesn’t interfere with `position: fixed` styles.
- The `clsx` library is used for class name management. Replace with your preferred utility if desired.

## License

MIT License