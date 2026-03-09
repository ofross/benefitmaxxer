# BenefitMaxxer

**Track your credit card benefits automatically from your spending data.**

🔗 **Live site: [ofross.github.io/benefitmaxxer](https://ofross.github.io/benefitmaxxer)**

---

## What it does

BenefitMaxxer is a client-side web app that helps you get the most out of your credit cards. Upload a CSV export from your bank, select the cards you hold, and the app shows you which benefits you've used, what's left to redeem, and whether your cards are actually worth their annual fees.

- **94 credit cards** across Chase, Amex, Citi, BofA, Capital One, Wells Fargo, Discover, and more
- **Auto-detects bank CSV format** — supports Chase, Amex, Citi, BofA, Capital One, and Wells Fargo exports
- **Tracks all credit types** — annual, monthly, quarterly, and semi-annual statement credits
- **Overlap detection** — flags duplicate benefits across your cards and recommends which to keep or cancel
- **100% local** — no backend, no account, no data leaves your browser

## How to use

1. **Select your cards** — search and filter by issuer, select everything you hold
2. **Upload spending CSVs** — export from each bank's website and drag them in (one per account)
3. **View your dashboard** — see used vs. remaining benefits, cashback estimates, and card recommendations

## Running locally

Just open `index.html` in any modern browser — no build step, no dependencies to install.

```bash
open index.html
```

# Credits

BenefitMaxxer uses [PapaParse](https://github.com/mholt/PapaParse) v5.4.1

```
The MIT License (MIT)

Copyright (c) 2015 Matthew Holt

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```