# PUBLISHING GUIDE — Agency Designer Skill

Follow these steps to publish the **Agency Designer Skill** to NPM and the `skills.sh` registry.

---

## 📦 1. PUBLISH TO NPM

The package name is SEO-optimized as `agency-designer-skill`.

1. **Login to NPM**:
   ```bash
   npm login
   # Use your username: srinivas_dev26
   ```

2. **Verify Package**:
   ```bash
   npm pack --dry-run
   # Ensure all files in core/, agents/, bin/, etc. are included.
   ```

3. **Publish**:
   ```bash
   npm publish --access public
   ```

---

## ⚡ 2. PUBLISH TO SKILLS.SH

The `skills.sh` registry is powered by GitHub. Once your repository is public, it can be added.

1. **Ensure GitHub is Public**:
   Ensure your repository at `github.com/srinivas-nampalli/agency-designer-skill` is set to **Public**.

2. **Submit to Registry**:
   You can announce your skill to the ecosystem by sharing the install command:
   ```bash
   npx skills add srinivas-nampalli/agency-designer-skill
   ```

3. **Create a "Skills Profile"**:
   Add a `skill.json` (which we already have in `skills/agency-designer/skill.json`) to the root of your repo if you want it to be auto-discovered by the agentic ecosystem.

---

## 🆘 EMERGENCY ACCESS & TROUBLESHOOTING

If you are locked out of your NPM account or have 2FA issues, use these specialized options:

### 1. The "Trusted Publisher" Strategy (GitHub OIDC)
If your GitHub is already linked to NPM, you can use **Trusted Publishing**.
- **Action**: Run a GitHub Action with `permissions: id-token: write`. This bypasses manual login.

### 2. Check for "Ghost" Sessions
Check if you are still logged in locally or on another browser:
- **CLI**: Run `npm whoami`. If it returns your username, generate a token immediately: `npm token create --type=automation`.
- **Browser**: Check mobile or other browsers for an active `npmjs.com` session to generate a token.
