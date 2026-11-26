---
title: "Skyjo Strategy Lab"
tagline: "When is it worth passing up a column clear? Play against trained opponents or try a tested family rule at your own table."
date: 2026-11-26
tags: [TypeScript, Python, scikit-learn]
categories: [Games, Machine Learning]
draft: false
thumbnail: "/projects/skyjo-strategy-lab/clear-or-trade.png"
links:
  live: "https://skyjo.carloperottino.com/"
  github: "https://github.com/The-CarL/skyjo-strategy-lab"
---

A 1 is sitting on the discard pile. You could use it to clear a column showing **1, 1, and a face-down card**. You also have a 12 elsewhere on your board. Which move would you make?

In Skyjo, the lowest score wins. Three equal cards in a vertical column disappear. If you count the face-down card as 5, clearing this column saves about 7 points. Replacing the 12 with the 1 saves 11. That trade is the move our new family rule recommends. [Meet the 12 online opponents](#meet-the-12-online-opponents)

![The offline coach highlights the 12 and explains why trading saves 11 points while clearing saves about 7.](/projects/skyjo-strategy-lab/clear-or-trade.png)

## From a family rule to a tournament

I wanted a strategy we could remember without a phone, and a way to find out how much better a computer could play. I built a simulator for classic Skyjo that can replay a deal, rotate every strategy through every seat, and play a match all the way to the 100-point threshold. The opponents range from simple keep-or-pass rules to a card counter that tracks the values left among unseen cards. The same engine powers a downloadable coach that needs only your visible board and the available card.

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

## Meet the 12 online opponents

Each seat can use a different strategy. Two opponents might make the same trade for different reasons. One follows a rule you could memorize. Another weighs the chance that revealing its last card will double its round score.

### Two rules you can play by hand

- **Clear or trade** estimates how many points a clear removes, counting a hidden card as 5. It compares that saving with its usual play of putting a 3 or lower on its highest visible card of 4 or more, or on a hidden card. The clear wins a tie. After a blind draw it also accepts a trade that cuts four or more points from a visible card. That exception lets it keep a drawn 7 to replace an 11.
- **Clear, then keep 3** takes the first available clear, even a column of negative cards. Otherwise it keeps a 3 or lower, replacing its highest visible card of 4 or more, then a hidden card if there is no such target. For anything higher it draws blind, or discards and flips if it already drew.

### Three ways to read the table

- **Board evaluator** ranks up to four candidate moves. It weighs immediate points saved, the value of revealing a hidden card, and whether a swap makes or breaks a pair in a column. It can keep a 4 to replace a 12.
- **Table evaluator** starts with the same shortlist and looks across the table before closing. If revealing its last card could leave it tied with or behind the best rival's estimated round score, it penalizes that move.
- **Card counter** adds a running count of unseen values across the stock and the face-down grids. A low average among the unseen cards makes drawing blind more attractive. If it holds a pair, it can also estimate how common the matching value is among the unseen cards.

### Five opponents that learned from simulated play

These opponents use 18 features from their own board, the available card and the proposed move. They score up to four candidates on each decision. A swap into a face-up spot must lower its value or clear a column.

- **Match-trained neural network** learned which moves earned more wins when simulations continued all the way to 100 points. A tied win gave each winner a fraction of the credit. The network combines clues such as points saved, a broken pair and whether the move ends the round.
- **Match-trained decision tree** learned from the same simulated finishes. It scores each move by following up to six yes-or-no tests about the position. Moves that reach the same leaf receive the same estimate.
- **Matched-round neural network** used the same positions, hidden-card samples, network architecture and training seed as the match-trained network. Its target was the lead over the best rival after the current round, including points from earlier rounds and a win or loss bonus when the match ended there.
- **Original round neural network** learned from the earlier training set. Each candidate faced eight sampled arrangements of hidden cards, with later moves played by a fixed family rule. It learned to predict the candidate's relative score advantage at round end.
- **Round-trained decision tree** learned from that same earlier dataset and round-end reward. Like the match-trained tree, it follows a short path of yes-or-no tests. The two trees differ in both their training positions and the outcome they learned to predict.

Here is a position where the two newer networks disagree. A 1 and a 7 are showing at the tops of the first and second columns. All ten other cards are hidden. With a 3 on the discard pile, the match-trained network takes it for the 7. The matched-round network draws blind.

### Two opponents that score every legal move

- **All-moves board evaluator** considers even a swap that raises its visible total. With a 7 above a 6 and a 2 as its only other visible card, it takes a discarded 7 for the 6. The extra point buys a pair. Its weights were tuned in complete simulated matches. To value a flip that might clear a column, it uses the matching card's frequency in a fresh deck.
- **All-moves table evaluator** uses the same move scores and adds what its rivals are showing. It puts more value on revealing a card if a rival has at most one hidden card left. Once someone has at least 70 total points, the projected match standings also influence whether it closes the round. [Expanded-action experiments](https://github.com/The-CarL/skyjo-strategy-lab/blob/main/reports/phase2/expanded.md)

## Try it at your table

Play a full game against one to seven computer opponents. Choose a style for each seat to see how a card counter, a decision tree, and a neural network handle the same table. [Play Skyjo](https://skyjo.carloperottino.com/)

For a game with physical cards, enter your face-up cards and the top discard to see the suggested move. The coach offers both family rules, the board evaluator and three learned opponents. Its menu calls them **Full-match neural network**, **Round-trained neural network** (the online table's original round network) and **Round-trained decision tree**. [Open the table coach](https://skyjo.carloperottino.com/coach)

To use the coach offline, extract the family kit and open `skyjo-coach.html` in a browser. The kit also includes printable strategy cards. [Download the family kit (ZIP)](https://github.com/The-CarL/skyjo-strategy-lab/raw/refs/heads/main/downloads/skyjo-family-kit.zip)
