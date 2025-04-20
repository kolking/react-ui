# React UI

A React component library for building modern web apps. Its flexible theming system uses the SASS pre-processor and relies on CSS variables that can be customized to match your project's look and feel. The library is simple, lightweight and fast.

## Install

```sh
yarn add @kolking/react-ui
```

## Theming Setup

Add the following code at the beginning of your main SASS stylesheet to generate the global CSS variables required for the library components.

```scss
@use '@kolking/react-ui/styles/utils';
@use '@kolking/react-ui/styles/theme';

:root {
  @include utils.vars(theme.$variables);
  @include utils.vars(theme.$light-colors, 'color');

  @media screen and (prefers-color-scheme: dark) {
    @include utils.vars(theme.$dark-colors, 'color');
  }
}

*, *::before, *::after {
  box-sizing: border-box;
}

:focus-visible {
  @include utils.focus-visible();
}

// ... rest of your global styles
```

Now import the library stylesheet along with your main stylesheet in the project's entry point.

```tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import '@kolking/react-ui/styles/style.css';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(<App />);
```

This was a very basic setup with no customizations added to the default theme. Read below to understand what the default theme includes and learn how to modify it.

## Default Theme

The [default theme](https://github.com/kolking/react-ui/blob/main/lib/styles/_theme-default.scss) consists of several SASS maps that are combined into a [single map variable](https://github.com/kolking/react-ui/blob/main/lib/styles/_theme.scss#L20-L30) and then transformed into CSS variables using the [`utils.vars($var)`](https://github.com/kolking/react-ui/blob/main/lib/styles/_utils.scss#L8-L21) SASS mixin. For example:

```scss
// Map variable in the default theme
$font-family: (
  body: (-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif),
  mono: (Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace),
  heading: var(--font-family-body),
);

// CSS variables after transform
--font-family-body: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
--font-family-mono: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
--font-family-heading: var(--font-family-body);
```

Therefore, to modify the default theme, you need to override the values by adding [configuration](https://sass-lang.com/documentation/at-rules/use/#configuration) to the `@use` rule. You can also add new variables, and they will be included in the theme:

```scss
@use '@kolking/react-ui/styles/utils';
@use '@kolking/react-ui/styles/theme' with (
  $font-family: (
    body: ("Open Sans", sans-serif), // change --font-family-body variable
  ),
  $light-palette: (
    colors: (
      accent: #669900, // change --color-accent-[50...800] variables
    ),
  ),
  $light-colors: (
    hotpink: #F565A5, // add new --color-hotpink variable
  ),
);

:root {
  // the $variables and $light-colors now contain your modifications
  @include utils.vars(theme.$variables);
  @include utils.vars(theme.$light-colors, 'color');
}
```

## Color Variables

There are two types of color variables in the theme. First, the `$light-colors` and `$dark-colors`, which are transformed into CSS variables as they are. Second, the `$light-palette` and `$dark-palette` colors, which automatically generate 9 shades for each color. The naming convention is fairly common: `--color-name-[50|100|200|300|400|500|600|700|800]`, where `--color-name-500` is the original color, `50` to `400` are lighter tints, and `600` to `800` are darker shades.

```scss
// Base color in the light-palette
$light-palette: (
  colors: (
    blue: #007AFF,
  ),
);

// Generated CSS variables
--color-blue-50: #F2F8FF;
--color-blue-100: #E6F2FF;
--color-blue-200: #CCE4FF;
--color-blue-300: #99CAFF;
--color-blue-400: #4DA2FF;
--color-blue-500: #007AFF;
--color-blue-600: #0567D1;
--color-blue-700: #0A53A3;
--color-blue-800: #0F4075;
```
## Component Variables

Some components, such as `Input`, also add [CSS variables](https://github.com/kolking/react-ui/blob/main/lib/components/Fields/styles/input.module.scss) to the global scope. You may want to redefine these variables in your stylesheet, or use them when building your own components. Refer to the component styles for their global and local CSS variables.


## Feedback

If you have a feature request, found a bug, or have ideas for improvement, please [open an issue](https://github.com/kolking/react-ui/issues).


## License

Licensed under the MIT license.
