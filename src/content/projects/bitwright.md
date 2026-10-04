---
title: "Bitwright"
tagline: "An Apple-1-inspired computer you can inspect from gates to pixels"
date: 2026-10-04
tags: [Computer Architecture, Digital Logic, "6502", Logisim-evolution]
categories: [Hardware, Education]
draft: true
links:
  github: "https://github.com/The-CarL/bitwright"
---

<!-- Co-writing draft: technical details are grounded in the repository.
     The Carlo comments below mark places for personal context and reflection.
     Keep draft: true until the entry is ready to publish. -->

## Why I built this

Bitwright revisits an unfinished ambition from my computer-engineering undergraduate days: build a computer from the ground up, write assembly programs for it, and watch them execute.

The result is an Apple-1-inspired machine in Logisim-evolution. You can open its circuits, follow an instruction through the CPU, and trace the path from keyboard input to pixels on the terminal.

<!-- Carlo: What was the original project or ambition? What made you return
     to it now, and what did you most want to understand by building it? -->

## What it does

The current machine connects a gate-built 6502 CPU, 4 KiB of RAM, firmware ROM, an ASCII keyboard interface, and a 40-by-24-character text terminal.

An original boot monitor lets you inspect memory, deposit bytes, and start programs. Assembly tools turn source files into machine code and text-based load files. The included demos print a greeting, exercise memory, and calculate a sum from keyboard input.

<!-- Visual: add a screenshot of the running sum demo here. Save assets under
     public/projects/bitwright/ once chosen; explain what the reader is seeing. -->

## From a program to pixels

The sum demo is a useful way to follow the whole machine:

1. Assemble the program into an ASCII `.mon` load file.
2. Feed that file through the keyboard interface. Firmware running on the circuit CPU parses the text and writes the program into RAM.
3. The CPU executes the program and waits for keyboard input.
4. Enter `9`. The demo calculates the sum from 1 through 9 and prints `SUM (HEX) = 2D` — 45 in decimal — before returning to the monitor.

The terminal circuits handle the cursor, character storage, font lookup, scrolling, and pixel generation. The host window displays the pixels those circuits produce.

<!-- Carlo: Add your account of getting a program to run end to end. What
     failed along the way? What was the most revealing thing to watch? -->

## What "from gates" means here

The CPU exposes its arithmetic, instruction decoder, registers, and control logic as inspectable circuits. Its storage uses gate-built latches and flip-flops. Bulk RAM and ROM are explicit building blocks elsewhere in the machine; the console also uses disclosed single-bit D flip-flops, character RAM, and glyph ROM.

The host assembles programs, supplies ASCII input, and presents circuit-generated pixels. Instruction execution, program loading, and terminal behavior happen inside the simulated computer.

The target is original NMOS 6502 instruction behavior. Timing and hardware fidelity are limited: this is an Apple-1-inspired educational machine, with those boundaries documented in the [architecture notes](https://github.com/The-CarL/bitwright/blob/main/architecture/apple1-direction.md).

## What I learned

<!-- Carlo: This is the main reflection section. Choose two or three concrete
     lessons rather than a feature recap. Possible starting points:
     - Which abstraction became clearer once you built the circuitry?
     - Where did debugging cross the boundary between hardware and software?
     - How did inspectability trade off against simulation speed?
     - If relevant, what role did AI tools play, and what did you verify yourself?
     Replace this comment with your observations. -->

## Where it stands

Bitwright is a working development candidate. The CPU, monitor, keyboard, and terminal run together, and the sum demo has been exercised through the visible desktop interface. Release acceptance remains open, including the fresh-user package experience and further desktop and platform checks.

The [roadmap](https://github.com/The-CarL/bitwright/blob/main/docs/roadmap.md) tracks that work. The [implementation evidence](https://github.com/The-CarL/bitwright/blob/main/docs/evidence/apple1-2026-10-01.md) records what has been tested and the current limitations.

<!-- Carlo: What do you want to do next, and what would make this feel finished
     to you? Keep personal ambitions separate from implemented capabilities. -->

## Explore it

Start with the [repository and run instructions](https://github.com/The-CarL/bitwright#readme). The current project uses Logisim-evolution 5.0.0. The [illustrated architecture gallery](https://github.com/The-CarL/bitwright/blob/main/docs/images/architecture/README.md) walks through the CPU, storage, and input-to-pixel path.
