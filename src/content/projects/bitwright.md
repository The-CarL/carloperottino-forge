---
title: "Bitwright"
tagline: "An Apple-1-inspired computer you can inspect from gates to pixels"
date: 2026-10-04
tags: [Computer Architecture, Digital Logic, "6502", Logisim-evolution]
categories: [Hardware, Education]
links:
  github: "https://github.com/The-CarL/bitwright"
---

## Why I built this

Bitwright revisits an unfinished ambition from my computer-engineering undergraduate days: build a computer from the ground up, write assembly programs for it, and watch them execute.

It's built in Logisim-evolution, so you can open the circuits and follow how instructions, keyboard input, and pixels move through the machine.

## What it does

An Apple-1-inspired computer with a gate-built 6502 CPU, 4 KiB of RAM, firmware ROM, a keyboard interface, and a 40-by-24-character text terminal. An original boot monitor loads and runs assembly programs, with demos for printing text, working with memory, and calculating a sum.

The CPU and terminal logic are inspectable circuits, with RAM and ROM used as explicit memory components. It's a working development candidate. The [repository](https://github.com/The-CarL/bitwright) has the source, circuit diagrams, and instructions for trying it.
