/**
 * Hitelesítési middleware rendszer
 */

// Middleware a felhasználó hitelesítésének ellenőrzésére
const isAuthenticated = (req, res, next) => {
    // Ellenőrzi, hogy a felhasználó be van-e jelentkezve
    if (req.session && req.session.user) {
      // Ha igen, folytatja a kérés feldolgozását
      return next();
    }
    
    // Elmenti az eredeti URL-t, ahova a felhasználó próbált hozzáférni
    // Bejelentkezés után ide irányítjuk vissza
    req.session.returnTo = req.originalUrl;
    
    // Átirányítás a bejelentkezési oldalra
    res.redirect('/login');
  };
  
  // Middleware annak ellenőrzésére, hogy a felhasználó már be van-e jelentkezve
  // Hasznos a bejelentkezési/regisztrációs oldalakon, hogy átirányítsa a már bejelentkezett felhasználókat
  const isNotAuthenticated = (req, res, next) => {
    // Ellenőrzi, hogy a felhasználó be van-e jelentkezve
    if (req.session && req.session.user) {
      // Ha igen, átirányítja a főoldalra
      return res.redirect('/');
    }
    
    // Ha nincs bejelentkezve, folytatja a kérés feldolgozását
    next();
  };
  
  module.exports = {
    isAuthenticated,
    isNotAuthenticated
  };