# Autoriaclone API

Backend service for a vehicle marketplace web platform. The project implements a REST API architecture to handle communication between client applications and databases.

## Tech Stack

**Core:**

* **Node.js** — JavaScript runtime environment.
* **TypeScript** — Typed superset of JavaScript for enhanced code reliability.
* **Express.js** — Web framework for building APIs.

**Databases & ORM/ODM:**

* **MongoDB (Atlas)** — Cloud NoSQL database.
* **Mongoose** — ODM library for MongoDB.
* **MySQL (Aiven)** — Cloud SQL database.
* **Prisma** — ORM library for MySQL.

**Infrastructure & Tools:**

* **Docker** — Application containerization.
* **AWS Elastic Beanstalk** — Cloud service for deployment and scaling.

## Features & Modules

The system uses Role-Based Access Control (RBAC) with four user roles: Buyer, Seller, Manager, and Administrator.

Key features:

1. **Authentication & Authorization:** Registration, login, and permission management.
2. **Announcements:** Full CRUD operations for vehicles, filtering, and pagination.
3. **Analytics:** View statistics tracking for premium accounts.
4. **Subscriptions:** Tiered subscription plans unlocking advanced seller capabilities.
5. **Moderation:** Automated announcement checks before publication, alongside manual manager oversight.
6. **Administration:** Comprehensive platform control over users and content.

## Local Setup & Installation

**Prerequisites:** Node.js (v18 or higher)

**1. Clone the repository and navigate to the project directory:**

```bash
git clone https://github.com/St1ve42/autoriaclone.git
cd autoriaclone

```

**2. Install dependencies:**

```bash
npm install

```

**3. Configure environment variables:**
Create a `.env` file based on `.env.example` and set your credentials.

**4. Run the project:**

Development mode:

```bash
npm run start:dev

```

Production build & run:

```bash
npm run build
npm run start

```

## Testing Notes (Account Activation)

Because this repository provides only the backend service without a frontend client, email verification works as follows:

1. After registering via `/auth/sign-up`, an activation link is sent to the provided email.
2. Direct browser clicks will not render a webpage due to the absence of a client UI.
3. **To complete activation:**
* Copy the **token** from the activation URL in the email.
* Send a **POST** request via Postman (or cURL) to: `/auth/activate/:token`.



## Postman Collection

[View Postman Collection & Workspace](https://www.postman.com/cryosat-astronomer-37024884-1799691/workspace/autoriaclone)

## Swagger Documentation

When running locally, interactive API docs are available at `/docs`.