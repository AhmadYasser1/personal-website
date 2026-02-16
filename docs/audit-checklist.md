# Weekly UX Audit Checklist

A step-by-step guide for reviewing the automated weekly analytics audit report.

## When

Every Monday morning. The GitHub Actions workflow runs at 2:30 AM UTC and creates a GitHub Issue with the report.

## Quick Review (5 minutes)

- [ ] Open the latest `📊 Weekly UX Audit` issue in GitHub
- [ ] Check the **Summary** table — are any metrics trending down (↓ regressed)?
- [ ] Check the **Findings** section — any 🔴 Critical issues?
- [ ] If all green, close the issue. Otherwise, continue below.

## Performance Review

- [ ] Compare mobile scores across pages — any below 70?
- [ ] Check LCP values — any above 2.5s budget?
- [ ] Check TBT values — any above 300ms budget?
- [ ] For regression: compare with previous week's report (linked in trends)

### What to look for

| Metric | Good | Needs Work | Critical |
|--------|------|------------|----------|
| Performance Score | ≥ 90 | 70-89 | < 70 |
| LCP | ≤ 2.5s | 2.5-4.0s | > 4.0s |
| FCP | ≤ 1.8s | 1.8-3.0s | > 3.0s |
| TBT | ≤ 300ms | 300-600ms | > 600ms |
| CLS | ≤ 0.1 | 0.1-0.25 | > 0.25 |

## Behavioral Review

- [ ] Check rage clicks — any above 3 sessions?
- [ ] Check dead clicks — any above 5 sessions?
- [ ] Check script errors — any non-zero?
- [ ] If behavioral issues found, open Clarity dashboard for session replays

### Interpreting Clarity signals

- **Rage clicks**: Users clicking repeatedly on something that doesn't respond. Check: is the element interactive? Is it slow?
- **Dead clicks**: Users clicking on non-interactive elements. Check: does the element look clickable but isn't?
- **Excessive scrolling**: Users scrolling far beyond content. Check: is important content too far down?
- **Quickback clicks**: Users navigating then immediately going back. Check: does the link text match the destination?

## Taking Action

1. For **critical** findings: create a fix issue immediately, label it `priority:high`
2. For **warning** findings: add to the next sprint/iteration backlog
3. For **info** findings: note for future consideration, no immediate action needed

## Running Manually

To run the audit locally (useful for testing fixes):

```bash
npm run audit
```

The report will be saved to `.audit-data/audit-report.md`.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `CLARITY_API_TOKEN is required` | Missing env var | Check `.env.local` has the token |
| `PSI_API_KEY is required` | Missing env var | Check `.env.local` has the key |
| Clarity shows 0 sessions | Low traffic or token expired | Check Clarity dashboard; refresh JWT if expired |
| PSI returns 429 | Rate limit hit | Wait 24h or check quota in Google Cloud Console |
| GitHub Issue not created | Missing permissions | Check workflow has `issues: write` permission |
| No trend data | First run | Expected — trends populate after second weekly run |
