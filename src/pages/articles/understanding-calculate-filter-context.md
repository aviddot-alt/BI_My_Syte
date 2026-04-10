---
layout: ../../layouts/ArticleLayout.astro
title: "Understanding CALCULATE and filter context"
description: "A deep dive into how CALCULATE modifies filter context and why it matters for every DAX formula you write."
date: "2026-04-02"
category: "DAX Patterns"
author: "Avi Deutsch"
---

If there's one function you need to master in DAX, it's `CALCULATE`. It's the engine behind almost every meaningful measure you'll write, and understanding how it manipulates **filter context** is what separates a beginner from an advanced DAX practitioner.

## What is filter context?

Every DAX expression evaluates within a **filter context** — the set of filters that determine which rows of data are visible to the calculation. When you place a measure in a Power BI visual, the visual automatically creates a filter context based on the rows, columns, and slicers.

For example, if you have a matrix with `Year` on rows and `Product Category` on columns, each cell evaluates your measure with a filter context that includes both the specific year AND the specific category.

## How CALCULATE changes the game

`CALCULATE` does something no other function can do — it **modifies the filter context** before evaluating an expression. The basic syntax is:

```
CALCULATE(
    <expression>,
    <filter1>,
    <filter2>,
    ...
)
```

Each filter argument can either **add** a new filter or **replace** an existing one. This is the key insight:

> CALCULATE doesn't just filter data. It transforms the filter context in which an expression is evaluated.

## A practical example

Let's say you want to calculate the percentage of total sales for each product category. Without CALCULATE, your measure would always return 100% because it only sees the current filter context. With CALCULATE and `ALL`, you can remove filters:

```
% of Total Sales = 
DIVIDE(
    [Total Sales],
    CALCULATE(
        [Total Sales],
        ALL(Products[Category])
    )
)
```

The `ALL(Products[Category])` argument tells CALCULATE to remove any existing filter on the Category column, giving you the total across all categories in the denominator.

## Context transition

There's another powerful behavior: when CALCULATE is used in a **row context** (inside an iterator like `SUMX`), it performs a **context transition** — converting the row context into an equivalent filter context. This is advanced territory, but understanding it unlocks patterns like:

```
Weighted Average Price = 
SUMX(
    Products,
    CALCULATE(
        AVERAGE(Sales[UnitPrice])
    ) * Products[Weight]
)
```

Here, `CALCULATE` inside `SUMX` transitions the row context (current product) into a filter context, so `AVERAGE(Sales[UnitPrice])` returns the average price for that specific product.

## Key takeaways

Understanding CALCULATE comes down to three principles: it evaluates an expression in a modified filter context, filter arguments can add new filters or override existing ones, and when used inside a row context it performs context transition. Master these, and you'll be able to write any DAX measure with confidence.
