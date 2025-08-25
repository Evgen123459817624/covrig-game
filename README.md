# Covrig Game (Java + React)

Un joc interactiv de tip „covrig simulator”, realizat cu **React** pentru frontend și **Java** pentru backend.  
Jucătorul poate cumpăra covrigi, monitoriza stocul și banii, iar prețul covrigilor se actualizează periodic.

---

# Funcționalități

- Frontend interactiv cu React
- Backend în Java care gestionează logica serverului (ex: prețuri dinamice)
- Actualizare preț covrig la intervale regulate
- Afisarea stocului și a banilor în timp real
- Funcționalități de cumpărare covrigi și afișarea timpului rămas pentru update

---

## Cum se joacă

1. Deschide `index.html` în browser.  
2. Vezi prețul curent al covrigilor și timpul rămas pentru actualizare.  
3. Apasă butonul „Cumpără” pentru a adăuga covrigi la stoc, ținând cont de bani disponibili.  
4. Urmărește modificările în timp real și strategizează pentru a maximiza resursele.  

---

# Tehnologii folosite

- HTML / CSS pentru interfață
- JavaScript pentru logică și interactivitate
- (Opțional) JSON pentru stocarea temporară a datelor

---

# Instalare

git clone https://github.com/Evgen123459817624/covrig-game

1. BackEnd (Java)
  1.1. Asigură-te că ai Java 17+ instalat și configurat.  
  1.2. Deschide terminalul în folderul backend și rulează:
  mvn clean install
  mvn spring-boot:run

2. Frontend (React)
  Deschide terminalul în folderul frontend/ și instalează dependențele:
  npm install

3. Pornire
  3.1 Pornirea front-end-ului
    cd clicker-frontend
    npm start

  3.2 Pornirea back-end-ului 
    Rulează CovrigClickerGameApplication.java din clickergame/src/main/java/com.example.clickergame

---

# Cum se joacă

Deschide aplicația în browser.
Începe prin a apăsa pe covrigul din mijloc pentru a acumula covrigi.
Vezi prețul curent al covrigilor și timpul rămas pentru următorul update (Din SHOP).
Apasă butonul „Sell all” pentru a vinde covrigii, gestionând banii disponibili.
Urmărește modificările în timp real și strategizează pentru a maximiza resursele.

---

# Tehnologii folosite

Frontend: React.js, HTML, CSS, JavaScript
Backend: Java (Spring Boot)
