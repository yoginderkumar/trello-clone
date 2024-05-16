# Trello Clone

This is a Trello-like application built with React and TypeScript. It allows users to access multiple columns and cards. Users can add new cards, move cards between columns by dragging and dropping, and reorder cards within a column.

## Features

- **View Board**: User can see the board with their respective columns and cards.
- **Add New Columns**: Users can add new columns to the board by providing heading for the column.
- **Add New Cards**: Users can add new cards to any column by providing title and text input.
- **Drag and Drop Cards**: Users can drag and drop cards from one column to another column, as well as reorder cards within the same column.
- **Horizontal Scrolling**: If the number of columns exceeds the viewport width, the board becomes horizontally scrollable, allowing users to scroll left and right to view all the columns.

## Technologies Used

- React
- TypeScript
- Tailwind
- Generate-Colors (for generating random colors for column headings and cards)
- react-beautiful-dnd (for drag and drop functionality)

## Installation

1. Clone the repository:

```
git clone https://github.com/yoginderkumar/trello-clone.git
```

2. Navigate to the project directory:

```
cd trello-clone
```

3. Install dependencies:

```
npm install
```

## Usage

1. Start the development server:

```
npm start
```

2. Open your web browser and visit `http://localhost:3000` to view the application.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://tailwindcss.com/)
- [generate-colors](https://www.npmjs.com/package/generate-colors)
- [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
