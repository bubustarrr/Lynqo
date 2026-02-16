
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  // --- ENGLISH ---
  en: {
    translation: {
      profile: {
        dashboard: "Dashboard",
        premium_badge: "💎 PREMIUM",
        member_since: "Member since",
        settings_btn: "Settings",
        achievements_title: "Achievements",
        stats: {
          streak: "Day Streak",
          xp: "Total XP",
          health: "Health",
          coins: "Coins"
        },
        badges: {
          fire_title: "On Fire",
          fire_desc: "7 Day Streak",
          bird_title: "Early Bird",
          bird_desc: "Completed a lesson before 8am",
          investor_title: "Investor",
          investor_desc: "Earned 1000+ Coins",
          warrior_title: "Warrior",
          warrior_desc: "Won 5 PvP matches",
          locked_title: "Locked",
          locked_desc: "Keep learning!"
        },
        sidebar: {
          requests_title: "Friend Requests",
          new_badge: "New",
          request_msg: "Wants to be friends",
          confirm: "Confirm",
          delete: "Delete",
          friends_online: "Friends Online"
        },
        promo: {
          title: "Get Premium!",
          desc: "Unlimited lives, no ads, and exclusive badges.",
          btn: "Upgrade Now"
        }
      }
    }
  },

  // --- SPANISH (Español) ---
  es: {
    translation: {
      profile: {
        dashboard: "Panel de Control",
        premium_badge: "💎 PREMIUM",
        member_since: "Miembro desde",
        settings_btn: "Ajustes",
        achievements_title: "Logros",
        stats: {
          streak: "Racha",
          xp: "XP Total",
          health: "Salud",
          coins: "Monedas"
        },
        badges: {
          fire_title: "En Llamas",
          fire_desc: "Racha de 7 días",
          bird_title: "Madrugador",
          bird_desc: "Lección completada antes de las 8am",
          investor_title: "Inversor",
          investor_desc: "Ganó 1000+ Monedas",
          warrior_title: "Guerrero",
          warrior_desc: "Ganó 5 partidas PvP",
          locked_title: "Bloqueado",
          locked_desc: "¡Sigue aprendiendo!"
        },
        sidebar: {
          requests_title: "Solicitudes",
          new_badge: "Nuevo",
          request_msg: "Quiere ser tu amigo",
          confirm: "Aceptar",
          delete: "Borrar",
          friends_online: "Amigos en línea"
        },
        promo: {
          title: "¡Obtén Premium!",
          desc: "Vidas ilimitadas, sin anuncios y medallas exclusivas.",
          btn: "Mejorar Ahora"
        }
      }
    }
  },

  // --- FRENCH (Français) ---
  fr: {
    translation: {
      profile: {
        dashboard: "Tableau de Bord",
        premium_badge: "💎 PREMIUM",
        member_since: "Membre depuis",
        settings_btn: "Paramètres",
        achievements_title: "Succès",
        stats: {
          streak: "Série",
          xp: "XP Total",
          health: "Santé",
          coins: "Pièces"
        },
        badges: {
          fire_title: "En Feu",
          fire_desc: "Série de 7 jours",
          bird_title: "Lève-tôt",
          bird_desc: "Leçon terminée avant 8h",
          investor_title: "Investisseur",
          investor_desc: "Gagné 1000+ Pièces",
          warrior_title: "Guerrier",
          warrior_desc: "Gagné 5 matchs JcJ",
          locked_title: "Verrouillé",
          locked_desc: "Continuez d'apprendre !"
        },
        sidebar: {
          requests_title: "Demandes d'amis",
          new_badge: "Nouveau",
          request_msg: "Veut être votre ami",
          confirm: "Confirmer",
          delete: "Supprimer",
          friends_online: "Amis en ligne"
        },
        promo: {
          title: "Passez Premium !",
          desc: "Vies illimitées, sans pub et badges exclusifs.",
          btn: "Mettre à niveau"
        }
      }
    }
  },

  // --- GERMAN (Deutsch) ---
  de: {
    translation: {
      profile: {
        dashboard: "Übersicht",
        premium_badge: "💎 PREMIUM",
        member_since: "Mitglied seit",
        settings_btn: "Einstellungen",
        achievements_title: "Erfolge",
        stats: {
          streak: "Serie",
          xp: "Gesamt-XP",
          health: "Gesundheit",
          coins: "Münzen"
        },
        badges: {
          fire_title: "On Fire",
          fire_desc: "7-Tage-Serie",
          bird_title: "Frühaufsteher",
          bird_desc: "Lektion vor 8 Uhr beendet",
          investor_title: "Investor",
          investor_desc: "1000+ Münzen verdient",
          warrior_title: "Krieger",
          warrior_desc: "5 PvP-Matches gewonnen",
          locked_title: "Gesperrt",
          locked_desc: "Lerne weiter!"
        },
        sidebar: {
          requests_title: "Anfragen",
          new_badge: "Neu",
          request_msg: "Möchte dein Freund sein",
          confirm: "Annehmen",
          delete: "Löschen",
          friends_online: "Freunde online"
        },
        promo: {
          title: "Hol dir Premium!",
          desc: "Unendlich Leben, keine Werbung und exklusive Abzeichen.",
          btn: "Jetzt upgraden"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;