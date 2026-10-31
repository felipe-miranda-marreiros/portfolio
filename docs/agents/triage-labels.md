# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's GitHub issues. This repo keeps the defaults, and all five labels exist on GitHub.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

`ready-for-agent` is one of the five Frontier conditions in `docs/agents/issue-tracker.md`: the label alone doesn't make a Ticket claimable. An issue labelled `wontfix` is left open for a human to close, since agents never close issues.

Edit the "Label in our tracker" column to match whatever vocabulary you actually use.
