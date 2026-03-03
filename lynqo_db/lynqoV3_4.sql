-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 03. 09:20
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
(14, 9, 'MSi84SSStrpFpyp521C3TpuNgUNqeYZz0NEP92E2r68D4fwiQ77BqF8YRLXsO673wTOsAvutJBtPQQTfjbIlmQ==', 'refresh_token', '2026-02-06 09:17:39', '2026-03-08 09:17:39'),
(15, 9, 'HcgiBoNHPAbaBI+V4hWmSgmmwus8crLH0OI8Qwb/iV4QudvEFd4W4UUL0R+yKnwRlWD6a+7gzZSXMv/v/vHTlQ==', 'refresh_token', '2026-02-09 05:25:29', '2026-03-11 05:25:29'),
(16, 9, '4VLAukRHddDzY5pM3iwjoJLqT3sBqHy/5rGBeJBATFlOAoq+bp33xbwMffhK18jwEXI7PR5W5N5KLFQyFq85zQ==', 'refresh_token', '2026-02-13 05:41:10', '2026-03-15 05:41:10'),
(17, 11, 'M2TvyX6qyQiy4RkXAZCLZuMG7ETGLknXue6ZV7KsMXs4DX3r/Fr/Uw0aIAYdOXpJ+c5VrTthhM3jggxT2V1+9w==', 'refresh_token', '2026-02-13 05:58:24', '2026-03-15 05:58:24'),
(18, 11, 'SCS/ss26DoffftTcM9Qa8SmFZW87YrrHCLWo51hKfwPnjmCYLVHEsNoSnetww1nk8FhnjQRv/ufHGu2697U9JQ==', 'refresh_token', '2026-02-13 06:20:43', '2026-03-15 06:20:43'),
(19, 11, 'EHHFkSHkCaUka4yySP0pJe+K21rlFeQCTDzuw07/4rtDJ0YHyoZOIJjRezt1guDKyp27QSlDs6HnWdF9w8o2sA==', 'refresh_token', '2026-02-16 07:14:15', '2026-03-18 07:14:15'),
(20, 13, 'MN+oRExwcDc4P7BVm0aa0Wnvdw8jnqZfpNfqvEjjHjP/Vk17DoFba8jMBoTW7Vi9lrWN0vok6Ww+e/2MvyAVMA==', 'refresh_token', '2026-02-16 07:47:31', '2026-03-18 07:47:31'),
(21, 11, 'ad7V1R90yBpklf/94e6FEeUs3k/UL6BsM6AKM9czBeZD3r5Hw72oXppVltFl/HNsZRJOtHV8BLu1BwcRH0R76w==', 'refresh_token', '2026-02-16 07:50:25', '2026-03-18 07:50:25'),
(22, 16, 'ISSmX6vsJnKOGg/T4d3TB2I15oiXXSuVwDksnNcBfnkByN7KR4rqwvfjRgjCtVE9x61O3Xlna7Lr7NSG/5h0dA==', 'refresh_token', '2026-02-16 07:55:59', '2026-03-18 07:55:59'),
(23, 17, 'Zv+TyV+qj1AI2JUUNERaedktc2XtxfetIpI3bqfX562TjA6nr0kG0x8x2+gAtC9DrC6HJn1BmdlEyRMy64fzFA==', 'refresh_token', '2026-02-16 08:00:56', '2026-03-18 08:00:56'),
(24, 18, 'ALKSVaXs33x3aIKuwHVCL7JCINugyyV1sVeN/N5VKJ69Mc5mN1mwL3o64u9cWLBF35HKLmWHV4MDyVvQ/DuEpA==', 'refresh_token', '2026-02-16 08:01:56', '2026-03-18 08:01:56'),
(25, 19, 'q4b4bALDY+Z4GZAupVq2hbzY6x+7NytsfT7jBpo9CC2wQJXBSqzNTMqs+YLFCljGMbzGJ1RGvShZR4aT596KHw==', 'refresh_token', '2026-02-16 08:05:00', '2026-03-18 08:05:00'),
(26, 20, 'NAg+5enHi1QcGw49MAIND6s7LmLj02Zec0ISRKh/ADPAC4kBjA7AAi6osxbn7vzuNzPa2IYHih7jJFJYkolJ2g==', 'refresh_token', '2026-02-16 08:08:46', '2026-03-18 08:08:46'),
(27, 11, '73vBA6mddH+uU3rUKpLBRxoyACR7M6aN7WvqhELEB8RNQQM1Sh9G2XInE9wFMWFPenLNmxx5UhybqXrNh3ivnA==', 'refresh_token', '2026-02-16 08:09:09', '2026-03-18 08:09:09'),
(28, 9, 'icmGScQAgCx9DpwP4Tf+D7QvLyTAifN+pfG66KCc5iIC5/7UuZVCBQXtRW0VfAnTZwXLi8RqI/ahJfvdVGMlHA==', 'refresh_token', '2026-02-16 08:10:40', '2026-03-18 08:10:40'),
(29, 9, 'Ye5C5U68gdMZwUVoXdaatyiKJ4z094rK4TIMoUWyF9kjrVDUOQ5zNEOdc7o76wnnnNITE1pUyNQX8sRcTVHhDw==', 'refresh_token', '2026-02-16 08:11:43', '2026-03-18 08:11:43'),
(30, 11, 'H3L3kL9XPmy1jG2vvS9ikHfqWH9poTTvuZDEq0JSrdiyDGL1C2JSGBbSqmxsZXfx8ICPGm2KfRkWixxXaWnOgA==', 'refresh_token', '2026-02-16 08:14:38', '2026-03-18 08:14:38'),
(31, 21, 'xBHgpIChVSujo63G3SDJjSdOEvYmIJDyxE+DXVIjjtOVcub5rvelzCxc0EQQsKdeUkFAw24d4PKY45HurEOykg==', 'refresh_token', '2026-02-16 08:15:23', '2026-03-18 08:15:23'),
(32, 21, 'gIVubZA8GWvXVnmgYWPcc/MGcz95bHUsQTLacWslYwc3JracCp5mMkXlu1Qkil3cl0iafAVc5rBS43Pj5DGMxg==', 'refresh_token', '2026-02-16 08:16:13', '2026-03-18 08:16:13'),
(33, 21, 'meVMag6el9S4ijf02TZptzyZMlOyp+vICdm0E1ql76NGg3bx1NtUHDXOlPa0Ds5axKkrBYStAPZOcd7CS3llaA==', 'refresh_token', '2026-02-16 08:16:39', '2026-03-18 08:16:39'),
(34, 22, 'K7n5lK38tCvcDUJ9qty5IjLxpStABhvuY8mX7s5KgTwIKy6uU9KchOVrO1gIj0RIFNSu/xD5tOdNnL8dt2Pthw==', 'refresh_token', '2026-02-16 08:17:02', '2026-03-18 08:17:02'),
(35, 22, 'cPgCp/bQ+GGTkdsxj0mo8qO85sIYIuW1lM6PNbCER+3ogaXGP/VvaXlhPVCuMmgm+o825DEM9gotIDU1nWjwhg==', 'refresh_token', '2026-02-16 08:17:13', '2026-03-18 08:17:13'),
(36, 22, '7U8fJ7CsXEYEwDyN7RmXJwYUNU7EqRz19Ln+Qzz77MRJI9HCIfKAH7BbeyMriC9v6a5zZqogdd+e0Li4F24xag==', 'refresh_token', '2026-02-16 08:19:03', '2026-03-18 08:19:03'),
(37, 22, 'vfXWWlsAPvY+vfyWDQ29xSIG/Jd9R3Um1a0v+irJvLZz6GSEIzQ6wcGdH+gGVh1cwXFQqWgaKk07D5pmYr+E4w==', 'refresh_token', '2026-02-16 08:22:57', '2026-03-18 08:22:57'),
(38, 22, '+oD3LXL+RRaBnqLsofUweDYHNYdrdg+jugszACEOIdw1c17F6AIs7iZdSYBIpbG6eW/6bBv4LwN/fC5+vVbKeA==', 'refresh_token', '2026-02-16 08:23:16', '2026-03-18 08:23:16'),
(39, 11, '3yn/hDUrj4mzzENWAY5RRcdFo5oIExBthbXJ/DDo7uRrq+CMUUY+CQPmfUmiw7cavzEeiwNjj60jeu+pYxn81w==', 'refresh_token', '2026-02-16 08:34:08', '2026-03-18 08:34:08'),
(40, 23, 'r2Cg/IpIalEIE8czgBvW5BF5jm9j1IEEPnBGC28iM6qGGsPKzH5H/cuRjAPxzZYQsFutjCGkrQaeWb0357S9ag==', 'refresh_token', '2026-02-16 08:40:43', '2026-03-18 08:40:43'),
(41, 11, 'Gj4k7i9Vn1yYhN8Ex0aeV9icv3b6sp2rJPwFWZAtLU4lYT5UmvDeX2zlDVwb9aWKjbPVTCaNMwoV9zpdwdQyZw==', 'refresh_token', '2026-02-20 05:27:33', '2026-03-22 05:27:33'),
(42, 9, 'xZmjMeU13DLY1t4mba32RK30jFe6imNJbfDAJOAT7dkjIh/+UxR83JAsO06TAHlZv2b8H1RrGSCT9J6gistxbA==', 'refresh_token', '2026-02-20 05:57:04', '2026-03-22 05:57:04'),
(43, 11, 'MNb6cxaI37AAeeNY8owQY6Kh5yaNh0VewTkFXWWicJ5C+aFecRIkh4tdm2wQeLF7eS2lS/aiyXWQ7v4homXzpA==', 'refresh_token', '2026-02-20 06:31:44', '2026-03-22 06:31:44'),
(44, 11, 'YhlsHf8MgtqmE2LSTtPpmvF3iPzt252UsEJQxZ2ESbr8i2LYg7+OiBgfd7CnnTNTeaRPF79VaheR2cb4nXZISA==', 'refresh_token', '2026-02-20 06:47:46', '2026-03-22 06:47:46'),
(45, 11, 'KssnQS1/UXAc9BtbTdjwYkRPARmb6jBJ8c1SxrgQ/hS6gTUwiJXZVhb8i1gSzj+GjyqZW37bc7AMcel9LsoX0Q==', 'refresh_token', '2026-02-20 07:01:55', '2026-03-22 07:01:55'),
(46, 9, 'FX+01Y2dAi/XzH9sflJN2vahO2jqlluEr0Sa7srBmAACUz3PhQGi/c4QxLz14AIzkGz5k8JEg9M/k+oh5xKoCQ==', 'refresh_token', '2026-02-20 07:08:32', '2026-03-22 07:08:32'),
(47, 11, 'bkO4nFrQVbhIdE1/2zmuK9xO9UIZdi8O2+UXN9uWaLn8LzXubXMdQKnqUBpRqLYeTV8Q+7Y9cDTyIV4z5watrw==', 'refresh_token', '2026-02-20 07:19:11', '2026-03-22 07:19:11'),
(48, 24, 'MgiHHcWprwurpuoPIt381EB8ChQRQKp+0E+ANy0KhSJxETgwPOeTHTS/F00xbNfkmCvEpZGMoiztVqS4MPM+Pw==', 'refresh_token', '2026-02-27 07:10:43', '2026-03-29 06:10:43'),
(49, 9, '9vlsDv7Dm7irxYSPC9m9qMyun4jmH8vgJXZau1Z50v9kQEZinwtevXZqEYWU8Bajc9q/qE0Lg96E4mw4CQ/rTw==', 'refresh_token', '2026-02-27 07:23:39', '2026-03-29 06:23:39');

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
(3, 4, 1, 'French to English', 'Learn English easily as a French speaker', 1),
(7, 1, 2, 'English to Hungarian', 'Basic greetings and numbers 1–5.', 1),
(8, 1, 6, 'English to Italian', 'Basic greetings and numbers 1–5.', 1),
(9, 1, 3, 'English to German', 'Basic greetings and numbers 1–5.', 1),
(10, 1, 9, 'English to Polish', 'Basic greetings and numbers 1–5.', 1),
(11, 1, 8, 'English to Dutch', 'Basic greetings and numbers 1–5.', 1),
(12, 1, 7, 'English to Portuguese', 'Basic greetings and numbers 1–5.', 1),
(13, 3, 1, 'German to English', 'Basic greetings and numbers 1–5.', 1),
(14, 3, 4, 'German to French', 'Basic greetings and numbers 1–5.', 1),
(15, 3, 6, 'German to Italian', 'Basic greetings and numbers 1–5.', 1),
(16, 3, 5, 'German to Spanish', 'Basic greetings and numbers 1–5.', 1),
(17, 4, 3, 'French to German', 'Basic greetings and numbers 1–5.', 1),
(18, 4, 8, 'French to Dutch', 'Basic greetings and numbers 1–5.', 1),
(19, 4, 9, 'French to Polish', 'Basic greetings and numbers 1–5.', 1),
(20, 4, 10, 'French to Romanian', 'Basic greetings and numbers 1–5.', 1),
(21, 4, 16, 'French to Arabic', 'Basic greetings and numbers 1–5.', 1),
(22, 4, 7, 'French to Portuguese', 'Basic greetings and numbers 1–5.', 1),
(23, 2, 3, 'Hungarian to German', 'Basic greetings and numbers 1–5.', 1),
(24, 2, 1, 'Hungarian to English', 'Basic greetings and numbers 1–5.', 1),
(25, 2, 4, 'Hungarian to French', 'Basic greetings and numbers 1–5.', 1),
(26, 2, 12, 'Hungarian to Slovakian', 'Basic greetings and numbers 1–5.', 1),
(27, 2, 10, 'Hungarian to Romanian', 'Basic greetings and numbers 1–5.', 1),
(28, 2, 6, 'Hungarian to Italian', 'Basic greetings and numbers 1–5.', 1),
(29, 2, 8, 'Hungarian to Dutch', 'Basic greetings and numbers 1–5.', 1),
(30, 2, 9, 'Hungarian to Polish', 'Basic greetings and numbers 1–5.', 1),
(31, 2, 13, 'Hungarian to Ukrainian', 'Basic greetings and numbers 1–5.', 1),
(32, 2, 15, 'Hungarian to Turkish', 'Basic greetings and numbers 1–5.', 1),
(33, 6, 1, 'Italian to English', 'Basic greetings and numbers 1–5.', 1),
(34, 6, 4, 'Italian to French', 'Basic greetings and numbers 1–5.', 1),
(35, 6, 3, 'Italian to German', 'Basic greetings and numbers 1–5.', 1),
(36, 6, 10, 'Italian to Romanian', 'Basic greetings and numbers 1–5.', 1),
(37, 6, 5, 'Italian to Spanish', 'Basic greetings and numbers 1–5.', 1),
(38, 10, 13, 'Romanian to Ukrainian', 'Basic greetings and numbers 1–5.', 1),
(39, 10, 1, 'Romanian to English', 'Basic greetings and numbers 1–5.', 1),
(40, 10, 3, 'Romanian to German', 'Basic greetings and numbers 1–5.', 1),
(41, 10, 6, 'Romanian to Italian', 'Basic greetings and numbers 1–5.', 1),
(42, 10, 4, 'Romanian to French', 'Basic greetings and numbers 1–5.', 1),
(43, 10, 5, 'Romanian to Spanish', 'Basic greetings and numbers 1–5.', 1),
(44, 15, 1, 'Turkish to English', 'Basic greetings and numbers 1–5.', 1),
(45, 15, 3, 'Turkish to German', 'Basic greetings and numbers 1–5.', 1),
(46, 15, 16, 'Turkish to Arabic', 'Basic greetings and numbers 1–5.', 1),
(47, 16, 1, 'Arabic to English', 'Basic greetings and numbers 1–5.', 1),
(48, 16, 15, 'Arabic to Turkish', 'Basic greetings and numbers 1–5.', 1),
(49, 12, 11, 'Slovakian to Czech', 'Basic greetings and numbers 1–5.', 1),
(50, 12, 1, 'Slovakian to English', 'Basic greetings and numbers 1–5.', 1),
(51, 12, 14, 'Slovakian to Russian', 'Basic greetings and numbers 1–5.', 1),
(52, 7, 1, 'Portuguese to English', 'Basic greetings and numbers 1–5.', 1),
(53, 7, 4, 'Portuguese to French', 'Basic greetings and numbers 1–5.', 1),
(54, 7, 5, 'Portuguese to Spanish', 'Basic greetings and numbers 1–5.', 1),
(55, 9, 11, 'Polish to Czech', 'Basic greetings and numbers 1–5.', 1),
(56, 9, 14, 'Polish to Russian', 'Basic greetings and numbers 1–5.', 1),
(57, 9, 12, 'Polish to Slovakian', 'Basic greetings and numbers 1–5.', 1),
(58, 9, 13, 'Polish to Ukrainian', 'Basic greetings and numbers 1–5.', 1),
(59, 9, 1, 'Polish to English', 'Basic greetings and numbers 1–5.', 1),
(60, 9, 3, 'Polish to German', 'Basic greetings and numbers 1–5.', 1),
(61, 18, 17, 'Japanese to Chinese', 'Basic greetings and numbers 1–5.', 1),
(62, 18, 19, 'Japanese to Korean', 'Basic greetings and numbers 1–5.', 1),
(63, 18, 1, 'Japanese to English', 'Basic greetings and numbers 1–5.', 1),
(64, 19, 18, 'Korean to Japanese', 'Basic greetings and numbers 1–5.', 1),
(65, 19, 1, 'Korean to English', 'Basic greetings and numbers 1–5.', 1),
(66, 19, 17, 'Korean to Chinese', 'Basic greetings and numbers 1–5.', 1),
(67, 17, 1, 'Chinese to English', 'Basic greetings and numbers 1–5.', 1),
(68, 17, 19, 'Chinese to Korean', 'Basic greetings and numbers 1–5.', 1),
(69, 17, 16, 'Chinese to Arabic', 'Basic greetings and numbers 1–5.', 1),
(70, 17, 14, 'Chinese to Russian', 'Basic greetings and numbers 1–5.', 1),
(71, 8, 1, 'Dutch to English', 'Basic greetings and numbers 1–5.', 1),
(72, 8, 3, 'Dutch to German', 'Basic greetings and numbers 1–5.', 1),
(73, 8, 4, 'Dutch to French', 'Basic greetings and numbers 1–5.', 1),
(74, 11, 12, 'Czech to Slovakian', 'Basic greetings and numbers 1–5.', 1),
(75, 11, 1, 'Czech to English', 'Basic greetings and numbers 1–5.', 1),
(76, 11, 3, 'Czech to German', 'Basic greetings and numbers 1–5.', 1),
(77, 11, 14, 'Czech to Russian', 'Basic greetings and numbers 1–5.', 1);

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
(3, 2, 6, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-06 10:17:06'),
(4, 2, 6, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-02-06 10:17:06'),
(5, 3, 7, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-06 10:17:06'),
(6, 3, 7, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-02-06 10:17:06'),
(7, 1, 1, 'Introduce yourself', 'mixed', 3, 30, NULL, '2026-02-27 08:30:33'),
(8, 1, 1, 'Use the present tense', 'mixed', 4, 30, NULL, '2026-02-27 08:30:33'),
(9, 1, 1, 'Talk about things you do', 'listening', 5, 30, NULL, '2026-02-27 08:30:33'),
(10, 47, 11, 'التحيات', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(11, 48, 12, 'التحيات', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(12, 74, 13, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(13, 75, 14, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(14, 76, 15, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(15, 77, 16, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(16, 13, 17, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(17, 14, 18, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(18, 15, 19, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(19, 16, 20, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(20, 7, 21, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(21, 8, 22, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(22, 9, 23, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(23, 10, 24, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(24, 11, 25, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(25, 12, 26, 'Greetings', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(26, 17, 27, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(27, 18, 28, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(28, 19, 29, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(29, 20, 30, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(30, 21, 31, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(31, 22, 32, 'Salutations', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(32, 23, 33, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(33, 24, 34, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(34, 25, 35, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(35, 26, 36, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(36, 27, 37, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(37, 28, 38, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(38, 29, 39, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(39, 30, 40, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(40, 31, 41, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(41, 32, 42, 'Köszönések', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(42, 33, 43, 'Saluti', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(43, 34, 44, 'Saluti', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(44, 35, 45, 'Saluti', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(45, 36, 46, 'Saluti', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(46, 37, 47, 'Saluti', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(47, 61, 48, 'あいさつ', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(48, 62, 49, 'あいさつ', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(49, 63, 50, 'あいさつ', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(50, 64, 51, '인사', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(51, 65, 52, '인사', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(52, 66, 53, '인사', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(53, 71, 54, 'Begroetingen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(54, 72, 55, 'Begroetingen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(55, 73, 56, 'Begroetingen', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(56, 55, 57, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(57, 56, 58, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(58, 57, 59, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(59, 58, 60, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(60, 59, 61, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(61, 60, 62, 'Powitania', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(62, 52, 63, 'Saudações', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(63, 53, 64, 'Saudações', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(64, 54, 65, 'Saudações', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(65, 38, 66, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(66, 39, 67, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(67, 40, 68, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(68, 41, 69, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(69, 42, 70, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(70, 43, 71, 'Salutări', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(71, 49, 72, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(72, 50, 73, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(73, 51, 74, 'Pozdravy', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(74, 44, 75, 'Selamlaşma', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(75, 45, 76, 'Selamlaşma', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(76, 46, 77, 'Selamlaşma', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(77, 67, 78, '问候', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(78, 68, 79, '问候', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(79, 69, 80, '问候', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(80, 70, 81, '问候', 'mixed', 1, 30, NULL, '2026-03-03 08:00:13'),
(137, 47, 11, 'الأعداد 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(138, 48, 12, 'الأعداد 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(139, 74, 13, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(140, 75, 14, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(141, 76, 15, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(142, 77, 16, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(143, 13, 17, 'Zahlen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(144, 14, 18, 'Zahlen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(145, 15, 19, 'Zahlen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(146, 16, 20, 'Zahlen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(147, 7, 21, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(148, 8, 22, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(149, 9, 23, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(150, 10, 24, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(151, 11, 25, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(152, 12, 26, 'Numbers 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(153, 17, 27, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(154, 18, 28, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(155, 19, 29, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(156, 20, 30, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(157, 21, 31, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(158, 22, 32, 'Nombres 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(159, 23, 33, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(160, 24, 34, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(161, 25, 35, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(162, 26, 36, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(163, 27, 37, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(164, 28, 38, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(165, 29, 39, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(166, 30, 40, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(167, 31, 41, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(168, 32, 42, 'Számok 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(169, 33, 43, 'Numeri 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(170, 34, 44, 'Numeri 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(171, 35, 45, 'Numeri 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(172, 36, 46, 'Numeri 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(173, 37, 47, 'Numeri 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(174, 61, 48, '数字1〜5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(175, 62, 49, '数字1〜5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(176, 63, 50, '数字1〜5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(177, 64, 51, '숫자 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(178, 65, 52, '숫자 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(179, 66, 53, '숫자 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(180, 71, 54, 'Getallen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(181, 72, 55, 'Getallen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(182, 73, 56, 'Getallen 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(183, 55, 57, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(184, 56, 58, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(185, 57, 59, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(186, 58, 60, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(187, 59, 61, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(188, 60, 62, 'Liczby 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(189, 52, 63, 'Números 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(190, 53, 64, 'Números 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(191, 54, 65, 'Números 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(192, 38, 66, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(193, 39, 67, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(194, 40, 68, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(195, 41, 69, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(196, 42, 70, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(197, 43, 71, 'Numerele 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(198, 49, 72, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(199, 50, 73, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(200, 51, 74, 'Čísla 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(201, 44, 75, 'Sayılar 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(202, 45, 76, 'Sayılar 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(203, 46, 77, 'Sayılar 1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(204, 67, 78, '数字1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(205, 68, 79, '数字1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(206, 69, 80, '数字1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13'),
(207, 70, 81, '数字1-5', 'mixed', 2, 30, NULL, '2026-03-03 08:00:13');

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
(1, 1, 'text', 'Hello', 'Bonjour', NULL, NULL),
(2, 1, 'text', 'Good evening', 'Bonsoir', NULL, NULL),
(3, 1, 'text', 'Hi / informal hello', 'Salut', NULL, NULL),
(4, 1, 'text', 'Goodbye', 'Au revoir', NULL, NULL),
(5, 1, 'text', 'Please', 'S’il vous plaît', NULL, NULL),
(6, 1, 'text', 'Thank you', 'Merci', NULL, NULL),
(7, 1, 'multiple_choice', 'Which means “Hello”?', 'Bonjour', '[\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" },\r\n  { \"text\": \"Bonsoir\", \"audioUrl\": \"/media/audio/french/bonsoir.mp3\" },\r\n  { \"text\": \"Salut\",   \"audioUrl\": \"/media/audio/french/salut.mp3\" },\r\n  { \"text\": \"Merci\",   \"audioUrl\": \"/media/audio/french/merci.mp3\" }\r\n]', NULL),
(8, 1, 'multiple_choice', 'Which means “Good evening”?', 'Bonsoir', '[\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" },\r\n  { \"text\": \"Bonsoir\", \"audioUrl\": \"/media/audio/french/bonsoir.mp3\" },\r\n  { \"text\": \"Salut\",   \"audioUrl\": \"/media/audio/french/salut.mp3\" },\r\n  { \"text\": \"Au revoir\",   \"audioUrl\": \"/media/audio/french/au_revoir.mp3\" }\r\n]', NULL),
(9, 1, 'multiple_choice', 'Which means “Thank you”?', 'Merci', '[\r\n  { \"text\": \"Merci\",   \"audioUrl\": \"/media/audio/french/merci.mp3\" },\r\n  { \"text\": \"S’il vous plaît\",   \"audioUrl\": \"/media/audio/french/s_il_vous_plait.mp3\" },\r\n  { \"text\": \"Au revoir\", \"audioUrl\": \"/media/audio/french/au_revoir.mp3\" },\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" }\r\n]', NULL),
(10, 1, 'fill_blank', 'Fill: Bonj___ (Hello)', 'our', NULL, NULL),
(11, 1, 'fill_blank', 'Fill: Bonso__ (Good evening)', 'ir', NULL, NULL),
(12, 1, 'fill_blank', 'Fill: Sa___ (Hi)', 'lut', NULL, NULL),
(13, 2, 'text', 'One', 'Un', NULL, 1),
(14, 2, 'text', 'Two', 'Deux', NULL, 2),
(15, 2, 'text', 'Three', 'Trois', NULL, 3),
(16, 2, 'text', 'Four', 'Quatre', NULL, 4),
(17, 2, 'text', 'Five', 'Cinq', NULL, 5),
(18, 2, 'multiple_choice', 'Which means “One”?', 'Un', '[\r\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.mp3\" },\r\n  { \"text\": \"Un\",  \"audioUrl\": \"/media/audio/french/un.mp3\" },\r\n  { \"text\": \"Trois\", \"audioUrl\": \"/media/audio/french/trois.mp3\" },\r\n  { \"text\": \"Cinq\",   \"audioUrl\": \"/media/audio/french/cinq.mp3\" }\r\n]', NULL),
(19, 2, 'multiple_choice', 'Which means “Two”?', 'Deux', '[\r\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.mp3\" },\r\n  { \"text\": \"Trois\",  \"audioUrl\": \"/media/audio/french/trois.mp3\" },\r\n  { \"text\": \"Quatre\", \"audioUrl\": \"/media/audio/french/quatre.mp3\" },\r\n  { \"text\": \"Cinq\",   \"audioUrl\": \"/media/audio/french/cinq.mp3\" }\r\n]', NULL),
(20, 2, 'multiple_choice', 'Which means “Three”?', 'Trois', '[\n  { \"text\": \"Trois\",  \"audioUrl\": \"/media/audio/french/trois.mp3\" },\n  { \"text\": \"Un\",   \"audioUrl\": \"/media/audio/french/un.mp3\" },\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.mp3\" },\n  { \"text\": \"Quatre\", \"audioUrl\": \"/media/audio/french/quatre.mp3\" }\n]', NULL),
(21, 2, 'multiple_choice', 'Which means “Four”?', 'Quatre', '[\n  { \"text\": \"Six\",  \"audioUrl\": \"/media/audio/french/six.mp3\" },\n  { \"text\": \"Quatre\", \"audioUrl\": \"/media/audio/french/quatre.mp3\" },\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.mp3\" },\n  { \"text\": \"Un\",   \"audioUrl\": \"/media/audio/french/un.mp3\" }\n]', NULL),
(22, 2, 'multiple_choice', 'Which means “Five”?', 'Cinq', '[\r\n  { \"text\": \"Quatre\", \"audioUrl\": \"/media/audio/french/quatre.mp3\" },\r\n  { \"text\": \"Six\",  \"audioUrl\": \"/media/audio/french/six.mp3\" },\r\n  { \"text\": \"Deux\",   \"audioUrl\": \"/media/audio/french/deux.mp3\" },\r\n  { \"text\": \"Cinq\",   \"audioUrl\": \"/media/audio/french/cinq.mp3\" }\r\n]', NULL),
(23, 2, 'fill_blank', 'Fill: Qua___ (Four)', 'tre', NULL, NULL),
(24, 2, 'fill_blank', 'Fill: Ci__ (Five)', 'nq', NULL, NULL),
(25, 3, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(26, 3, 'multiple_choice', 'Which means \"Goodbye\"?', 'Adiós', '[\"Hola\", \"Adiós\", \"Por favor\", \"Gracias\"]', NULL),
(27, 3, 'fill_blank', 'Fill: Gra____ (Thanks)', 'cias', NULL, NULL),
(28, 4, 'multiple_choice', 'Which means \"One\"?', 'Uno', '[\"Dos\", \"Uno\", \"Tres\", \"Cinco\"]', NULL),
(29, 4, 'text', 'Two -> Spanish?', 'Dos', NULL, NULL),
(30, 5, 'multiple_choice', 'Que signifie \"Hello\"?', 'Bonjour', '[\"Au revoir\", \"Bonjour\", \"Merci\", \"S\'il vous plaît\"]', NULL),
(31, 5, 'text', 'Merci -> Anglais?', 'Thank you', NULL, NULL),
(32, 6, 'fill_blank', 'Complétez : O__ (Un)', 'ne', NULL, NULL),
(33, 6, 'multiple_choice', 'Que signifie \"Three\"?', 'Trois', '[\"Un\", \"Deux\", \"Trois\", \"Quatre\"]', NULL),
(34, 7, 'text', 'I am happy', 'Je suis content', NULL, NULL),
(35, 7, 'text', 'My name is Carlos', 'Je m\'appelle Carlos', NULL, NULL),
(36, 7, 'text', 'Nice to meet you', 'Enchanté', NULL, NULL),
(37, 7, 'text', 'I am from Hungary', 'Je viens de Hongrois', NULL, NULL),
(38, 7, 'multiple_choice', 'Which means \"I am\"?', 'Je suis', '[{\"text\": \"Tu es\", \"audioUrl\": \"mediaaudiofrenchtues.mp3\"},\r\n    {\"text\": \"Je suis\", \"audioUrl\": \"mediaaudiofrenchjesuis.mp3\"},\r\n    {\"text\": \"Il est\", \"audioUrl\": \"mediaaudiofrenchilest.mp3\"},\r\n    {\"text\": \"Nous sommes\", \"audioUrl\": \"mediaaudiofrenchnoussommes.mp3\"}]', NULL),
(39, 7, 'multiple_choice', 'Which means \"My name is\"?', 'Je m\'appelle', '[{\"text\": \"Il s\'appelle\", \"audioUrl\": \"mediaaudiofrenchilsappelle.mp3\"},\r\n    {\"text\": \"Tu t\'appelles\", \"audioUrl\": \"mediaaudiofrenchtutappelles.mp3\"},\r\n    {\"text\": \"Je m\'appelle\", \"audioUrl\": \"mediaaudiofrenchjemappelle.mp3\"},\r\n    {\"text\": \"Nous nous appelons\", \"audioUrl\": \"mediaaudiofrenchnousnousappelons.mp3\"}]', NULL),
(40, 7, 'multiple_choice', 'What does \"Enchanté\" mean?', 'Nice to meet you', '[{\"text\": \"Goodbye\", \"audioUrl\": null},\r\n    {\"text\": \"Thank you\", \"audioUrl\": null},\r\n    {\"text\": \"Please\", \"audioUrl\": null},\r\n    {\"text\": \"Nice to meet you\", \"audioUrl\": \"mediaaudiofrenchenchante.mp3\"}]', NULL),
(41, 7, 'fill_blank', 'Fill: Je m\'___ Paul (My name is Paul)', 'appelle', NULL, NULL),
(42, 7, 'fill_blank', 'Fill: ___ suis de Paris (I am from Paris)', 'Je', NULL, NULL),
(43, 7, 'fill_blank', 'Fill: Enchan___ (Nice to meet you)', 'té', NULL, NULL),
(44, 7, 'multiple_choice', 'How do you say \"I am American\" (masculine)?', 'Je suis américain', '[{\"text\": \"Je suis américaine\", \"audioUrl\": \"mediaaudiofrenchjesuisamericaine.mp3\"},\r\n    {\"text\": \"Tu es américain\", \"audioUrl\": \"mediaaudiofrenchtuesamericain.mp3\"},\r\n    {\"text\": \"Je suis américain\", \"audioUrl\": \"mediaaudiofrenchjesuisamericain.mp3\"},\r\n    {\"text\": \"Il est américain\", \"audioUrl\": \"mediaaudiofrenchilestamericain.mp3\"}]', NULL),
(45, 7, 'text', 'And you?', 'Et toi?', NULL, NULL),
(46, 8, 'text', 'I speak', 'Je parle', NULL, NULL),
(47, 8, 'text', 'You speak', 'Tu parles', NULL, NULL),
(48, 8, 'text', 'He speaks', 'Il parle', NULL, NULL),
(49, 8, 'text', 'We speak', 'Nous parlons', NULL, NULL),
(50, 8, 'multiple_choice', 'Which means \"I eat\"?', 'Je mange', '[{\"text\": \"Tu manges\", \"audioUrl\": \"mediaaudiofrenchtumanges.mp3\"},\r\n    {\"text\": \"Je mange\", \"audioUrl\": \"mediaaudiofrenchjemange.mp3\"},\r\n    {\"text\": \"Il mange\", \"audioUrl\": \"mediaaudiofrenchilmange.mp3\"},\r\n    {\"text\": \"Nous mangeons\", \"audioUrl\": \"mediaaudiofrenchnousmangeons.mp3\"}]', NULL),
(51, 8, 'multiple_choice', 'Which means \"You eat\" (informal)?', 'Tu manges', '[{\"text\": \"Je mange\", \"audioUrl\": \"mediaaudiofrenchjemange.mp3\"},\r\n    {\"text\": \"Tu manges\", \"audioUrl\": \"mediaaudiofrenchtumanges.mp3\"},\r\n    {\"text\": \"Vous mangez\", \"audioUrl\": \"mediaaudiofrenchvousmangez.mp3\"},\r\n    {\"text\": \"Ils mangent\", \"audioUrl\": \"mediaaudiofrenchilsmangent.mp3\"}]', NULL),
(52, 8, 'multiple_choice', 'Translate: \"Il mange une pomme\"', 'He eats an apple', '[{\"text\": \"I eat an apple\", \"audioUrl\": null},\r\n    {\"text\": \"She eats an apple\", \"audioUrl\": null},\r\n    {\"text\": \"He eats an apple\", \"audioUrl\": \"mediaaudiofrenchilmangeunepomme.mp3\"},\r\n    {\"text\": \"We eat an apple\", \"audioUrl\": null}]', NULL),
(53, 8, 'fill_blank', 'Fill: Je parl___ français (I speak french)', 'e', NULL, NULL),
(54, 8, 'fill_blank', 'Fill: Tu parl___ anglais (You speak english)', 'es', NULL, NULL),
(55, 8, 'fill_blank', 'Fill: Nous parl___ espagnol (We speak spanish)', 'ons', NULL, NULL),
(56, 8, 'multiple_choice', 'Which means \"They speak\"?', 'Ils parlent', '[{\"text\": \"Il parle\", \"audioUrl\": \"mediaaudiofrenchilparle.mp3\"},\r\n    {\"text\": \"Ils parlent\", \"audioUrl\": \"mediaaudiofrenchilsparlent.mp3\"},\r\n    {\"text\": \"Vous parlez\", \"audioUrl\": \"mediaaudiofrenchvousparlez.mp3\"},\r\n    {\"text\": \"Elles parlent\", \"audioUrl\": \"mediaaudiofrenchellesparlent.mp3\"}]', NULL),
(57, 8, 'text', 'To be', 'Être', NULL, NULL),
(58, 9, 'listening', 'Listen to the audio and select the correct sentence.', 'Je travaille tous les jours', '[{\"text\": \"Je mange une pomme\", \"audioUrl\": null},\r\n    {\"text\": \"Je travaille tous les jours\", \"audioUrl\": null},\r\n    {\"text\": \"Tu parles français\", \"audioUrl\": null},\r\n    {\"text\": \"Il aime voyager\", \"audioUrl\": null}]', 30),
(59, 20, 'text', 'Hello', 'Szia', NULL, NULL),
(60, 20, 'text', 'Good morning', 'Jó reggelt', NULL, NULL),
(61, 20, 'text', 'Good evening', 'Jó estét', NULL, NULL),
(62, 20, 'text', 'Goodbye', 'Viszlát', NULL, NULL),
(63, 20, 'text', 'Please', 'Kérlek', NULL, NULL),
(64, 20, 'text', 'Thank you', 'Köszönöm', NULL, NULL),
(65, 20, 'multiple_choice', 'Which means \"Hello\"?', 'Szia', '[\"Szia\",\"Viszlát\",\"Kérlek\",\"Köszönöm\"]', NULL),
(66, 20, 'multiple_choice', 'Which means \"Good evening\"?', 'Jó estét', '[\"Jó estét\",\"Jó reggelt\",\"Viszlát\",\"Szia\"]', NULL),
(67, 20, 'multiple_choice', 'Which means \"Thank you\"?', 'Köszönöm', '[\"Kérlek\",\"Szia\",\"Köszönöm\",\"Viszlát\"]', NULL),
(68, 20, 'fill_blank', 'Fill: Sz__ (Hello)', 'ia', NULL, NULL),
(69, 20, 'fill_blank', 'Fill: Jó re______ (Good morning)', 'ggelt', NULL, NULL),
(70, 20, 'fill_blank', 'Fill: Közö___ (Thank you)', 'nöm', NULL, NULL),
(71, 147, 'text', 'One', 'Egy', NULL, NULL),
(72, 147, 'text', 'Two', 'Kettő', NULL, NULL),
(73, 147, 'text', 'Three', 'Három', NULL, NULL),
(74, 147, 'text', 'Four', 'Négy', NULL, NULL),
(75, 147, 'text', 'Five', 'Öt', NULL, NULL),
(76, 147, 'multiple_choice', 'Which means \"One\"?', 'Egy', '[\"Kettő\",\"Egy\",\"Három\",\"Öt\"]', NULL),
(77, 147, 'multiple_choice', 'Which means \"Two\"?', 'Kettő', '[\"Egy\",\"Három\",\"Kettő\",\"Négy\"]', NULL),
(78, 147, 'multiple_choice', 'Which means \"Three\"?', 'Három', '[\"Négy\",\"Három\",\"Öt\",\"Egy\"]', NULL),
(79, 147, 'multiple_choice', 'Which means \"Four\"?', 'Négy', '[\"Kettő\",\"Öt\",\"Négy\",\"Három\"]', NULL),
(80, 147, 'multiple_choice', 'Which means \"Five\"?', 'Öt', '[\"Három\",\"Négy\",\"Kettő\",\"Öt\"]', NULL),
(81, 147, 'fill_blank', 'Fill: Kett__ (Two)', 'ő', NULL, NULL),
(82, 147, 'fill_blank', 'Fill: Hár__ (Three)', 'om', NULL, NULL),
(83, 16, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(84, 33, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(85, 42, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(86, 66, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(87, 74, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(88, 10, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(89, 72, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(90, 62, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(91, 60, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(92, 49, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(93, 51, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(94, 77, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(95, 53, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(96, 13, 'text', 'Hello -> English?', 'Hello', NULL, NULL),
(97, 22, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(98, 26, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(99, 32, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(100, 44, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(101, 67, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(102, 75, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(103, 61, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(104, 54, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(105, 14, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(106, 17, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(107, 34, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(108, 43, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(109, 69, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(110, 63, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(111, 55, 'text', 'Hello -> French?', 'Bonjour', NULL, NULL),
(112, 19, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(113, 46, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(114, 70, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(115, 64, 'text', 'Hello -> Spanish?', 'Hola', NULL, NULL),
(116, 21, 'text', 'Hello -> Italian?', 'Ciao', NULL, NULL),
(117, 18, 'text', 'Hello -> Italian?', 'Ciao', NULL, NULL),
(118, 37, 'text', 'Hello -> Italian?', 'Ciao', NULL, NULL),
(119, 68, 'text', 'Hello -> Italian?', 'Ciao', NULL, NULL),
(120, 25, 'text', 'Hello -> Portuguese?', 'Olá', NULL, NULL),
(121, 31, 'text', 'Hello -> Portuguese?', 'Olá', NULL, NULL),
(122, 24, 'text', 'Hello -> Dutch?', 'Hallo', NULL, NULL),
(123, 27, 'text', 'Hello -> Dutch?', 'Hallo', NULL, NULL),
(124, 38, 'text', 'Hello -> Dutch?', 'Hallo', NULL, NULL),
(125, 23, 'text', 'Hello -> Polish?', 'Cześć', NULL, NULL),
(126, 28, 'text', 'Hello -> Polish?', 'Cześć', NULL, NULL),
(127, 39, 'text', 'Hello -> Polish?', 'Cześć', NULL, NULL),
(128, 29, 'text', 'Hello -> Romanian?', 'Bună', NULL, NULL),
(129, 36, 'text', 'Hello -> Romanian?', 'Bună', NULL, NULL),
(130, 45, 'text', 'Hello -> Romanian?', 'Bună', NULL, NULL),
(131, 71, 'text', 'Hello -> Czech?', 'Ahoj', NULL, NULL),
(132, 56, 'text', 'Hello -> Czech?', 'Ahoj', NULL, NULL),
(133, 35, 'text', 'Hello -> Slovak?', 'Ahoj', NULL, NULL),
(134, 58, 'text', 'Hello -> Slovak?', 'Ahoj', NULL, NULL),
(135, 12, 'text', 'Hello -> Slovak?', 'Ahoj', NULL, NULL),
(136, 40, 'text', 'Hello -> Ukrainian?', 'Привіт', NULL, NULL),
(137, 65, 'text', 'Hello -> Ukrainian?', 'Привіт', NULL, NULL),
(138, 59, 'text', 'Hello -> Ukrainian?', 'Привіт', NULL, NULL),
(139, 73, 'text', 'Hello -> Russian?', 'Привет', NULL, NULL),
(140, 57, 'text', 'Hello -> Russian?', 'Привет', NULL, NULL),
(141, 80, 'text', 'Hello -> Russian?', 'Привет', NULL, NULL),
(142, 15, 'text', 'Hello -> Russian?', 'Привет', NULL, NULL),
(143, 41, 'text', 'Hello -> Turkish?', 'Merhaba', NULL, NULL),
(144, 11, 'text', 'Hello -> Turkish?', 'Merhaba', NULL, NULL),
(145, 30, 'text', 'Hello -> Arabic?', 'مرحبا', NULL, NULL),
(146, 76, 'text', 'Hello -> Arabic?', 'مرحبا', NULL, NULL),
(147, 79, 'text', 'Hello -> Arabic?', 'مرحبا', NULL, NULL),
(148, 47, 'text', 'Hello -> Chinese?', '你好', NULL, NULL),
(149, 52, 'text', 'Hello -> Chinese?', '你好', NULL, NULL),
(150, 50, 'text', 'Hello -> Japanese?', 'こんにちは', NULL, NULL),
(151, 48, 'text', 'Hello -> Korean?', '안녕하세요', NULL, NULL),
(152, 78, 'text', 'Hello -> Korean?', '안녕하세요', NULL, NULL),
(210, 16, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(211, 33, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(212, 42, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(213, 66, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(214, 74, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(215, 10, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(216, 72, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(217, 62, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(218, 60, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(219, 49, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(220, 51, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(221, 77, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(222, 53, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(223, 13, 'text', 'Good morning -> English?', 'Good morning', NULL, NULL),
(224, 22, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(225, 26, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(226, 32, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(227, 44, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(228, 67, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(229, 75, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(230, 61, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(231, 54, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(232, 14, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(233, 17, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(234, 34, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(235, 43, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(236, 69, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(237, 63, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(238, 55, 'text', 'Good morning -> French?', 'Bonjour', NULL, NULL),
(239, 19, 'text', 'Good morning -> Spanish?', 'Buenos días', NULL, NULL),
(240, 46, 'text', 'Good morning -> Spanish?', 'Buenos días', NULL, NULL),
(241, 70, 'text', 'Good morning -> Spanish?', 'Buenos días', NULL, NULL),
(242, 64, 'text', 'Good morning -> Spanish?', 'Buenos días', NULL, NULL),
(243, 21, 'text', 'Good morning -> Italian?', 'Buongiorno', NULL, NULL),
(244, 18, 'text', 'Good morning -> Italian?', 'Buongiorno', NULL, NULL),
(245, 37, 'text', 'Good morning -> Italian?', 'Buongiorno', NULL, NULL),
(246, 68, 'text', 'Good morning -> Italian?', 'Buongiorno', NULL, NULL),
(247, 25, 'text', 'Good morning -> Portuguese?', 'Bom dia', NULL, NULL),
(248, 31, 'text', 'Good morning -> Portuguese?', 'Bom dia', NULL, NULL),
(249, 24, 'text', 'Good morning -> Dutch?', 'Goedemorgen', NULL, NULL),
(250, 27, 'text', 'Good morning -> Dutch?', 'Goedemorgen', NULL, NULL),
(251, 38, 'text', 'Good morning -> Dutch?', 'Goedemorgen', NULL, NULL),
(252, 23, 'text', 'Good morning -> Polish?', 'Dzień dobry', NULL, NULL),
(253, 28, 'text', 'Good morning -> Polish?', 'Dzień dobry', NULL, NULL),
(254, 39, 'text', 'Good morning -> Polish?', 'Dzień dobry', NULL, NULL),
(255, 29, 'text', 'Good morning -> Romanian?', 'Bună dimineața', NULL, NULL),
(256, 36, 'text', 'Good morning -> Romanian?', 'Bună dimineața', NULL, NULL),
(257, 45, 'text', 'Good morning -> Romanian?', 'Bună dimineața', NULL, NULL),
(258, 71, 'text', 'Good morning -> Czech?', 'Dobré ráno', NULL, NULL),
(259, 56, 'text', 'Good morning -> Czech?', 'Dobré ráno', NULL, NULL),
(260, 35, 'text', 'Good morning -> Slovak?', 'Dobré ráno', NULL, NULL),
(261, 58, 'text', 'Good morning -> Slovak?', 'Dobré ráno', NULL, NULL),
(262, 12, 'text', 'Good morning -> Slovak?', 'Dobré ráno', NULL, NULL),
(263, 40, 'text', 'Good morning -> Ukrainian?', 'Доброго ранку', NULL, NULL),
(264, 65, 'text', 'Good morning -> Ukrainian?', 'Доброго ранку', NULL, NULL),
(265, 59, 'text', 'Good morning -> Ukrainian?', 'Доброго ранку', NULL, NULL),
(266, 73, 'text', 'Good morning -> Russian?', 'Доброе утро', NULL, NULL),
(267, 57, 'text', 'Good morning -> Russian?', 'Доброе утро', NULL, NULL),
(268, 80, 'text', 'Good morning -> Russian?', 'Доброе утро', NULL, NULL),
(269, 15, 'text', 'Good morning -> Russian?', 'Доброе утро', NULL, NULL),
(270, 41, 'text', 'Good morning -> Turkish?', 'Günaydın', NULL, NULL),
(271, 11, 'text', 'Good morning -> Turkish?', 'Günaydın', NULL, NULL),
(272, 30, 'text', 'Good morning -> Arabic?', 'صباح الخير', NULL, NULL),
(273, 76, 'text', 'Good morning -> Arabic?', 'صباح الخير', NULL, NULL),
(274, 79, 'text', 'Good morning -> Arabic?', 'صباح الخير', NULL, NULL),
(275, 47, 'text', 'Good morning -> Chinese?', '早上好', NULL, NULL),
(276, 52, 'text', 'Good morning -> Chinese?', '早上好', NULL, NULL),
(277, 50, 'text', 'Good morning -> Japanese?', 'おはようございます', NULL, NULL),
(278, 48, 'text', 'Good morning -> Korean?', '좋은 아침', NULL, NULL),
(279, 78, 'text', 'Good morning -> Korean?', '좋은 아침', NULL, NULL),
(337, 16, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(338, 33, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(339, 42, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(340, 66, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(341, 74, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(342, 10, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(343, 72, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(344, 62, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(345, 60, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(346, 49, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(347, 51, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(348, 77, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(349, 53, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(350, 13, 'text', 'Good evening -> English?', 'Good evening', NULL, NULL),
(351, 22, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(352, 26, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(353, 32, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(354, 44, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(355, 67, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(356, 75, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(357, 61, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(358, 54, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(359, 14, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(360, 17, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(361, 34, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(362, 43, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(363, 69, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(364, 63, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(365, 55, 'text', 'Good evening -> French?', 'Bonsoir', NULL, NULL),
(366, 19, 'text', 'Good evening -> Spanish?', 'Buenas noches', NULL, NULL),
(367, 46, 'text', 'Good evening -> Spanish?', 'Buenas noches', NULL, NULL),
(368, 70, 'text', 'Good evening -> Spanish?', 'Buenas noches', NULL, NULL),
(369, 64, 'text', 'Good evening -> Spanish?', 'Buenas noches', NULL, NULL),
(370, 21, 'text', 'Good evening -> Italian?', 'Buonasera', NULL, NULL),
(371, 18, 'text', 'Good evening -> Italian?', 'Buonasera', NULL, NULL),
(372, 37, 'text', 'Good evening -> Italian?', 'Buonasera', NULL, NULL),
(373, 68, 'text', 'Good evening -> Italian?', 'Buonasera', NULL, NULL),
(374, 25, 'text', 'Good evening -> Portuguese?', 'Boa noite', NULL, NULL),
(375, 31, 'text', 'Good evening -> Portuguese?', 'Boa noite', NULL, NULL),
(376, 24, 'text', 'Good evening -> Dutch?', 'Goedenavond', NULL, NULL),
(377, 27, 'text', 'Good evening -> Dutch?', 'Goedenavond', NULL, NULL),
(378, 38, 'text', 'Good evening -> Dutch?', 'Goedenavond', NULL, NULL),
(379, 23, 'text', 'Good evening -> Polish?', 'Dobry wieczór', NULL, NULL),
(380, 28, 'text', 'Good evening -> Polish?', 'Dobry wieczór', NULL, NULL),
(381, 39, 'text', 'Good evening -> Polish?', 'Dobry wieczór', NULL, NULL),
(382, 29, 'text', 'Good evening -> Romanian?', 'Bună seara', NULL, NULL),
(383, 36, 'text', 'Good evening -> Romanian?', 'Bună seara', NULL, NULL),
(384, 45, 'text', 'Good evening -> Romanian?', 'Bună seara', NULL, NULL),
(385, 71, 'text', 'Good evening -> Czech?', 'Dobrý večer', NULL, NULL),
(386, 56, 'text', 'Good evening -> Czech?', 'Dobrý večer', NULL, NULL),
(387, 35, 'text', 'Good evening -> Slovak?', 'Dobrý večer', NULL, NULL),
(388, 58, 'text', 'Good evening -> Slovak?', 'Dobrý večer', NULL, NULL),
(389, 12, 'text', 'Good evening -> Slovak?', 'Dobrý večer', NULL, NULL),
(390, 40, 'text', 'Good evening -> Ukrainian?', 'Добрий вечір', NULL, NULL),
(391, 65, 'text', 'Good evening -> Ukrainian?', 'Добрий вечір', NULL, NULL),
(392, 59, 'text', 'Good evening -> Ukrainian?', 'Добрий вечір', NULL, NULL),
(393, 73, 'text', 'Good evening -> Russian?', 'Добрый вечер', NULL, NULL),
(394, 57, 'text', 'Good evening -> Russian?', 'Добрый вечер', NULL, NULL),
(395, 80, 'text', 'Good evening -> Russian?', 'Добрый вечер', NULL, NULL),
(396, 15, 'text', 'Good evening -> Russian?', 'Добрый вечер', NULL, NULL),
(397, 41, 'text', 'Good evening -> Turkish?', 'İyi akşamlar', NULL, NULL),
(398, 11, 'text', 'Good evening -> Turkish?', 'İyi akşamlar', NULL, NULL),
(399, 30, 'text', 'Good evening -> Arabic?', 'مساء الخير', NULL, NULL),
(400, 76, 'text', 'Good evening -> Arabic?', 'مساء الخير', NULL, NULL),
(401, 79, 'text', 'Good evening -> Arabic?', 'مساء الخير', NULL, NULL),
(402, 47, 'text', 'Good evening -> Chinese?', '晚上好', NULL, NULL),
(403, 52, 'text', 'Good evening -> Chinese?', '晚上好', NULL, NULL),
(404, 50, 'text', 'Good evening -> Japanese?', 'こんばんは', NULL, NULL),
(405, 48, 'text', 'Good evening -> Korean?', '좋은 저녁', NULL, NULL),
(406, 78, 'text', 'Good evening -> Korean?', '좋은 저녁', NULL, NULL),
(464, 16, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(465, 33, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(466, 42, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(467, 66, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(468, 74, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(469, 10, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(470, 72, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(471, 62, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(472, 60, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(473, 49, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(474, 51, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(475, 77, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(476, 53, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(477, 13, 'text', 'Goodbye -> English?', 'Goodbye', NULL, NULL),
(478, 22, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(479, 26, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(480, 32, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(481, 44, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(482, 67, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(483, 75, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(484, 61, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(485, 54, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(486, 14, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(487, 17, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(488, 34, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(489, 43, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(490, 69, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(491, 63, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(492, 55, 'text', 'Goodbye -> French?', 'Au revoir', NULL, NULL),
(493, 19, 'text', 'Goodbye -> Spanish?', 'Adiós', NULL, NULL),
(494, 46, 'text', 'Goodbye -> Spanish?', 'Adiós', NULL, NULL),
(495, 70, 'text', 'Goodbye -> Spanish?', 'Adiós', NULL, NULL),
(496, 64, 'text', 'Goodbye -> Spanish?', 'Adiós', NULL, NULL),
(497, 21, 'text', 'Goodbye -> Italian?', 'Arrivederci', NULL, NULL),
(498, 18, 'text', 'Goodbye -> Italian?', 'Arrivederci', NULL, NULL),
(499, 37, 'text', 'Goodbye -> Italian?', 'Arrivederci', NULL, NULL),
(500, 68, 'text', 'Goodbye -> Italian?', 'Arrivederci', NULL, NULL),
(501, 25, 'text', 'Goodbye -> Portuguese?', 'Tchau', NULL, NULL),
(502, 31, 'text', 'Goodbye -> Portuguese?', 'Tchau', NULL, NULL),
(503, 24, 'text', 'Goodbye -> Dutch?', 'Tot ziens', NULL, NULL),
(504, 27, 'text', 'Goodbye -> Dutch?', 'Tot ziens', NULL, NULL),
(505, 38, 'text', 'Goodbye -> Dutch?', 'Tot ziens', NULL, NULL),
(506, 23, 'text', 'Goodbye -> Polish?', 'Do widzenia', NULL, NULL),
(507, 28, 'text', 'Goodbye -> Polish?', 'Do widzenia', NULL, NULL),
(508, 39, 'text', 'Goodbye -> Polish?', 'Do widzenia', NULL, NULL),
(509, 29, 'text', 'Goodbye -> Romanian?', 'La revedere', NULL, NULL),
(510, 36, 'text', 'Goodbye -> Romanian?', 'La revedere', NULL, NULL),
(511, 45, 'text', 'Goodbye -> Romanian?', 'La revedere', NULL, NULL),
(512, 71, 'text', 'Goodbye -> Czech?', 'Na shledanou', NULL, NULL),
(513, 56, 'text', 'Goodbye -> Czech?', 'Na shledanou', NULL, NULL),
(514, 35, 'text', 'Goodbye -> Slovak?', 'Dovidenia', NULL, NULL),
(515, 58, 'text', 'Goodbye -> Slovak?', 'Dovidenia', NULL, NULL),
(516, 12, 'text', 'Goodbye -> Slovak?', 'Dovidenia', NULL, NULL),
(517, 40, 'text', 'Goodbye -> Ukrainian?', 'До побачення', NULL, NULL),
(518, 65, 'text', 'Goodbye -> Ukrainian?', 'До побачення', NULL, NULL),
(519, 59, 'text', 'Goodbye -> Ukrainian?', 'До побачення', NULL, NULL),
(520, 73, 'text', 'Goodbye -> Russian?', 'До свидания', NULL, NULL),
(521, 57, 'text', 'Goodbye -> Russian?', 'До свидания', NULL, NULL),
(522, 80, 'text', 'Goodbye -> Russian?', 'До свидания', NULL, NULL),
(523, 15, 'text', 'Goodbye -> Russian?', 'До свидания', NULL, NULL),
(524, 41, 'text', 'Goodbye -> Turkish?', 'Hoşça kal', NULL, NULL),
(525, 11, 'text', 'Goodbye -> Turkish?', 'Hoşça kal', NULL, NULL),
(526, 30, 'text', 'Goodbye -> Arabic?', 'مع السلامة', NULL, NULL),
(527, 76, 'text', 'Goodbye -> Arabic?', 'مع السلامة', NULL, NULL),
(528, 79, 'text', 'Goodbye -> Arabic?', 'مع السلامة', NULL, NULL),
(529, 47, 'text', 'Goodbye -> Chinese?', '再见', NULL, NULL),
(530, 52, 'text', 'Goodbye -> Chinese?', '再见', NULL, NULL),
(531, 50, 'text', 'Goodbye -> Japanese?', 'さようなら', NULL, NULL),
(532, 48, 'text', 'Goodbye -> Korean?', '안녕히 가세요', NULL, NULL),
(533, 78, 'text', 'Goodbye -> Korean?', '안녕히 가세요', NULL, NULL),
(591, 16, 'text', 'Please -> English?', 'Please', NULL, NULL),
(592, 33, 'text', 'Please -> English?', 'Please', NULL, NULL),
(593, 42, 'text', 'Please -> English?', 'Please', NULL, NULL),
(594, 66, 'text', 'Please -> English?', 'Please', NULL, NULL),
(595, 74, 'text', 'Please -> English?', 'Please', NULL, NULL),
(596, 10, 'text', 'Please -> English?', 'Please', NULL, NULL),
(597, 72, 'text', 'Please -> English?', 'Please', NULL, NULL),
(598, 62, 'text', 'Please -> English?', 'Please', NULL, NULL),
(599, 60, 'text', 'Please -> English?', 'Please', NULL, NULL),
(600, 49, 'text', 'Please -> English?', 'Please', NULL, NULL),
(601, 51, 'text', 'Please -> English?', 'Please', NULL, NULL),
(602, 77, 'text', 'Please -> English?', 'Please', NULL, NULL),
(603, 53, 'text', 'Please -> English?', 'Please', NULL, NULL),
(604, 13, 'text', 'Please -> English?', 'Please', NULL, NULL),
(605, 22, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(606, 26, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(607, 32, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(608, 44, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(609, 67, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(610, 75, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(611, 61, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(612, 54, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(613, 14, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(614, 17, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(615, 34, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(616, 43, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(617, 69, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(618, 63, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(619, 55, 'text', 'Please -> French?', 'S’il vous plaît', NULL, NULL),
(620, 19, 'text', 'Please -> Spanish?', 'Por favor', NULL, NULL),
(621, 46, 'text', 'Please -> Spanish?', 'Por favor', NULL, NULL),
(622, 70, 'text', 'Please -> Spanish?', 'Por favor', NULL, NULL),
(623, 64, 'text', 'Please -> Spanish?', 'Por favor', NULL, NULL),
(624, 21, 'text', 'Please -> Italian?', 'Per favore', NULL, NULL),
(625, 18, 'text', 'Please -> Italian?', 'Per favore', NULL, NULL),
(626, 37, 'text', 'Please -> Italian?', 'Per favore', NULL, NULL),
(627, 68, 'text', 'Please -> Italian?', 'Per favore', NULL, NULL),
(628, 25, 'text', 'Please -> Portuguese?', 'Por favor', NULL, NULL),
(629, 31, 'text', 'Please -> Portuguese?', 'Por favor', NULL, NULL),
(630, 24, 'text', 'Please -> Dutch?', 'Alsjeblieft', NULL, NULL),
(631, 27, 'text', 'Please -> Dutch?', 'Alsjeblieft', NULL, NULL),
(632, 38, 'text', 'Please -> Dutch?', 'Alsjeblieft', NULL, NULL),
(633, 23, 'text', 'Please -> Polish?', 'Proszę', NULL, NULL),
(634, 28, 'text', 'Please -> Polish?', 'Proszę', NULL, NULL),
(635, 39, 'text', 'Please -> Polish?', 'Proszę', NULL, NULL),
(636, 29, 'text', 'Please -> Romanian?', 'Te rog', NULL, NULL),
(637, 36, 'text', 'Please -> Romanian?', 'Te rog', NULL, NULL),
(638, 45, 'text', 'Please -> Romanian?', 'Te rog', NULL, NULL),
(639, 71, 'text', 'Please -> Czech?', 'Prosím', NULL, NULL),
(640, 56, 'text', 'Please -> Czech?', 'Prosím', NULL, NULL),
(641, 35, 'text', 'Please -> Slovak?', 'Prosím', NULL, NULL),
(642, 58, 'text', 'Please -> Slovak?', 'Prosím', NULL, NULL),
(643, 12, 'text', 'Please -> Slovak?', 'Prosím', NULL, NULL),
(644, 40, 'text', 'Please -> Ukrainian?', 'Будь ласка', NULL, NULL),
(645, 65, 'text', 'Please -> Ukrainian?', 'Будь ласка', NULL, NULL),
(646, 59, 'text', 'Please -> Ukrainian?', 'Будь ласка', NULL, NULL),
(647, 73, 'text', 'Please -> Russian?', 'Пожалуйста', NULL, NULL),
(648, 57, 'text', 'Please -> Russian?', 'Пожалуйста', NULL, NULL),
(649, 80, 'text', 'Please -> Russian?', 'Пожалуйста', NULL, NULL),
(650, 15, 'text', 'Please -> Russian?', 'Пожалуйста', NULL, NULL),
(651, 41, 'text', 'Please -> Turkish?', 'Lütfen', NULL, NULL),
(652, 11, 'text', 'Please -> Turkish?', 'Lütfen', NULL, NULL),
(653, 30, 'text', 'Please -> Arabic?', 'من فضلك', NULL, NULL),
(654, 76, 'text', 'Please -> Arabic?', 'من فضلك', NULL, NULL),
(655, 79, 'text', 'Please -> Arabic?', 'من فضلك', NULL, NULL),
(656, 47, 'text', 'Please -> Chinese?', '请', NULL, NULL),
(657, 52, 'text', 'Please -> Chinese?', '请', NULL, NULL),
(658, 50, 'text', 'Please -> Japanese?', 'お願いします', NULL, NULL),
(659, 48, 'text', 'Please -> Korean?', '제발', NULL, NULL),
(660, 78, 'text', 'Please -> Korean?', '제발', NULL, NULL),
(718, 16, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(719, 33, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(720, 42, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(721, 66, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(722, 74, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(723, 10, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(724, 72, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(725, 62, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(726, 60, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(727, 49, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(728, 51, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(729, 77, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(730, 53, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(731, 13, 'text', 'Thank you -> English?', 'Thank you', NULL, NULL),
(732, 22, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(733, 26, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(734, 32, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(735, 44, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(736, 67, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(737, 75, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(738, 61, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(739, 54, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(740, 14, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(741, 17, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(742, 34, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(743, 43, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(744, 69, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(745, 63, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(746, 55, 'text', 'Thank you -> French?', 'Merci', NULL, NULL),
(747, 19, 'text', 'Thank you -> Spanish?', 'Gracias', NULL, NULL),
(748, 46, 'text', 'Thank you -> Spanish?', 'Gracias', NULL, NULL),
(749, 70, 'text', 'Thank you -> Spanish?', 'Gracias', NULL, NULL),
(750, 64, 'text', 'Thank you -> Spanish?', 'Gracias', NULL, NULL),
(751, 21, 'text', 'Thank you -> Italian?', 'Grazie', NULL, NULL),
(752, 18, 'text', 'Thank you -> Italian?', 'Grazie', NULL, NULL),
(753, 37, 'text', 'Thank you -> Italian?', 'Grazie', NULL, NULL),
(754, 68, 'text', 'Thank you -> Italian?', 'Grazie', NULL, NULL),
(755, 25, 'text', 'Thank you -> Portuguese?', 'Obrigado', NULL, NULL),
(756, 31, 'text', 'Thank you -> Portuguese?', 'Obrigado', NULL, NULL),
(757, 24, 'text', 'Thank you -> Dutch?', 'Dank je', NULL, NULL),
(758, 27, 'text', 'Thank you -> Dutch?', 'Dank je', NULL, NULL),
(759, 38, 'text', 'Thank you -> Dutch?', 'Dank je', NULL, NULL),
(760, 23, 'text', 'Thank you -> Polish?', 'Dziękuję', NULL, NULL),
(761, 28, 'text', 'Thank you -> Polish?', 'Dziękuję', NULL, NULL),
(762, 39, 'text', 'Thank you -> Polish?', 'Dziękuję', NULL, NULL),
(763, 29, 'text', 'Thank you -> Romanian?', 'Mulțumesc', NULL, NULL),
(764, 36, 'text', 'Thank you -> Romanian?', 'Mulțumesc', NULL, NULL),
(765, 45, 'text', 'Thank you -> Romanian?', 'Mulțumesc', NULL, NULL),
(766, 71, 'text', 'Thank you -> Czech?', 'Děkuji', NULL, NULL),
(767, 56, 'text', 'Thank you -> Czech?', 'Děkuji', NULL, NULL),
(768, 35, 'text', 'Thank you -> Slovak?', 'Ďakujem', NULL, NULL),
(769, 58, 'text', 'Thank you -> Slovak?', 'Ďakujem', NULL, NULL),
(770, 12, 'text', 'Thank you -> Slovak?', 'Ďakujem', NULL, NULL),
(771, 40, 'text', 'Thank you -> Ukrainian?', 'Дякую', NULL, NULL),
(772, 65, 'text', 'Thank you -> Ukrainian?', 'Дякую', NULL, NULL),
(773, 59, 'text', 'Thank you -> Ukrainian?', 'Дякую', NULL, NULL),
(774, 73, 'text', 'Thank you -> Russian?', 'Спасибо', NULL, NULL),
(775, 57, 'text', 'Thank you -> Russian?', 'Спасибо', NULL, NULL),
(776, 80, 'text', 'Thank you -> Russian?', 'Спасибо', NULL, NULL),
(777, 15, 'text', 'Thank you -> Russian?', 'Спасибо', NULL, NULL),
(778, 41, 'text', 'Thank you -> Turkish?', 'Teşekkür ederim', NULL, NULL),
(779, 11, 'text', 'Thank you -> Turkish?', 'Teşekkür ederim', NULL, NULL),
(780, 30, 'text', 'Thank you -> Arabic?', 'شكرا', NULL, NULL),
(781, 76, 'text', 'Thank you -> Arabic?', 'شكرا', NULL, NULL),
(782, 79, 'text', 'Thank you -> Arabic?', 'شكرا', NULL, NULL),
(783, 47, 'text', 'Thank you -> Chinese?', '谢谢', NULL, NULL),
(784, 52, 'text', 'Thank you -> Chinese?', '谢谢', NULL, NULL),
(785, 50, 'text', 'Thank you -> Japanese?', 'ありがとうございます', NULL, NULL),
(786, 48, 'text', 'Thank you -> Korean?', '감사합니다', NULL, NULL),
(787, 78, 'text', 'Thank you -> Korean?', '감사합니다', NULL, NULL),
(845, 16, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(846, 33, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(847, 42, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(848, 66, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(849, 74, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(850, 10, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(851, 72, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(852, 62, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(853, 60, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(854, 49, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(855, 51, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(856, 77, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(857, 53, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(858, 13, 'text', 'Yes -> English?', 'Yes', NULL, NULL),
(859, 22, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(860, 26, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(861, 32, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(862, 44, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(863, 67, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(864, 75, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(865, 61, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(866, 54, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(867, 14, 'text', 'Yes -> German?', 'Ja', NULL, NULL),
(868, 17, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(869, 34, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(870, 43, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(871, 69, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(872, 63, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(873, 55, 'text', 'Yes -> French?', 'Oui', NULL, NULL),
(874, 19, 'text', 'Yes -> Spanish?', 'Sí', NULL, NULL),
(875, 46, 'text', 'Yes -> Spanish?', 'Sí', NULL, NULL),
(876, 70, 'text', 'Yes -> Spanish?', 'Sí', NULL, NULL),
(877, 64, 'text', 'Yes -> Spanish?', 'Sí', NULL, NULL),
(878, 21, 'text', 'Yes -> Italian?', 'Sì', NULL, NULL),
(879, 18, 'text', 'Yes -> Italian?', 'Sì', NULL, NULL),
(880, 37, 'text', 'Yes -> Italian?', 'Sì', NULL, NULL),
(881, 68, 'text', 'Yes -> Italian?', 'Sì', NULL, NULL),
(882, 25, 'text', 'Yes -> Portuguese?', 'Sim', NULL, NULL),
(883, 31, 'text', 'Yes -> Portuguese?', 'Sim', NULL, NULL),
(884, 24, 'text', 'Yes -> Dutch?', 'Ja', NULL, NULL),
(885, 27, 'text', 'Yes -> Dutch?', 'Ja', NULL, NULL),
(886, 38, 'text', 'Yes -> Dutch?', 'Ja', NULL, NULL),
(887, 23, 'text', 'Yes -> Polish?', 'Tak', NULL, NULL),
(888, 28, 'text', 'Yes -> Polish?', 'Tak', NULL, NULL),
(889, 39, 'text', 'Yes -> Polish?', 'Tak', NULL, NULL),
(890, 29, 'text', 'Yes -> Romanian?', 'Da', NULL, NULL),
(891, 36, 'text', 'Yes -> Romanian?', 'Da', NULL, NULL),
(892, 45, 'text', 'Yes -> Romanian?', 'Da', NULL, NULL),
(893, 71, 'text', 'Yes -> Czech?', 'Ano', NULL, NULL),
(894, 56, 'text', 'Yes -> Czech?', 'Ano', NULL, NULL),
(895, 35, 'text', 'Yes -> Slovak?', 'Áno', NULL, NULL),
(896, 58, 'text', 'Yes -> Slovak?', 'Áno', NULL, NULL),
(897, 12, 'text', 'Yes -> Slovak?', 'Áno', NULL, NULL),
(898, 40, 'text', 'Yes -> Ukrainian?', 'Так', NULL, NULL),
(899, 65, 'text', 'Yes -> Ukrainian?', 'Так', NULL, NULL),
(900, 59, 'text', 'Yes -> Ukrainian?', 'Так', NULL, NULL),
(901, 73, 'text', 'Yes -> Russian?', 'Да', NULL, NULL),
(902, 57, 'text', 'Yes -> Russian?', 'Да', NULL, NULL),
(903, 80, 'text', 'Yes -> Russian?', 'Да', NULL, NULL),
(904, 15, 'text', 'Yes -> Russian?', 'Да', NULL, NULL),
(905, 41, 'text', 'Yes -> Turkish?', 'Evet', NULL, NULL),
(906, 11, 'text', 'Yes -> Turkish?', 'Evet', NULL, NULL),
(907, 30, 'text', 'Yes -> Arabic?', 'نعم', NULL, NULL),
(908, 76, 'text', 'Yes -> Arabic?', 'نعم', NULL, NULL),
(909, 79, 'text', 'Yes -> Arabic?', 'نعم', NULL, NULL),
(910, 47, 'text', 'Yes -> Chinese?', '是', NULL, NULL),
(911, 52, 'text', 'Yes -> Chinese?', '是', NULL, NULL),
(912, 50, 'text', 'Yes -> Japanese?', 'はい', NULL, NULL),
(913, 48, 'text', 'Yes -> Korean?', '네', NULL, NULL),
(914, 78, 'text', 'Yes -> Korean?', '네', NULL, NULL),
(972, 16, 'text', 'No -> English?', 'No', NULL, NULL),
(973, 33, 'text', 'No -> English?', 'No', NULL, NULL),
(974, 42, 'text', 'No -> English?', 'No', NULL, NULL),
(975, 66, 'text', 'No -> English?', 'No', NULL, NULL),
(976, 74, 'text', 'No -> English?', 'No', NULL, NULL),
(977, 10, 'text', 'No -> English?', 'No', NULL, NULL),
(978, 72, 'text', 'No -> English?', 'No', NULL, NULL),
(979, 62, 'text', 'No -> English?', 'No', NULL, NULL),
(980, 60, 'text', 'No -> English?', 'No', NULL, NULL),
(981, 49, 'text', 'No -> English?', 'No', NULL, NULL),
(982, 51, 'text', 'No -> English?', 'No', NULL, NULL),
(983, 77, 'text', 'No -> English?', 'No', NULL, NULL),
(984, 53, 'text', 'No -> English?', 'No', NULL, NULL),
(985, 13, 'text', 'No -> English?', 'No', NULL, NULL),
(986, 22, 'text', 'No -> German?', 'Nein', NULL, NULL),
(987, 26, 'text', 'No -> German?', 'Nein', NULL, NULL),
(988, 32, 'text', 'No -> German?', 'Nein', NULL, NULL),
(989, 44, 'text', 'No -> German?', 'Nein', NULL, NULL),
(990, 67, 'text', 'No -> German?', 'Nein', NULL, NULL),
(991, 75, 'text', 'No -> German?', 'Nein', NULL, NULL),
(992, 61, 'text', 'No -> German?', 'Nein', NULL, NULL),
(993, 54, 'text', 'No -> German?', 'Nein', NULL, NULL),
(994, 14, 'text', 'No -> German?', 'Nein', NULL, NULL),
(995, 17, 'text', 'No -> French?', 'Non', NULL, NULL),
(996, 34, 'text', 'No -> French?', 'Non', NULL, NULL),
(997, 43, 'text', 'No -> French?', 'Non', NULL, NULL),
(998, 69, 'text', 'No -> French?', 'Non', NULL, NULL),
(999, 63, 'text', 'No -> French?', 'Non', NULL, NULL),
(1000, 55, 'text', 'No -> French?', 'Non', NULL, NULL),
(1001, 19, 'text', 'No -> Spanish?', 'No', NULL, NULL),
(1002, 46, 'text', 'No -> Spanish?', 'No', NULL, NULL),
(1003, 70, 'text', 'No -> Spanish?', 'No', NULL, NULL),
(1004, 64, 'text', 'No -> Spanish?', 'No', NULL, NULL),
(1005, 21, 'text', 'No -> Italian?', 'No', NULL, NULL),
(1006, 18, 'text', 'No -> Italian?', 'No', NULL, NULL),
(1007, 37, 'text', 'No -> Italian?', 'No', NULL, NULL),
(1008, 68, 'text', 'No -> Italian?', 'No', NULL, NULL),
(1009, 25, 'text', 'No -> Portuguese?', 'Não', NULL, NULL),
(1010, 31, 'text', 'No -> Portuguese?', 'Não', NULL, NULL),
(1011, 24, 'text', 'No -> Dutch?', 'Nee', NULL, NULL),
(1012, 27, 'text', 'No -> Dutch?', 'Nee', NULL, NULL),
(1013, 38, 'text', 'No -> Dutch?', 'Nee', NULL, NULL),
(1014, 23, 'text', 'No -> Polish?', 'Nie', NULL, NULL),
(1015, 28, 'text', 'No -> Polish?', 'Nie', NULL, NULL),
(1016, 39, 'text', 'No -> Polish?', 'Nie', NULL, NULL),
(1017, 29, 'text', 'No -> Romanian?', 'Nu', NULL, NULL),
(1018, 36, 'text', 'No -> Romanian?', 'Nu', NULL, NULL),
(1019, 45, 'text', 'No -> Romanian?', 'Nu', NULL, NULL),
(1020, 71, 'text', 'No -> Czech?', 'Ne', NULL, NULL),
(1021, 56, 'text', 'No -> Czech?', 'Ne', NULL, NULL),
(1022, 35, 'text', 'No -> Slovak?', 'Nie', NULL, NULL),
(1023, 58, 'text', 'No -> Slovak?', 'Nie', NULL, NULL),
(1024, 12, 'text', 'No -> Slovak?', 'Nie', NULL, NULL),
(1025, 40, 'text', 'No -> Ukrainian?', 'Ні', NULL, NULL),
(1026, 65, 'text', 'No -> Ukrainian?', 'Ні', NULL, NULL),
(1027, 59, 'text', 'No -> Ukrainian?', 'Ні', NULL, NULL),
(1028, 73, 'text', 'No -> Russian?', 'Нет', NULL, NULL),
(1029, 57, 'text', 'No -> Russian?', 'Нет', NULL, NULL),
(1030, 80, 'text', 'No -> Russian?', 'Нет', NULL, NULL),
(1031, 15, 'text', 'No -> Russian?', 'Нет', NULL, NULL),
(1032, 41, 'text', 'No -> Turkish?', 'Hayır', NULL, NULL),
(1033, 11, 'text', 'No -> Turkish?', 'Hayır', NULL, NULL),
(1034, 30, 'text', 'No -> Arabic?', 'لا', NULL, NULL),
(1035, 76, 'text', 'No -> Arabic?', 'لا', NULL, NULL),
(1036, 79, 'text', 'No -> Arabic?', 'لا', NULL, NULL),
(1037, 47, 'text', 'No -> Chinese?', '不', NULL, NULL),
(1038, 52, 'text', 'No -> Chinese?', '不', NULL, NULL),
(1039, 50, 'text', 'No -> Japanese?', 'いいえ', NULL, NULL),
(1040, 48, 'text', 'No -> Korean?', '아니요', NULL, NULL),
(1041, 78, 'text', 'No -> Korean?', '아니요', NULL, NULL),
(1099, 16, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1100, 33, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1101, 42, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1102, 66, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1103, 74, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1104, 10, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1105, 72, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1106, 62, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1107, 60, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1108, 49, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1109, 51, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1110, 77, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1111, 53, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1112, 13, 'text', 'Excuse me -> English?', 'Excuse me', NULL, NULL),
(1113, 22, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1114, 26, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1115, 32, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1116, 44, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1117, 67, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1118, 75, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1119, 61, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1120, 54, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1121, 14, 'text', 'Excuse me -> German?', 'Entschuldigung', NULL, NULL),
(1122, 17, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1123, 34, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1124, 43, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1125, 69, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1126, 63, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1127, 55, 'text', 'Excuse me -> French?', 'Excusez-moi', NULL, NULL),
(1128, 19, 'text', 'Excuse me -> Spanish?', 'Perdón', NULL, NULL),
(1129, 46, 'text', 'Excuse me -> Spanish?', 'Perdón', NULL, NULL),
(1130, 70, 'text', 'Excuse me -> Spanish?', 'Perdón', NULL, NULL),
(1131, 64, 'text', 'Excuse me -> Spanish?', 'Perdón', NULL, NULL),
(1132, 21, 'text', 'Excuse me -> Italian?', 'Mi scusi', NULL, NULL),
(1133, 18, 'text', 'Excuse me -> Italian?', 'Mi scusi', NULL, NULL),
(1134, 37, 'text', 'Excuse me -> Italian?', 'Mi scusi', NULL, NULL),
(1135, 68, 'text', 'Excuse me -> Italian?', 'Mi scusi', NULL, NULL),
(1136, 25, 'text', 'Excuse me -> Portuguese?', 'Com licença', NULL, NULL),
(1137, 31, 'text', 'Excuse me -> Portuguese?', 'Com licença', NULL, NULL),
(1138, 24, 'text', 'Excuse me -> Dutch?', 'Pardon', NULL, NULL),
(1139, 27, 'text', 'Excuse me -> Dutch?', 'Pardon', NULL, NULL),
(1140, 38, 'text', 'Excuse me -> Dutch?', 'Pardon', NULL, NULL),
(1141, 23, 'text', 'Excuse me -> Polish?', 'Przepraszam', NULL, NULL),
(1142, 28, 'text', 'Excuse me -> Polish?', 'Przepraszam', NULL, NULL),
(1143, 39, 'text', 'Excuse me -> Polish?', 'Przepraszam', NULL, NULL),
(1144, 29, 'text', 'Excuse me -> Romanian?', 'Scuzați-mă', NULL, NULL),
(1145, 36, 'text', 'Excuse me -> Romanian?', 'Scuzați-mă', NULL, NULL),
(1146, 45, 'text', 'Excuse me -> Romanian?', 'Scuzați-mă', NULL, NULL),
(1147, 71, 'text', 'Excuse me -> Czech?', 'Promiňte', NULL, NULL),
(1148, 56, 'text', 'Excuse me -> Czech?', 'Promiňte', NULL, NULL),
(1149, 35, 'text', 'Excuse me -> Slovak?', 'Prepáčte', NULL, NULL),
(1150, 58, 'text', 'Excuse me -> Slovak?', 'Prepáčte', NULL, NULL);
INSERT INTO `lesson_contents` (`id`, `lesson_id`, `content_type`, `question`, `answer`, `options`, `media_id`) VALUES
(1151, 12, 'text', 'Excuse me -> Slovak?', 'Prepáčte', NULL, NULL),
(1152, 40, 'text', 'Excuse me -> Ukrainian?', 'Вибачте', NULL, NULL),
(1153, 65, 'text', 'Excuse me -> Ukrainian?', 'Вибачте', NULL, NULL),
(1154, 59, 'text', 'Excuse me -> Ukrainian?', 'Вибачте', NULL, NULL),
(1155, 73, 'text', 'Excuse me -> Russian?', 'Извините', NULL, NULL),
(1156, 57, 'text', 'Excuse me -> Russian?', 'Извините', NULL, NULL),
(1157, 80, 'text', 'Excuse me -> Russian?', 'Извините', NULL, NULL),
(1158, 15, 'text', 'Excuse me -> Russian?', 'Извините', NULL, NULL),
(1159, 41, 'text', 'Excuse me -> Turkish?', 'Afedersiniz', NULL, NULL),
(1160, 11, 'text', 'Excuse me -> Turkish?', 'Afedersiniz', NULL, NULL),
(1161, 30, 'text', 'Excuse me -> Arabic?', 'عفواً', NULL, NULL),
(1162, 76, 'text', 'Excuse me -> Arabic?', 'عفواً', NULL, NULL),
(1163, 79, 'text', 'Excuse me -> Arabic?', 'عفواً', NULL, NULL),
(1164, 47, 'text', 'Excuse me -> Chinese?', '打扰一下', NULL, NULL),
(1165, 52, 'text', 'Excuse me -> Chinese?', '打扰一下', NULL, NULL),
(1166, 50, 'text', 'Excuse me -> Japanese?', 'すみません', NULL, NULL),
(1167, 48, 'text', 'Excuse me -> Korean?', '실례합니다', NULL, NULL),
(1168, 78, 'text', 'Excuse me -> Korean?', '실례합니다', NULL, NULL),
(1226, 16, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1227, 33, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1228, 42, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1229, 66, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1230, 74, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1231, 10, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1232, 72, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1233, 62, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1234, 60, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1235, 49, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1236, 51, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1237, 77, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1238, 53, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1239, 13, 'text', 'Sorry -> English?', 'Sorry', NULL, NULL),
(1240, 22, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1241, 26, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1242, 32, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1243, 44, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1244, 67, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1245, 75, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1246, 61, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1247, 54, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1248, 14, 'text', 'Sorry -> German?', 'Entschuldigung', NULL, NULL),
(1249, 17, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1250, 34, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1251, 43, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1252, 69, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1253, 63, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1254, 55, 'text', 'Sorry -> French?', 'Désolé', NULL, NULL),
(1255, 19, 'text', 'Sorry -> Spanish?', 'Lo siento', NULL, NULL),
(1256, 46, 'text', 'Sorry -> Spanish?', 'Lo siento', NULL, NULL),
(1257, 70, 'text', 'Sorry -> Spanish?', 'Lo siento', NULL, NULL),
(1258, 64, 'text', 'Sorry -> Spanish?', 'Lo siento', NULL, NULL),
(1259, 21, 'text', 'Sorry -> Italian?', 'Mi dispiace', NULL, NULL),
(1260, 18, 'text', 'Sorry -> Italian?', 'Mi dispiace', NULL, NULL),
(1261, 37, 'text', 'Sorry -> Italian?', 'Mi dispiace', NULL, NULL),
(1262, 68, 'text', 'Sorry -> Italian?', 'Mi dispiace', NULL, NULL),
(1263, 25, 'text', 'Sorry -> Portuguese?', 'Desculpa', NULL, NULL),
(1264, 31, 'text', 'Sorry -> Portuguese?', 'Desculpa', NULL, NULL),
(1265, 24, 'text', 'Sorry -> Dutch?', 'Sorry', NULL, NULL),
(1266, 27, 'text', 'Sorry -> Dutch?', 'Sorry', NULL, NULL),
(1267, 38, 'text', 'Sorry -> Dutch?', 'Sorry', NULL, NULL),
(1268, 23, 'text', 'Sorry -> Polish?', 'Przepraszam', NULL, NULL),
(1269, 28, 'text', 'Sorry -> Polish?', 'Przepraszam', NULL, NULL),
(1270, 39, 'text', 'Sorry -> Polish?', 'Przepraszam', NULL, NULL),
(1271, 29, 'text', 'Sorry -> Romanian?', 'Îmi pare rău', NULL, NULL),
(1272, 36, 'text', 'Sorry -> Romanian?', 'Îmi pare rău', NULL, NULL),
(1273, 45, 'text', 'Sorry -> Romanian?', 'Îmi pare rău', NULL, NULL),
(1274, 71, 'text', 'Sorry -> Czech?', 'Promiň', NULL, NULL),
(1275, 56, 'text', 'Sorry -> Czech?', 'Promiň', NULL, NULL),
(1276, 35, 'text', 'Sorry -> Slovak?', 'Prepáč', NULL, NULL),
(1277, 58, 'text', 'Sorry -> Slovak?', 'Prepáč', NULL, NULL),
(1278, 12, 'text', 'Sorry -> Slovak?', 'Prepáč', NULL, NULL),
(1279, 40, 'text', 'Sorry -> Ukrainian?', 'Вибач', NULL, NULL),
(1280, 65, 'text', 'Sorry -> Ukrainian?', 'Вибач', NULL, NULL),
(1281, 59, 'text', 'Sorry -> Ukrainian?', 'Вибач', NULL, NULL),
(1282, 73, 'text', 'Sorry -> Russian?', 'Извини', NULL, NULL),
(1283, 57, 'text', 'Sorry -> Russian?', 'Извини', NULL, NULL),
(1284, 80, 'text', 'Sorry -> Russian?', 'Извини', NULL, NULL),
(1285, 15, 'text', 'Sorry -> Russian?', 'Извини', NULL, NULL),
(1286, 41, 'text', 'Sorry -> Turkish?', 'Üzgünüm', NULL, NULL),
(1287, 11, 'text', 'Sorry -> Turkish?', 'Üzgünüm', NULL, NULL),
(1288, 30, 'text', 'Sorry -> Arabic?', 'آسف', NULL, NULL),
(1289, 76, 'text', 'Sorry -> Arabic?', 'آسف', NULL, NULL),
(1290, 79, 'text', 'Sorry -> Arabic?', 'آسف', NULL, NULL),
(1291, 47, 'text', 'Sorry -> Chinese?', '对不起', NULL, NULL),
(1292, 52, 'text', 'Sorry -> Chinese?', '对不起', NULL, NULL),
(1293, 50, 'text', 'Sorry -> Japanese?', 'ごめんなさい', NULL, NULL),
(1294, 48, 'text', 'Sorry -> Korean?', '미안합니다', NULL, NULL),
(1295, 78, 'text', 'Sorry -> Korean?', '미안합니다', NULL, NULL),
(1353, 16, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1354, 33, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1355, 42, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1356, 66, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1357, 74, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1358, 10, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1359, 72, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1360, 62, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1361, 60, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1362, 49, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1363, 51, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1364, 77, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1365, 53, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1366, 13, 'text', 'See you later -> English?', 'See you later', NULL, NULL),
(1367, 22, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1368, 26, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1369, 32, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1370, 44, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1371, 67, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1372, 75, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1373, 61, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1374, 54, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1375, 14, 'text', 'See you later -> German?', 'Bis später', NULL, NULL),
(1376, 17, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1377, 34, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1378, 43, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1379, 69, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1380, 63, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1381, 55, 'text', 'See you later -> French?', 'À plus tard', NULL, NULL),
(1382, 19, 'text', 'See you later -> Spanish?', 'Hasta luego', NULL, NULL),
(1383, 46, 'text', 'See you later -> Spanish?', 'Hasta luego', NULL, NULL),
(1384, 70, 'text', 'See you later -> Spanish?', 'Hasta luego', NULL, NULL),
(1385, 64, 'text', 'See you later -> Spanish?', 'Hasta luego', NULL, NULL),
(1386, 21, 'text', 'See you later -> Italian?', 'A dopo', NULL, NULL),
(1387, 18, 'text', 'See you later -> Italian?', 'A dopo', NULL, NULL),
(1388, 37, 'text', 'See you later -> Italian?', 'A dopo', NULL, NULL),
(1389, 68, 'text', 'See you later -> Italian?', 'A dopo', NULL, NULL),
(1390, 25, 'text', 'See you later -> Portuguese?', 'Até logo', NULL, NULL),
(1391, 31, 'text', 'See you later -> Portuguese?', 'Até logo', NULL, NULL),
(1392, 24, 'text', 'See you later -> Dutch?', 'Tot later', NULL, NULL),
(1393, 27, 'text', 'See you later -> Dutch?', 'Tot later', NULL, NULL),
(1394, 38, 'text', 'See you later -> Dutch?', 'Tot later', NULL, NULL),
(1395, 23, 'text', 'See you later -> Polish?', 'Do zobaczenia później', NULL, NULL),
(1396, 28, 'text', 'See you later -> Polish?', 'Do zobaczenia później', NULL, NULL),
(1397, 39, 'text', 'See you later -> Polish?', 'Do zobaczenia później', NULL, NULL),
(1398, 29, 'text', 'See you later -> Romanian?', 'Ne vedem mai târziu', NULL, NULL),
(1399, 36, 'text', 'See you later -> Romanian?', 'Ne vedem mai târziu', NULL, NULL),
(1400, 45, 'text', 'See you later -> Romanian?', 'Ne vedem mai târziu', NULL, NULL),
(1401, 71, 'text', 'See you later -> Czech?', 'Uvidíme se později', NULL, NULL),
(1402, 56, 'text', 'See you later -> Czech?', 'Uvidíme se později', NULL, NULL),
(1403, 35, 'text', 'See you later -> Slovak?', 'Uvidíme sa neskôr', NULL, NULL),
(1404, 58, 'text', 'See you later -> Slovak?', 'Uvidíme sa neskôr', NULL, NULL),
(1405, 12, 'text', 'See you later -> Slovak?', 'Uvidíme sa neskôr', NULL, NULL),
(1406, 40, 'text', 'See you later -> Ukrainian?', 'Побачимося пізніше', NULL, NULL),
(1407, 65, 'text', 'See you later -> Ukrainian?', 'Побачимося пізніше', NULL, NULL),
(1408, 59, 'text', 'See you later -> Ukrainian?', 'Побачимося пізніше', NULL, NULL),
(1409, 73, 'text', 'See you later -> Russian?', 'Увидимся позже', NULL, NULL),
(1410, 57, 'text', 'See you later -> Russian?', 'Увидимся позже', NULL, NULL),
(1411, 80, 'text', 'See you later -> Russian?', 'Увидимся позже', NULL, NULL),
(1412, 15, 'text', 'See you later -> Russian?', 'Увидимся позже', NULL, NULL),
(1413, 41, 'text', 'See you later -> Turkish?', 'Sonra görüşürüz', NULL, NULL),
(1414, 11, 'text', 'See you later -> Turkish?', 'Sonra görüşürüz', NULL, NULL),
(1415, 30, 'text', 'See you later -> Arabic?', 'أراك لاحقاً', NULL, NULL),
(1416, 76, 'text', 'See you later -> Arabic?', 'أراك لاحقاً', NULL, NULL),
(1417, 79, 'text', 'See you later -> Arabic?', 'أراك لاحقاً', NULL, NULL),
(1418, 47, 'text', 'See you later -> Chinese?', '待会儿见', NULL, NULL),
(1419, 52, 'text', 'See you later -> Chinese?', '待会儿见', NULL, NULL),
(1420, 50, 'text', 'See you later -> Japanese?', 'また後で', NULL, NULL),
(1421, 48, 'text', 'See you later -> Korean?', '나중에 봐요', NULL, NULL),
(1422, 78, 'text', 'See you later -> Korean?', '나중에 봐요', NULL, NULL),
(1480, 16, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1481, 33, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1482, 42, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1483, 66, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1484, 74, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1485, 10, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1486, 72, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1487, 62, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1488, 60, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1489, 49, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1490, 51, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1491, 77, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1492, 53, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1493, 13, 'text', 'How are you? -> English?', 'How are you?', NULL, NULL),
(1494, 22, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1495, 26, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1496, 32, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1497, 44, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1498, 67, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1499, 75, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1500, 61, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1501, 54, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1502, 14, 'text', 'How are you? -> German?', 'Wie geht es dir?', NULL, NULL),
(1503, 17, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1504, 34, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1505, 43, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1506, 69, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1507, 63, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1508, 55, 'text', 'How are you? -> French?', 'Comment ça va ?', NULL, NULL),
(1509, 19, 'text', 'How are you? -> Spanish?', '¿Cómo estás?', NULL, NULL),
(1510, 46, 'text', 'How are you? -> Spanish?', '¿Cómo estás?', NULL, NULL),
(1511, 70, 'text', 'How are you? -> Spanish?', '¿Cómo estás?', NULL, NULL),
(1512, 64, 'text', 'How are you? -> Spanish?', '¿Cómo estás?', NULL, NULL),
(1513, 21, 'text', 'How are you? -> Italian?', 'Come stai?', NULL, NULL),
(1514, 18, 'text', 'How are you? -> Italian?', 'Come stai?', NULL, NULL),
(1515, 37, 'text', 'How are you? -> Italian?', 'Come stai?', NULL, NULL),
(1516, 68, 'text', 'How are you? -> Italian?', 'Come stai?', NULL, NULL),
(1517, 25, 'text', 'How are you? -> Portuguese?', 'Como vai?', NULL, NULL),
(1518, 31, 'text', 'How are you? -> Portuguese?', 'Como vai?', NULL, NULL),
(1519, 24, 'text', 'How are you? -> Dutch?', 'Hoe gaat het?', NULL, NULL),
(1520, 27, 'text', 'How are you? -> Dutch?', 'Hoe gaat het?', NULL, NULL),
(1521, 38, 'text', 'How are you? -> Dutch?', 'Hoe gaat het?', NULL, NULL),
(1522, 23, 'text', 'How are you? -> Polish?', 'Jak się masz?', NULL, NULL),
(1523, 28, 'text', 'How are you? -> Polish?', 'Jak się masz?', NULL, NULL),
(1524, 39, 'text', 'How are you? -> Polish?', 'Jak się masz?', NULL, NULL),
(1525, 29, 'text', 'How are you? -> Romanian?', 'Ce mai faci?', NULL, NULL),
(1526, 36, 'text', 'How are you? -> Romanian?', 'Ce mai faci?', NULL, NULL),
(1527, 45, 'text', 'How are you? -> Romanian?', 'Ce mai faci?', NULL, NULL),
(1528, 71, 'text', 'How are you? -> Czech?', 'Jak se máš?', NULL, NULL),
(1529, 56, 'text', 'How are you? -> Czech?', 'Jak se máš?', NULL, NULL),
(1530, 35, 'text', 'How are you? -> Slovak?', 'Ako sa máš?', NULL, NULL),
(1531, 58, 'text', 'How are you? -> Slovak?', 'Ako sa máš?', NULL, NULL),
(1532, 12, 'text', 'How are you? -> Slovak?', 'Ako sa máš?', NULL, NULL),
(1533, 40, 'text', 'How are you? -> Ukrainian?', 'Як справи?', NULL, NULL),
(1534, 65, 'text', 'How are you? -> Ukrainian?', 'Як справи?', NULL, NULL),
(1535, 59, 'text', 'How are you? -> Ukrainian?', 'Як справи?', NULL, NULL),
(1536, 73, 'text', 'How are you? -> Russian?', 'Как дела?', NULL, NULL),
(1537, 57, 'text', 'How are you? -> Russian?', 'Как дела?', NULL, NULL),
(1538, 80, 'text', 'How are you? -> Russian?', 'Как дела?', NULL, NULL),
(1539, 15, 'text', 'How are you? -> Russian?', 'Как дела?', NULL, NULL),
(1540, 41, 'text', 'How are you? -> Turkish?', 'Nasılsın?', NULL, NULL),
(1541, 11, 'text', 'How are you? -> Turkish?', 'Nasılsın?', NULL, NULL),
(1542, 30, 'text', 'How are you? -> Arabic?', 'كيف حالك؟', NULL, NULL),
(1543, 76, 'text', 'How are you? -> Arabic?', 'كيف حالك؟', NULL, NULL),
(1544, 79, 'text', 'How are you? -> Arabic?', 'كيف حالك؟', NULL, NULL),
(1545, 47, 'text', 'How are you? -> Chinese?', '你好吗？', NULL, NULL),
(1546, 52, 'text', 'How are you? -> Chinese?', '你好吗？', NULL, NULL),
(1547, 50, 'text', 'How are you? -> Japanese?', '元気ですか？', NULL, NULL),
(1548, 48, 'text', 'How are you? -> Korean?', '잘 지냈어요?', NULL, NULL),
(1549, 78, 'text', 'How are you? -> Korean?', '잘 지냈어요?', NULL, NULL);

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
(7, 3, 'Unité 1 : Les Bases', 'Apprenez à saluer et à compter', 1),
(11, 47, 'الوحدة 1: الأساسيات', 'تعلّم التحيات وكيف تقدّم نفسك.', 1),
(12, 48, 'الوحدة 1: الأساسيات', 'تعلّم التحيات وكيف تقدّم نفسك.', 1),
(13, 74, 'Jednotka 1: Základy', 'Nauč se pozdravy a představit se.', 1),
(14, 75, 'Jednotka 1: Základy', 'Nauč se pozdravy a představit se.', 1),
(15, 76, 'Jednotka 1: Základy', 'Nauč se pozdravy a představit se.', 1),
(16, 77, 'Jednotka 1: Základy', 'Nauč se pozdravy a představit se.', 1),
(17, 13, 'Einheit 1: Grundlagen', 'Lerne Begrüßungen und dich vorzustellen.', 1),
(18, 14, 'Einheit 1: Grundlagen', 'Lerne Begrüßungen und dich vorzustellen.', 1),
(19, 15, 'Einheit 1: Grundlagen', 'Lerne Begrüßungen und dich vorzustellen.', 1),
(20, 16, 'Einheit 1: Grundlagen', 'Lerne Begrüßungen und dich vorzustellen.', 1),
(21, 7, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(22, 8, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(23, 9, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(24, 10, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(25, 11, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(26, 12, 'Unit 1: The Basics', 'Learn greetings and introduce yourself.', 1),
(27, 17, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(28, 18, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(29, 19, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(30, 20, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(31, 21, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(32, 22, 'Unité 1 : Les Bases', 'Apprenez les salutations et à vous présenter.', 1),
(33, 23, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(34, 24, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(35, 25, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(36, 26, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(37, 27, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(38, 28, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(39, 29, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(40, 30, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(41, 31, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(42, 32, '1. egység: Alapok', 'Tanuld meg a köszönéseket és a bemutatkozást.', 1),
(43, 33, 'Unità 1: Le basi', 'Impara i saluti e a presentarti.', 1),
(44, 34, 'Unità 1: Le basi', 'Impara i saluti e a presentarti.', 1),
(45, 35, 'Unità 1: Le basi', 'Impara i saluti e a presentarti.', 1),
(46, 36, 'Unità 1: Le basi', 'Impara i saluti e a presentarti.', 1),
(47, 37, 'Unità 1: Le basi', 'Impara i saluti e a presentarti.', 1),
(48, 61, '第1課：基礎', 'あいさつと自己紹介を学びましょう。', 1),
(49, 62, '第1課：基礎', 'あいさつと自己紹介を学びましょう。', 1),
(50, 63, '第1課：基礎', 'あいさつと自己紹介を学びましょう。', 1),
(51, 64, '1과: 기초', '인사와 자기소개를 배워 보세요.', 1),
(52, 65, '1과: 기초', '인사와 자기소개를 배워 보세요.', 1),
(53, 66, '1과: 기초', '인사와 자기소개를 배워 보세요.', 1),
(54, 71, 'Eenheid 1: Basis', 'Leer begroetingen en jezelf voorstellen.', 1),
(55, 72, 'Eenheid 1: Basis', 'Leer begroetingen en jezelf voorstellen.', 1),
(56, 73, 'Eenheid 1: Basis', 'Leer begroetingen en jezelf voorstellen.', 1),
(57, 55, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(58, 56, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(59, 57, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(60, 58, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(61, 59, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(62, 60, 'Jednostka 1: Podstawy', 'Naucz się powitań i przedstawiania się.', 1),
(63, 52, 'Unidade 1: O básico', 'Aprenda saudações e a se apresentar.', 1),
(64, 53, 'Unidade 1: O básico', 'Aprenda saudações e a se apresentar.', 1),
(65, 54, 'Unidade 1: O básico', 'Aprenda saudações e a se apresentar.', 1),
(66, 38, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(67, 39, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(68, 40, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(69, 41, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(70, 42, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(71, 43, 'Unitatea 1: Bazele', 'Învață salutările și cum să te prezinți.', 1),
(72, 49, 'Jednotka 1: Základy', 'Nauč sa pozdravy a predstavenie sa.', 1),
(73, 50, 'Jednotka 1: Základy', 'Nauč sa pozdravy a predstavenie sa.', 1),
(74, 51, 'Jednotka 1: Základy', 'Nauč sa pozdravy a predstavenie sa.', 1),
(75, 44, '1. Ünite: Temeller', 'Selamlaşmayı ve kendini tanıtmayı öğren.', 1),
(76, 45, '1. Ünite: Temeller', 'Selamlaşmayı ve kendini tanıtmayı öğren.', 1),
(77, 46, '1. Ünite: Temeller', 'Selamlaşmayı ve kendini tanıtmayı öğren.', 1),
(78, 67, '第1单元：基础', '学习问候和自我介绍。', 1),
(79, 68, '第1单元：基础', '学习问候和自我介绍。', 1),
(80, 69, '第1单元：基础', '学习问候和自我介绍。', 1),
(81, 70, '第1单元：基础', '学习问候和自我介绍。', 1);

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
(11, 'TestV3_3', 'TestV3_3', 'testv3_3@gmail.com', 'piXpFv/5VYFIngNUzrj/5ysyYWc3NtcYUixGXvTY0RM=', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqryMO_3_1C245pdiAF0jRvXvogNsqIfUGDQ&s', 5, 0, 0, 'user', '2026-02-03 08:48:38'),
(12, 'NewUser', 'NewUser', 'newuser@gmail.com', 'NTWTLlQRCPhFuQyKDhUm3M6QkS2I1nQjoM7taIZqhaY=', NULL, 5, 0, 0, 'user', '2026-02-09 07:44:12'),
(13, 'i nate higgers', 'i nate higgers', 'nigga@nigga.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', NULL, 5, 0, 0, 'user', '2026-02-16 07:46:06'),
(14, 'faszloar', 'faszloar', 'fasz@loar.nigga', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', NULL, 5, 0, 0, 'user', '2026-02-16 07:48:52'),
(15, 'regtest', 'regtest', 'regtest@reg.com', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', NULL, 5, 0, 0, 'user', '2026-02-16 07:50:02'),
(16, 'testreg1', 'testreg1', 'testreg1@gmail.com', 'i7DPbrmxfQ99IrRW8SElfcElTh8BZlNwR2OD6ndt9BQ=', NULL, 5, 0, 0, 'user', '2026-02-16 07:55:59'),
(17, 'asd123', 'asd123', 'asd123@gmail.com', 'VNXLLTMtvbSFApPKrkVZzoi2UWPx6l1OSzrEnXct7RQ=', NULL, 5, 0, 0, 'user', '2026-02-16 08:00:56'),
(18, 'test123', 'test123', 'test123@gmail.com', '7NcYcNGWMxapfjrDQIyYNa2M8PPBvHA1J8MCZVNPda4=', NULL, 5, 0, 0, 'user', '2026-02-16 08:01:56'),
(19, 'Franco', 'Franco', 'fr@gm.sdl', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', NULL, 5, 0, 0, 'user', '2026-02-16 08:05:00'),
(20, 'asdwe', 'asdwe', 'asdqwe@2.dsa23', 'jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=', NULL, 5, 0, 0, 'user', '2026-02-16 08:08:46'),
(21, 'admin2', 'admin2', 'admin@admin.admin', '2CSU8F1pF7oC96qilonMtES7c/IDgIdssF0fN1N7eJI=', NULL, 5, 0, 0, 'user', '2026-02-16 08:15:23'),
(22, 'test6', 'test6', 'test6@g.4', 'xkSkW6SxT7sgICDw4jHa1dR5B0w7M4QAOpDT3zIPXqc=', NULL, 5, 0, 0, 'user', '2026-02-16 08:17:02'),
(23, 'nigabiga', 'nigabiga', 'niga@biga.123', 'W9NFrOf1NO0epiTwMg7y8f4PutcqfWh4UIO+fEi6QNs=', NULL, 0, 0, 0, 'user', '2026-02-16 08:40:43'),
(24, 'TestV4', 'TestV4', 'TestV4@gmail.com', 'C+cr+uUrx44CgWUuFgfCjVxkvFXFr8352OAcOYUZ6Wc=', NULL, 4, 0, 0, 'user', '2026-02-27 07:10:43');

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
(4, 10, 2, '2026-02-06 06:35:55', 3, 40, 100),
(5, 11, 1, '2026-02-13 06:21:34', 2, 38, 92),
(6, 23, 1, '2026-02-16 08:44:01', 1, 30, 25),
(7, 11, 2, '2026-02-20 06:32:17', 3, 40, 100),
(8, 9, 2, '2026-02-20 07:14:26', 3, 40, 100),
(9, 9, 3, '2026-02-20 07:14:44', 3, 40, 100),
(10, 9, 4, '2026-02-20 07:14:53', 3, 40, 100),
(11, 9, 5, '2026-02-20 07:15:17', 3, 40, 100),
(12, 9, 6, '2026-02-20 07:15:28', 3, 40, 100),
(13, 24, 1, '2026-02-27 07:11:31', 2, 38, 92),
(14, 9, 7, '2026-02-27 07:31:57', 3, 40, 100);

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
(4, 10, 40, 'lesson', '2026-02-06 06:35:55'),
(5, 11, 38, 'lesson', '2026-02-13 06:21:34'),
(6, 23, 30, 'lesson', '2026-02-16 08:44:01'),
(7, 11, 40, 'lesson', '2026-02-20 06:32:17'),
(8, 9, 40, 'lesson', '2026-02-20 07:14:26'),
(9, 9, 40, 'lesson', '2026-02-20 07:14:44'),
(10, 9, 40, 'lesson', '2026-02-20 07:14:53'),
(11, 9, 40, 'lesson', '2026-02-20 07:15:17'),
(12, 9, 40, 'lesson', '2026-02-20 07:15:28'),
(13, 24, 38, 'lesson', '2026-02-27 07:11:31'),
(14, 9, 40, 'lesson', '2026-02-27 07:31:57');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;

--
-- AUTO_INCREMENT a táblához `lesson_contents`
--
ALTER TABLE `lesson_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1607;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_lessons`
--
ALTER TABLE `user_lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
