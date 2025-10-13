# @rsuite/icons

[![npm][npm-badge]][npm]
[![GitHub Actions][github-actions-badge]][github-actions]
[![npm][npm-version-badge]][npm]
[![license][license-badge]][license]

@rsuite/icons is a comprehensive icon library for [React Suite](https://github.com/rsuite/rsuite), offering a collection of SVG icons as React components. It provides a flexible and performant way to include and customize icons in your React applications.

## Installation

```bash
npm install @rsuite/icons --save
# or
yarn add @rsuite/icons
```

## Usage

### Basic Usage

```jsx
import { Icon } from '@rsuite/icons';
import GearIcon from '@rsuite/icons/Gear';

// Use preset icon
<GearIcon />

// Use custom SVG icon
<Icon as={YourSvgComponent} />
```

### Customization

```jsx
// Size (using size prop)
<GearIcon size={24} />
<GearIcon size="2em" />

// Size (using style)
<GearIcon style={{ fontSize: '2em' }} />

// Color
<GearIcon style={{ color: '#4caf50' }} />

// Rotate
<GearIcon rotate={90} />

// Flip
<GearIcon flip="horizontal" />

// Pulse
<GearIcon pulse />

// Spin
<GearIcon spin />
```

## Features

- **React Component**: Optimized for React applications
- **TypeScript Support**: Built with TypeScript for type safety
- **Customizable**: Control size, color, rotation and more
- **React 19 Compatible**: Updated to work with React 19

## API

### `<Icon>` Props

The `<Icon>` component extends `React.SVGProps<SVGElement>` so it accepts all valid SVG attributes.

| Property  | Type                          | Default          | Description                              |
| --------- | ----------------------------- | ---------------- | ---------------------------------------- |
| `as`      | `React.ElementType \| string` | `'svg'`          | The custom SVG component                 |
| `spin`    | `boolean`                     | `false`          | Dynamic rotation icon                    |
| `pulse`   | `boolean`                     | `false`          | Use pulse to have it rotate with 8 steps |
| `rotate`  | `number \| string`            | -                | Rotate the icon by a specific degree     |
| `viewBox` | `string`                      | -                | View box of the SVG                      |
| `flip`    | `'horizontal' \| 'vertical'`  | -                | Flip the icon                            |
| `fill`    | `string`                      | `'currentColor'` | SVG fill color                           |
| `size`    | `number \| string`            | `'1em'`          | Icon size (sets both width and height)   |
| `width`   | `number \| string`            | `'1em'`          | SVG width                                |
| `height`  | `number \| string`            | `'1em'`          | SVG height                               |

## Documentation

For more information, please visit [Icon documentation](https://rsuitejs.com/components/icon/)

## Development

### Setup

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

## License

MIT

[npm-badge]: https://img.shields.io/npm/dm/@rsuite/icons.svg
[npm-version-badge]: https://img.shields.io/npm/v/@rsuite/icons.svg
[npm]: https://www.npmjs.com/package/@rsuite/icons
[license-badge]: https://img.shields.io/npm/l/@rsuite/icons.svg
[license]: https://github.com/rsuite/rsuite-icons/blob/main/LICENSE
[github-actions-badge]: https://github.com/rsuite/rsuite-icons/workflows/Run%20Test%20Cases/badge.svg
[github-actions]: https://github.com/rsuite/rsuite-icons/actions
