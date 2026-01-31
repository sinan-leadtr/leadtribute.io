# Leadtribute starten – Schritt für Schritt

Wenn der Server „nicht funktioniert“ oder der Browser sich nicht öffnet, genau diese Reihenfolge ausführen.

---

## 1. Alte Server beenden

Es darf **nur ein** Dev-Server laufen. Sonst blockieren sich die Prozesse.

- In **Cursor**: Alle Terminals schließen, in denen `npm run dev` läuft (Tab schließen oder Strg+C).
- Oder in **macOS Terminal.app** (nicht Cursor) ausführen:
  ```bash
  cd /Users/SinanOzturk/Desktop/07_Leadtribute.io/Development_Tool
  lsof -ti :3000 | xargs kill -9
  ```

---

## 2. Server neu starten („sauber“)

Im Projektordner **ein** Terminal öffnen und:

```bash
cd /Users/SinanOzturk/Desktop/07_Leadtribute.io/Development_Tool
npm run dev:clean
```

`dev:clean` beendet zuerst alles auf Port 3000 und startet dann den Server.

Warten, bis in der Konsole steht:
- **Ready in … ms**
- **Local: http://127.0.0.1:3000**

Dieses Terminal **nicht schließen** – der Server muss laufen.

---

## 3. App im Browser öffnen

**Variante A – Über Terminal (macOS)**  
In einem **zweiten** Terminal (oder Terminal.app):

```bash
cd /Users/SinanOzturk/Desktop/07_Leadtribute.io/Development_Tool
npm run open-app
```

Damit öffnet sich der Standard-Browser mit der App.

**Variante B – Manuell**  
Browser (Chrome, Safari, Firefox) öffnen und in die Adresszeile tippen:

```
http://127.0.0.1:3000
```

Enter drücken.

**Variante C – Cursor Simple Browser**  
1. **Cmd+Shift+P** (Mac) oder **Ctrl+Shift+P** (Windows)  
2. **Simple Browser: Show** eingeben und auswählen  
3. URL eingeben: **http://127.0.0.1:3000** (unbedingt **3000**, nicht 3001 – sonst Error -102)

---

## Kurz-Checkliste

| Schritt | Aktion |
|--------|--------|
| 1 | Alle alten `npm run dev`-Terminals schließen oder Port 3000 freigeben |
| 2 | `npm run dev:clean` ausführen und auf „Ready“ warten |
| 3 | Browser mit `npm run open-app` oder **http://127.0.0.1:3000** öffnen |

Wenn nach Schritt 2 „Ready“ erscheint, der Browser aber leer bleibt oder „Verbindung abgelehnt“ zeigt: **http://127.0.0.1:3000** verwenden (nicht localhost).
