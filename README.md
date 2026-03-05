# JSON Formatter

A lightweight React + TypeScript application built with Vite that lets users format and prettify JSON documents in the browser.

## 🚀 Features

- Paste or type JSON input and get a well-formatted output instantly
- Automatic error detection for invalid JSON
- Copy formatted result to clipboard with one click
- Minimal UI powered by React and styled with tailwind CSS
- Hot reload during development via Vite

## 🛠️ Tech Stack

- **React** for the UI
- **TypeScript** for type safety
- **Vite** as the build tool and dev server
- **ESLint** & **Prettier** for code quality

## 📁 Project Structure

```
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── main.tsx     # React entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies & scripts
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite configuration
```

## 🔽 Getting Started

Clone or download the repository with your preferred method:

```bash
git clone https://github.com/ZakDev1/json-formatter.git
cd json-formatter
# or download the ZIP from GitHub and extract it
```

Install dependencies using your package manager of choice (npm/yarn/pnpm):

## 🧪 Available Scripts

Use your package manager of choice (npm/yarn/pnpm):

```bash
npm install      # install dependencies
npm run dev      # start development server
npm run build    # build production assets
npm run preview  # preview production build locally
```

## 📌 Usage

1. Run `npm run dev`.
2. Open http://localhost:5173 in your browser.
3. Enter or paste JSON into the input field, then click "Format".
4. Copy the formatted output if desired.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the formatter or add features.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

