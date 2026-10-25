---
title: "Your Move"
tagline: "An end-to-end Hello World: Tic Tac Toe on Vercel, a Lambda opponent, and PostgreSQL score history"
date: 2026-10-25
tags: [TypeScript, React, Vercel, AWS Lambda, PostgreSQL]
categories: [Web Applications, Infrastructure]
draft: false
thumbnail: "/projects/your-move/thumbnail.jpg"
heroImage: "/projects/your-move/thumbnail.jpg"
links:
  live: "https://your-move.carloperottino.com"
---

## A small game, a complete system

I wanted a Hello World that exercised the whole path from a browser to an API to a persistent database. Tic Tac Toe keeps the product small enough to understand while giving every layer something real to do.

**Your Move** is a single-player game against an unbeatable opponent. You play X, the server plays O, and a draw is the best possible result. No accounts or sign-up: open the site and play.

## How it works

The React/Vite frontend runs on Vercel. Each move goes through an API Gateway HTTP API to an AWS Lambda function, which validates the move and chooses its response using minimax. The server determines the result; the browser displays it.

Aurora PostgreSQL stores the board, game status, and completed results. Lambda reaches the private database through the RDS Data API, and database credentials stay in AWS. The app has its own HTTPS hostname, with Vercel managing certificate renewal.

## History that survives the tab

Browser storage remembers the current anonymous game, so refreshing resumes the board. Completed games appear in a shared score history with wins, losses, draws, and recent matches.

Request IDs make retries safe, and versioned database updates reject stale moves. Repeating a request does not create another score. Those details make this a useful integration test as well as a game.

The end-to-end checks covered keyboard play, completed losses and draws, refresh/resume, duplicate requests, and desktop and mobile layouts. A separate PostgreSQL readback matched the games completed in the browser.

## Try it

[Play Your Move](https://your-move.carloperottino.com).

The database pauses when idle, so the first request may take a moment to wake it. The app shows a loading state and retries transient failures. After that, pick an empty square and see how long you can keep the opponent from winning.
