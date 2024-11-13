```markdown
# .NET Project Estimate Generator
**Live Demo**: The project runs at the following URL: [https://glglak.github.io/dotnet-estimator/](https://glglak.github.io/dotnet-estimator/)

A simple and powerful tool to estimate project effort for .NET projects based on selected components, complexity factors, and additional configuration options. This tool helps project managers and developers get a quick estimate of project man-days and highlights additional complexities from dependencies and integrations.

## Features

- **Component-Based Estimation**: Choose from a set of .NET project components (Domain Model, Data Access, Integration & APIs).
- **Pattern and Role Selection**: Select development patterns (e.g., CRUD, Domain-Driven Design) and assign roles to each component.
- **Complexity Multipliers**: Adjust for dependencies and integrations to fine-tune your estimates based on project requirements.
- **Effort Calculation**: Calculate total effort in man-days, including a configurable 20% buffer for bug fixing.
- **Save, Load, and Export**: Save estimates to JSON, load existing estimates, and export to CSV for sharing.

## Stack

This project is built with the following technologies:

- **React**: For building the interactive user interface.
- **Tailwind CSS**: For styling and creating a responsive, modern look.
- **Lucide Icons**: To provide clean icons for actions like save, add, and delete.

## Installation

To get this project running locally, follow these steps:

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (recommended version >= 14).
- **Git**: To clone the repository.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/dotnet-estimate-generator.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd dotnet-estimate-generator
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

To build the project for production, run:
```bash
npm run build
```
The output will be in the `dist` directory, which you can deploy to any static hosting service.

## Project Structure

- `src/components/DotNetEstimateForge.jsx`: The main component where all calculations and UI elements reside.
- `public/`: Contains static files, including the index.html.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Contributing

We welcome contributions! Here’s how you can help:

1. **Fork the Repository**: Create a fork of this repository.
2. **Create a Branch**: Make a new branch with a meaningful name.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature or fix bugs.
4. **Commit and Push**: Commit your changes and push them to your forked repository.
5. **Submit a Pull Request**: Go to the original repository and submit a pull request.

Please follow best practices and include clear documentation with your contributions. All improvements are welcome!

## License

This project is licensed under the MIT License. See `LICENSE` for more information.