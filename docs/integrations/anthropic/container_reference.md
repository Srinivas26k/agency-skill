# Container Reference

Claude Managed Agents cloud containers include a broad set of pre-installed languages, package managers, and utilities so the agent can start working immediately.

## Programming languages

| Language | Version | Package manager |
| --- | --- | --- |
| Python | 3.12+ | pip, uv |
| Node.js | 20+ | npm, yarn, pnpm |
| Go | 1.22+ | go modules |
| Rust | 1.77+ | cargo |
| Java | 21+ | maven, gradle |
| Ruby | 3.3+ | bundler, gem |
| PHP | 8.3+ | composer |
| C and C++ | GCC 13+ | make, cmake |

## Databases and clients

| Tool | Notes |
| --- | --- |
| SQLite | Available locally inside the container |
| PostgreSQL client | `psql` for remote databases |
| Redis client | `redis-cli` for remote instances |

Database servers are not started by default. SQLite is the only local database available immediately.

## Common utilities

- `git`
- `curl`, `wget`
- `jq`
- `tar`, `zip`, `unzip`
- `ssh`, `scp`
- `tmux`, `screen`
- `make`, `cmake`
- `rg`
- `tree`
- `htop`
- `sed`, `awk`, `grep`
- `vim`, `nano`
- `diff`, `patch`

## Container specs

| Property | Value |
| --- | --- |
| Operating system | Ubuntu 22.04 LTS |
| Architecture | x86_64 |
| Memory | Up to 8 GB |
| Disk space | Up to 10 GB |
| Network | Disabled by default unless enabled in the environment config |