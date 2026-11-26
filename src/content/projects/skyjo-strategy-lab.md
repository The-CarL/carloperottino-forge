---
title: "Skyjo Strategy Lab"
tagline: "When is it worth passing up a column clear? A simulator, a set of trained opponents, and an offline coach for family game night."
date: 2026-11-26
tags: [TypeScript, Python, scikit-learn]
categories: [Games, Machine Learning]
draft: false
thumbnail: "/projects/skyjo-strategy-lab/clear-or-trade.png"
links:
  github: "https://github.com/The-CarL/skyjo-strategy-lab"
---

A 1 is sitting on the discard pile. You could use it to clear a column showing **1, 1, and a face-down card**. You also have a 12 elsewhere on your board. Which move would you make?

In Skyjo, the lowest score wins. Three equal cards in a vertical column disappear. If you count the face-down card as 5, clearing this column saves about 7 points. Replacing the 12 with the 1 saves 11. That trade is the move our new family rule recommends.

![The offline coach highlights the 12 and explains why trading saves 11 points while clearing saves about 7.](/projects/skyjo-strategy-lab/clear-or-trade.png)

## From a family rule to a tournament

I wanted a strategy we could remember without a phone, and a way to find out how much better a computer could play. I built a simulator for classic Skyjo that can replay a deal, rotate every strategy through every seat, and play a match all the way to the 100-point threshold. The opponents range from simple keep-or-pass rules to a card counter that remembers every publicly seen card. The same engine powers a downloadable coach that needs only your visible board and the available card.

Seven handwritten rules competed for a place in the main tournament. The winner, **Clear or trade?**, adds two decisions to the old “clear whenever possible, otherwise keep 3 or lower” rule. Compare a clear with the best ordinary trade before taking it. And after drawing blind, keep a card that cuts at least four points from a visible card, even if the drawn card is above 3. A blind 7 can be worth keeping when it replaces a 12. [Printable strategy card](https://github.com/The-CarL/skyjo-strategy-lab/raw/refs/heads/main/downloads/skyjo-strategy-card.pdf)

## What won

Ten strategies played **215,040 complete simulated matches** at two-, four-, and six-player tables. The four-player primary test used 3,072 shuffled deals. The confirmation used 1,536 fresh deals and a different mix of opponents. Every strategy played all four seats on each of its deals, and tied winners split the win credit.

| Four-player strategy | Primary win share | Confirmation win share |
| --- | ---: | ---: |
| Original family rule | 31.13% | 29.12% |
| Clear or trade? | 35.75% | 34.16% |
| Whole-match decision tree | 37.46% | 36.52% |
| Whole-match neural network | 39.59% | 38.59% |
| Matched round-trained neural network | 40.91% | 39.93% |

The new paper rule gained **4.61 percentage points** in the primary test and **5.04 points** in confirmation. The paired 95% intervals were +3.84 to +5.38 and +3.96 to +6.12 points. Those estimates describe play against the simulated opponents. The kit includes a score sheet for finding out how the two rules feel against the people at your table. [Tournament results](https://github.com/The-CarL/skyjo-strategy-lab/blob/main/reports/phase2/league.md)

## What the network taught us

We sampled 11,520 decisions from 480 simulated matches. At each decision, the engine tried up to four moves in the same 16 plausible arrangements of hidden cards. Following each move through to the finish gave us 611,104 continuations. We used them to train a decision tree and a small neural network with 18 inputs and two hidden layers of 24 and 12 units. Both learn to score a move from information available to the player.

Would aiming for the eventual win make the network a better player? We tested that idea by training a second network on the score advantage at the end of the current round, using the same moves, hidden cards, architecture, and training seed. The round-trained network led by about 1.3 points in both four-player tests. The confirmation interval included a tie, so the experiment leaves open which target wins over a wider range of tables. All training ran on the existing workspace CPU, with an estimated $0 in additional AWS spend. [Training methods and results](https://github.com/The-CarL/skyjo-strategy-lab/tree/main/reports/phase2)

## Try it at your table

Extract the family kit and open `skyjo-coach.html` in a browser. Enter your face-up cards and the top discard to see the suggested move. You can switch between the family rule and the whole-match network on the same board, or put the phone away and use the printable cards. The coach works offline. [Download the family kit (ZIP)](https://github.com/The-CarL/skyjo-strategy-lab/raw/refs/heads/main/downloads/skyjo-family-kit.zip)
