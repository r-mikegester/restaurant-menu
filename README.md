
# Kumpadre: Restaurant Menu Overview

A modern web application to explore meals, search for recipes, and manage a list of favorite meals. Built with React, Zustand for state management, and the MealDB API to fetch meal data.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)



## Features

- **Meal Search**: Search meals by its name.
- **Meal Categories**: Filter meals by various categories like "Breakfast", "Dinner", etc.
- **Favorites Management**: Add and remove meals from the favorites list.
- **Responsive Design**: Fully responsive and works well on both desktop and mobile.
- **Loading States & Error Handling**: Display loading indicators during data fetching and handle errors gracefully.
- **Toast Notifications**: Show success/error messages using `react-toastify`.

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **API**: MealDB API (https://www.themealdb.com/api.php)
- **Toast Notifications**: react-toastify
- **Animations**: Framer-Motion

## Demo

https://restaurant-menuv2.vercel.app/

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/restaurant-menu.git
   ```

2. Navigate into the project directory:

   ```bash
   cd restaurant-menu
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   Or, if you're using yarn:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   Or, using yarn:

   ```bash
   yarn start
   ```

   Your app should now be running on `http://localhost:3000`.

### Project Structure

The project is organized as follows:

```plaintext
src/
 ├── assets/               # Static assets like images and css file
 ├── components/           # Reusable components (e.g., SearchBar, MealCard)
 ├── pages/                # Pages like Home, Favorites, Search
 ├── shared/               # Shared utilities like Zustand store, types
 ├── App.tsx               # Main app entry point
 └── index.tsx             # ReactDOM render entry point
```

### API Integration

This project uses the **MealDB API** to fetch meal data. It is integrated into the Zustand store (`useMealStore`), and you can filter or search for meals using the search bar or categories.

### State Management (Zustand)

- **Global State**: The application uses **Zustand** to manage the global state, including meals, search queries, favorites, and loading/error states.
- **Actions**: Actions are modularized for fetching meals, adding/removing favorites, and managing search/filtering.
- **Persistence**: The state is managed in-memory, and data fetching is done through asynchronous API calls.

### Styles (TailwindCSS)

TailwindCSS is used for utility-first styling. The layout is responsive, with optimized mobile support.

### Toast Notifications

This project uses `react-toastify` to provide toast notifications for actions such as adding/removing meals from favorites and error handling.

### Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request! We welcome bug fixes, new features, and improvements.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

### License

This project is licensed under the MIT License.

###  Contact

For any inquiries, reach me out to contact.mikegester@gmail.com