import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // --- SETTINGS ---
      "settings": "Settings",
      "subtitle": "Manage your preferences and learning goals",
      "save_changes": "Save Changes",
      "saving": "Saving...",
      "interface_system": "Interface & System",
      "app_language": "App Language",
      "app_language_desc": "Choose the display language of the interface",
      "dark_mode": "Dark Mode",
      "dark_mode_desc": "Switch between light and dark theme",
      "notifications": "Notifications",
      "email_reminders": "Email Reminders",
      "email_reminders_desc": "Receive daily notifications to keep your streak alive",
      "success_save": "Settings saved successfully!",
      "error_save": "Failed to save settings.",
      
      // --- NEWS PAGE ---
      "newsPage": {
        "header_title": "Latest News & Updates",
        "header_subtitle": "Stay up to date with the latest features, languages, and community events.",
        "featured_title": "Featured Stories",
        "read_more": "Read More",
        "patch_notes_title": "Patch Notes & Updates",
        "join_discord": "Join the Discord!",
        "discord_desc": "Chat with other learners and developers.",
        "join_now": "Join Now",
        "articles": {
          "french_added": {
            "title": "New Language Added:  French FR",
            "date": "February 8, 2026",
            "desc": "We are excited to announce that French is now available on Lynqo! Start learning today with our new interactive lessons.",
            "tag": "New Content"
          },
          "leaderboards": {
            "title": "Global Leaderboards are Live! 🏆",
            "date": "February 1, 2026",
            "desc": "Compete with learners from around the world. Earn XP, climb the ranks, and show off your language mastery on the new global leaderboards.",
            "tag": "Feature"
          },
          "community_event": {
            "title": "Community Events Coming Soon...",
            "date": "January 25, 2026",
            "desc": "The community event is coming to you soon... Get ready to complete 30 lessons in 30 days!",
            "tag": "Event"
          }
        },
        "updates": {
          "v2_4_1": {
            "title": "Bug Fixes & Performance",
            "date": "2 days ago",
            "details": "Fixed audio sync issues in French lessons and improved loading times on mobile."
          },
          "v2_4_0": {
            "title": "Dark Mode Improvements",
            "date": "1 week ago",
            "details": "Enhanced contrast for better readability in night mode."
          },
          "v2_3_5": {
            "title": "Shop Update",
            "date": "2 weeks ago",
            "details": "New merchandise in the shop."
          }
        }
      },
      
      // --- PROFILE PAGE ---
      "profilePage": {
        "title": "Profile Dashboard",
        "add_friend": "Add Friend",
        "modal": {
          "title": "Add Friend",
          "placeholder": "Username or Email...",
          "btn_search": "Search & Add",
          "success": "Request sent successfully!",
          "not_found": "User not found.",
          "error": "An error occurred."
        },
        "chat": {
          "no_messages": "No messages yet.",
          "placeholder": "Type a message..."
        },
        "requests": {
          "title": "Friend Requests",
          "new": "New",
          "message": "wants to be your friend.",
          "confirm": "Confirm",
          "delete": "Decline",
          "empty": "No pending requests."
        },
        "friends": {
          "title": "Friends Online",
          "chat_tooltip": "Chat",
          "unfriend_tooltip": "Unfriend",
          "empty": "No friends right now."
        },
        "promo": {
          "title": "Upgrade to Premium!",
          "btn": "View Subscriptions"
        },
        "main_card": {
          "premium": "PREMIUM",
          "member_since": "Member since",
          "edit_profile": "Edit Profile"
        },
        "stats": {
          "streak": "Streak",
          "xp": "Total XP",
          "health": "Health",
          "coins": "Coins"
        }
      },

      // --- PROFILE EDIT PAGE (Új hozzáadott rész) ---
      "profileEditPage": {
        "title": "Edit Profile",
        "subtitle": "Customize your account",
        "labels": {
          "display_name": "Display Name",
          "username": "Username",
          "email": "Email Address",
          "new_password": "New Password",
          "password_placeholder": "Leave blank to keep current"
        },
        "buttons": {
          "save": "Save Changes",
          "saving": "Saving...",
          "cancel": "Cancel"
        },
        "messages": {
          "load_error": "Failed to load profile.",
          "network_error": "Network error while loading profile.",
          "invalid_file_type": "Only JPG, PNG, or WEBP images are allowed.",
          "file_too_large": "Image size must be under 5 MB.",
          "upload_failed": "Failed to upload profile picture.",
          "save_failed": "Error saving profile.",
          "save_success": "Successfully saved!",
          "network_error_save": "Network error."
        }
      }
    }
  },
  hu: {
    translation: {
      // --- SETTINGS ---
      "settings": "Beállítások",
      "subtitle": "Kezele az egyéni beállításaidat és céljaidat",
      "save_changes": "Módosítások mentése",
      "saving": "Mentés...",
      "interface_system": "Felület és Rendszer",
      "app_language": "Alkalmazás nyelve",
      "app_language_desc": "Válaszd ki a kezelőfelület nyelvét",
      "dark_mode": "Sötét mód",
      "dark_mode_desc": "Váltás világos és sötét téma között",
      "notifications": "Értesítések",
      "email_reminders": "E-mail emlékeztetők",
      "email_reminders_desc": "Napi értesítések küldése a sorozatod megtartásához",
      "success_save": "Beállítások sikeresen mentve!",
      "error_save": "Hiba történt a mentés során.",
      
      // --- NEWS PAGE ---
      "newsPage": {
        "header_title": "Legfrissebb Hírek és Frissítések",
        "header_subtitle": "Maradj naprakész a legújabb funkciókkal, nyelvekkel és eseményekkel kapcsolatban.",
        "featured_title": "Kiemelt Hírek",
        "read_more": "Tovább olvasom",
        "patch_notes_title": "Frissítések és Javítások",
        "join_discord": "Csatlakozz a Discordhoz!",
        "discord_desc": "Beszélgess más tanulókkal és a fejlesztőkkel.",
        "join_now": "Csatlakozom",
        "articles": {
          "french_added": {
            "title": "Új nyelv: Francia FR",
            "date": "2026. Február 8.",
            "desc": "Örömmel jelentjük be, hogy a francia nyelv immár elérhető a Lynqo-n! Kezdd el a tanulást még ma az új interaktív leckéinkkel.",
            "tag": "Új tartalom"
          },
          "leaderboards": {
            "title": "Élnek a globális ranglisták! 🏆",
            "date": "2026. Február 1.",
            "desc": "Versenyezz a világ minden tájáról érkező tanulókkal. Szerezz XP-t, mássz fel a ranglétrán, és mutasd meg nyelvtudásod.",
            "tag": "Funkció"
          },
          "community_event": {
            "title": "Közösségi események hamarosan...",
            "date": "2026. Január 25.",
            "desc": "A közösségi esemény hamarosan megérkezik... Készülj fel, hogy 30 nap alatt 30 leckét teljesíts!",
            "tag": "Esemény"
          }
        },
        "updates": {
          "v2_4_1": {
            "title": "Hibajavítások és Teljesítmény",
            "date": "2 napja",
            "details": "Kijavítottuk a hangszinkronizációs hibákat a francia leckékben, és javítottuk a betöltési időket mobilon."
          },
          "v2_4_0": {
            "title": "Sötét mód fejlesztések",
            "date": "1 hete",
            "details": "Jobb kontraszt a jobb olvashatóság érdekében éjszakai módban."
          },
          "v2_3_5": {
            "title": "Bolt frissítés",
            "date": "2 hete",
            "details": "Új termékek érhetők el a boltban."
          }
        }
      },
      
      // --- PROFILE PAGE ---
      "profilePage": {
        "title": "Profil Vezérlőpult",
        "add_friend": "Barát hozzáadása",
        "modal": {
          "title": "Barát hozzáadása",
          "placeholder": "Felhasználónév vagy e-mail...",
          "btn_search": "Keresés és Hozzáadás",
          "success": "Jelölés elküldve!",
          "not_found": "Nem található felhasználó.",
          "error": "Hiba történt."
        },
        "chat": {
          "no_messages": "Még nincsenek üzenetek.",
          "placeholder": "Írj egy üzenetet..."
        },
        "requests": {
          "title": "Barátkérelmek",
          "new": "Új",
          "message": "barátod szeretne lenni.",
          "confirm": "Elfogad",
          "delete": "Elutasít",
          "empty": "Nincsenek függőben lévő kérelmek."
        },
        "friends": {
          "title": "Barátok Online",
          "chat_tooltip": "Chat",
          "unfriend_tooltip": "Törlés",
          "empty": "Jelenleg nincsenek barátok."
        },
        "promo": {
          "title": "Válts Prémiumra!",
          "btn": "Előfizetések megtekintése"
        },
        "main_card": {
          "premium": "PRÉMIUM",
          "member_since": "Tag mióta",
          "edit_profile": "Profil szerkesztése"
        },
        "stats": {
          "streak": "Sorozat",
          "xp": "Összes XP",
          "health": "Élet",
          "coins": "Érme"
        }
      },

      // --- PROFILE EDIT PAGE (Új hozzáadott rész) ---
      "profileEditPage": {
        "title": "Profil szerkesztése",
        "subtitle": "Szabd testre a fiókodat",
        "labels": {
          "display_name": "Megjelenített név",
          "username": "Felhasználónév",
          "email": "E-mail cím",
          "new_password": "Új jelszó",
          "password_placeholder": "Hagyd üresen, ha nem változtatod meg"
        },
        "buttons": {
          "save": "Változtatások mentése",
          "saving": "Mentés...",
          "cancel": "Mégse"
        },
        "messages": {
          "load_error": "Nem sikerült betölteni a profilt.",
          "network_error": "Hálózati hiba a profil betöltésekor.",
          "invalid_file_type": "Csak JPG, PNG vagy WEBP képet tölthetsz fel.",
          "file_too_large": "A kép maximum 5 MB lehet.",
          "upload_failed": "A profilkép feltöltése nem sikerült.",
          "save_failed": "Hiba történt a mentéskor.",
          "save_success": "Sikeresen mentve!",
          "network_error_save": "Hálózati hiba."
        }
      }
    }
  },
  es: {
    translation: {
      // --- SETTINGS ---
      "settings": "Ajustes",
      "subtitle": "Gestiona tus preferencias y objetivos",
      "save_changes": "Guardar cambios",
      "saving": "Guardando...",
      "interface_system": "Interfaz y Sistema",
      "app_language": "Idioma de la aplicación",
      "app_language_desc": "Elige el idioma de la interfaz",
      "dark_mode": "Modo oscuro",
      "dark_mode_desc": "Cambiar entre tema claro y oscuro",
      "notifications": "Notificaciones",
      "email_reminders": "Recordatorios por correo",
      "email_reminders_desc": "Recibe notificaciones para mantener tu racha",
      "success_save": "¡Ajustes guardados con éxito!",
      "error_save": "Error al guardar los ajustes.",
      
      // --- NEWS PAGE ---
      "newsPage": {
        "header_title": "Últimas Noticias y Actualizaciones",
        "header_subtitle": "Mantente al día con las últimas funciones, idiomas y eventos de la comunidad.",
        "featured_title": "Historias Destacadas",
        "read_more": "Leer más",
        "patch_notes_title": "Notas de Parche y Actualizaciones",
        "join_discord": "¡Únete a Discord!",
        "discord_desc": "Chatea con otros estudiantes y desarrolladores.",
        "join_now": "Unirme ahora",
        "articles": {
          "french_added": {
            "title": "Nuevo idioma añadido: Francés FR",
            "date": "8 de febrero de 2026",
            "desc": "¡Nos emociona anunciar que el francés ya está disponible en Lynqo! Empieza a aprender hoy con nuestras nuevas lecciones.",
            "tag": "Nuevo Contenido"
          },
          "leaderboards": {
            "title": "¡Las tablas de clasificación están activas! 🏆",
            "date": "1 de febrero de 2026",
            "desc": "Compite con estudiantes de todo el mundo. Gana XP, sube de rango y demuestra tu dominio del idioma.",
            "tag": "Función"
          },
          "community_event": {
            "title": "Próximos eventos de la comunidad...",
            "date": "25 de enero de 2026",
            "desc": "El evento de la comunidad se acerca... ¡Prepárate para completar 30 lecciones en 30 días!",
            "tag": "Evento"
          }
        },
        "updates": {
          "v2_4_1": {
            "title": "Corrección de Errores y Rendimiento",
            "date": "Hace 2 días",
            "details": "Se corrigieron problemas de sincronización de audio en francés y tiempos de carga en móvil."
          },
          "v2_4_0": {
            "title": "Mejoras del Modo Oscuro",
            "date": "Hace 1 semana",
            "details": "Contraste mejorado para una mejor legibilidad en modo nocturno."
          },
          "v2_3_5": {
            "title": "Actualización de Tienda",
            "date": "Hace 2 semanas",
            "details": "Nueva mercancía disponible en la tienda."
          }
        }
      },
      
      // --- PROFILE PAGE ---
      "profilePage": {
        "title": "Panel de Perfil",
        "add_friend": "Añadir amigo",
        "modal": {
          "title": "Añadir amigo",
          "placeholder": "Usuario o correo...",
          "btn_search": "Buscar y añadir",
          "success": "¡Solicitud enviada!",
          "not_found": "Usuario no encontrado.",
          "error": "Ocurrió un error."
        },
        "chat": {
          "no_messages": "Aún no hay mensajes.",
          "placeholder": "Escribe un mensaje..."
        },
        "requests": {
          "title": "Solicitudes de amistad",
          "new": "Nuevo",
          "message": "quiere ser tu amigo.",
          "confirm": "Confirmar",
          "delete": "Rechazar",
          "empty": "No hay solicitudes pendientes."
        },
        "friends": {
          "title": "Amigos en línea",
          "chat_tooltip": "Chatear",
          "unfriend_tooltip": "Eliminar amigo",
          "empty": "No hay amigos en este momento."
        },
        "promo": {
          "title": "¡Mejora a Premium!",
          "btn": "Ver suscripciones"
        },
        "main_card": {
          "premium": "PREMIUM",
          "member_since": "Miembro desde",
          "edit_profile": "Editar perfil"
        },
        "stats": {
          "streak": "Racha",
          "xp": "XP Total",
          "health": "Salud",
          "coins": "Monedas"
        }
      },

      // --- PROFILE EDIT PAGE (Új hozzáadott rész) ---
      "profileEditPage": {
        "title": "Editar Perfil",
        "subtitle": "Personaliza tu cuenta",
        "labels": {
          "display_name": "Nombre para mostrar",
          "username": "Nombre de usuario",
          "email": "Correo electrónico",
          "new_password": "Nueva contraseña",
          "password_placeholder": "Déjalo en blanco para mantener la actual"
        },
        "buttons": {
          "save": "Guardar cambios",
          "saving": "Guardando...",
          "cancel": "Cancelar"
        },
        "messages": {
          "load_error": "Error al cargar el perfil.",
          "network_error": "Error de red al cargar el perfil.",
          "invalid_file_type": "Solo se permiten imágenes JPG, PNG o WEBP.",
          "file_too_large": "El tamaño de la imagen debe ser inferior a 5 MB.",
          "upload_failed": "Error al subir la foto de perfil.",
          "save_failed": "Error al guardar el perfil.",
          "save_success": "¡Guardado con éxito!",
          "network_error_save": "Error de red."
        }
      }
    }
  },
  fr: {
    translation: {
      // --- SETTINGS ---
      "settings": "Paramètres",
      "subtitle": "Gérez vos préférences et vos objectifs",
      "save_changes": "Enregistrer",
      "saving": "Enregistrement...",
      "interface_system": "Interface et Système",
      "app_language": "Langue de l'application",
      "app_language_desc": "Choisissez la langue d'affichage de l'interface",
      "dark_mode": "Mode sombre",
      "dark_mode_desc": "Basculer entre le thème clair et sombre",
      "notifications": "Notifications",
      "email_reminders": "Rappels par e-mail",
      "email_reminders_desc": "Recevez des notifications pour garder votre série",
      "success_save": "Paramètres enregistrés !",
      "error_save": "Échec de l'enregistrement.",
      
      // --- NEWS PAGE ---
      "newsPage": {
        "header_title": "Dernières Nouvelles et Mises à jour",
        "header_subtitle": "Restez au courant des dernières fonctionnalités, langues et événements communautaires.",
        "featured_title": "Histoires à la Une",
        "read_more": "Lire la suite",
        "patch_notes_title": "Notes de Mise à jour",
        "join_discord": "Rejoignez le Discord !",
        "discord_desc": "Discutez avec d'autres apprenants et les développeurs.",
        "join_now": "Rejoindre",
        "articles": {
          "french_added": {
            "title": "Nouvelle langue ajoutée : Français FR",
            "date": "8 Février 2026",
            "desc": "Nous sommes ravis d'annoncer que le français est maintenant disponible sur Lynqo ! Commencez à apprendre dès aujourd'hui.",
            "tag": "Nouveau Contenu"
          },
          "leaderboards": {
            "title": "Les classements mondiaux sont en ligne ! 🏆",
            "date": "1 Février 2026",
            "desc": "Affrontez des apprenants du monde entier. Gagnez de l'XP, grimpez dans les rangs et montrez votre maîtrise.",
            "tag": "Fonctionnalité"
          },
          "community_event": {
            "title": "Événements communautaires à venir...",
            "date": "25 Janvier 2026",
            "desc": "L'événement communautaire arrive bientôt... Préparez-vous à terminer 30 leçons en 30 jours !",
            "tag": "Événement"
          }
        },
        "updates": {
          "v2_4_1": {
            "title": "Corrections de bugs et Performances",
            "date": "Il y a 2 jours",
            "details": "Correction des problèmes de synchronisation audio en français et amélioration des temps de chargement."
          },
          "v2_4_0": {
            "title": "Améliorations du Mode Sombre",
            "date": "Il y a 1 semaine",
            "details": "Contraste amélioré pour une meilleure lisibilité en mode nuit."
          },
          "v2_3_5": {
            "title": "Mise à jour Boutique",
            "date": "Il y a 2 semaines",
            "details": "Nouvelles marchandises dans la boutique."
          }
        }
      },
      
      // --- PROFILE PAGE ---
      "profilePage": {
        "title": "Tableau de bord du profil",
        "add_friend": "Ajouter un ami",
        "modal": {
          "title": "Ajouter un ami",
          "placeholder": "Nom d'utilisateur ou email...",
          "btn_search": "Rechercher et ajouter",
          "success": "Demande envoyée !",
          "not_found": "Utilisateur introuvable.",
          "error": "Une erreur s'est produite."
        },
        "chat": {
          "no_messages": "Pas encore de messages.",
          "placeholder": "Écrivez un message..."
        },
        "requests": {
          "title": "Demandes d'amis",
          "new": "Nouveau",
          "message": "veut être votre ami.",
          "confirm": "Confirmer",
          "delete": "Refuser",
          "empty": "Aucune demande en attente."
        },
        "friends": {
          "title": "Amis en ligne",
          "chat_tooltip": "Discuter",
          "unfriend_tooltip": "Retirer",
          "empty": "Pas d'amis pour le moment."
        },
        "promo": {
          "title": "Passez à Premium !",
          "btn": "Voir les abonnements"
        },
        "main_card": {
          "premium": "PREMIUM",
          "member_since": "Membre depuis",
          "edit_profile": "Modifier le profil"
        },
        "stats": {
          "streak": "Série",
          "xp": "XP Total",
          "health": "Santé",
          "coins": "Pièces"
        }
      },

      // --- PROFILE EDIT PAGE (Új hozzáadott rész) ---
      "profileEditPage": {
        "title": "Modifier le profil",
        "subtitle": "Personnalisez votre compte",
        "labels": {
          "display_name": "Nom d'affichage",
          "username": "Nom d'utilisateur",
          "email": "Adresse e-mail",
          "new_password": "Nouveau mot de passe",
          "password_placeholder": "Laissez vide pour conserver l'actuel"
        },
        "buttons": {
          "save": "Enregistrer",
          "saving": "Enregistrement...",
          "cancel": "Annuler"
        },
        "messages": {
          "load_error": "Échec du chargement du profil.",
          "network_error": "Erreur réseau lors du chargement.",
          "invalid_file_type": "Seules les images JPG, PNG ou WEBP sont autorisées.",
          "file_too_large": "L'image doit faire moins de 5 Mo.",
          "upload_failed": "Échec du téléchargement de la photo de profil.",
          "save_failed": "Erreur lors de l'enregistrement.",
          "save_success": "Enregistré avec succès !",
          "network_error_save": "Erreur réseau."
        }
      }
    }
  },
  de: {
    translation: {
      // --- SETTINGS ---
      "settings": "Einstellungen",
      "subtitle": "Verwalten Sie Ihre Präferenzen und Lernziele",
      "save_changes": "Änderungen speichern",
      "saving": "Speichern...",
      "interface_system": "Benutzeroberfläche & System",
      "app_language": "App-Sprache",
      "app_language_desc": "Wählen Sie die Sprache der Benutzeroberfläche",
      "dark_mode": "Dunkelmodus",
      "dark_mode_desc": "Zwischen hellem und dunklem Design wechseln",
      "notifications": "Benachrichtigungen",
      "email_reminders": "E-Mail-Erinnerungen",
      "email_reminders_desc": "Tägliche Benachrichtigungen erhalten",
      "success_save": "Einstellungen erfolgreich gespeichert!",
      "error_save": "Fehler beim Speichern der Einstellungen.",
      
      // --- NEWS PAGE ---
      "newsPage": {
        "header_title": "Neueste Nachrichten & Updates",
        "header_subtitle": "Bleiben Sie auf dem Laufenden über die neuesten Funktionen, Sprachen und Community-Events.",
        "featured_title": "Ausgewählte Geschichten",
        "read_more": "Weiterlesen",
        "patch_notes_title": "Patchnotes & Updates",
        "join_discord": "Trete Discord bei!",
        "discord_desc": "Chatte mit anderen Lernenden und Entwicklern.",
        "join_now": "Jetzt beitreten",
        "articles": {
          "french_added": {
            "title": "Neue Sprache: Französisch FR",
            "date": "8. Februar 2026",
            "desc": "Wir freuen uns, bekannt zu geben, dass Französisch jetzt auf Lynqo verfügbar ist! Beginne noch heute mit dem Lernen.",
            "tag": "Neuer Inhalt"
          },
          "leaderboards": {
            "title": "Globale Bestenlisten sind live! 🏆",
            "date": "1. Februar 2026",
            "desc": "Messe dich mit Lernenden aus der ganzen Welt. Sammle XP, steige im Rang auf und zeige deine Sprachbeherrschung.",
            "tag": "Funktion"
          },
          "community_event": {
            "title": "Community-Events kommen bald...",
            "date": "25. Januar 2026",
            "desc": "Das Community-Event steht vor der Tür... Mach dich bereit, 30 Lektionen in 30 Tagen abzuschließen!",
            "tag": "Event"
          }
        },
        "updates": {
          "v2_4_1": {
            "title": "Fehlerbehebungen & Leistung",
            "date": "Vor 2 Tagen",
            "details": "Audio-Synchronisierungsprobleme behoben und Ladezeiten auf Mobilgeräten verbessert."
          },
          "v2_4_0": {
            "title": "Dunkelmodus-Verbesserungen",
            "date": "Vor 1 Woche",
            "details": "Verbesserter Kontrast für bessere Lesbarkeit im Nachtmodus."
          },
          "v2_3_5": {
            "title": "Shop-Update",
            "date": "Vor 2 Wochen",
            "details": "Neue Artikel im Shop verfügbar."
          }
        }
      },
      
      // --- PROFILE PAGE ---
      "profilePage": {
        "title": "Profil-Dashboard",
        "add_friend": "Freund hinzufügen",
        "modal": {
          "title": "Freund hinzufügen",
          "placeholder": "Benutzername oder E-Mail...",
          "btn_search": "Suchen & Hinzufügen",
          "success": "Anfrage gesendet!",
          "not_found": "Benutzer nicht gefunden.",
          "error": "Ein Fehler ist aufgetreten."
        },
        "chat": {
          "no_messages": "Noch keine Nachrichten.",
          "placeholder": "Schreibe eine Nachricht..."
        },
        "requests": {
          "title": "Freundschaftsanfragen",
          "new": "Neu",
          "message": "möchte dein Freund sein.",
          "confirm": "Bestätigen",
          "delete": "Ablehnen",
          "empty": "Keine ausstehenden Anfragen."
        },
        "friends": {
          "title": "Freunde online",
          "chat_tooltip": "Chat",
          "unfriend_tooltip": "Entfernen",
          "empty": "Momentan keine Freunde."
        },
        "promo": {
          "title": "Auf Premium upgraden!",
          "btn": "Abonnements ansehen"
        },
        "main_card": {
          "premium": "PREMIUM",
          "member_since": "Mitglied seit",
          "edit_profile": "Profil bearbeiten"
        },
        "stats": {
          "streak": "Streak",
          "xp": "Gesamt-XP",
          "health": "Leben",
          "coins": "Münzen"
        }
      },

      // --- PROFILE EDIT PAGE (Új hozzáadott rész) ---
      "profileEditPage": {
        "title": "Profil bearbeiten",
        "subtitle": "Passe dein Konto an",
        "labels": {
          "display_name": "Anzeigename",
          "username": "Benutzername",
          "email": "E-Mail-Adresse",
          "new_password": "Neues Passwort",
          "password_placeholder": "Leer lassen, um das aktuelle zu behalten"
        },
        "buttons": {
          "save": "Änderungen speichern",
          "saving": "Speichern...",
          "cancel": "Abbrechen"
        },
        "messages": {
          "load_error": "Profil konnte nicht geladen werden.",
          "network_error": "Netzwerkfehler beim Laden.",
          "invalid_file_type": "Nur JPG, PNG oder WEBP Bilder sind erlaubt.",
          "file_too_large": "Die Bildgröße muss unter 5 MB liegen.",
          "upload_failed": "Fehler beim Hochladen des Profilbildes.",
          "save_failed": "Fehler beim Speichern des Profils.",
          "save_success": "Erfolgreich gespeichert!",
          "network_error_save": "Netzwerkfehler."
        }
      }
    }
  }
};

// Megnézzük, van-e már elmentett nyelv, ha nincs, akkor 'en' lesz az alap.
const savedLanguage = localStorage.getItem('appLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Itt használjuk a kimentett értéket!
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;