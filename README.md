# 🏛️ Campus Hub - A Vibe Coding Project

*A modern, single-page website designed to be a central portal for student life. It provides a clean, responsive interface to browse campus events, clubs, labs, and library information.*

This project was developed as a submission for the **Vibe Coding Web Track**. It fulfills all base requirements and includes several bonus features.

-----

## 🚀 Features

This project is packed with features designed to create a dynamic and user-friendly experience:

  * 📱 **Fully Responsive Design:** The layout seamlessly adapts to all screen sizes, from mobile phones (360px) to widescreen desktops (1440px+).
  * 🖼️ **Interactive Hero Slider:** An auto-playing, responsive hero slider introduces the main sections of the site. It features unique, dimmed background images for each slide and can be navigated with dot buttons.
  * 📥 **Dynamic Content Loading:** The Events, Clubs, and Labs sections dynamically load their content from external `.json` files, making the site easy to update and manage.
  * 🔍 **Live Search/Filtering:** Each dynamic section (Events, Clubs, Labs) includes a live search bar that filters content in real-time.
  * 🎨 **Dark Mode:** A sleek dark mode is available and can be toggled with a button in the header. The user's preference is saved in `localStorage`, so their choice is remembered on their next visit.
  * 📌 **Sticky Header:** The header remains fixed at the top of the page for easy navigation as the user scrolls.
  * ➕ **Interactive Cards:** Event cards feature an expandable "details drawer" to show more information without leaving the page.
  * ⬆️ **Floating "Scroll to Top" Button:** Appears on scroll to provide a quick way to return to the top of the page.
  * ♿ **Accessibility Focused:** Built with semantic HTML, `aria` attributes for interactive elements, and proper focus management.

-----

## 📁 Project Structure

The project is organized into modular files for better maintainability.

```
BMIET-VibeCoding-2025-Web-Track/
├── .gitattributes
├── .gitignore
├── 📁 CSS/
│   ├── 🎨 darkmode.css            # Styles exclusively for the dark mode theme.
│   └── 🎨 style.css               # Main stylesheet for layout, typography, and components.
├── 📄 index.html                  # The main HTML structure for the single-page site.
├── 📁 JS/
│   ├── 📜 main.js                 # Core logic: dark mode, content loading/filtering, navigation.
│   └── 📜 slider.js               # All JavaScript for the hero section slider.
├── 📁 JSON/
│   ├── 📝 clubs.json              # Data for the "Clubs" section.
│   ├── 📝 events.json             # Data for the "Upcoming Events" section.
│   └── 📝 labs.json               # Data for the "Labs" section.
├── 📁 Others/
│   ├── 📜 LICENSE
│   ├── 📜 NOTES.txt               # Disclosure of AI tools and assets used, as per event rules.
│   └── 📜 requiremnts.pdf
└── 📜 README.md
```

-----

## ⚙️ Setup & Running the Project

⚠️ **Important:** Because this project loads local JSON files (`events.json`, `clubs.json`, etc.) using the `fetch` API, it **must be run from a local web server**. Opening the `index.html` file directly in your browser will result in security errors (CORS policy).

The easiest way to run this project is with the **Live Server** extension in Visual Studio Code.

1.  **Install Live Server:** If you don't have it, open VS Code, go to the Extensions tab, and search for `Live Server`.
2.  **Open the Project:** Open the project folder in VS Code.
3.  **Run:** Right-click the `index.html` file and select "**Open with Live Server**."

Your browser will open the project on a local address (like `http://127.0.0.1:5500`), and all features will be fully functional.

-----

## 🤖 AI & Asset Disclosure

As required by the event rules, a `NOTES.txt` file is included to document the use of AI assistants (Google Gemini, GitHub Copilot) and third-party assets (Icons8, Unsplash) during development.