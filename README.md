# a11y-assistant-vscode

`a11y-assistant` is a [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=radosvet.a11y-assistant-vscode) that helps you detect and fix accessibility issues in your HTML files. It integrates with the core [`a11y-assistant`](https://www.npmjs.com/package/a11y-assistant) library to analyse your code and surface actionable diagnostics directly in your editor.


---

## Features

- **Automatic Analysis**  
  Runs an accessibility analysis automatically when you open or save an HTML file.

- **Inline Diagnostics**  
  Highlights issues in the editor with severity levels:  
  - Info  
  - Warning  
  - Error  

- **Quick Fix Suggestions**  
  Each diagnostic includes explanations, suggestions, and links to external resources for better understanding and resolution.

- **Seamless Integration**  
  Uses the same underlying analysis engine as the `a11y-assistant` package, ensuring consistency across your tooling.

---

## Demo

Coming soon

---

## Requirements

- **Visual Studio Code v1.80.0 or later**
- **Node.js v18 or later** (only if you plan to build or contribute to the extension)

---

## Extension Settings

This extension currently has no user-facing configuration. Future updates will include:

- Enabling/disabling specific rules
- Custom rule severity levels
- Ignoring specific files or directories

---

## Known Issues

- Diagnostics currently run only on file **open** and **save**.

---

## Release Notes

### 0.1.0

- Initial release  
- Supports analysing HTML files on open and save  
- Highlights issues with appropriate severity levels  
- Provides suggestions and links to relevant resources  

---

## Contributing

Contributions are welcome!  
If you'd like to report a bug, request a feature, or submit a pull request, please visit the [GitHub repository](https://github.com/radosvet93/a11y-assistant-vscode).

---

## Following Extension Guidelines

This project follows [VS Code extension guidelines](https://code.visualstudio.com/api/references/extension-guidelines) for best practices and maintainability.

---

## For More Information

- [Accessibility Guide (W3C)](https://www.w3.org/WAI/fundamentals/accessibility-intro/)  
- [a11y-assistant npm package](https://www.npmjs.com/package/a11y-assistant)  
- [Visual Studio Code Extension Docs](https://code.visualstudio.com/api)

---

**Enjoy accessible development with `a11y-assistant`!**
