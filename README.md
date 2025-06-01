# Data-pusher# Data Pusher - Node.js Developer Assessment

## Overview
Express web application to receive data and forward it to different destinations via webhooks.

## Features
- Account management (CRUD)
- Destination management (CRUD)
- Data forwarding via webhooks
- SQLite database
- RESTful API

## Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Endpoints

### Accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts` - List all accounts
- `GET /api/accounts/:id` - Get account details
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Destinations
- `POST /api/accounts/:accountId/destinations` - Create destination
- `GET /api/accounts/:accountId/destinations` - List all destinations for account
- `GET /api/accounts/:accountId/destinations/:id` - Get destination details
- `PUT /api/accounts/:accountId/destinations/:id` - Update destination
- `DELETE /api/accounts/:accountId/destinations/:id` - Delete destination

### Webhook
- `POST /api/server/incoming_data` - Receive and forward data

## Testing
Run tests with: `npm test`