import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      //footer
      "footer": {
  "slogan": "Language learning made simple.",
  "rights": "All rights reserved.",
  "owners": "Owners",
  "contact": "Contact",
  "navigation": "Navigation",
  "home": "Home",
  "news": "News",
  "shop": "Shop",
  "leaderboard": "Leaderboard",
  "followUs": "Follow Us"
},
      //picklanguage
      "langSelect": {
  "speakTitle": "I speak...",
  "learnTitle": "I want to learn...",
  "speakSub": "Select your native language",
  "learnSub": "Select a course to start learning",
  "noCourses": "No courses found.",
  "noCoursesDesc": "We don't have a course for this language pair yet.",
  "chooseAnother": "Choose another language",
  "back": "Back to languages",
  "official": "Official Course",
  "defaultDesc": "Master this language with our expert-led curriculum.",
  "startBtn": "Start Learning"
},
      //dashboard
"dashboard": {
  "welcome": "Welcome back, {{name}}! 👋",
  "learner": "Learner",
  "stats": {
    "streak": "Day Streak",
    "xp": "Total XP",
    "hearts": "Hearts",
    "gems": "Gems"
  },
  "lesson": {
    "start": "START LESSON",
    "complete": "Course Complete!",
    "finished": "You have finished all available lessons.",
    "newCourse": "START NEW COURSE"
  },
  "quests": {
    "title": "Daily Quests",
    "noQuests": "No quests available today.",
    "done": "✓ Done"
  },
  "nav": {
    "leaderboard": "Leaderboard",
    "store": "Store",
    "changeCourse": "Change Course"
  }
},
      //achievments
      "achievements": {
  "title": "Achievements",
  "errorLoad": "Cannot load badges:",
  "noBadges": "No badges available in the database.",
  "waiting": "Waiting for User ID from profile data..."
},
      //leaderboard
      "leaderboard": {
  "title": "🏆 Leaderboard",
  "selectLeague": "Select League",
  "leagueSuffix": "League",
  "leaderboardSuffix": "Leaderboard",
  "thisWeek": "This Week",
  "allTime": "All Time",
  "rank": "Rank",
  "learner": "Learner",
  "xp": "XP",
  "noData": "No data yet. Start learning!",
  "you": "YOU",
  "leagues": {
    "Bronze": "Bronze", "Copper": "Copper", "Silver": "Silver", "Gold": "Gold",
    "Emerald": "Emerald", "Obsidian": "Obsidian", "Diamond": "Diamond", "Global": "Global"
  }
},
      //main
      "mainPage": {
  "hero": {
    "title": "Learn Languages with Lynqo",
    "subtitle": "Master new languages through fun, interactive lessons. Join millions of learners worldwide!",
    "continue": "🚀 Continue Learning (Go to Dashboard)",
    "getStarted": "Get Started",
    "alreadyAccount": "I Already Have an Account"
  },
  "explore": {
    "news": "📰 Latest News",
    "shop": "🛒 Lynqo Store",
    "leaderboard": "🏆 Leaderboard"
  },
  "features": {
    "title": "Why Choose Lynqo?",
    "p_learning": { "title": "Personalized Learning", "desc": "Adaptive lessons tailored to your pace and goals." },
    "gamified": { "title": "Gamified Experience", "desc": "Earn points, unlock achievements, and stay motivated." },
    "languages": { "title": "Multiple Languages", "desc": "Learn Spanish, French, German, and more." },
    "anywhere": { "title": "Learn Anywhere", "desc": "Access lessons on desktop, mobile, and tablet." }
  }
},
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
      //merchpage 
      "merch": {
  "heroTitle": "Lynqo Store",
  "heroSubtitle": "Exclusive gear for language lovers",
  "titles": { "collection": "Our Collection", "filters": "Filters & Cart" },
  "filters": { "searchLabel": "Search Products", "searchPlaceholder": "What are you looking for?", "categoryLabel": "Category" },
  "categories": { "all": "All", "clothing": "Clothing", "accessories": "Accessories", "stationery": "Stationery" },
  "promo": { "title": "Free Shipping?", "text": "On all orders over $100!" },
  "items": { "hoodie": "Hoodie", "waterbottle": "Water Bottle", "notebook": "Notebook", "mug": "Mug" },
  "cart": { "title": "Shopping Cart", "empty": "Your cart is empty.", "total": "Total", "addBtn": "Add to Cart", "checkoutBtn": "Proceed to Checkout" },
  "payment": {
    "title": "Secure Payment", "amount": "Total amount", "lastName": "Last Name", "firstName": "First Name", "placeholderLastName": "Smith", "placeholderFirstName": "John",
    "address": "Shipping Address", "placeholderAddress": "1234 City, Street name", "phone": "Phone Number", "cardNumber": "Card Number", "expiry": "Expiry", "cvv": "CVV",
    "confirmBtn": "Confirm Payment", "successTitle": "Thank you for your purchase!", "successText": "Your cart has been cleared and your order is recorded.", "loginAlert": "Login required!"
  }
},
      //subscriptionpage
      "subscriptionPage": {
  "heroTitle": "Choose your plan",
  "heroSubtitle": "Take your learning experience to the next level with exclusive features.",
  "plans": {
    "basic": {
      "name": "Basic",
      "price": "Free"
    },
    "premium": {
      "name": "Premium",
      "badge": "Recommended"
    }
  },
  "features": {
    "basicFeatures": "Basic features",
    "limitedLessons": "Daily limited lessons",
    "noAds": "No ads",
    "unlimitedLearning": "Unlimited learning",
    "offlineMode": "Offline mode"
  },
  "duration": {
    "month": "Month",
    "discount": "2 months free!"
  },
  "options": {
    "autoRenew": "Auto-renewal"
  },
  "status": {
    "currentPlan": "Current plan",
    "freePlan": "Free Plan",
    "startSubscription": "Start subscription"
  },
  "modal": {
    "paymentTitle": "Secure Payment",
    "selectedPlan": "Plan",
    "lastName": "Last Name",
    "firstName": "First Name",
    "placeholderLastName": "Smith",
    "placeholderFirstName": "John",
    "cardNumber": "Card Number",
    "expiry": "Expiry",
    "cvv": "CVV",
    "confirmPayment": "Confirm Payment",
    "successTitle": "Successful payment!",
    "successMessage": "Thank you! Premium features have been activated."
  },
  "errors": {
    "loginRequired": "Please log in!",
    "purchaseFailed": "Purchase failed",
    "networkError": "A network error occurred."
  }
},
//powerups
"powerupsPage": {
  "title": "Power-ups",
  "subtitle": "Spend your gems to boost your learning",
  "stats": {
    "gems": "YOUR GEMS",
    "hearts": "YOUR HEARTS"
  },
  "items": {
    "heartRefill": {
      "name": "Heart Refill",
      "description": "Restore your hearts back to 5 and keep learning."
    },
    "xpBoost": {
      "name": "XP Boost (Coming Soon)",
      "description": "Double XP on your next lesson."
    }
  },
  "status": {
    "full": "Full"
  },
  "messages": {
    "premiumUnlimited": "You have unlimited hearts with Premium!",
    "notEnoughGems": "Not enough gems! Complete lessons to earn more.",
    "applied": "applied!",
    "purchaseFailed": "Purchase failed.",
    "networkError": "Network error. Try again."
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
      },

      // --- SHOP LANDING PAGE ---
      "shopLandingPage": {
        "title": "Lynqo Store",
        "description": "Upgrade your learning experience or show your love for Lynqo with exclusive merchandise.",
        "buttons": {
          "subscriptions": "Subscriptions",
          "merch": "Online Shop",
          "powerups": "Power-ups"
        },
        "footer": "Secure checkout • Worldwide shipping • 30-day returns"
      }
    }
  },
  hu: {
    translation: {
      //footer
      "footer": {
  "slogan": "Nyelvtanulás egyszerűen.",
  "rights": "Minden jog fenntartva.",
  "owners": "Tulajdonosok",
  "contact": "Kapcsolat",
  "navigation": "Navigáció",
  "home": "Kezdőlap",
  "news": "Hírek",
  "shop": "Bolt",
  "leaderboard": "Ranglista",
  "followUs": "Kövess minket"
},
      //picklanguage
      "langSelect": {
  "speakTitle": "Beszélt nyelv...",
  "learnTitle": "Tanulni szeretnék...",
  "speakSub": "Válaszd ki az anyanyelvedet",
  "learnSub": "Válassz egy kurzust a tanuláshoz",
  "noCourses": "Nem található kurzus.",
  "noCoursesDesc": "Ehhez a nyelvpárhoz még nincs elérhető kurzusunk.",
  "chooseAnother": "Válassz másik nyelvet",
  "back": "Vissza a nyelvekhez",
  "official": "Hivatalos kurzus",
  "defaultDesc": "Sajátítsd el ezt a nyelvet szakértők által összeállított tananyagunkkal.",
  "startBtn": "Tanulás indítása"
},
      //dashboard
      "dashboard": {
  "welcome": "Üdv újra, {{name}}! 👋",
  "learner": "Tanuló",
  "stats": {
    "streak": "Napos sorozat",
    "xp": "Összes XP",
    "hearts": "Élet",
    "gems": "Drágakő"
  },
  "lesson": {
    "start": "LECKE INDÍTÁSA",
    "complete": "Kurzus befejezve!",
    "finished": "Minden elérhető leckét elvégeztél.",
    "newCourse": "ÚJ KURZUS INDÍTÁSA"
  },
  "quests": {
    "title": "Napi küldetések",
    "noQuests": "Mára nincs több küldetés.",
    "done": "✓ Kész"
  },
  "nav": {
    "leaderboard": "Ranglista",
    "store": "Bolt",
    "changeCourse": "Kurzus váltása"
  }
},
      //achievments
      "achievements": {
  "title": "Eredmények",
  "errorLoad": "Nem sikerült a jelvények betöltése:",
  "noBadges": "Nincsenek elérhető jelvények az adatbázisban.",
  "waiting": "Várakozás a felhasználói azonosítóra..."
},
      //leaderboard
      "leaderboard": {
  "title": "🏆 Ranglista",
  "selectLeague": "Liga választása",
  "leagueSuffix": "Liga",
  "leaderboardSuffix": "Ranglista",
  "thisWeek": "Ezen a héten",
  "allTime": "Összesített",
  "rank": "Helyezés",
  "learner": "Tanuló",
  "xp": "XP",
  "noData": "Még nincs adat. Kezdj el tanulni!",
  "you": "TE",
  "leagues": {
    "Bronze": "Bronz", "Copper": "Réz", "Silver": "Ezüst", "Gold": "Arany",
    "Emerald": "Smaragd", "Obsidian": "Obszidián", "Diamond": "Gyémánt", "Global": "Globális"
  }
},
      //main
      "mainPage": {
  "hero": {
    "title": "Tanulj nyelveket a Lynqo-val",
    "subtitle": "Sajátíts el új nyelveket szórakoztató, interaktív leckéken keresztül. Csatlakozz a több millió tanulóhoz világszerte!",
    "continue": "🚀 Tanulás folytatása (Irány a vezérlőpult)",
    "getStarted": "Vágjunk bele",
    "alreadyAccount": "Már van fiókom"
  },
  "explore": {
    "news": "📰 Legfrissebb hírek",
    "shop": "🛒 Lynqo Bolt",
    "leaderboard": "🏆 Ranglista"
  },
  "features": {
    "title": "Miért válaszd a Lynqo-t?",
    "p_learning": { "title": "Személyre szabott tanulás", "desc": "Alkalmazkodó leckék a tempódhoz és céljaidhoz igazítva." },
    "gamified": { "title": "Játékos élmény", "desc": "Gyűjts pontokat, oldj fel kitűzőket és maradj motivált." },
    "languages": { "title": "Több elérhető nyelv", "desc": "Tanulj spanyolul, franciául, németül és még sok más nyelven." },
    "anywhere": { "title": "Tanulj bárhol", "desc": "Érd el a leckéket asztali gépen, mobilon vagy tableten." }
  }
},
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
      //powerups
      "powerupsPage": {
  "title": "Power-upok",
  "subtitle": "Költsd el a gyémántjaidat a tanulásod segítésére",
  "stats": {
    "gems": "GYÉMÁNTAID",
    "hearts": "SZÍVEID"
  },
  "items": {
    "heartRefill": {
      "name": "Szív újratöltés",
      "description": "Visszatölti a szíveidet 5-re, hogy folytathasd a tanulást."
    },
    "xpBoost": {
      "name": "XP Boost (Hamarosan)",
      "description": "Dupla XP a következő leckédnél."
    }
  },
  "status": {
    "full": "Tele"
  },
  "messages": {
    "premiumUnlimited": "Prémiummal végtelen szíved van!",
    "notEnoughGems": "Nincs elég gyémántod! Teljesíts leckéket, hogy szerezz.",
    "applied": "alkalmazva!",
    "purchaseFailed": "Sikertelen vásárlás.",
    "networkError": "Hálózati hiba. Próbáld újra."
  }
},
//merchpage
"merch": {
  "heroTitle": "Lynqo Store",
  "heroSubtitle": "Exkluzív cuccok a nyelvtanulás szerelmeseinek",
  "titles": {
    "collection": "Kollekciónk",
    "filters": "Szűrők és Kosár"
  },
  "filters": {
    "searchLabel": "Termékek keresése",
    "searchPlaceholder": "Mit keresel?",
    "categoryLabel": "Kategória"
  },
  "categories": {
    "all": "Összes",
    "clothing": "Ruházat",
    "accessories": "Kiegészítők",
    "stationery": "Papír-írószer"
  },
  "promo": {
    "title": "Ingyenes szállítás?",
    "text": "Minden 100$ feletti rendelésnél!"
  },
  "items": {
    "hoodie": "Kapucnis pulóver",
    "waterbottle": "Kulacs",
    "notebook": "Jegyzetfüzet",
    "mug": "Bögre"
  },
  "cart": {
    "title": "Kosár",
    "empty": "A kosarad üres.",
    "total": "Összesen",
    "addBtn": "Kosárba",
    "checkoutBtn": "Tovább a fizetéshez"
  },
  "payment": {
    "title": "Biztonságos Fizetés",
    "amount": "Fizetendő összeg",
    "lastName": "Vezetéknév",
    "firstName": "Keresztnév",
    "placeholderLastName": "Kovács",
    "placeholderFirstName": "János",
    "address": "Szállítási cím",
    "placeholderAddress": "1234 Város, Utca házszám",
    "phone": "Telefonszám",
    "cardNumber": "Kártyaszám",
    "expiry": "Lejárat",
    "cvv": "CVV",
    "confirmBtn": "Fizetés megerősítése",
    "successTitle": "Köszönjük a vásárlást!",
    "successText": "A kosarad kiürült, a rendelésedet pedig sikeresen rögzítettük.",
    "loginAlert": "Bejelentkezés szükséges!"
  }
},
      
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
      },
      //subscriptionpage 
      "subscriptionPage": {
  "heroTitle": "Válaszd ki a csomagodat",
  "heroSubtitle": "Emeld új szintre a tanulási élményedet exkluzív funkciókkal.",
  "plans": {
    "basic": {
      "name": "Alap",
      "price": "Ingyenes"
    },
    "premium": {
      "name": "Premium",
      "badge": "Ajánlott"
    }
  },
  "features": {
    "basicFeatures": "Alap funkciók",
    "limitedLessons": "Napi limitált leckék",
    "noAds": "Reklámmentesség",
    "unlimitedLearning": "Korlátlan tanulás",
    "offlineMode": "Offline mód"
  },
  "duration": {
    "month": "Hónap",
    "discount": "2 hónap ingyen!"
  },
  "options": {
    "autoRenew": "Automatikus megújulás"
  },
  "status": {
    "currentPlan": "Jelenlegi csomag",
    "freePlan": "Ingyenes Csomag",
    "startSubscription": "Előfizetés indítása"
  },
  "modal": {
    "paymentTitle": "Biztonságos Fizetés",
    "selectedPlan": "Csomag",
    "lastName": "Vezetéknév",
    "firstName": "Keresztnév",
    "placeholderLastName": "Kovács",
    "placeholderFirstName": "János",
    "cardNumber": "Kártyaszám",
    "expiry": "Lejárat",
    "cvv": "CVV",
    "confirmPayment": "Fizetés megerősítése",
    "successTitle": "Sikeres fizetés!",
    "successMessage": "Köszönjük! A Premium funkciók aktiválva lettek."
  },
  "errors": {
    "loginRequired": "Jelentkezz be!",
    "purchaseFailed": "Sikertelen vásárlás",
    "networkError": "Hálózati hiba történt."
  }
},
      // --- SHOP LANDING PAGE ---
      "shopLandingPage": {
        "title": "Lynqo Bolt",
        "description": "Fejleszd a tanulási élményedet, vagy mutasd meg a Lynqo iránti szeretetedet exkluzív termékeinkkel.",
        "buttons": {
          "subscriptions": "Előfizetések",
          "merch": "Webshop",
          "powerups": "Power-upok"
        },
        "footer": "Biztonságos fizetés • Világszerte szállítás • 30 napos visszaküldés"
      }
    }
  },
  es: {
    translation: {
      //footer
      "footer": {
  "slogan": "El aprendizaje de idiomas simplificado.",
  "rights": "Todos los derechos reservados.",
  "owners": "Propietarios",
  "contact": "Contacto",
  "navigation": "Navegación",
  "home": "Inicio",
  "news": "Noticias",
  "shop": "Tienda",
  "leaderboard": "Clasificación",
  "followUs": "Síguenos"
},
      //picklanguage
      "langSelect": {
  "speakTitle": "Hablo...",
  "learnTitle": "Quiero aprender...",
  "speakSub": "Selecciona tu lengua materna",
  "learnSub": "Selecciona un curso para empezar",
  "noCourses": "No se encontraron cursos.",
  "noCoursesDesc": "Aún no tenemos un curso para este par de idiomas.",
  "chooseAnother": "Elegir otro idioma",
  "back": "Volver a los idiomas",
  "official": "Curso oficial",
  "defaultDesc": "Domina este idioma con nuestro plan de estudios experto.",
  "startBtn": "Empezar a aprender"
},
      //dashboard
      "dashboard": {
  "welcome": "¡Bienvenido de nuevo, {{name}}! 👋",
  "learner": "Estudiante",
  "stats": {
    "streak": "Racha de días",
    "xp": "XP Total",
    "hearts": "Vidas",
    "gems": "Gemas"
  },
  "lesson": {
    "start": "EMPEZAR LECCIÓN",
    "complete": "¡Curso completado!",
    "finished": "Has terminado todas las lecciones disponibles.",
    "newCourse": "EMPEZAR NUEVO CURSO"
  },
  "quests": {
    "title": "Desafíos diarios",
    "noQuests": "No hay desafíos hoy.",
    "done": "✓ Hecho"
  },
  "nav": {
    "leaderboard": "Clasificación",
    "store": "Tienda",
    "changeCourse": "Cambiar curso"
  }
},
      //achievments
      "achievements": {
  "title": "Logros",
  "errorLoad": "No se pueden cargar las insignias:",
  "noBadges": "No hay insignias disponibles en la base de datos.",
  "waiting": "Esperando el ID de usuario..."
},
      //leaderboard
      "leaderboard": {
  "title": "🏆 Clasificación",
  "selectLeague": "Seleccionar liga",
  "leagueSuffix": "Liga",
  "leaderboardSuffix": "Clasificación",
  "thisWeek": "Esta semana",
  "allTime": "Todo el tiempo",
  "rank": "Rango",
  "learner": "Estudiante",
  "xp": "XP",
  "noData": "Sin datos aún. ¡Empieza a aprender!",
  "you": "TÚ",
  "leagues": {
    "Bronze": "Bronce", "Copper": "Cobre", "Silver": "Plata", "Gold": "Oro",
    "Emerald": "Esmeralda", "Obsidian": "Obsidiana", "Diamond": "Diamante", "Global": "Global"
  }
},
      //main
      "mainPage": {
  "hero": {
    "title": "Aprende idiomas con Lynqo",
    "subtitle": "Domina nuevos idiomas a través de lecciones divertidas e interactivas. ¡Únete a millones de estudiantes!",
    "continue": "🚀 Continuar aprendiendo (Ir al panel)",
    "getStarted": "Empezar",
    "alreadyAccount": "Ya tengo una cuenta"
  },
  "explore": {
    "news": "📰 Últimas noticias",
    "shop": "🛒 Tienda Lynqo",
    "leaderboard": "🏆 Clasificación"
  },
  "features": {
    "title": "¿Por qué elegir Lynqo?",
    "p_learning": { "title": "Aprendizaje personalizado", "desc": "Lecciones adaptables ajustadas a tu ritmo y objetivos." },
    "gamified": { "title": "Experiencia gamificada", "desc": "Gana puntos, desbloquea logros y mantente motivado." },
    "languages": { "title": "Múltiples idiomas", "desc": "Aprende español, francés, alemán y más." },
    "anywhere": { "title": "Aprende en cualquier lugar", "desc": "Accede a las lecciones en PC, móvil y tableta." }
  }
},
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
      
      //powerups
      "powerupsPage": {
  "title": "Potenciadores",
  "subtitle": "Gasta tus gemas para mejorar tu aprendizaje",
  "stats": {
    "gems": "TUS GEMAS",
    "hearts": "TUS VIDAS"
  },
  "items": {
    "heartRefill": {
      "name": "Rellenar Vidas",
      "description": "Restaura tus vidas a 5 para seguir aprendiendo."
    },
    "xpBoost": {
      "name": "Impulso de XP (Próximamente)",
      "description": "Doble XP en tu próxima lección."
    }
  },
  "status": {
    "full": "Lleno"
  },
  "messages": {
    "premiumUnlimited": "¡Tienes vidas ilimitadas con Premium!",
    "notEnoughGems": "¡No hay suficientes gemas! Completa lecciones para ganar más.",
    "applied": "aplicado!",
    "purchaseFailed": "Compra fallida.",
    "networkError": "Error de red. Inténtalo de nuevo."
  }
},
//merchpage
      "merch": {
  "heroTitle": "Tienda Lynqo",
  "heroSubtitle": "Equipamiento exclusivo para amantes de los idiomas",
  "titles": {
    "collection": "Nuestra Colección",
    "filters": "Filtros y Carrito"
  },
  "filters": {
    "searchLabel": "Buscar productos",
    "searchPlaceholder": "¿Qué estás buscando?",
    "categoryLabel": "Categoría"
  },
  "categories": {
    "all": "Todo",
    "clothing": "Ropa",
    "accessories": "Accesorios",
    "stationery": "Papelería"
  },
  "promo": {
    "title": "¿Envío gratis?",
    "text": "¡En todos los pedidos superiores a $100!"
  },
  "items": {
    "hoodie": "Sudadera con capucha",
    "waterbottle": "Botella de agua",
    "notebook": "Cuaderno",
    "mug": "Taza"
  },
  "cart": {
    "title": "Carrito de compras",
    "empty": "Tu carrito está vacío.",
    "total": "Total",
    "addBtn": "Añadir al carrito",
    "checkoutBtn": "Pasar por caja"
  },
  "payment": {
    "title": "Pago Seguro",
    "amount": "Monto total",
    "lastName": "Apellido",
    "firstName": "Nombre",
    "placeholderLastName": "García",
    "placeholderFirstName": "Juan",
    "address": "Dirección de envío",
    "placeholderAddress": "Calle Falsa 123, Ciudad",
    "phone": "Teléfono",
    "cardNumber": "Número de tarjeta",
    "expiry": "Caducidad",
    "cvv": "CVV",
    "confirmBtn": "Confirmar Pago",
    "successTitle": "¡Gracias por su compra!",
    "successText": "Tu carrito ha sido vaciado y tu pedido ha sido registrado con éxito.",
    "loginAlert": "¡Es necesario iniciar sesión!"
  }
},
      //subscriptionpage
      "subscriptionPage": {
  "heroTitle": "Elige tu plan",
  "heroSubtitle": "Lleva tu experiencia de aprendizaje al siguiente nivel con funciones exclusivas.",
  "plans": {
    "basic": {
      "name": "Básico",
      "price": "Gratis"
    },
    "premium": {
      "name": "Premium",
      "badge": "Recomendado"
    }
  },
  "features": {
    "basicFeatures": "Funciones básicas",
    "limitedLessons": "Lecciones diarias limitadas",
    "noAds": "Sin anuncios",
    "unlimitedLearning": "Aprendizaje ilimitado",
    "offlineMode": "Modo offline"
  },
  "duration": {
    "month": "Mes",
    "discount": "¡2 meses gratis!"
  },
  "options": {
    "autoRenew": "Renovación automática"
  },
  "status": {
    "currentPlan": "Plan actual",
    "freePlan": "Plan gratuito",
    "startSubscription": "Iniciar suscripción"
  },
  "modal": {
    "paymentTitle": "Pago Seguro",
    "selectedPlan": "Plan",
    "lastName": "Apellido",
    "firstName": "Nombre",
    "placeholderLastName": "García",
    "placeholderFirstName": "Juan",
    "cardNumber": "Número de tarjeta",
    "expiry": "Caducidad",
    "cvv": "CVV",
    "confirmPayment": "Confirmar pago",
    "successTitle": "¡Pago realizado con éxito!",
    "successMessage": "¡Gracias! Las funciones Premium han sido activadas."
  },
  "errors": {
    "loginRequired": "¡Por favor, inicia sesión!",
    "purchaseFailed": "Compra fallida",
    "networkError": "Ocurrió un error de red."
  }
},
      
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
      },

      "shopLandingPage": {
        "title": "Tienda Lynqo",
        "description": "Mejora tu experiencia de aprendizaje o muestra tu amor por Lynqo con productos exclusivos.",
        "buttons": {
          "subscriptions": "Suscripciones",
          "merch": "Tienda online",
          "powerups": "Potenciadores"
        },
        "footer": "Pago seguro • Envío a todo el mundo • Devoluciones en 30 días"
      }
    }
  },
  fr: {
    translation: {
      //footer
      "footer": {
  "slogan": "L'apprentissage des langues en toute simplicité.",
  "rights": "Tous droits réservés.",
  "owners": "Propriétaires",
  "contact": "Contact",
  "navigation": "Navigation",
  "home": "Accueil",
  "news": "Actualités",
  "shop": "Boutique",
  "leaderboard": "Classement",
  "followUs": "Suivez-nous"
},
      //picklanguage
      "langSelect": {
  "speakTitle": "Je parle...",
  "learnTitle": "Je veux apprendre...",
  "speakSub": "Sélectionnez votre langue maternelle",
  "learnSub": "Sélectionnez un cours pour commencer",
  "noCourses": "Aucun cours trouvé.",
  "noCoursesDesc": "Nous n'avons pas encore de cours pour cette paire de langues.",
  "chooseAnother": "Choisir une autre langue",
  "back": "Retour aux langues",
  "official": "Cours officiel",
  "defaultDesc": "Maîtrisez cette langue grâce à notre programme d'experts.",
  "startBtn": "Commencer à apprendre"
},
      //dashboard
      "dashboard": {
  "welcome": "Bon retour, {{name}} ! 👋",
  "learner": "Apprenant",
  "stats": {
    "streak": "Série de jours",
    "xp": "XP total",
    "hearts": "Cœurs",
    "gems": "Gemmes"
  },
  "lesson": {
    "start": "COMMENCER LA LEÇON",
    "complete": "Cours terminé !",
    "finished": "Vous avez terminé toutes les leçons disponibles.",
    "newCourse": "NOUVEAU COURS"
  },
  "quests": {
    "title": "Quêtes quotidiennes",
    "noQuests": "Pas de quêtes aujourd'hui.",
    "done": "✓ Terminé"
  },
  "nav": {
    "leaderboard": "Classement",
    "store": "Boutique",
    "changeCourse": "Changer de cours"
  }
},
      //achievments
      "achievements": {
  "title": "Succès",
  "errorLoad": "Impossible de charger les badges :",
  "noBadges": "Aucun badge disponible dans la base de données.",
  "waiting": "En attente de l'identifiant utilisateur..."
},
      //leaderboard
      "leaderboard": {
  "title": "🏆 Classement",
  "selectLeague": "Choisir une ligue",
  "leagueSuffix": "Ligue",
  "leaderboardSuffix": "Classement",
  "thisWeek": "Cette semaine",
  "allTime": "Tout le temps",
  "rank": "Rang",
  "learner": "Apprenant",
  "xp": "XP",
  "noData": "Pas encore de données. Commencez à apprendre !",
  "you": "VOUS",
  "leagues": {
    "Bronze": "Bronze", "Copper": "Cuivre", "Silver": "Argent", "Gold": "Or",
    "Emerald": "Émeraude", "Obsidian": "Obsidienne", "Diamond": "Diamant", "Global": "Global"
  }
},
      //main
      "mainPage": {
  "hero": {
    "title": "Apprenez les langues avec Lynqo",
    "subtitle": "Maîtrisez de nouvelles langues grâce à des leçons ludiques et interactives. Rejoignez des millions d'apprenants !",
    "continue": "🚀 Continuer l'apprentissage (Tableau de bord)",
    "getStarted": "Commencer",
    "alreadyAccount": "J'ai déjà un compte"
  },
  "explore": {
    "news": "📰 Dernières nouvelles",
    "shop": "🛒 Boutique Lynqo",
    "leaderboard": "🏆 Classement"
  },
  "features": {
    "title": "Pourquoi choisir Lynqo ?",
    "p_learning": { "title": "Apprentissage personnalisé", "desc": "Des leçons adaptatives adaptées à votre rythme et à vos objectifs." },
    "gamified": { "title": "Expérience ludique", "desc": "Gagnez des points, débloquez des succès et restez motivé." },
    "languages": { "title": "Plusieurs langues", "desc": "Apprenez l'espagnol, le français, l'allemand et plus encore." },
    "anywhere": { "title": "Apprenez n'importe où", "desc": "Accédez aux cours sur ordinateur, mobile et tablette." }
  }
},
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
      //powerups
      "powerupsPage": {
  "title": "Power-ups",
  "subtitle": "Dépensez vos gemmes pour booster votre apprentissage",
  "stats": {
    "gems": "VOS GEMMES",
    "hearts": "VOS VIES"
  },
  "items": {
    "heartRefill": {
      "name": "Recharge de vies",
      "description": "Restaurez vos vies à 5 et continuez à apprendre."
    },
    "xpBoost": {
      "name": "Boost d'XP (Bientôt)",
      "description": "Double XP sur votre prochaine leçon."
    }
  },
  "status": {
    "full": "Plein"
  },
  "messages": {
    "premiumUnlimited": "Vous avez des vies illimitées avec Premium !",
    "notEnoughGems": "Pas assez de gemmes ! Terminez des leçons pour en gagner plus.",
    "applied": "appliqué !",
    "purchaseFailed": "Échec de l'achat.",
    "networkError": "Erreur réseau. Réessayez."
  }
},
      //subscriptionpage
      "subscriptionPage": {
  "heroTitle": "Choisissez votre forfait",
  "heroSubtitle": "Faites passer votre expérience d'apprentissage au niveau supérieur grâce à des fonctionnalités exclusives.",
  "plans": {
    "basic": {
      "name": "Basique",
      "price": "Gratuit"
    },
    "premium": {
      "name": "Premium",
      "badge": "Recommandé"
    }
  },
  "features": {
    "basicFeatures": "Fonctions de base",
    "limitedLessons": "Leçons quotidiennes limitées",
    "noAds": "Sans publicité",
    "unlimitedLearning": "Apprentissage illimité",
    "offlineMode": "Mode hors ligne"
  },
  "duration": {
    "month": "Mois",
    "discount": "2 mois gratuits !"
  },
  "options": {
    "autoRenew": "Renouvellement automatique"
  },
  "status": {
    "currentPlan": "Forfait actuel",
    "freePlan": "Forfait gratuit",
    "startSubscription": "Commencer l'abonnement"
  },
  "modal": {
    "paymentTitle": "Paiement Sécurisé",
    "selectedPlan": "Forfait",
    "lastName": "Nom",
    "firstName": "Prénom",
    "placeholderLastName": "Dubois",
    "placeholderFirstName": "Jean",
    "cardNumber": "Numéro de carte",
    "expiry": "Expiration",
    "cvv": "CVV",
    "confirmPayment": "Confirmer le paiement",
    "successTitle": "Paiement réussi !",
    "successMessage": "Merci ! Les fonctionnalités Premium ont été activées."
  },
  "errors": {
    "loginRequired": "Veuillez vous connecter !",
    "purchaseFailed": "Échec de l'achat",
    "networkError": "Une erreur réseau est survenue."
  }
},
      
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
      },
      //merchpage
      "merch": {
  "heroTitle": "Boutique Lynqo",
  "heroSubtitle": "Équipement exclusif pour les passionnés de langues",
  "titles": {
    "collection": "Notre Collection",
    "filters": "Filtres & Panier"
  },
  "filters": {
    "searchLabel": "Rechercher des produits",
    "searchPlaceholder": "Que cherchez-vous ?",
    "categoryLabel": "Catégorie"
  },
  "categories": {
    "all": "Tous",
    "clothing": "Vêtements",
    "accessories": "Accessoires",
    "stationery": "Papeterie"
  },
  "promo": {
    "title": "Livraison gratuite ?",
    "text": "Sur toutes les commandes de plus de 100 $ !"
  },
  "items": {
    "hoodie": "Sweat à capuche",
    "waterbottle": "Gourde",
    "notebook": "Carnet",
    "mug": "Mug"
  },
  "cart": {
    "title": "Panier",
    "empty": "Votre panier est vide.",
    "total": "Total",
    "addBtn": "Ajouter au panier",
    "checkoutBtn": "Passer a la caisse"
  },
  "payment": {
    "title": "Paiement Sécurisé",
    "amount": "Montant total",
    "lastName": "Nom",
    "firstName": "Prénom",
    "placeholderLastName": "Dubois",
    "placeholderFirstName": "Jean",
    "address": "Adresse de livraison",
    "placeholderAddress": "123 Rue de la Paix, Ville",
    "phone": "Numéro de téléphone",
    "cardNumber": "Numéro de carte",
    "expiry": "Expiration",
    "cvv": "CVV",
    "confirmBtn": "Confirmer le paiement",
    "successTitle": "Merci pour votre achat !",
    "successText": "Votre panier a été vidé et votre commande a été enregistrée avec succès.",
    "loginAlert": "Connexion requise !"
  }
},

      "shopLandingPage": {
        "title": "Boutique Lynqo",
        "description": "Améliorez votre expérience d'apprentissage ou montrez votre amour pour Lynqo avec des produits exclusifs.",
        "buttons": {
          "subscriptions": "Abonnements",
          "merch": "Boutique en ligne",
          "powerups": "Bonus"
        },
        "footer": "Paiement sécurisé • Livraison mondiale • Retours sous 30 jours"
      }
    }
  },
  de: {
    translation: {
      //footer
      "footer": {
  "slogan": "Sprachenlernen einfach gemacht.",
  "rights": "Alle Rechte vorbehalten.",
  "owners": "Eigentümer",
  "contact": "Kontakt",
  "navigation": "Navigation",
  "home": "Startseite",
  "news": "Neuigkeiten",
  "shop": "Shop",
  "leaderboard": "Bestenliste",
  "followUs": "Folge uns"
},
      //picklanguage
      "langSelect": {
  "speakTitle": "Ich spreche...",
  "learnTitle": "Ich möchte lernen...",
  "speakSub": "Wähle deine Muttersprache",
  "learnSub": "Wähle einen Kurs, um zu beginnen",
  "noCourses": "Keine Kurse gefunden.",
  "noCoursesDesc": "Wir haben noch keinen Kurs für diese Sprachkombination.",
  "chooseAnother": "Andere Sprache wählen",
  "back": "Zurück zu den Sprachen",
  "official": "Offizieller Kurs",
  "defaultDesc": "Meistern Sie diese Sprache mit unserem Experten-Lehrplan.",
  "startBtn": "Lernen starten"
},
      //dashboard
      "dashboard": {
  "welcome": "Willkommen zurück, {{name}}! 👋",
  "learner": "Lernende",
  "stats": {
    "streak": "Tages-Streak",
    "xp": "Gesamt XP",
    "hearts": "Herzen",
    "gems": "Edelsteine"
  },
  "lesson": {
    "start": "LEKTION STARTEN",
    "complete": "Kurs abgeschlossen!",
    "finished": "Du hast alle verfügbaren Lektionen beendet.",
    "newCourse": "NEUEN KURS STARTEN"
  },
  "quests": {
    "title": "Tägliche Quests",
    "noQuests": "Heute keine Quests verfügbar.",
    "done": "✓ Erledigt"
  },
  "nav": {
    "leaderboard": "Bestenliste",
    "store": "Shop",
    "changeCourse": "Kurs wechseln"
  }
},
      //achievments
      "achievements": {
  "title": "Erfolge",
  "errorLoad": "Abzeichen konnten nicht geladen werden:",
  "noBadges": "Keine Abzeichen in der Datenbank verfügbar.",
  "waiting": "Warten auf Benutzer-ID..."
},
      //leaderboard
      "leaderboard": {
  "title": "🏆 Bestenliste",
  "selectLeague": "Liga auswählen",
  "leagueSuffix": "Liga",
  "leaderboardSuffix": "Bestenliste",
  "thisWeek": "Diese Woche",
  "allTime": "Gesamt",
  "rank": "Rang",
  "learner": "Lernende",
  "xp": "XP",
  "noData": "Noch keine Daten. Fang an zu lernen!",
  "you": "DU",
  "leagues": {
    "Bronze": "Bronze", "Copper": "Kupfer", "Silver": "Silber", "Gold": "Gold",
    "Emerald": "Smaragd", "Obsidian": "Obsidian", "Diamond": "Diamant", "Global": "Global"
  }
},
      //main
      "mainPage": {
  "hero": {
    "title": "Sprachen lernen mit Lynqo",
    "subtitle": "Meistere neue Sprachen durch unterhaltsame, interaktive Lektionen. Schließe dich Millionen von Lernenden an!",
    "continue": "🚀 Weiterlernen (Zum Dashboard)",
    "getStarted": "Jetzt loslegen",
    "alreadyAccount": "Ich habe bereits ein Konto"
  },
  "explore": {
    "news": "📰 Aktuelle News",
    "shop": "🛒 Lynqo Shop",
    "leaderboard": "🏆 Bestenliste"
  },
  "features": {
    "title": "Warum Lynqo wählen?",
    "p_learning": { "title": "Personalisiertes Lernen", "desc": "Adaptive Lektionen, die an dein Tempo und deine Ziele angepasst sind." },
    "gamified": { "title": "Spielerisches Erlebnis", "desc": "Sammle Punkte, schalte Erfolge frei und bleibe motiviert." },
    "languages": { "title": "Mehrere Sprachen", "desc": "Lerne Spanisch, Französisch, Deutsch und mehr." },
    "anywhere": { "title": "Überall lernen", "desc": "Greife über Desktop, Handy und Tablet auf Lektionen zu." }
  }
},
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
      //merchpage
      "merch": {
  "heroTitle": "Lynqo Store",
  "heroSubtitle": "Exklusive Ausrüstung für Sprachliebhaber",
  "titles": {
    "collection": "Unsere Kollektion",
    "filters": "Filter & Warenkorb"
  },
  "filters": {
    "searchLabel": "Produkte suchen",
    "searchPlaceholder": "Was suchst du?",
    "categoryLabel": "Kategorie"
  },
  "categories": {
    "all": "Alle",
    "clothing": "Kleidung",
    "accessories": "Zubehör",
    "stationery": "Schreibwaren"
  },
  "promo": {
    "title": "Gratis Versand?",
    "text": "Auf alle Bestellungen über $100!"
  },
  "items": {
    "hoodie": "Kapuzenpullover",
    "waterbottle": "Wasserflasche",
    "notebook": "Notizbuch",
    "mug": "Tasse"
  },
  "cart": {
    "title": "Warenkorb",
    "empty": "Dein Warenkorb ist leer.",
    "total": "Gesamt",
    "addBtn": "In den Warenkorb",
    "checkoutBtn": "Zur Kasse"
  },
  "payment": {
    "title": "Sichere Zahlung",
    "amount": "Gesamtbetrag",
    "lastName": "Nachname",
    "firstName": "Vorname",
    "placeholderLastName": "Müller",
    "placeholderFirstName": "Max",
    "address": "Lieferadresse",
    "placeholderAddress": "Musterstraße 1, Stadt",
    "phone": "Telefonnummer",
    "cardNumber": "Kartennummer",
    "expiry": "Gültig bis",
    "cvv": "CVV",
    "confirmBtn": "Zahlung bestätigen",
    "successTitle": "Vielen Dank für Ihren Einkauf!",
    "successText": "Dein Warenkorb wurde geleert und deine Bestellung erfolgreich aufgenommen.",
    "loginAlert": "Anmeldung erforderlich!"
  }
},

      //powerups
      "powerupsPage": {
  "title": "Power-ups",
  "subtitle": "Gib deine Edelsteine aus, um dein Lernen zu fördern",
  "stats": {
    "gems": "DEINE EDELSTEINE",
    "hearts": "DEINE HERZEN"
  },
  "items": {
    "heartRefill": {
      "name": "Herzen auffüllen",
      "description": "Fülle deine Herzen auf 5 auf, um weiterzulernen."
    },
    "xpBoost": {
      "name": "XP-Boost (Demnächst)",
      "description": "Doppelte XP bei deiner nächsten Lektion."
    }
  },
  "status": {
    "full": "Voll"
  },
  "messages": {
    "premiumUnlimited": "Mit Premium hast du unbegrenzte Herzen!",
    "notEnoughGems": "Nicht genug Edelsteine! Schließe Lektionen ab, um mehr zu verdienen.",
    "applied": "angewendet!",
    "purchaseFailed": "Kauf fehlgeschlagen.",
    "networkError": "Netzwerkfehler. Versuche es erneut."
  }
},
      //subscriptionpage
      "subscriptionPage": {
  "heroTitle": "Wähle dein Paket",
  "heroSubtitle": "Bringe dein Lernerlebnis mit exklusiven Funktionen auf die nächste Stufe.",
  "plans": {
    "basic": {
      "name": "Basis",
      "price": "Kostenlos"
    },
    "premium": {
      "name": "Premium",
      "badge": "Empfohlen"
    }
  },
  "features": {
    "basicFeatures": "Basisfunktionen",
    "limitedLessons": "Täglich begrenzte Lektionen",
    "noAds": "Keine Werbung",
    "unlimitedLearning": "Unbegrenztes Lernen",
    "offlineMode": "Offline-Modus"
  },
  "duration": {
    "month": "Monat",
    "discount": "2 Monate kostenlos!"
  },
  "options": {
    "autoRenew": "Automatische Verlängerung"
  },
  "status": {
    "currentPlan": "Aktueller Plan",
    "freePlan": "Kostenloses Paket",
    "startSubscription": "Abonnement starten"
  },
  "modal": {
    "paymentTitle": "Sichere Zahlung",
    "selectedPlan": "Paket",
    "lastName": "Nachname",
    "firstName": "Vorname",
    "placeholderLastName": "Müller",
    "placeholderFirstName": "Max",
    "cardNumber": "Kartennummer",
    "expiry": "Gültig bis",
    "cvv": "CVV",
    "confirmPayment": "Zahlung bestätigen",
    "successTitle": "Zahlung erfolgreich!",
    "successMessage": "Vielen Dank! Die Premium-Funktionen wurden aktiviert."
  },
  "errors": {
    "loginRequired": "Bitte melde dich an!",
    "purchaseFailed": "Kauf fehlgeschlagen",
    "networkError": "Ein Netzwerkfehler ist aufgetreten."
  }
},
      
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
      },

      "shopLandingPage": {
        "title": "Lynqo Store",
        "description": "Verbessere dein Lernerlebnis oder zeige deine Liebe zu Lynqo mit exklusiven Fanartikeln.",
        "buttons": {
          "subscriptions": "Abonnements",
          "merch": "Online-Shop",
          "powerups": "Power-ups"
        },
        "footer": "Sichere Kasse • Weltweiter Versand • 30 Tage Rückgaberecht"
      }
    }
  }
};

const savedLanguage = localStorage.getItem('appLanguage') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;