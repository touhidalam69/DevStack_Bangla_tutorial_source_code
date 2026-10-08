#!/usr/bin/env bash
# Builds and tests one video folder the way its README runs it:
# .NET solutions, Angular apps, Node.js tests, and a syntax check of every other JavaScript file.
set -euo pipefail
folder=${1:?usage: build-folder.sh src/<slug>}
cd "$folder"

find . -name node_modules -prune -o \( -name '*.slnx' -o -name '*.sln' \) -print | while read -r sln; do
  echo "::group::dotnet build $sln"
  dotnet build "$sln" --nologo
  echo "::endgroup::"
done

find . -name node_modules -prune -o -name package.json -print | while read -r pkg; do
  dir=$(dirname "$pkg")
  if [ -f "$dir/angular.json" ]; then
    echo "::group::ng build $dir"
    (cd "$dir" && npm ci && npx ng build)
    echo "::endgroup::"
  elif (cd "$dir" && node -e "process.exit(require('./package.json').scripts?.test ? 0 : 1)"); then
    echo "::group::npm test $dir"
    (
      cd "$dir"
      if [ -f package-lock.json ]; then npm ci
      elif node -e "const p = require('./package.json'); process.exit(Object.keys({...p.dependencies, ...p.devDependencies}).length ? 0 : 1)"; then npm install
      fi
      npm test
    )
    echo "::endgroup::"
  fi
done

# Some scripts download data from the internet, so plain JavaScript files are only checked, not run.
find . \( -name node_modules -o -name dist -o -name .angular \) -prune -o \( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' \) -print | while read -r f; do
  node --check "$f"
done
echo "OK: $folder"
