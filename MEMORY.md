# Technologie-Handbuch: Website-Deployment & Bild-Integration

## Über dieses Dokument
Dieses Dokument **gilt ausschließlich für die Website**, alle anderen Memories liegen in der Verzeichnisstruktur "home/openclaw/.openclaw/workspace". Dieses Dokument dient als externes Gedächtnis für zukünftige KI-Instanzen, um kritische Workflows und "Lessons Learned" aus der Integration von Telegram-Content in die Website zu dokumentieren.

---

## Wichtige Erinnerungen und Anmerkungen
- **Wichtige Info**: Dieses Dokument **gilt ausschließlich für die Website**
- alle anderen Memories liegen in der Verzeichnisstruktur "home/openclaw/.openclaw/workspace"

## Kritische Dateipfade (Single Source of Truth)

### Arbeitsumgebung
- **Arbeitsverzeichnis Webseite**: `/home/openclaw/workspace-projects/tacka-website/`
- **Telegram-Inbound-Quelle**: `.openclaw/media/inbound` (hier landen Bilder aus Telegram)
- **Ziel-Verzeichnis Bilder**: `images/` (relativ zum Arbeitsverzeichnis)
- **Ziel-Datei News**: `news.html` (relativ zum Arbeitsverzeichnis)
- **Arbeitsverzeichnis Allgemein**: `/home/openclaw/.openclaw/workspace
- **fileswap**: /home/Fileswap

### Wichtige Verzeichnisse
```
/home/openclaw/workspace-projects/tacka-website/
├── images/
├── news.html
└── .git/
```

---

## Externe Website

- Die Website liegt bei GitHub und ist umgeleitet auf tacka.de
- Ebenfalls zu erreichen unter tacka.com 
- Veröffentlichen über GitHub (push)

---

## Technische Regeln & Best Practices (Never-Again-Liste)

### 🔴 Kritische Regel Nr. 1: Umgang mit Binärdateien (Bilder)
**Bilder sind KEINE Textdateien!** Jeder Versuch, Bilder mit Python-Schreibfunktionen (`write()`) oder Texteditoren zu manipulieren, führt zu Korruption.

**Korrekte Vorgehensweise für Bild-Transfer:**
1. Prüfe, welches Bild aus dem Inbound-Verzeichnis kommt:
   ```bash
   ls -la .openclaw/media/inbound/
   ```

2. Kopiere die Original-Bilddatei NIEMALS mit Python, sondern mit dem System-Befehl `cp`:
   ```bash
   cp .openclaw/media/inbound/[Dateiname] images/[Zielname.jpg]
   ```

3. **Validierung ist Pflicht:** Überprüfe nach dem Transfer, ob es sich um eine echte Bilddatei handelt:
   ```bash
   file images/[Dateiname.jpg]
   ```
   **Erwartetes Ergebnis:** `JPEG image data`
   **Fehlerhafte Ergebnisse:** `ASCII text`, `UTF-8 Unicode text` etc.

### 🔴 Kritische Regel Nr. 2: HTML-Content-Integration
- HTML-Einträge müssen korrekt formatiert und in die `news.html` integriert werden
- Nutze die existierende Struktur der Datei und füge neue Einträge am Ende hinzu
- Achte auf korrekte HTML-Tags und Datumsformatierung

---

## Der Veröffentlichungsprozess (Deployment-Workflow)

### Problem: Lokale Änderungen ≠ Live-Website
Dateien im Arbeitsverzeichnis (`tacka-website/`) sind NICHT automatisch auf der Live-Website sichtbar. Es ist ein expliziter Deployment-Prozess erforderlich.

### Lösung: Git-basiertes Deployment
Der Weg zur Veröffentlichung erfolgt zwingend über Git. Dieser Prozess ist in der `telegram-photo-to-website`-Skill-Logik definiert.

**Schritt-für-Schritt-Anleitung:**
1. Wechsle in das Arbeitsverzeichnis:
   ```bash
   cd /home/openclaw/workspace-projects/tacka-website/
   ```

2. Füge alle neuen/geänderten Dateien hinzu:
   ```bash
   git add .
   ```

3. Erstelle einen Commit mit beschreibender Nachricht:
   ```bash
   git commit -m "Beschreibung der Änderung (z.B. 'Add Gulf fritillary image')"
   ```

4. Push zum Remote-Repository (durchführt die Veröffentlichung):
   ```bash
   git push origin main
   ```

### Wichtigste Erkenntnis
- `git push` löst automatische CI/CD-Pipeline aus
- Änderungen sind nach 30-60 Sekunden live
- Browser-Cache muss manuell gelöscht werden: `Strg + F5`

---

## Referenz: Telegram-Skill Integration

Der `telegram-photo-to-website` Skill ist primäre Anweisungsquelle für diesen Workflow. Alle Deployment-Prozesse sollten gemäß dessen Konfiguration und Logik durchgeführt werden.

---

## Fehler-Diagnose & Troubleshooting

### Problem: Bild existiert nicht im Workspace
**Lösung:** Prüfe den absoluten Pfad mit `find / -name [Dateiname]` nicht nur im aktuellen Verzeichnis

### Problem: Bild ist als Textdatei erkannt
**Ursache:** Falsche Transfer-Methode (Python statt `cp`)
**Lösung:** Neu kopieren mit `cp` + Validierung via `file`-Befehl

### Problem: Änderungen sind nicht live
**Ursache:** Git-Push wurde nicht durchgeführt
**Lösung:** Führe den vollständigen Git-Workflow durch (`add` → `commit` → `push`)

---

## Dokumentationshistorie
- **Erstellt:** 31. Mai 2026
- **Anlass:** Integration des Großen Perlmuttfalters (Gulf fritillary) auf der Website
- **Fehler-Kontext:** Mehrstündiger Kampf gegen Binärdatei-Korruption und falsche Deployment-Logik
- **Ziel:** Vermeidung von Fehlern bei zukünftigen Instanz-Wechseln
