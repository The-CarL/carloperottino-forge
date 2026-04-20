---
title: "ISP Watchdog"
tagline: "Continuous internet speed monitoring with anomaly detection and automated provider accountability"
date: 2026-04-20
tags: [Python, AWS, Raspberry Pi, Time Series]
categories: [Infrastructure, Networking]
comingSoon: true
links: {}
---

## The problem

You pay for 500 Mbps. You get 500 Mbps during the speed test your ISP runs at 2am. During your afternoon video call, you get 80. You know something is wrong, but you don't have the data to prove it — and even if you did, calling your ISP is its own punishment.

## What I'm building

A lightweight agent that runs on commodity hardware (Raspberry Pi, old laptop, anything) and continuously measures upload and download speeds. Results stream to AWS where they're stored as time series data.

**Anomaly detection** runs against the time series: sustained drops below your plan's advertised speed, degradation during peak hours, latency spikes, asymmetric up/down patterns. When your speeds consistently fall short of what you're paying for, you get an alert with the data to back it up.

**The part I'm most excited about**: automated provider communication. When the system detects you're not getting what you pay for, it drafts and sends a complaint to your ISP — with charts, timestamps, and a clear gap between advertised and actual performance. No phone trees. No "have you tried restarting your router."

## Where it gets interesting

If enough people run this, the data becomes a map. Aggregate speed metrics by provider, by geography, by time of day. Which ISP actually delivers in your neighborhood? Who throttles during peak hours? The individual utility is monitoring your own connection. The collective utility is transparency across the entire market.
