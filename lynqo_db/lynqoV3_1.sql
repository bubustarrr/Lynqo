-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 06. 11:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `lynqo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin_logs`
--

CREATE TABLE `admin_logs` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `target_user_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `admin_logs`
--

INSERT INTO `admin_logs` (`id`, `admin_id`, `action_type`, `target_user_id`, `description`, `timestamp`) VALUES
(1, 9, 'ban_user', 10, 'bc I can', '2026-02-03 08:35:26');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ai_messages`
--

CREATE TABLE `ai_messages` (
  `id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `sender` enum('user','ai') DEFAULT 'user',
  `message` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ai_messages`
--

INSERT INTO `ai_messages` (`id`, `session_id`, `sender`, `message`, `timestamp`) VALUES
(1, 1, 'user', 'Hello!', '2026-02-03 08:18:19'),
(2, 1, 'ai', 'Practice: Hello → French? (Answer: Bonjour). Now reply with your own example sentence.', '2026-02-03 08:18:19');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ai_sessions`
--

CREATE TABLE `ai_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_time` timestamp NULL DEFAULT NULL,
  `ai_feedback` text DEFAULT NULL,
  `ai_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ai_sessions`
--

INSERT INTO `ai_sessions` (`id`, `user_id`, `lesson_id`, `start_time`, `end_time`, `ai_feedback`, `ai_score`) VALUES
(1, 10, 1, '2026-02-03 08:17:49', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `time_spent_seconds` int(11) DEFAULT 0,
  `accuracy` decimal(5,2) DEFAULT 0.00,
  `attempts` int(11) DEFAULT 0,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `analytics`
--

INSERT INTO `analytics` (`id`, `user_id`, `lesson_id`, `time_spent_seconds`, `accuracy`, `attempts`, `completed_at`) VALUES
(1, 10, 1, 45, 0.90, 1, '2026-02-03 08:18:48');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `api_tokens`
--

CREATE TABLE `api_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `api_tokens`
--

INSERT INTO `api_tokens` (`id`, `user_id`, `token`, `scopes`, `created_at`, `expires_at`) VALUES
(1, 9, '3JmSXaCNUzXASzGdiAuRec36XBzU+1vawSuHpm7RsxCnscr2QPcVqDur3LK5Tmwm8TXEa/ffDsbFpTfdu2bgDA==', 'refresh_token', '2026-02-04 09:58:36', '2026-03-06 09:59:22'),
(2, 9, 'c2iIr2POc8FvypePGjKcGz2dZ7Ke9TZzP+7YoRFlMicTcC61Eb7yhNgHFCbWEIbFqUY/bTOSZba4veMNV2uTZw==', 'refresh_token', '2026-02-04 10:04:02', '2026-03-06 10:04:02'),
(3, 10, 'kt9Rs/fZKj92Ydfo4y5wKhXo52zpSJS6hYlSTqecC89APKR3m+94Ezazr3+2/Hr0dSiydlcYItojeNUdu4U97w==', 'refresh_token', '2026-02-04 10:05:46', '2026-03-06 10:05:46'),
(4, 10, 'ToERbMWRnKi4c2PfxzCb5KdY35Fo0a/IuXWLrL+8gfCr8G5smG8aBvge/psk/UoFzDddWTllsaVYrdbTKTgVKg==', 'refresh_token', '2026-02-04 10:09:21', '2026-03-06 10:09:21'),
(5, 9, 'VXYO1PeDK5GH6uvvcpoyFf8wnQPQasnyAju5ut1+me2qgXbV8vUNJRn4tmV1vpxXCGOTTF2WM3YrdfRU4cdO7g==', 'refresh_token', '2026-02-04 10:12:29', '2026-03-06 10:12:29'),
(6, 11, 'aZyrwLIVICAYEOfJ8ZFb0D9NqIQrG/6zAM4Ucc/F4k1CqcC6HyTQNBvN57dnpwcAZXQ4LPAcKhyz3WHVlfQp0w==', 'refresh_token', '2026-02-04 10:14:34', '2026-03-06 10:14:34'),
(7, 9, 'oOaXYWQ3BTCwXiLwR75Y9ydcMXbBQueCwGdapgCwTRJtCtHPc/4NKc/6UI9V3yk2d0305S+/wEQhkYyoJYAShA==', 'refresh_token', '2026-02-04 10:15:29', '2026-03-06 10:15:29'),
(8, 11, 'EMFbssN504yBK7Y2VOmDeT4FPYkFUZMU59yBNEFXHZmWhNUBAtK82pp1eLu4gkL52EpHQKFclt31sS3kBk6pOw==', 'refresh_token', '2026-02-04 10:26:19', '2026-03-06 10:26:19'),
(9, 9, 'kzji1l+7ol6Y2FWxU6C1rBKskMqEx1Uu9LUiYas3txDlVSupxMobs9NWfCCQ9WbsLLTQGrMIqfzNgjU5+KtbFQ==', 'refresh_token', '2026-02-06 05:31:43', '2026-03-08 05:31:43'),
(10, 10, '4/yElY0RDOBfvAW1ZuM2EGcgimcJYBckm/B0FhI7fEQlUZSd4ObRdImbOr3KYQebqXkJaxcs8FOqwRGipgsM5g==', 'refresh_token', '2026-02-06 05:39:56', '2026-03-08 05:39:56'),
(11, 10, 'XnTY7OeN0ARMM4+MYUOumQ6ZXeJp4t5vKRPpg6YkeGO6yK9t73YDSk/K+2UyEEaoFIbj+ZQOX3lofBfsG8p/Qg==', 'refresh_token', '2026-02-06 06:33:41', '2026-03-08 06:33:41'),
(12, 9, 'XPOOozwWj5AHFgxRAzw+g1bzXv3GnW2tuNS5RolgdNmcpXKJ5C5IvFVv49fO8yYeH2R+nCO9q3zjSxCGCMn6Ow==', 'refresh_token', '2026-02-06 06:39:31', '2026-03-08 06:39:31'),
(13, 9, 'Sl6ikAKrfMwDKBkYuVOerk+wxHjSdjyO3KtXp4cK+PCmZQJfRLQiQyvUZVGeWGHlQO6OyE93GQfZu2D1jcMydA==', 'refresh_token', '2026-02-06 08:52:06', '2026-03-08 08:52:06'),
(14, 9, 'MSi84SSStrpFpyp521C3TpuNgUNqeYZz0NEP92E2r68D4fwiQ77BqF8YRLXsO673wTOsAvutJBtPQQTfjbIlmQ==', 'refresh_token', '2026-02-06 09:17:39', '2026-03-08 09:17:39');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `icon_url` varchar(255) DEFAULT NULL,
  `type` enum('milestone','weekly') DEFAULT 'milestone'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `badges`
--

INSERT INTO `badges` (`id`, `name`, `description`, `icon_url`, `type`) VALUES
(1, 'Welcome!', 'Complete your first lesson', '/media/badges/welcome.png', 'milestone'),
(2, '5-Day Streak', 'Maintain a 5-day learning streak', '/media/badges/streak-5.png', 'milestone'),
(3, '10-Day Streak', 'Maintain a 10-day learning streak', '/media/badges/streak-10.png', 'milestone'),
(4, 'XP Hunter', 'Earn 500 total XP', '/media/badges/xp-500.png', 'milestone'),
(5, 'XP Master', 'Earn 2000 total XP', '/media/badges/xp-2000.png', 'milestone'),
(6, 'Social Butterfly', 'Add 3 friends', '/media/badges/social.png', 'milestone'),
(7, 'Perfectionist', 'Complete a lesson with 100% accuracy', '/media/badges/perfect.png', 'milestone'),
(8, 'Weekly Champion', 'Finish #1 in the weekly leaderboard', '/media/badges/champion.png', 'weekly');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `banned_users`
--

CREATE TABLE `banned_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` text DEFAULT NULL,
  `banned_until` datetime DEFAULT NULL,
  `issued_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `banned_users`
--

INSERT INTO `banned_users` (`id`, `user_id`, `reason`, `banned_until`, `issued_by`, `created_at`) VALUES
(1, 10, 'bc I can', '2026-02-05 00:00:00', 9, '2026-02-03 08:35:26');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_reported` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `sender_id`, `receiver_id`, `message`, `timestamp`, `is_deleted`, `is_reported`) VALUES
(1, 9, 10, 'Test1', '2026-02-04 07:38:52', 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `source_language_id` int(11) NOT NULL,
  `target_language_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `courses`
--

INSERT INTO `courses` (`id`, `source_language_id`, `target_language_id`, `title`, `description`, `is_active`) VALUES
(1, 1, 4, 'English to French', 'Learning French easily as an English speaker', 1),
(2, 1, 5, 'English to Spanish', 'Learn Spanish easily as an English speaker', 1),
(3, 4, 1, 'French to English', 'Learn English easily as a French speaker', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `friendships`
--

CREATE TABLE `friendships` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `friendships`
--

INSERT INTO `friendships` (`id`, `sender_id`, `receiver_id`, `status`, `created_at`) VALUES
(1, 9, 10, 'accepted', '2026-02-03 08:15:44');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`) VALUES
(1, 'English', 'en'),
(2, 'Hungarian', 'hu'),
(3, 'German', 'de'),
(4, 'French', 'fr'),
(5, 'Spanish', 'es'),
(6, 'Italian', 'it'),
(7, 'Portuguese', 'pt'),
(8, 'Dutch', 'nl'),
(9, 'Polish', 'pl'),
(10, 'Romanian', 'ro'),
(11, 'Czech', 'cs'),
(12, 'Slovak', 'sk'),
(13, 'Ukrainian', 'uk'),
(14, 'Russian', 'ru'),
(15, 'Turkish', 'tr'),
(16, 'Arabic', 'ar'),
(17, 'Chinese', 'zh'),
(18, 'Japanese', 'ja'),
(19, 'Korean', 'ko');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `leaderboards`
--

CREATE TABLE `leaderboards` (
  `id` int(11) NOT NULL,
  `league_name` varchar(50) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `leaderboard_entries`
--

CREATE TABLE `leaderboard_entries` (
  `id` int(11) NOT NULL,
  `leaderboard_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `xp` int(11) DEFAULT 0,
  `rank` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `type` enum('mixed','listening','speaking','reading') DEFAULT 'mixed',
  `order_index` int(11) DEFAULT NULL,
  `xp_reward` int(11) DEFAULT 30,
  `media_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `lessons`
--

INSERT INTO `lessons` (`id`, `course_id`, `unit_id`, `title`, `type`, `order_index`, `xp_reward`, `media_id`, `created_at`) VALUES
(1, 1, 1, 'Greetings', 'mixed', 1, 30, NULL, '2026-01-28 06:38:38'),
(2, 1, 1, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-01-28 06:38:38'),
(3, 2, 2, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-06 10:17:06'),
(4, 2, 2, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-02-06 10:17:06'),
(5, 3, 3, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-06 10:17:06'),
(6, 3, 3, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-02-06 10:17:06');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lesson_contents`
--

CREATE TABLE `lesson_contents` (
  `id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `content_type` enum('text','audio','image','multiple_choice','fill_blank','speaking','listening') DEFAULT 'text',
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `media_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `lesson_contents`
--

INSERT INTO `lesson_contents` (`id`, `lesson_id`, `content_type`, `question`, `answer`, `options`, `media_id`) VALUES
(1, 1, 'text', 'Hello → French?', 'Bonjour', NULL, NULL),
(2, 1, 'text', 'Good evening → French?', 'Bonsoir', NULL, NULL),
(3, 1, 'text', 'Hi / informal hello → French?', 'Salut', NULL, NULL),
(4, 1, 'text', 'Goodbye → French?', 'Au revoir', NULL, NULL),
(5, 1, 'text', 'Please → French?', 'S’il vous plaît', NULL, NULL),
(6, 1, 'text', 'Thank you → French?', 'Merci', NULL, NULL),
(7, 1, 'multiple_choice', 'Which means “Hello”?', 'Bonjour', '[\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.wav\" },\n  { \"text\": \"Bonsoir\", \"audioUrl\": \"/media/audio/french/bonsoir.wav\" },\n  { \"text\": \"Salut\",   \"audioUrl\": \"/media/audio/french/salut.wav\" },\n  { \"text\": \"Merci\",   \"audioUrl\": \"/media/audio/french/merci.wav\" }\n]', NULL),
(8, 1, 'multiple_choice', 'Which means “Good evening”?', 'Bonsoir', '[\"Bonjour\",\"Bonsoir\",\"Salut\",\"Au revoir\"]', NULL),
(9, 1, 'multiple_choice', 'Which means “Thank you”?', 'Merci', '[\"Merci\",\"S’il vous plaît\",\"Au revoir\",\"Bonjour\"]', NULL),
(10, 1, 'fill_blank', 'Fill: Bon____', 'jour', NULL, NULL),
(11, 1, 'fill_blank', 'Fill: Bonso___', 'ir', NULL, NULL),
(12, 1, 'fill_blank', 'Fill: Sa___', 'lut', NULL, NULL),
(13, 2, 'text', 'One → French?', 'Un', NULL, 1),
(14, 2, 'text', 'Two → French?', 'Deux', NULL, 2),
(15, 2, 'text', 'Three → French?', 'Trois', NULL, 3),
(16, 2, 'text', 'Four → French?', 'Quatre', NULL, 4),
(17, 2, 'text', 'Five → French?', 'Cinq', NULL, 5),
(18, 2, 'multiple_choice', 'Which means “One”?', 'Un', '[\"Deux\",\"Un\",\"Trois\",\"Cinq\"]', NULL),
(19, 2, 'multiple_choice', 'Which means “Two”?', 'Deux', '[\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.wav\" },\n  { \"text\": \"Trois\",  \"audioUrl\": \"/media/audio/french/trois.wav\" },\n  { \"text\": \"Quatre\", \"audioUrl\": \"/media/audio/french/quatre.wav\" },\n  { \"text\": \"Cinq\",   \"audioUrl\": \"/media/audio/french/cinq.wav\" }\n]', NULL),
(20, 2, 'multiple_choice', 'Which means “Three”?', 'Trois', '[\"Trois\",\"Un\",\"Deux\",\"Quatre\"]', NULL),
(21, 2, 'multiple_choice', 'Which means “Four”?', 'Quatre', '[\"Cinq\",\"Quatre\",\"Deux\",\"Un\"]', NULL),
(22, 2, 'multiple_choice', 'Which means “Five”?', 'Cinq', '[\"Trois\",\"Deux\",\"Cinq\",\"Quatre\"]', NULL),
(23, 2, 'fill_blank', 'Fill: Qua____ (Four)', 'tre', NULL, NULL),
(24, 2, 'fill_blank', 'Fill: Ci__ (Five)', 'nq', NULL, NULL),
(25, 3, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(26, 3, 'multiple_choice', 'Which means \"Goodbye\"?', 'Adiós', '[\"Hola\", \"Adiós\", \"Por favor\", \"Gracias\"]', NULL),
(27, 3, 'fill_blank', 'Fill: Gra____ (Thanks)', 'cias', NULL, NULL),
(28, 4, 'multiple_choice', 'Which means \"One\"?', 'Uno', '[\"Dos\", \"Uno\", \"Tres\", \"Cinco\"]', NULL),
(29, 4, 'text', 'Two -> Spanish?', 'Dos', NULL, NULL),
(30, 5, 'multiple_choice', 'Que signifie \"Hello\"?', 'Bonjour', '[\"Au revoir\", \"Bonjour\", \"Merci\", \"S\'il vous plaît\"]', NULL),
(31, 5, 'text', 'Merci -> Anglais?', 'Thank you', NULL, NULL),
(32, 6, 'fill_blank', 'Complétez : O__ (Un)', 'ne', NULL, NULL),
(33, 6, 'multiple_choice', 'Que signifie \"Three\"?', 'Trois', '[\"Un\", \"Deux\", \"Trois\", \"Quatre\"]', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `media_files`
--

CREATE TABLE `media_files` (
  `id` int(11) NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `file_type` enum('image','audio','video') DEFAULT 'image',
  `uploader_id` int(11) DEFAULT NULL,
  `used_in` varchar(50) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `media_files`
--

INSERT INTO `media_files` (`id`, `file_url`, `file_type`, `uploader_id`, `used_in`, `uploaded_at`) VALUES
(1, '/media/audio/french/zero.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(2, '/media/audio/french/un.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(3, '/media/audio/french/deux.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(4, '/media/audio/french/trois.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(5, '/media/audio/french/quatre.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(6, '/media/audio/french/cinq.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(7, '/media/audio/french/six.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(8, '/media/audio/french/sept.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(9, '/media/audio/french/huit.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(10, '/media/audio/french/neuf.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(11, '/media/audio/french/dix.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(12, '/media/audio/french/onze.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(13, '/media/audio/french/douze.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(14, '/media/audio/french/treize.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(15, '/media/audio/french/quatorze.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(16, '/media/audio/french/quinze.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(17, '/media/audio/french/seize.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(18, '/media/audio/french/dix-sept.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(19, '/media/audio/french/dix-huit.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(20, '/media/audio/french/dix-neuf.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(21, '/media/audio/french/vingt.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(22, '/media/audio/french/trente.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(23, '/media/audio/french/quarante.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(24, '/media/audio/french/cinquante.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(25, '/media/audio/french/soixante.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(26, '/media/audio/french/soixante-dix.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(27, '/media/audio/french/quatre-vingts.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(28, '/media/audio/french/quatre-vingt-dix.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26'),
(29, '/media/audio/french/cent.oog', 'audio', NULL, 'numbers', '2026-02-04 10:22:26');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `message`, `is_read`, `created_at`) VALUES
(1, 10, 'friend_request', 'TestV3', 0, '2026-02-03 09:45:56'),
(2, 3, 'friend_request', 'TestV3 sent you a friend request!', 0, '2026-02-03 09:47:03'),
(3, 9, NULL, 'TestV3_3 sent you a friend request!', 0, '2026-02-03 09:50:22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `practice_sessions`
--

CREATE TABLE `practice_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('vocabulary','listening','speaking') DEFAULT 'vocabulary',
  `score` int(11) DEFAULT 0,
  `xp_earned` int(11) DEFAULT 0,
  `duration_seconds` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `quests`
--

CREATE TABLE `quests` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `reward_xp` int(11) DEFAULT 10,
  `duration` enum('daily','weekly') DEFAULT 'daily',
  `type` enum('lesson','practice') DEFAULT 'lesson'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `message_id` int(11) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','resolved') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `resolved_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dark_mode` tinyint(1) DEFAULT 0,
  `sound_enabled` tinyint(1) DEFAULT 1,
  `daily_goal_minutes` int(11) DEFAULT 15,
  `ui_language` varchar(10) DEFAULT 'en',
  `notifications_enabled` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `store_items`
--

CREATE TABLE `store_items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `max_quantity` int(11) DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `store_items`
--

INSERT INTO `store_items` (`id`, `name`, `description`, `price`, `max_quantity`) VALUES
(1, 'Lynqo T-shirt', 'Custom Lynqo T-shirt', 25, 37);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_name` varchar(50) DEFAULT NULL,
  `quantity_months` int(11) DEFAULT 1,
  `starts_at` date DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `auto_renew` tinyint(1) DEFAULT 1,
  `provider` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `user_id`, `plan_name`, `quantity_months`, `starts_at`, `expires_at`, `auto_renew`, `provider`, `transaction_id`) VALUES
(1, 9, 'Yearly', 12, '2026-02-03', '2027-02-03', 1, 'internal', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `order_index` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `units`
--

INSERT INTO `units` (`id`, `course_id`, `title`, `description`, `order_index`) VALUES
(1, 1, 'Unit 1: The Basics', 'Learn to greet people and introduce yourself.', 1),
(2, 1, 'Unit 2: Family & Friends', 'Talk about your family and close friends.', 2),
(3, 1, 'Unit 3: Food & Drink', 'Order food at a restaurant and buy groceries.', 3),
(4, 1, 'Unit 4: Travel', 'Ask for directions and book hotels.', 4),
(5, 1, 'Unit 5: Work & School', 'Discuss your job, studies, and daily routine.', 5),
(6, 2, 'Unit 1: Basics', 'Learn to greet people and count', 1),
(7, 3, 'Unité 1 : Les Bases', 'Apprenez à saluer et à compter', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `hearts` int(11) DEFAULT 5,
  `coins` int(11) DEFAULT 0,
  `is_premium` tinyint(1) DEFAULT 0,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `display_name`, `email`, `password_hash`, `profile_pic_url`, `hearts`, `coins`, `is_premium`, `role`, `created_at`) VALUES
(1, 'lynqotester', 'Lynqo Tester', 'lynqotester@example.com', 'b6um5O1yTFtU+tGeypiSPiGYzbunjbXnRnLIMhf7M6Y=', NULL, 5, 0, 0, 'user', '2025-10-23 12:10:28'),
(2, 'lynqotester1', 'lynqotester1', 'lynqotester1@example.com', 'b6um5O1yTFtU+tGeypiSPiGYzbunjbXnRnLIMhf7M6Y=', NULL, 5, 0, 0, 'user', '2025-10-23 12:12:25'),
(3, 'bubu', 'bubu', 'andren@kkszki.hu', '0XK8fuW779KXzSf3nrWaVRxN3lebIJCuSj+NEQazk9E=', NULL, 5, 0, 0, 'user', '2025-10-23 12:17:57'),
(5, 'test1', 'test1', 'test1@1', 'G08OmFGXGZjnMgeFRMlrNsPQHO33yqMyNZ1vHYNWcBQ=', NULL, 5, 0, 0, 'user', '2025-11-17 20:22:09'),
(6, 'testgamer', 'Test Gamer', 'testgamer@example.com', '75K3eLr+dx6JJFuJ7LwIpEpOFmwGZZkRiB84PURz6U8=', NULL, 5, 0, 0, 'user', '2026-01-23 06:04:30'),
(7, 'cisco', 'cisco', 'cisco@gmail.com', 'sYvKoPjrgIO/RUL3Di0PHSISfUHW8hkEaExgEPefbGo=', NULL, 5, 0, 0, 'user', '2026-01-26 08:39:55'),
(8, 'Admin', 'Admin', 'admin@gmail.com', 'YP50QG5/NT7ZefNQ8vu2ouhpCl+n0bDDKYPR2LP5X2c=', NULL, 5, 0, 0, 'user', '2026-01-26 08:58:25'),
(9, 'TestV3', 'TestV3', 'testv3@gmail.com', 'UkIyOS2ah1vgKMuFsSR1nUbINWiRZppdmFdRgjqverY=', NULL, 5, 0, 1, 'admin', '2026-02-03 08:02:42'),
(10, 'TestV3_2', 'TestV3_2', 'testv3_2@gmail.com', 'qcNHY+XP67toVNggMfTI7431iECMd7PI/iRjYqFJ03s=', NULL, 5, 0, 0, 'user', '2026-02-03 08:09:59'),
(11, 'TestV3_3', 'TestV3_3', 'testv3_3@gmail.com', 'piXpFv/5VYFIngNUzrj/5ysyYWc3NtcYUixGXvTY0RM=', NULL, 5, 0, 0, 'user', '2026-02-03 08:48:38');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_badges`
--

CREATE TABLE `user_badges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `earned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_lessons`
--

CREATE TABLE `user_lessons` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `stars` int(11) DEFAULT 0,
  `xp_earned` int(11) DEFAULT 0,
  `best_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_lessons`
--

INSERT INTO `user_lessons` (`id`, `user_id`, `lesson_id`, `completed_at`, `stars`, `xp_earned`, `best_score`) VALUES
(1, 9, 1, '2026-02-03 08:32:17', 3, 30, 100),
(3, 10, 1, '2026-02-06 06:34:38', 2, 38, 92),
(4, 10, 2, '2026-02-06 06:35:55', 3, 40, 100);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_purchases`
--

CREATE TABLE `user_purchases` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `purchased_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_quests`
--

CREATE TABLE `user_quests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `progress` int(11) DEFAULT 0,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_xp`
--

CREATE TABLE `user_xp` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `xp_amount` int(11) DEFAULT 0,
  `source` enum('lesson','practice','legendary') DEFAULT 'lesson',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_xp`
--

INSERT INTO `user_xp` (`id`, `user_id`, `xp_amount`, `source`, `created_at`) VALUES
(1, 9, 30, 'lesson', '2026-02-03 08:32:17'),
(2, 9, 50, 'lesson', '2026-02-03 08:33:13'),
(3, 10, 38, 'lesson', '2026-02-06 06:34:38'),
(4, 10, 40, 'lesson', '2026-02-06 06:35:55');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `target_user_id` (`target_user_id`);

--
-- A tábla indexei `ai_messages`
--
ALTER TABLE `ai_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`);

--
-- A tábla indexei `ai_sessions`
--
ALTER TABLE `ai_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- A tábla indexei `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- A tábla indexei `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `banned_users`
--
ALTER TABLE `banned_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `issued_by` (`issued_by`);

--
-- A tábla indexei `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- A tábla indexei `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `source_language_id` (`source_language_id`),
  ADD KEY `target_language_id` (`target_language_id`);

--
-- A tábla indexei `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- A tábla indexei `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- A tábla indexei `leaderboards`
--
ALTER TABLE `leaderboards`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `leaderboard_entries`
--
ALTER TABLE `leaderboard_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaderboard_id` (`leaderboard_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `unit_id` (`unit_id`);

--
-- A tábla indexei `lesson_contents`
--
ALTER TABLE `lesson_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- A tábla indexei `media_files`
--
ALTER TABLE `media_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploader_id` (`uploader_id`);

--
-- A tábla indexei `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `practice_sessions`
--
ALTER TABLE `practice_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `quests`
--
ALTER TABLE `quests`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reporter_id` (`reporter_id`),
  ADD KEY `message_id` (`message_id`),
  ADD KEY `resolved_by` (`resolved_by`);

--
-- A tábla indexei `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `store_items`
--
ALTER TABLE `store_items`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `badge_id` (`badge_id`);

--
-- A tábla indexei `user_lessons`
--
ALTER TABLE `user_lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- A tábla indexei `user_purchases`
--
ALTER TABLE `user_purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- A tábla indexei `user_quests`
--
ALTER TABLE `user_quests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quest_id` (`quest_id`);

--
-- A tábla indexei `user_xp`
--
ALTER TABLE `user_xp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `ai_messages`
--
ALTER TABLE `ai_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `ai_sessions`
--
ALTER TABLE `ai_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `api_tokens`
--
ALTER TABLE `api_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `banned_users`
--
ALTER TABLE `banned_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `leaderboards`
--
ALTER TABLE `leaderboards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `leaderboard_entries`
--
ALTER TABLE `leaderboard_entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `lesson_contents`
--
ALTER TABLE `lesson_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `practice_sessions`
--
ALTER TABLE `practice_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `quests`
--
ALTER TABLE `quests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `store_items`
--
ALTER TABLE `store_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_lessons`
--
ALTER TABLE `user_lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `user_purchases`
--
ALTER TABLE `user_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_quests`
--
ALTER TABLE `user_quests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_xp`
--
ALTER TABLE `user_xp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `admin_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `admin_logs_ibfk_2` FOREIGN KEY (`target_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `ai_messages`
--
ALTER TABLE `ai_messages`
  ADD CONSTRAINT `ai_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `ai_sessions` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `ai_sessions`
--
ALTER TABLE `ai_sessions`
  ADD CONSTRAINT `ai_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ai_sessions_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `analytics`
--
ALTER TABLE `analytics`
  ADD CONSTRAINT `analytics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `analytics_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD CONSTRAINT `api_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `banned_users`
--
ALTER TABLE `banned_users`
  ADD CONSTRAINT `banned_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `banned_users_ibfk_2` FOREIGN KEY (`issued_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`source_language_id`) REFERENCES `languages` (`id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`target_language_id`) REFERENCES `languages` (`id`);

--
-- Megkötések a táblához `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `leaderboard_entries`
--
ALTER TABLE `leaderboard_entries`
  ADD CONSTRAINT `leaderboard_entries_ibfk_1` FOREIGN KEY (`leaderboard_id`) REFERENCES `leaderboards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leaderboard_entries_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `lesson_contents`
--
ALTER TABLE `lesson_contents`
  ADD CONSTRAINT `lesson_contents_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `media_files`
--
ALTER TABLE `media_files`
  ADD CONSTRAINT `media_files_ibfk_1` FOREIGN KEY (`uploader_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `practice_sessions`
--
ALTER TABLE `practice_sessions`
  ADD CONSTRAINT `practice_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `chat_messages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`resolved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_badges`
--
ALTER TABLE `user_badges`
  ADD CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_lessons`
--
ALTER TABLE `user_lessons`
  ADD CONSTRAINT `user_lessons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_lessons_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_purchases`
--
ALTER TABLE `user_purchases`
  ADD CONSTRAINT `user_purchases_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_purchases_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `store_items` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_quests`
--
ALTER TABLE `user_quests`
  ADD CONSTRAINT `user_quests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_quests_ibfk_2` FOREIGN KEY (`quest_id`) REFERENCES `quests` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_xp`
--
ALTER TABLE `user_xp`
  ADD CONSTRAINT `user_xp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
