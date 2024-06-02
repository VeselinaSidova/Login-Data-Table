# Star Wars Characters App

This project is a simple React-based application that displays a list of Star Wars characters using data from the [SWAPI](https://swapi.dev/) (Star Wars API). Users can search for characters, sort them by different attributes, and navigate through pages. The app also includes user authentication with login functionality, and a protected route to ensure that only authenticated users can access the character data.

## Features

- **User Authentication**: Login and logout functionality with protected routes.
- **Data Fetching**: Fetches data from the SWAPI and displays it in a paginated table.
- **Sorting**: Sort characters by name, mass, height, hair color, and skin color.
- **Searching**: Search for characters by name, mass, height, hair color, or skin color.
- **Pagination**: Navigate through pages of character data.
- **Responsive Design**: Uses Bootstrap for a responsive and modern UI.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation.
- **React Bootstrap**: Bootstrap components for React.
- **SWAPI**: The Star Wars API for fetching character data.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/star-wars-characters-app.git
2. Navigate to the project directory:
   ```bash
   cd star-wars-characters-app
3. Install dependencies:
   ```bash
   npm install

## Usage

1. Start the development server:
    ```bash
    npm start
2. Open your browser and go to `http://localhost:3000`.

## Project Structure

- **src/components**: Contains the React components.
  - **Login**: Login form component.
  - **Loader**: Loading spinner component.
  - **DataView**: Main page component that includes the table and pagination.
  - **Table**: Table component that displays the character data.
  - **Person**: Component for displaying individual character data.
- **src/contexts**: Contains the context for authentication.

## License
This project is licensed under the MIT License.
