---
title: "Flip 7 Strategy Lab"
tagline: "Compare card-counting bots, trained models, and rules you can remember. Replay the deals and see when to take Flip Three."
date: 2026-11-28
tags: [TypeScript, Python, scikit-learn, Web Workers]
categories: [Games, Machine Learning]
draft: false
thumbnail: "/projects/flip7-strategy-lab/browser-lab.png"
links:
  live: "https://flip7.carloperottino.com/"
  github: "https://github.com/The-CarL/flip7-strategy-lab/tree/flip7-benchmark"
---

Someone at the table has already banked 200. You’re behind, and you draw Flip Three. Normally I’d hand it to another player. This time, would the three extra draws give me a better chance of catching up?

Flip 7 Strategy Lab puts that decision alongside the rest of the game. The browser app runs seeded tournaments between tabletop rules, card-counting bots, a decision tree, and a neural net. You can inspect a bot replay one event at a time and compare taking Flip Three with passing it in the same situation.

![The Flip 7 browser lab shows the Flip Three endgame result and the setup for a paired bot tournament.](/projects/flip7-strategy-lab/browser-lab.png)

## Compare strategies on the same deals

Choose two strategies, an opponent lineup, and a seed. Each strategy takes every seat on every deal. The browser shows match wins, busts and Flip 7 rates as the simulation runs. The replay view lets you follow a single deal through the final score, using the same engine and policies as the benchmark.

In the original four-player study, **Watch the High Cards** led the three tabletop rules. It won 27.91% of the primary matches and 29.26% in confirmation. Hit while you hold Second Chance. Otherwise, stay at five number cards, or at three or more if two are 8 or higher. Card counting improved win rate by 1.73 and 2.28 percentage points over the same policy using baseline card frequencies. [Original benchmark](https://github.com/The-CarL/flip7-strategy-lab/blob/flip7-benchmark/reports/README.md)

## When to take Flip Three

The follow-up study compared four targeting options across 17 base strategies in 469,440 full simulated matches. It also replayed 39,077 voluntary decisions both ways, using matched deck orders for each comparison.

**Pass by default.** With four or five numbers and no Second Chance, taking Flip Three cost 5.1 to 7.7 percentage points in match win rate. The useful exception came when a player had already banked at least 200 and would beat your current total. Taking Flip Three raised simulated win chances from 6.4% to 9.0% in one set, and from 6.8% to 8.8% in the other. [Flip Three study](https://github.com/The-CarL/flip7-strategy-lab/blob/flip7-benchmark/reports/flip-three/README.md)

## Try it at the table

The printable sheet includes three rules, a Flip Three endgame note, and a score sheet for comparing two rules with the same group. For a simulation, you can give the same strategy different Flip Three preferences and see how much that choice changes the result. [Printable rules](https://github.com/The-CarL/flip7-strategy-lab/blob/flip7-benchmark/docs/tabletop.pdf)
