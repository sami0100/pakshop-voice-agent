# PakShop Voice

A voice-enabled e-commerce demo for Pakistani fashion, built with React and the AIROMOB Voice SDK.

**Live demo:** https://pakshop-voice-agent.vercel.app/

## Overview

PakShop Voice explores a practical voice-commerce experience rather than a standalone chatbot.

The assistant is grounded with store data such as products, prices, stock, policies, cart, wishlist, checkout and order information. It can also trigger client-side actions in the React application through AIROMOB tools.

The result is a shopping experience where a customer can speak naturally and have the storefront respond.

## Core capabilities

The current implementation supports the main shopping flow:

- Product search
- Category filtering
- Wishlist management
- Cart management
- Coupon application
- Checkout
- Payment method selection
- Order placement with explicit confirmation
- Order history
- Order tracking

Example requests:

```text
Show me women's products
Search for lawn suits
Add the black cotton kurta to my cart
Open my wishlist
Apply coupon PAK10
Proceed to checkout
Track my latest order
```

## How the voice integration works

```text
Customer voice
      ↓
AIROMOB Voice SDK
      ↓
PakShop store context
      ↓
Intent + tool selection
      ↓
React client action
      ↓
Storefront state update
      ↓
Structured result returned to the assistant
```

The AI layer is responsible for understanding the request and choosing the appropriate tool. The React application remains responsible for executing the actual storefront action.

## Store context

The assistant receives PakShop-specific context including:

- Product catalog
- PKR pricing
- Sizes and colors
- Inventory
- Cart state
- Wishlist state
- Orders
- Store policies
- Payment methods

This keeps responses tied to the application instead of relying on generic model knowledge.

## Tech stack

- React
- Vite
- JavaScript
- CSS
- AIROMOB Voice SDK
- Local Storage
- Vercel

## Project structure

```text
src/
├── App.jsx
├── index.css
├── main.jsx
└── products.js

public/
└── products/
```

## Local setup

```bash
git clone https://github.com/sami0100/pakshop-voice-agent.git
cd pakshop-voice-agent
npm install
```

Create a local `.env` file:

```env
VITE_AIROMOB_APP_ID=your_app_id
VITE_AIROMOB_API_KEY=your_api_key
```

Then run:

```bash
npm run dev
```

## Environment variables

The project expects:

```text
VITE_AIROMOB_APP_ID
VITE_AIROMOB_API_KEY
```

Local environment files are excluded from Git and should not be committed.

## Deployment

The project is deployed on Vercel:

https://pakshop-voice-agent.vercel.app/

## Design decisions

A few implementation choices were intentional:

- Voice actions reuse existing React storefront functions instead of duplicating business logic.
- Tool callbacks return structured success/failure results so the assistant can confirm actions accurately.
- Order placement requires explicit user confirmation.
- Store-specific context is supplied to the assistant to reduce unsupported responses.
- The UI is fully usable without voice, so the AI layer enhances the storefront rather than replacing it.

## Scope

This is a technical demonstration focused on the core commerce journey:

**Discover → Search → Wishlist → Cart → Checkout → Order → Tracking**

The same client-tool pattern can be extended to expose additional storefront actions.

## Author

Sami

GitHub: https://github.com/sami0100
