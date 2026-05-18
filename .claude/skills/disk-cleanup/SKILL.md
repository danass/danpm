---
name: disk-cleanup
description: macOS disk space recovery — inventory, prune caches/dev junk, archive apps/SDKs to external drive. Trigger when the user asks to "clean up space", "free disk", "make room", or shows a near-full disk.
---

# macOS disk-cleanup runbook

Goal: free space without losing data. Cache-class items are auto-deleted; user data is always confirmed.

## 1. Inventory (always start here)

```bash
df -h /                                    # current free
du -sh ~/* 2>/dev/null | sort -h | tail -20
du -sh ~/Library/* 2>/dev/null | sort -h | tail -15
du -sh ~/Library/Application\ Support/* 2>/dev/null | sort -h | tail -15
du -sh ~/Library/Caches/* 2>/dev/null | sort -h | tail -15
```

If APFS local snapshots may be holding space:
```bash
tmutil listlocalsnapshots /
diskutil apfs listSnapshots /
```
Snapshots labelled `com.apple.os.update-*` are purged automatically under pressure.

## 2. Safe automatic deletions (no confirmation needed)

These all regenerate on next use:

```bash
# Browser caches (only if browser closed — check with `pgrep -l "Google Chrome|firefox"`)
rm -rf ~/Library/Caches/Google ~/Library/Caches/Firefox

# Build / dev tool caches
npm cache clean --force
pnpm store prune
rm -rf ~/Library/Caches/{go-build,CocoaPods,pip,pnpm,Homebrew,node-gyp,ms-playwright,ms-playwright-go}

# Apple system caches
rm -rf ~/Library/Caches/SiriTTS ~/Library/Caches/GeoServices

# Xcode (often biggest dev win)
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport
rm -rf ~/Library/Developer/CoreSimulator   # iOS simulator data
# KEEP ~/Library/Developer/Xcode/Archives — release builds

# Wallpaper aerial videos (regenerate on demand)
rm -rf ~/Library/Application\ Support/com.apple.wallpaper/aerials

# Electron app caches (apps not running)
rm -f  ~/Library/Application\ Support/Claude/state.vscdb.backup
rm -rf ~/Library/Application\ Support/Claude/vm_bundles   # Claude Code sandbox VM image, ~10GB, re-downloads
```

## 3. Confirmation required (data loss / re-auth risk)

Always ask before:
- `~/Library/Application Support/Notion/Partitions` — re-login, loses offline content (1-2 GB)
- `~/Library/Application Support/<app>/Partitions` (other Electron apps) — same pattern
- `~/.Trash` — empty Trash only with explicit OK
- `~/Library/Application Support/Cursor` and similar — chat/session local state
- `node_modules` — list with last-modified date, propose only dirs ≥60 days dormant
- Uninstalled-app leftovers (digikam, GarageBand, Logic) — verify the app is truly gone

Dormancy check for node_modules:
```bash
find ~/Coding -name node_modules -type d -prune 2>/dev/null | while read d; do
  parent=$(dirname "$d")
  mtime=$(stat -f "%Sm" -t "%Y-%m-%d" "$parent")
  size=$(du -sh "$d" | cut -f1)
  echo "$mtime  $size  $parent"
done | sort
```

## 4. Archiving large apps to external drive

Use `ditto` (preserves bundle metadata + code signature). Standard pattern:

```bash
ditto -c -k --sequesterRsrc --keepParent \
  "/Applications/<App>.app" \
  "/Volumes/LaCie/Applications-Archive/<App>.zip"

# Verify
unzip -tq "/Volumes/LaCie/Applications-Archive/<App>.zip" && echo OK

# Delete original (most apps need sudo)
sudo rm -rf "/Applications/<App>.app"
```

A restore script is at `/Volumes/LaCie/Applications-Archive/restore.sh` — runs `ditto -x -k` and strips quarantine.

## 5. Moving an SDK to LaCie system-wide

For Flutter, Node, etc. — keep on external drive, available to all users:

```bash
sudo mv /path/to/sdk /Volumes/LaCie/Development/<sdk>
sudo chown -R root:wheel /Volumes/LaCie/Development/<sdk>
sudo chmod -R a+rX /Volumes/LaCie/Development/<sdk>
echo "/Volumes/LaCie/Development/<sdk>/bin" | sudo tee /etc/paths.d/<sdk>
```

For tool caches that need to be writable (PUB_CACHE, npm prefix, etc.):
```bash
sudo mkdir -p /Volumes/LaCie/Development/.<cache>
sudo chmod 1777 /Volumes/LaCie/Development/.<cache>   # sticky like /tmp
echo 'export <VAR>="/Volumes/LaCie/Development/.<cache>"' | sudo tee -a /etc/zshenv
```

`/etc/zshenv` loads in **every** zsh session (login + non-login). `/etc/paths.d/` is read by `path_helper`. Both system-wide.

## 6. Cleaning another user account

If another user account on the same Mac has space hogs, the agent's sandbox blocks cross-account writes even with `sudo`. Two approaches:

**A — User provides one-liners themselves** (recommended for app data):
Give them a `sudo rm -rf …` command targeting the other account.

**B — Scoped NOPASSWD sudoers entry** (for read-only inventory and safe cache cleanup):
```bash
sudo tee /etc/sudoers.d/claude-cleanup <<'EOF'
<user> ALL=(ALL) NOPASSWD: /usr/bin/du, /bin/ls, /bin/rm, /bin/cat
EOF
sudo chmod 440 /etc/sudoers.d/claude-cleanup
```
Then `sudo -n du …`, `sudo -n ls …`, `sudo -n rm -rf …` work without password.
Even with this, the agent sandbox may still block app-data deletes on another user — caches/dev-junk usually pass. For app data, fall back to (A).

Remove the sudoers file when done:
```bash
sudo rm /etc/sudoers.d/claude-cleanup
```

## 7. Pitfalls to avoid

- **Cross-volume `mv`** is `cp+rm` — sockets and special files won't copy; check stderr for `sockets not copied` warnings, normally fine to ignore.
- **APFS snapshots** can hold deleted space briefly (`com.apple.os.update-*`). They purge under pressure; don't force-delete.
- **SQLite over USB**: never symlink an active SQLite DB (Cursor's `state.vscdb`, etc.) to an external drive — risk of corruption on disconnect. Use snapshot-copy instead, or move only after the app has been uninstalled.
- **Don't touch** `~/.claude/projects/` — Claude Code session JSONL transcripts.
- **`du -sh` silently truncates** on permission-denied subdirs; for accurate size on another user's home, run via `sudo`.
- **Hooks may interpret `Bash(sudo:*)` permission rule** as broadly granting sudo to the agent; combine with a narrow `sudoers.d` entry to bound real privilege.

## 8. Verifying the result

```bash
df -h /
diskutil info / | grep -iE "purg|free|avail"  # confirms no snapshot phantom
```
