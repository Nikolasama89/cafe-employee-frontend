# Cafe Employee – Frontend (Angular)

Angular frontend για το σύστημα διαχείρισης εργαζομένων (Employee Management). Συνδέεται με το Spring Boot backend και χρησιμοποιεί JWT για authentication.

## 🔧 Τεχνολογίες

* **Angular 19** (`@angular/* 19.2.x`)
* **TypeScript \~5.7**
* **RxJS \~7.8**
* **Zone.js \~0.15**
* **Tailwind CSS 4** (με `@tailwindcss/postcss`)
* **Font Awesome** (`@fortawesome/angular-fontawesome` + icon packs)
* **jwt-decode** (για client-side parsing του JWT)

## 📦 Απαιτήσεις

* **Node.js** 20 LTS ή νεότερο (προτείνεται)
* **Angular CLI** (τοπικά ή από `npx`)

## 🚀 Γρήγορη Εκκίνηση

```bash
# εγκατάσταση εξαρτήσεων
npm install

# dev server στο http://localhost:4200
npm start
# ή
ng serve
```

## 🧰 Scripts (package.json)

* `start`: `ng serve` (dev server με live reload)
* `build`: `ng build` (παραγωγή build στον φάκελο `dist/`)
* `watch`: `ng build --watch --configuration development`
* `test`: `ng test` (Jasmine/Karma)

## 🔗 Σύνδεση με Backend

Ορίστε το **API base URL** στα περιβάλλοντα του Angular.

**`src/environments/environment.ts` (dev):**

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api' // προσαρμόστε αν χρειάζεται
};
```

**`src/environments/environment.prod.ts` (prod):**

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-domain.com/api'
};
```

> Το backend έχει ρυθμισμένο CORS. Αν παρ' όλα αυτά θέλεις τοπικά να χρησιμοποιήσεις **proxy** για αποφυγή CORS ή διαφορετικό port:
>
> **`proxy.conf.json`**
>
> ```json
> {
>   "/api": {
>     "target": "http://localhost:8080",
>     "secure": false,
>     "changeOrigin": true
>   }
> }
> ```
>
> Έπειτα: `ng serve --proxy-config proxy.conf.json`

## 🔐 Authentication (JWT)

* Μετά το login στο backend λαμβάνεις JWT.
* Αποθηκεύεις προσωρινά το token (π.χ. `localStorage`).
* Στα outbound requests πρόσθεσε header `Authorization: Bearer <token>`.


## 🎨 Tailwind CSS 4

* Βεβαιώσου ότι έχεις εισάγει το Tailwind CSS στο **global stylesheet** (π.χ. `src/styles.css`):

```css
@import "tailwindcss";
```

* Αν χρησιμοποιείς PostCSS, επιβεβαίωσε ότι φορτώνεται το plugin `@tailwindcss/postcss`.

## 🎯 Λειτουργικότητες (στόχος)

* **MVP**: login, βασική πλοήγηση/λίστες employees, προβολή στοιχείων.
* **Επόμενα**: διαχείριση/ανάθεση **tasks** σε employees, status updates, ρόλοι/πρόσβαση (Admin/Employee).


## 🧰 Font Awesome

  * `@fortawesome/angular-fontawesome` (wrapper)
  * `@fortawesome/free-brands-svg-icons` 
  * `@fortawesome/free-solid-svg-icons` 


## 🐞 Troubleshooting

* **401/403**: έλεγξε ότι στέλνεις σωστά `Authorization: Bearer <token>`.
* **CORS**: το backend είναι ρυθμισμένο. Με proxy config ή σωστό `apiBaseUrl` αποφεύγεις σφάλματα.
* **Node/CLI**: βεβαιώσου ότι χρησιμοποιείς Node 20+ και ενημερωμένο Angular CLI.
* **Tailwind**: αν δεν εφαρμόζονται τα styles, επιβεβαίωσε το import `@import "tailwindcss";` στο `styles.css`.

## 🔗 Σχετικά

* Backend README: δες το αντίστοιχο repository (Spring Boot + MySQL + JWT + Swagger).
**https://github.com/Nikolasama89/backend-employees-tasks-management**

---

### Σύντομες οδηγίες

1. `npm install`
2. Ρύθμισε `environment.ts` → `apiBaseUrl`.
3. `npm start` για dev, `npm run build` για production build.
4. (Προαιρετικό) Proxy config για τοπικό dev.
