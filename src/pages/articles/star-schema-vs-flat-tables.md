---
layout: ../../layouts/ArticleLayout.astro
title: "Star schema vs. flat tables: a practical guide"
description: "When to normalize, when to keep it flat, and how your modeling choices affect DAX performance."
date: "2026-03-25"
category: "Data Modeling"
author: "Avi Deutsch"
---

One of the most common mistakes I see in Power BI projects is using a single flat table for everything. It works for small datasets, but as your data grows, both performance and DAX complexity suffer dramatically. Let me explain why **star schema** is almost always the better choice.

## The flat table trap

A flat table combines all your data into one wide table — sales transactions alongside customer names, product details, and date information all in the same rows. It feels simple at first, but it creates several problems.

First, data redundancy. If customer "Acme Corp" has 10,000 transactions, the company name, address, and segment are repeated 10,000 times. This bloats your model and slows refresh times.

Second, DAX becomes harder. Without proper relationships, you end up writing more complex formulas to handle what should be simple aggregations.

## The star schema approach

A star schema separates your data into two types of tables:

**Fact tables** contain your measurable events — sales transactions, inventory movements, support tickets. They're typically tall and narrow, with foreign keys pointing to dimension tables.

**Dimension tables** contain your descriptive attributes — customer details, product information, date hierarchies. They're typically wide and short.

```
         [DimCustomer]
              |
[DimDate] — [FactSales] — [DimProduct]
              |
         [DimStore]
```

## Real-world impact on DAX

With a proper star schema, a measure like "Sales by Customer Segment" is trivial:

```
Sales by Segment = 
SUMMARIZE(
    DimCustomer,
    DimCustomer[Segment],
    "Total", [Total Sales]
)
```

With a flat table, you'd need additional logic to handle duplicates and ensure correct aggregation. The star schema lets the VertiPaq engine do what it does best — compress columnar data efficiently and resolve relationships quickly.

## When flat tables are acceptable

There are cases where a flat table makes sense: very small datasets (under 10,000 rows), quick prototypes or proof-of-concept reports, and single-purpose tables that won't be joined with other data. For anything beyond that, invest the time in building a proper star schema. Your future self — and your DAX formulas — will thank you.
