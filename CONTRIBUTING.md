# Contributing

Thank you for your interest in contributing to ptjs!

BWe invite you to participate in our community by adding and commenting on [issues](https://github.com/raghavmecheri/ptjs/issues) (e.g., bug reports; new feature suggestions) or contributing code enhancements through a pull request.

If you have any general questions about contributing to ptjs, please feel free to email [Raghav](raghav.mecheri@columbia.edu), or just open an issue on [Github](https://github.com/raghavmecheri/ptjs/issues/new).
## Guidelines

When submitting PRs to ptjs, please respect the following general
coding guidelines:

* All PRs should be accompanied by an appropriate label as per [lerna-changelog](https://github.com/lerna/lerna-changelog), and reference any issue they resolve.
* Please try to keep PRs small and focused.  If you find your PR touches multiple loosely related changes, it may be best to break up into multiple PRs.
* Individual commits should preferably do One Thing (tm), and have descriptive commit messages.  Do not make "WIP" or other mystery commit messages.
* ... that being said, one-liners or other commits should typically be grouped.  Please try to keep 'cleanup', 'formatting' or other non-functional changes to a single commit at most in your PR.
* PRs that involve moving files around the repository tree should be organized in a stand-alone commit from actual code changes.
* Please do not submit incomplete PRs or partially implemented features.  Feature additions should be implemented completely.
* Please do not submit PRs disabled by feature or build flag - experimental features should be kept on a branch until they are ready to be merged.
* For feature additions, make sure you have added complete docstrings to any new APIs, as well as additions to the [Usage Guide]() if applicable.
* All PRs should be accompanied by tests asserting their behavior in any packages they modify.
* Do not commit with `--no-verify` or otherwise bypass commit hooks, and please respect the formatting and linting guidelines they enforce.
* Do not `merge master` upstream changes into your PR.  If your change has conflicts with the `master` branch, please pull master into your fork's master, then rebase.