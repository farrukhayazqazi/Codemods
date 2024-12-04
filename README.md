# Codemod: `convert-default-export-to-function`

This codemod is designed to transform specific JavaScript (JSX) code patterns to make the default export of a file more consistent, transitioning all supported patterns into a default function export. The codemod specifically looks for function declarations, function expressions, and arrow functions that may already be exported as default.

## Purpose

This tool simplifies component exports by ensuring that all default exports are in the form of a named function declaration. This can help with code readability, consistency, and debugging.

### Supported Transformations

The codemod can handle the following input types and refactor them into a named function default export:

1. **Default Export with Function Declaration:**

    ```javascript
    import t from 'utils/i18n';
    
    function Foo() {
        return <div>{t('hello')}</div>;
    }
    
    export default Foo;
    ```
    Transforms to:
    ```javascript
    import t from 'utils/i18n';
    
    export default function Foo() {
        return <div>{t('hello')}</div>;
    }
    ```

2. **Default Export with Variable Assigned Function Expression:**

    ```javascript
    import t from 'utils/i18n';

    const RandomVar = function Foo() {
        return <div>{t('hello')}</div>;
    }

    export default Foo;
    ```
    Transforms to:
    ```javascript
    import t from 'utils/i18n';

    export default function Foo() {
        return <div>{t('hello')}</div>;
    }
    ```

3. **Default Export with Arrow Function:**

    ```javascript
    import t from 'utils/i18n';

    const RandomFunc = () => {
        return <div>{t('hello')}</div>;
    }

    export default RandomFunc;
    ```
    Transforms to:
    ```javascript
    import t from 'utils/i18n';

    export default function RandomFunc() {
        return <div>{t('hello')}</div>;
    }
    ```

4. **Default Export from a Variable Assigned Arrow Function.**

    ```javascript
    import t from 'utils/i18n';

    const RandomVar = () => {
        return <div>{t('hello')}</div>;
    }

    export default RandomVar;
    ```
    Transforms to:
    ```javascript
    import t from 'utils/i18n';

    export default function RandomVar() {
        return <div>{t('hello')}</div>;
    }
    ```

## Installation

To use this codemod, install `jscodeshift` globally if you haven’t already:

```bash
npm install -g jscodeshift
```

## Usage

Run the codemod on your source files using the command line:

```bash
jscodeshift -t path/to/transformer.js path/to/your/files/**/*.jsx
```

Replace `path/to/transformer.js` with the path to your saved codemod and `path/to/your/files/**/*.jsx` with the path to the files you want to transform.

## Notes

- Make sure to back up your files or commit your changes before running the codemod.
- Review the changes made by the codemod to ensure everything is working as expected.

## Contribution

If you have any suggestions for improvements or additional features to be added, please feel free to submit a pull request or open an issue.

Thank you for using `convert-default-export-to-function`! Happy coding!

---

This README should give users a clear understanding of what the codemod does, how to install and use it, and what transformations they can expect. Let me know if you need any adjustments or further details!# Codemods
