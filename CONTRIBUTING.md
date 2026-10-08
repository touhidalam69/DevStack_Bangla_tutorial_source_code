# Contributing

Thank you for helping other viewers. This repository holds the code exactly as it ran in each DevStack Bangla
video, so helping works a little differently from a normal project.

## Report a problem

Open an issue with the **The code does not run** form: the folder, what you ran, the full error and your versions
(`dotnet --version`, `node --version`). Most problems come from a different SDK or Node.js version, or from
SQL Server not running. Each folder's README lists what its project needs.

## Suggest a fix

Open an issue first. The code has to match what the video shows, so a fix is made in the video's project and the
folder is published again, with a note in its README about what changed since the video. A pull request is a
welcome way to show a fix, but it is not merged as it is: everything in `src/<slug>/` is generated, and a direct
edit would be overwritten.

## Suggest a topic

Use the **Question or suggestion** form, or comment on any video.
