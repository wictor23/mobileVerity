#!/usr/bin/env bash
set -euo pipefail

VERSION="${DEMO_APP_VERSION:-2.2.0}"
REPO="webdriverio/native-demo-app"
mkdir -p apps

echo "Downloading native-demo-app release ${VERSION}..."

if [[ "${PLATFORM:-android}" == "ios" ]]; then
  ASSET_URL="$(gh api "repos/${REPO}/releases/tags/${VERSION}" --jq '.assets[] | select(.name | endswith(".zip")) | .browser_download_url' | head -n 1)"
  test -n "${ASSET_URL}"
  curl -fL "${ASSET_URL}" -o apps/native-demo-ios.zip
  rm -rf apps/NativeDemoApp.app
  unzip -q apps/native-demo-ios.zip -d apps/
  APP="$(find apps -maxdepth 4 -type d -name "*.app" | head -n 1)"
  test -n "${APP}"
  mv "${APP}" apps/NativeDemoApp.app
else
  ASSET_URL="$(gh api "repos/${REPO}/releases/tags/${VERSION}" --jq '.assets[] | select(.name | endswith(".apk")) | .browser_download_url' | head -n 1)"
  test -n "${ASSET_URL}"
  curl -fL "${ASSET_URL}" -o apps/NativeDemoApp.apk
fi

echo "App ready:"
find apps -maxdepth 2 -type f -o -type d -name "*.app"
