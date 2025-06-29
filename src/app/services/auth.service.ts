import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'isLoggedIn';

  constructor() {}

  // ✅ Vérifie si on est côté navigateur (pas serveur SSR)
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ✅ Connexion avec email + mot de passe
  login(email: string, password: string): boolean {
    if (email === 'admin@ocpgroup.ma' && password === 'password') {
      if (this.isBrowser()) {
        localStorage.setItem(this.storageKey, 'true');
      }
      return true;
    }
    return false;
  }

  // ✅ Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.isBrowser() && localStorage.getItem(this.storageKey) === 'true';
  }

  // ✅ Déconnexion
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
