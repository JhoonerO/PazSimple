import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
// This is the main entry point of the React Native application.
// It imports the AppNavigator component from the navigation directory and renders it.
// The AppNavigator handles the navigation structure of the app, allowing users to move between different screens and functionalities.
// This structure is essential for organizing the app's flow and user experience.
// The App component is exported as the default export, making it the main component that React Native will render when the app starts.
// The AppNavigator is expected to be defined in the './src/navigation/AppNavigator' file, which should contain the navigation logic and screen definitions for the app.