# HTK-Web-App

This repository contains the source code for the Handy2Know (HTK) web application.

## Project Overview

HTK is a platform designed to provide professional dashboards and core marketplace functionalities. It integrates with Stripe for payment processing and utilizes Netlify for serverless functions and continuous deployment.

## Getting Started

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/handy2knowteam-creator/HTK-Web-App.git
    cd HTK-Web-App
    ```

2.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory based on `.env.example` and populate it with your environment-specific variables, especially `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment

This project is configured for continuous deployment with Netlify. Changes pushed to the `master` branch will automatically trigger a new build and deploy.

## Netlify Functions

Serverless functions are located in the `netlify/functions` directory. These functions handle backend logic such as Stripe payment intent creation and webhook processing.

## Contributing

Contributions are welcome! Please follow the standard GitHub flow:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes with a descriptive message.
5.  Push your branch and open a pull request.

## License

[Specify your license here, e.g., MIT License]
