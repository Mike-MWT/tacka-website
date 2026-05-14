# Michael Tacka Website

Schöne, responsive Website gehostet auf GitHub Pages.

## Features

- ✅ Bilingual (Deutsch/Englisch)
- ✅ Responsive Design
- ✅ Warm & freundlich (Gelb, Blau, Grün)
- ✅ GitHub Pages ready

## Setup

### 1. GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository-Name: `tacka-website` oder `Mike-MWT.github.io` (für Benutzer-Site)
3. Public
4. Erstellen

### 2. Lokal pushen

```bash
cd ~/workspace-projects/tacka-website
git remote add origin https://github.com/Mike-MWT/tacka-website.git
git branch -M main
git add .
git commit -m "Initial commit: Tacka website"
git push -u origin main
```

### 3. GitHub Pages aktivieren

1. Gehe zu Repository → Settings → Pages
2. Source: Branch `main`, Folder `/root`
3. Custom domain: `tacka.de` (wird automatisch CNAME erstellen)
4. "Save"

### 4. DNS bei United Domains konfigurieren

Siehe unten für E-Mail + GitHub Pages Setup.

---

## DNS-Setup bei United Domains

### 🌐 GitHub Pages

1. Gehe zu https://united-domains.de (Login)
2. Deine Domains → `tacka.de` → DNS
3. Folgende Records hinzufügen:

```
Typ    | Name | Wert
-------|------|------
CNAME  | www  | Mike-MWT.github.io (oder dein GitHub Pages User/Org)
A      | @    | 185.199.108.153
A      | @    | 185.199.109.153
A      | @    | 185.199.110.153
A      | @    | 185.199.111.153
AAAA   | @    | 2606:50c0:8000::153
AAAA   | @    | 2606:50c0:8001::153
AAAA   | @    | 2606:50c0:8002::153
AAAA   | @    | 2606:50c0:8003::153
```

4. Speichern. Kann 10-30min dauern bis aktiv.

### 📧 E-Mail-Sicherheit (SPF, DKIM, DMARC)

Damit deine `michael@tacka.de` E-Mails nicht in Spam landen:

#### **SPF Record** (autorisiert T-Online/web.de zum Senden)

```
Typ  | Name | Wert
-----|------|------
TXT  | @    | v=spf1 include:t-online.de ~all
```

(oder wenn mehrere Provider: `v=spf1 include:t-online.de include:web.de ~all`)

#### **DKIM** (optional, aber empfohlen)

Falls dein E-Mail-Provider DKIM anbietet:
- T-Online DKIM einrichten
- Public Key bei United Domains als TXT-Record hinzufügen

Frage T-Online nach: "DKIM Public Key für domänenübergreifendes Signing"

#### **DMARC** (optional)

```
Typ  | Name      | Wert
-----|-----------|------
TXT  | _dmarc    | v=DMARC1; p=quarantine; rua=mailto:michael@tacka.de
```

---

## Lokale Entwicklung

```bash
cd ~/workspace-projects/tacka-website

# Öffnen in Browser (lokal testen)
open index.html
# oder
firefox index.html
```

Änderungen pushen:
```bash
git add .
git commit -m "Update..."
git push
```

GitHub aktualisiert automatisch nach ~1 Min.

---

## Kontakt-E-Mail arbeitet jetzt automatisch

Sobald die Website live ist, funktioniert `mailto:michael@tacka.de` im E-Mail-Link.

---

**Fertig!** 🚀 Website ist live auf tacka.de + tacka.com (mit Redirect)
