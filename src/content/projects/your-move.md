---
title: "Your Move"
tagline: "Completed test: an end-to-end Hello World with React, a Lambda opponent, and PostgreSQL history"
date: 2026-10-25
updatedDate: 2026-10-25
tags: [TypeScript, React, Vercel, AWS Lambda, PostgreSQL]
categories: [Web Applications, Infrastructure]
draft: false
thumbnail: "/projects/your-move/thumbnail.jpg"
heroImage: "/projects/your-move/thumbnail.jpg"
links: {}
---

## Test complete

The end-to-end test passed and the temporary deployment has been retired. This entry and its screenshot document the working demo; there is no live app to launch.

## A small game, a complete system

I wanted a Hello World that exercised the whole path from a browser to an API to a persistent database. Tic Tac Toe keeps the product small enough to understand while giving every layer something real to do.

**Your Move** was a single-player game against an unbeatable opponent. The player used X, the server played O, and a draw was the best possible result. It required no accounts or sign-up.

## How it works

The React/Vite frontend ran on Vercel. Each move went through an API Gateway HTTP API to an AWS Lambda function, which validated the move and chose its response using minimax. The server determined the result; the browser displayed it.

Aurora PostgreSQL stored the board, game status, and completed results. Lambda reached the private database through the RDS Data API, and database credentials stayed in AWS. The app used a custom HTTPS hostname with a Vercel-managed certificate.

## History that survives the tab

Browser storage remembered the current anonymous game, so refreshing resumed the board. Completed games appeared in a shared score history with wins, losses, draws, and recent matches.

Request IDs made retries safe, and versioned database updates rejected stale moves. Repeating a request did not create another score. Those details made this a useful integration test as well as a game.

The end-to-end checks covered keyboard play, completed losses and draws, refresh/resume, duplicate requests, and desktop and mobile layouts. A separate PostgreSQL readback matched the games completed in the browser.

## Cleanup

The temporary deployment was retired after verification. The project write-up and screenshot remain as a record of the completed test.
