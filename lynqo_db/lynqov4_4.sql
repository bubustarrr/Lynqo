-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 16. 09:57
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
(1, 9, 'ban_user', NULL, 'bc I can', '2026-02-03 08:35:26'),
(2, 9, 'change_role', 1, 'Role changed to: admin', '2026-03-09 07:45:04'),
(3, 9, 'change_role', 1, 'Role changed to: user', '2026-03-09 07:45:08'),
(4, 9, 'change_role', 1, 'Role changed to: admin', '2026-03-09 07:45:09'),
(5, 9, 'ban_user', NULL, 'xdd', '2026-03-09 07:45:31'),
(6, 9, 'unban_user', NULL, NULL, '2026-03-09 07:45:36'),
(7, 9, 'ban_user', NULL, 'xdd', '2026-03-09 07:45:37');

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
(5, 9, 'VXYO1PeDK5GH6uvvcpoyFf8wnQPQasnyAju5ut1+me2qgXbV8vUNJRn4tmV1vpxXCGOTTF2WM3YrdfRU4cdO7g==', 'refresh_token', '2026-02-04 10:12:29', '2026-03-06 10:12:29'),
(7, 9, 'oOaXYWQ3BTCwXiLwR75Y9ydcMXbBQueCwGdapgCwTRJtCtHPc/4NKc/6UI9V3yk2d0305S+/wEQhkYyoJYAShA==', 'refresh_token', '2026-02-04 10:15:29', '2026-03-06 10:15:29'),
(9, 9, 'kzji1l+7ol6Y2FWxU6C1rBKskMqEx1Uu9LUiYas3txDlVSupxMobs9NWfCCQ9WbsLLTQGrMIqfzNgjU5+KtbFQ==', 'refresh_token', '2026-02-06 05:31:43', '2026-03-08 05:31:43'),
(12, 9, 'XPOOozwWj5AHFgxRAzw+g1bzXv3GnW2tuNS5RolgdNmcpXKJ5C5IvFVv49fO8yYeH2R+nCO9q3zjSxCGCMn6Ow==', 'refresh_token', '2026-02-06 06:39:31', '2026-03-08 06:39:31'),
(13, 9, 'Sl6ikAKrfMwDKBkYuVOerk+wxHjSdjyO3KtXp4cK+PCmZQJfRLQiQyvUZVGeWGHlQO6OyE93GQfZu2D1jcMydA==', 'refresh_token', '2026-02-06 08:52:06', '2026-03-08 08:52:06'),
(14, 9, 'MSi84SSStrpFpyp521C3TpuNgUNqeYZz0NEP92E2r68D4fwiQ77BqF8YRLXsO673wTOsAvutJBtPQQTfjbIlmQ==', 'refresh_token', '2026-02-06 09:17:39', '2026-03-08 09:17:39'),
(15, 9, 'HcgiBoNHPAbaBI+V4hWmSgmmwus8crLH0OI8Qwb/iV4QudvEFd4W4UUL0R+yKnwRlWD6a+7gzZSXMv/v/vHTlQ==', 'refresh_token', '2026-02-09 05:25:29', '2026-03-11 05:25:29'),
(16, 9, '4VLAukRHddDzY5pM3iwjoJLqT3sBqHy/5rGBeJBATFlOAoq+bp33xbwMffhK18jwEXI7PR5W5N5KLFQyFq85zQ==', 'refresh_token', '2026-02-13 05:41:10', '2026-03-15 05:41:10'),
(28, 9, 'icmGScQAgCx9DpwP4Tf+D7QvLyTAifN+pfG66KCc5iIC5/7UuZVCBQXtRW0VfAnTZwXLi8RqI/ahJfvdVGMlHA==', 'refresh_token', '2026-02-16 08:10:40', '2026-03-18 08:10:40'),
(29, 9, 'Ye5C5U68gdMZwUVoXdaatyiKJ4z094rK4TIMoUWyF9kjrVDUOQ5zNEOdc7o76wnnnNITE1pUyNQX8sRcTVHhDw==', 'refresh_token', '2026-02-16 08:11:43', '2026-03-18 08:11:43'),
(42, 9, 'xZmjMeU13DLY1t4mba32RK30jFe6imNJbfDAJOAT7dkjIh/+UxR83JAsO06TAHlZv2b8H1RrGSCT9J6gistxbA==', 'refresh_token', '2026-02-20 05:57:04', '2026-03-22 05:57:04'),
(46, 9, 'FX+01Y2dAi/XzH9sflJN2vahO2jqlluEr0Sa7srBmAACUz3PhQGi/c4QxLz14AIzkGz5k8JEg9M/k+oh5xKoCQ==', 'refresh_token', '2026-02-20 07:08:32', '2026-03-22 07:08:32'),
(48, 24, 'MgiHHcWprwurpuoPIt381EB8ChQRQKp+0E+ANy0KhSJxETgwPOeTHTS/F00xbNfkmCvEpZGMoiztVqS4MPM+Pw==', 'refresh_token', '2026-02-27 07:10:43', '2026-03-29 06:10:43'),
(49, 9, '9vlsDv7Dm7irxYSPC9m9qMyun4jmH8vgJXZau1Z50v9kQEZinwtevXZqEYWU8Bajc9q/qE0Lg96E4mw4CQ/rTw==', 'refresh_token', '2026-02-27 07:23:39', '2026-03-29 06:23:39'),
(50, 9, 'j0fH3IJujA4JQY3lwmIC5hmQSceIQt4M82L2MmzjqTdgHI5DX/sH9ao4mSE/MBzpBRkMqxlTkYFYVt8HYTBo6w==', 'refresh_token', '2026-03-06 06:59:50', '2026-04-05 05:59:50'),
(51, 9, 'oo0ubC24vxaAUYJt4+4wFYKxDIp1VhmoaL8TQMX994gEDFUBkzGFbh+Jmov5mu2Kr9M/LY9UfSgrqdbJvaVghQ==', 'refresh_token', '2026-03-06 07:29:07', '2026-04-05 06:29:07'),
(52, 9, 'JzNNcjlT1q5xLVPLr+Qx4+c1PBDpgp9pl+JfK7+eYrRHabYMoQdbME9ubrrNRYJcQxJOdfT3qhlCE/PF2GGyEg==', 'refresh_token', '2026-03-06 08:06:51', '2026-04-05 07:06:51'),
(53, 9, 'Lh5qUtzXWjjfl5OdUtqyyJNK24J5jhDQ4TWbTKxl2Q9M9NuTY4UhBH6EDuY+Gw6E4FrmXJTghTQKy3wgcaXfVQ==', 'refresh_token', '2026-03-06 08:31:31', '2026-04-05 07:31:31'),
(54, 9, 'j8/Akar9vDBzLpIqSxR89hv/bEtYa1UbpMePKviIj7mxF6RROCYJNZhtfmijnfqeDYcut4Jg4drLuj3jVd1HSA==', 'refresh_token', '2026-03-06 08:57:27', '2026-04-05 07:57:27'),
(55, 9, 'J3kpq9iOcNiSrYVpH9Sub0jKWtn+Sc/XMcXmWvl9rY1xJetr3q3KlLVixePC4nK4HorHCCY5yGl2lzpaVS8a1g==', 'refresh_token', '2026-03-06 09:15:29', '2026-04-05 08:15:29'),
(56, 9, 'QSqRagC+YFlhWWXpUN37Vpt9PXsp+Gpe0itSsqByLuNE6OLl4ScgsyxkEvN3VM/Gg468XhFfW0RFpXVvjQqtmQ==', 'refresh_token', '2026-03-06 09:21:49', '2026-04-05 08:21:49'),
(57, 9, 'XjSzUrPGpWP2H/f+ncAwD/JDs8c5sA7sRlPkgzEQR5GLt5sCR36g9JRyP6vKRsqlvQN9FNsZn4x2pRtKJl8n0A==', 'refresh_token', '2026-03-09 05:32:49', '2026-04-08 04:32:49'),
(58, 9, 'EILhKVA63UfIuDV+EFVErAxiu1hAESxQ2+cD2HDI2XZKp/O0yF2txgU64oEd+LohdMGiACOuyMzuKJVpQ/kKNg==', 'refresh_token', '2026-03-09 05:35:43', '2026-04-08 04:35:43'),
(59, 9, 'rjERtk+F2wZVVLDExSC6iLYBv8IeRxqLXgFLtK6eKHoine0uBzR+GDqUoiSKm9AzdFzj7NvlAQRmNbL4gXjWxw==', 'refresh_token', '2026-03-09 05:36:53', '2026-04-08 04:36:53'),
(60, 9, 'SfwTMGMHUcu86D9pEXmaO79/BL5jmyrRL2rnhZDP691V03JakBqY95m3vZol74JWAZm/It9qXigi/PniUFlE0w==', 'refresh_token', '2026-03-09 05:39:32', '2026-04-08 04:39:32'),
(62, 9, 'Fn3ewoC2x56hZFl1vD55apvS+Gact2eSGS4VrOcmaO/jKNyFxrsrpgel10OC/JQzoCFo4bR1j3QJAJCzb5CUoA==', 'refresh_token', '2026-03-09 05:50:58', '2026-04-08 04:50:58'),
(63, 9, 'qn6rCJni71uMusiFbV55PeaGENoqea/GV2QMIrqzHSPtpzZ/qNeGoQg+pwd/wit4yjQmdWoJiGQJplLpEmRWyA==', 'refresh_token', '2026-03-09 05:51:51', '2026-04-08 04:51:51'),
(64, 9, 'FzmXJJYAaAapqSn+nwFoMR2TpwkDJpZnzXnuuHK2B7jOvK3/MCPpANNJAY+E9hr+D64RLllEDT3rDGZXXjFZnQ==', 'refresh_token', '2026-03-09 05:54:03', '2026-04-08 04:54:03'),
(65, 9, '/SO5jcD56AXNDoMGBw8EE0LY9NwtZSmEpjISQjj+1RyF+BwIdlAbAeIi7aDcviQAFFQF+Eke/xFTw953ZJGXBg==', 'refresh_token', '2026-03-09 06:18:32', '2026-04-08 05:18:32'),
(66, 9, 'Wobbf7I92n6573WhczYLw6nq6Su9l+bqltEzs2qKb0R6y7kUx1BqGdiGMxRh3PlooBBSkZVlUleY8NidNce8KA==', 'refresh_token', '2026-03-09 06:26:11', '2026-04-08 05:26:11'),
(67, 9, 'xDBFt6BmiSBKDqZ9bFezC1sVbayyyRFioa6ik9Rx8C6rMXTAmyDUgihSDmyqLtgQMZG78Ih0Z8UPvqdJPfWhQw==', 'refresh_token', '2026-03-09 06:26:44', '2026-04-08 05:26:44'),
(68, 9, '9IQhlQWEKI/fssKTnC8oBNsR/Mseax17UwQR8XeBxIdim8DP847qTw5siGQcJtJfJ8BN8RZ2+6BKVVZrHnZEJw==', 'refresh_token', '2026-03-09 07:10:06', '2026-04-08 06:10:06'),
(69, 9, 'y1SEKRTpFs91/PBaIO+623BbL01HNgrlv8yRZHbWwRSMF8+1MsL5IdYW8128TnJMbp3AsOlunHTTWLHGGsnS5Q==', 'refresh_token', '2026-03-09 07:12:55', '2026-04-08 06:12:55'),
(71, 9, 'R2sJSIl+DWw4+1r7MoK2Ip3ht6ehekiVUJ5xQ8BW3MkwXCZVJJiadtZB8di1Qw4yo3SSIMzoSTP1BD10hTQ0Iw==', 'refresh_token', '2026-03-09 07:41:22', '2026-04-08 06:41:22'),
(73, 9, '92uJq3xcgfpMIHMMUP+BR6JaMOziEIoZGHNPcdtabXhyuezICgzA+IMKzTwnpW06uqgzdYT7rL/QG7yYMc/jGw==', 'refresh_token', '2026-03-09 07:43:13', '2026-04-08 06:43:13'),
(74, 9, 'l155QaJImsBpnDNJuUrazpljRa9doCbc+n2ia0D9eh5eAiKHoPCARjHUcJnZj2ZSavCBMYLCGVGH7OLL8g9xrg==', 'refresh_token', '2026-03-09 07:44:56', '2026-04-08 06:44:56'),
(75, 9, 'Rw7giTm0d5RRa1V9GxsjYBd3OpY8qOKki60/i9f3X7tYZkRs8sCzEIYH95P9d2yR0KOTgV6SMDvUjX/LScJqPA==', 'refresh_token', '2026-03-09 07:51:18', '2026-04-08 06:51:18'),
(76, 25, 'BQjtPWHX2P4vNFNL1RjkSSnVNsqoLbzUcTbF/BbD7pj6st1qlAHo+m8jjYruzeMQ5+eCnGcvQmpFU8xowyr65g==', 'refresh_token', '2026-03-11 08:10:58', '2026-04-10 07:10:58'),
(77, 25, '8dtZg+QGxV0ZXgIunY78AFpJ906oCx3R6LunggaFSUhI4rbC1qu3B5zUjPBJYiVGzqRGJCCSG+YipMzC8x5xtQ==', 'refresh_token', '2026-03-11 08:22:43', '2026-04-10 07:22:43'),
(78, 25, 'r47g1jB6rAyrAwqco2Z08hHI7m91kEAsRjgGAYsWbqPWFUG4nDAS7s/6k4Z6A3hfg9gl+wrD5vpFb1x/59NVdA==', 'refresh_token', '2026-03-11 08:24:35', '2026-04-10 07:24:35'),
(79, 25, 'KPrQDMs+ilq/z0n+K0wxNGL7ReISQj7xMvLBH5vnF7SPu9nO5sqUCNCe3Wg9/HHdGrcx4Au8u1Is9KB+lyz46g==', 'refresh_token', '2026-03-11 08:28:06', '2026-04-10 07:28:06'),
(80, 25, 'MfgcK0XBREf5TNwnUfwTnUoCXvXtx1QzfMS2yC9HAmiZ15TBkSL8O6N5+LiJ9BfeTSLdvAF4SAzS88sHK2hPsQ==', 'refresh_token', '2026-03-11 08:29:46', '2026-04-10 07:29:46'),
(81, 25, 'o7CH8oyUwHfzP5OD61O4G/wv3t7yfjwst8vkbk3CsMvlsB6/FHBNOfSkfL0icGXqKHqkOfGE5qHcHr63AaPM+A==', 'refresh_token', '2026-03-11 08:35:25', '2026-04-10 07:35:25'),
(82, 25, 'y2HR2Q8dAPr8nmXEZw9LFQJT0Yz+cNy8sTF8sgqcKT9t6fsO3MlV6N9csGkQkEopevCFN6zJc929QUZ62B9ViA==', 'refresh_token', '2026-03-11 08:45:04', '2026-04-10 07:45:04'),
(83, 25, 'y15dzCoBi32sj3XikAjy6Ioj1ZwlECE/bPaCnTgkSYm7ds5qnTZow1vwfF8PaaLpJALveCixDQ7tIE6UrP48Rw==', 'refresh_token', '2026-03-11 09:03:52', '2026-04-10 08:03:52'),
(84, 25, 'omLD84ArVUziq5fogUZOFsMDsOzxYdctTirF1XwfGFet2PSxW8SPG4/lPac97r2AtI2PPwR6MchtERHIZR6IIg==', 'refresh_token', '2026-03-11 09:10:57', '2026-04-10 08:10:57'),
(85, 25, 'wUjyFplKcrFIqihlS4B+mZ1LcIcaN34RPJtr7WR2rEylDEi8pO8jFctrTiB5ZMtDsXVQZdZZ2z8FUs0Rsk3ZTA==', 'refresh_token', '2026-03-11 09:19:54', '2026-04-10 08:19:54'),
(86, 25, 'a3NXAz2rCZFETlxYa+z7UQrldqV1zpXPpXvkqQBdxJTOZOpa7pELR55ns+8BO4Tp24G9HMxYD/IRNJahdDR+tw==', 'refresh_token', '2026-03-11 09:22:44', '2026-04-10 08:22:44'),
(87, 25, 'G+6gns8MKy1kKC2LuBKpgD+dO2DD/YZUCp79tx0/JAEMmhDe5mrEv0QE13PlfpatGDKIBuV4liIIuknP08FQvQ==', 'refresh_token', '2026-03-11 09:28:43', '2026-04-10 08:28:43'),
(88, 25, 'oSc+04jdQufFhJPykQKwALPadoXS2a9qtmGBwD4hjJY/0fyZX7I0Pg+iohTbYWjECUPxQKmqR73alP35Eg3W4Q==', 'refresh_token', '2026-03-11 09:40:09', '2026-04-10 08:40:09'),
(89, 9, '5boCMRRtEPJn/rmvwP1hiU+ctUBh/zBYYgavVszKaskkFWYZaL6i20tNaochcW1NhQkyy1ZReHb1YH1GEEBCvA==', 'refresh_token', '2026-03-11 09:41:10', '2026-04-10 08:41:10'),
(91, 25, 'GXrW0PYHq0nn/6I7Vq2kxc49YubTzimdE/P0gtzGL7gDu7lk5yypRiBrLre6OnfMIFBYJvtHVqB8d1+F0xuEZg==', 'refresh_token', '2026-03-11 09:41:55', '2026-04-10 08:41:55'),
(92, 25, 'pKrvMZ5cC/jybNEgw24wSxBQNGh+boXd4zRUXZn8L6flJk6LEbDr5AMWkB3lkWJmrnq6YffiEkAyAEiPMNa35g==', 'refresh_token', '2026-03-11 09:55:39', '2026-04-10 08:55:39'),
(94, 25, '/ficZuS246+R4nt9RYi3yIs4Bs/y+7E5IHYWG80vDXWIN1ZOn2NgMI9U+gNUlqVEBxyow1KirCq2vzCBRZXqpA==', 'refresh_token', '2026-03-11 09:59:39', '2026-04-10 08:59:39'),
(95, 25, 'FXlvcRTHV5Cqc/EJG43ntccQ+n98BMdBpj8JAoW+w9CAL8DK/FrRYr4d/vfaMhC5s+6RQF0juQoD+nI3ccigsw==', 'refresh_token', '2026-03-11 10:12:21', '2026-04-10 09:12:21'),
(96, 25, '3ASJOrtbNd/jA6o8Fn11r+dBIdH0qrCgXPHPs+XBP8xeySXNwWwggqwAsdSAufeX/NgA1vflk3Q4PrnggIXatg==', 'refresh_token', '2026-03-11 10:15:35', '2026-04-10 09:15:35'),
(97, 25, 'FZNUQa5ZZkol1d79AF+HwCTzfEktAjjvylQifCDaesZo6B7e7AY6iLYfkXHz5o+otGXU1biTE8owaR85cr5p+Q==', 'refresh_token', '2026-03-11 10:35:25', '2026-04-10 09:35:25'),
(98, 26, 'PUxslyHqb3nFJWOKIvs3MIGq3zTZeKYwU5jxoF95ZqzIHiaHN1u0tVoEmWvikTLQ6tfYjMISGGrgqh0GlRYD9g==', 'refresh_token', '2026-03-11 10:36:34', '2026-04-10 09:36:34'),
(99, 25, 'xLIRMy+E7ohpjioEhODzni1Dh8Gq20Wei10qvma5aW8xgY/CNhdBANThT+OBrjKh50Q4FSyIjCxN/CydPmWjJg==', 'refresh_token', '2026-03-13 06:11:12', '2026-04-12 05:11:12'),
(110, 36, 'NB/bh55CFpk04y/7W4ObuNFe1ToB4nRRc0L+G5HRPCZ7KOv+uRFpFI45rKeMuWKMLltsCetMHeSWM3djsTHcYQ==', 'refresh_token', '2026-03-16 07:54:32', '2026-04-15 06:54:32');

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
  `read_at` timestamp NULL DEFAULT NULL,
  `edited_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_for_everyone` tinyint(1) DEFAULT 0,
  `is_reported` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 4, 1, 'Français vers anglais', 'Apprenez l\'anglais facilement en tant que francophone', 1),
(7, 1, 2, 'English to Hungarian', 'Learn Hungarian easily as an English speaker', 1),
(8, 1, 3, 'English to German', 'Learn German easily as an English speaker', 1),
(9, 1, 6, 'English to Italian', 'Learn Italian easily as an English speaker', 1),
(10, 1, 7, 'English to Portuguese', 'Learn Portuguese easily as an English speaker', 1),
(11, 1, 8, 'English to Dutch', 'Learn Dutch easily as an English speaker', 1),
(12, 1, 9, 'English to Polish', 'Learn Polish easily as an English speaker', 1),
(13, 1, 10, 'English to Romanian', 'Learn Romanian easily as an English speaker', 1),
(14, 1, 11, 'English to Czech', 'Learn Czech easily as an English speaker', 1),
(15, 1, 12, 'English to Slovak', 'Learn Slovak easily as an English speaker', 1),
(16, 1, 13, 'English to Ukrainian', 'Learn Ukrainian easily as an English speaker', 1),
(17, 1, 14, 'English to Russian', 'Learn Russian easily as an English speaker', 1),
(18, 1, 15, 'English to Turkish', 'Learn Turkish easily as an English speaker', 1),
(19, 1, 16, 'English to Arabic', 'Learn Arabic easily as an English speaker', 1),
(20, 1, 17, 'English to Chinese', 'Learn Chinese easily as an English speaker', 1),
(21, 1, 18, 'English to Japanese', 'Learn Japanese easily as an English speaker', 1),
(22, 1, 19, 'English to Korean', 'Learn Korean easily as an English speaker', 1),
(23, 2, 1, 'Hungarian to English', 'Learn English easily as a Hungarian speaker', 1),
(24, 2, 3, 'Hungarian to German', 'Learn German easily as a Hungarian speaker', 1),
(25, 2, 4, 'Hungarian to French', 'Learn French easily as a Hungarian speaker', 1),
(26, 2, 5, 'Hungarian to Spanish', 'Learn Spanish easily as a Hungarian speaker', 1),
(27, 2, 6, 'Hungarian to Italian', 'Learn Italian easily as a Hungarian speaker', 1),
(28, 2, 7, 'Hungarian to Portuguese', 'Learn Portuguese easily as a Hungarian speaker', 1),
(29, 2, 8, 'Hungarian to Dutch', 'Learn Dutch easily as a Hungarian speaker', 1),
(30, 2, 9, 'Hungarian to Polish', 'Learn Polish easily as a Hungarian speaker', 1),
(31, 2, 10, 'Hungarian to Romanian', 'Learn Romanian easily as a Hungarian speaker', 1),
(41, 3, 1, 'German to English', 'Learn English easily as a German speaker', 1),
(42, 3, 2, 'German to Hungarian', 'Learn Hungarian easily as a German speaker', 1),
(43, 3, 4, 'German to French', 'Learn French easily as a German speaker', 1),
(44, 3, 6, 'German to Italian', 'Learn Italian easily as a German speaker', 1),
(45, 4, 3, 'Français vers allemand', 'Apprenez l\'allemand facilement en tant que francophone', 1),
(46, 4, 5, 'Français vers espagnol', 'Apprenez l\'espagnol facilement en tant que francophone', 1),
(47, 4, 6, 'Français vers italien', 'Apprenez l\'italien facilement en tant que francophone', 1),
(48, 4, 2, 'Français vers hongrois', 'Apprenez le hongrois facilement en tant que francophone', 1),
(49, 4, 10, 'Français vers roumain', 'Apprenez le roumain facilement en tant que francophone', 1),
(50, 5, 1, 'Español a inglés', 'Aprende inglés fácilmente como hispanohablante', 1),
(51, 5, 4, 'Español a francés', 'Aprende francés fácilmente como hispanohablante', 1),
(52, 5, 6, 'Español a italiano', 'Aprende italiano fácilmente como hispanohablante', 1),
(53, 5, 7, 'Español a portugués', 'Aprende portugués fácilmente como hispanohablante', 1),
(54, 5, 3, 'Español a alemán', 'Aprende alemán fácilmente como hispanohablante', 1);

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
(5, 3, 7, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(7, 1, 1, 'Introduce yourself', 'mixed', 3, 30, NULL, '2026-02-27 08:30:33'),
(8, 1, 1, 'Use the present tense', 'mixed', 4, 30, NULL, '2026-02-27 08:30:33'),
(9, 1, 1, 'Talk about things you do', 'listening', 5, 30, NULL, '2026-02-27 08:30:33'),
(10, 7, 11, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(11, 8, 12, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(12, 9, 13, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(13, 10, 14, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(14, 11, 15, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(15, 12, 16, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(16, 13, 17, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(17, 14, 18, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(18, 15, 19, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(19, 16, 20, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(20, 17, 21, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(21, 18, 22, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(22, 19, 23, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(23, 20, 24, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(24, 21, 25, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(25, 22, 26, 'Greetings', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(26, 23, 27, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(27, 24, 28, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(28, 25, 29, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(29, 26, 30, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(30, 27, 31, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(31, 28, 32, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(32, 29, 33, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(33, 30, 34, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(34, 31, 35, 'Köszönések', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(44, 41, 45, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(45, 42, 46, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(46, 43, 47, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(47, 44, 48, 'Begrüßungen', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(48, 45, 49, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(49, 46, 50, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(50, 47, 51, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(51, 48, 52, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(52, 49, 53, 'Salutations', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(53, 50, 54, 'Saludos', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(54, 51, 55, 'Saludos', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(55, 52, 56, 'Saludos', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(56, 53, 57, 'Saludos', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33'),
(57, 54, 58, 'Saludos', 'mixed', 1, 30, NULL, '2026-02-27 07:30:33');

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
(7, 1, 'multiple_choice', 'Which means “Hello”?', 'Bonjour', '[\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" },\r\n  { \"text\": \"Bonsoir\", \"audioUrl\": \"/media/audio/french/bonsoir.mp3\" },\r\n  { \"text\": \"Salut\",   \"audioUrl\": \"/media/audio/french/salut.mp3\" },\r\n  { \"text\": \"Merci\",   \"audioUrl\": \"/media/audio/french/merci.mp3\" }\r\n]', NULL),
(8, 1, 'multiple_choice', 'Which means “Good evening”?', 'Bonsoir', '[\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" },\r\n  { \"text\": \"Bonsoir\", \"audioUrl\": \"/media/audio/french/bonsoir.mp3\" },\r\n  { \"text\": \"Salut\",   \"audioUrl\": \"/media/audio/french/salut.mp3\" },\r\n  { \"text\": \"Au revoir\",   \"audioUrl\": \"/media/audio/french/au_revoir.mp3\" }\r\n]', NULL),
(9, 1, 'multiple_choice', 'Which means “Thank you”?', 'Merci', '[\r\n  { \"text\": \"Merci\",   \"audioUrl\": \"/media/audio/french/merci.mp3\" },\r\n  { \"text\": \"S’il vous plaît\",   \"audioUrl\": \"/media/audio/french/s_il_vous_plait.mp3\" },\r\n  { \"text\": \"Au revoir\", \"audioUrl\": \"/media/audio/french/au_revoir.mp3\" },\r\n  { \"text\": \"Bonjour\", \"audioUrl\": \"/media/audio/french/bonjour.mp3\" }\r\n]', NULL),
(10, 1, 'fill_blank', 'Fill: Bonj___ (Hello)', 'our', NULL, NULL),
(11, 1, 'fill_blank', 'Fill: Bonso__ (Good evening)', 'ir', NULL, NULL),
(12, 1, 'fill_blank', 'Fill: Sa___ (Hi)', 'lut', NULL, NULL),
(13, 2, 'text', 'One → French?', 'Un', NULL, 1),
(14, 2, 'text', 'Two → French?', 'Deux', NULL, 2),
(15, 2, 'text', 'Three → French?', 'Trois', NULL, 3),
(16, 2, 'text', 'Four → French?', 'Quatre', NULL, 4),
(17, 2, 'text', 'Five → French?', 'Cinq', NULL, 5),
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
(34, 7, 'text', 'I am (French)?', 'Je suis', NULL, NULL),
(35, 7, 'text', 'My name is (French)?', 'Je m\'appelle', NULL, NULL),
(36, 7, 'text', 'Nice to meet you (French)?', 'Enchanté', NULL, NULL),
(37, 7, 'text', 'I am from... (French)?', 'Je viens de...', NULL, NULL),
(38, 7, 'multiple_choice', 'Which means \"I am\"?', 'Je suis', '[{\"text\": \"Tu es\", \"audioUrl\": \"mediaaudiofrenchtues.mp3\"},\r\n    {\"text\": \"Je suis\", \"audioUrl\": \"mediaaudiofrenchjesuis.mp3\"},\r\n    {\"text\": \"Il est\", \"audioUrl\": \"mediaaudiofrenchilest.mp3\"},\r\n    {\"text\": \"Nous sommes\", \"audioUrl\": \"mediaaudiofrenchnoussommes.mp3\"}]', NULL),
(39, 7, 'multiple_choice', 'Which means \"My name is\"?', 'Je m\'appelle', '[{\"text\": \"Il s\'appelle\", \"audioUrl\": \"mediaaudiofrenchilsappelle.mp3\"},\r\n    {\"text\": \"Tu t\'appelles\", \"audioUrl\": \"mediaaudiofrenchtutappelles.mp3\"},\r\n    {\"text\": \"Je m\'appelle\", \"audioUrl\": \"mediaaudiofrenchjemappelle.mp3\"},\r\n    {\"text\": \"Nous nous appelons\", \"audioUrl\": \"mediaaudiofrenchnousnousappelons.mp3\"}]', NULL),
(40, 7, 'multiple_choice', 'What does \"Enchanté\" mean?', 'Nice to meet you', '[{\"text\": \"Goodbye\", \"audioUrl\": null},\r\n    {\"text\": \"Thank you\", \"audioUrl\": null},\r\n    {\"text\": \"Please\", \"audioUrl\": null},\r\n    {\"text\": \"Nice to meet you\", \"audioUrl\": \"mediaaudiofrenchenchante.mp3\"}]', NULL),
(41, 7, 'fill_blank', 'Fill: Je m\'___ Paul (My name is)', 'appelle', NULL, NULL),
(42, 7, 'fill_blank', 'Fill: ___ suis de Paris (I am from)', 'Je', NULL, NULL),
(43, 7, 'fill_blank', 'Fill: Enchan___ (Nice to meet you)', 'té', NULL, NULL),
(44, 7, 'multiple_choice', 'How do you say \"I am American\" (masculine)?', 'Je suis américain', '[{\"text\": \"Je suis américaine\", \"audioUrl\": \"mediaaudiofrenchjesuisamericaine.mp3\"},\r\n    {\"text\": \"Tu es américain\", \"audioUrl\": \"mediaaudiofrenchtuesamericain.mp3\"},\r\n    {\"text\": \"Je suis américain\", \"audioUrl\": \"mediaaudiofrenchjesuisamericain.mp3\"},\r\n    {\"text\": \"Il est américain\", \"audioUrl\": \"mediaaudiofrenchilestamericain.mp3\"}]', NULL),
(45, 7, 'text', 'And you? (French)?', 'Et toi?', NULL, NULL),
(46, 8, 'text', 'I speak (French)?', 'Je parle', NULL, NULL),
(47, 8, 'text', 'You speak (French)?', 'Tu parles', NULL, NULL),
(48, 8, 'text', 'He speaks (French)?', 'Il parle', NULL, NULL),
(49, 8, 'text', 'We speak (French)?', 'Nous parlons', NULL, NULL),
(50, 8, 'multiple_choice', 'Which means \"I eat\"?', 'Je mange', '[{\"text\": \"Tu manges\", \"audioUrl\": \"mediaaudiofrenchtumanges.mp3\"},\r\n    {\"text\": \"Je mange\", \"audioUrl\": \"mediaaudiofrenchjemange.mp3\"},\r\n    {\"text\": \"Il mange\", \"audioUrl\": \"mediaaudiofrenchilmange.mp3\"},\r\n    {\"text\": \"Nous mangeons\", \"audioUrl\": \"mediaaudiofrenchnousmangeons.mp3\"}]', NULL),
(51, 8, 'multiple_choice', 'Which means \"You eat\" (informal)?', 'Tu manges', '[{\"text\": \"Je mange\", \"audioUrl\": \"mediaaudiofrenchjemange.mp3\"},\r\n    {\"text\": \"Tu manges\", \"audioUrl\": \"mediaaudiofrenchtumanges.mp3\"},\r\n    {\"text\": \"Vous mangez\", \"audioUrl\": \"mediaaudiofrenchvousmangez.mp3\"},\r\n    {\"text\": \"Ils mangent\", \"audioUrl\": \"mediaaudiofrenchilsmangent.mp3\"}]', NULL),
(52, 8, 'multiple_choice', 'Translate: \"Il mange une pomme\"', 'He eats an apple', '[{\"text\": \"I eat an apple\", \"audioUrl\": null},\r\n    {\"text\": \"She eats an apple\", \"audioUrl\": null},\r\n    {\"text\": \"He eats an apple\", \"audioUrl\": \"mediaaudiofrenchilmangeunepomme.mp3\"},\r\n    {\"text\": \"We eat an apple\", \"audioUrl\": null}]', NULL),
(53, 8, 'fill_blank', 'Fill: Je parl___ français (I speak)', 'e', NULL, NULL),
(54, 8, 'fill_blank', 'Fill: Tu parl___ anglais (You speak)', 'es', NULL, NULL),
(55, 8, 'fill_blank', 'Fill: Nous parl___ espagnol (We speak)', 'ons', NULL, NULL),
(56, 8, 'multiple_choice', 'Which means \"They speak\"?', 'Ils parlent', '[{\"text\": \"Il parle\", \"audioUrl\": \"mediaaudiofrenchilparle.mp3\"},\r\n    {\"text\": \"Ils parlent\", \"audioUrl\": \"mediaaudiofrenchilsparlent.mp3\"},\r\n    {\"text\": \"Vous parlez\", \"audioUrl\": \"mediaaudiofrenchvousparlez.mp3\"},\r\n    {\"text\": \"Elles parlent\", \"audioUrl\": \"mediaaudiofrenchellesparlent.mp3\"}]', NULL),
(57, 8, 'text', 'To be (French)?', 'Être', NULL, NULL),
(58, 9, 'listening', 'Listen to the audio and select the correct sentence.', 'Je travaille tous les jours', '[{\"text\": \"Je mange une pomme\", \"audioUrl\": null},\r\n    {\"text\": \"Je travaille tous les jours\", \"audioUrl\": null},\r\n    {\"text\": \"Tu parles français\", \"audioUrl\": null},\r\n    {\"text\": \"Il aime voyager\", \"audioUrl\": null}]', 30),
(59, 10, 'text', 'Hello -> Hungarian?', 'Szia', NULL, NULL),
(60, 10, 'text', 'Good morning -> Hungarian?', 'Jó reggelt', NULL, NULL),
(61, 10, 'text', 'Good evening -> Hungarian?', 'Jó estét', NULL, NULL),
(62, 10, 'text', 'Goodbye -> Hungarian?', 'Viszlát', NULL, NULL),
(63, 10, 'text', 'Please -> Hungarian?', 'Kérem', NULL, NULL),
(64, 10, 'text', 'Thank you -> Hungarian?', 'Köszönöm', NULL, NULL),
(65, 10, 'multiple_choice', 'Which means \"Hello\"?', 'Szia', '[\"Szia\", \"Viszlát\", \"Kérem\", \"Köszönöm\"]', NULL),
(66, 10, 'multiple_choice', 'Which means \"Goodbye\"?', 'Viszlát', '[\"Köszönöm\", \"Szia\", \"Viszlát\", \"Kérem\"]', NULL),
(67, 10, 'multiple_choice', 'Which means \"Thank you\"?', 'Köszönöm', '[\"Kérem\", \"Viszlát\", \"Köszönöm\", \"Jó estét\"]', NULL),
(68, 10, 'fill_blank', 'Fill: Szi_ (Hello)', 'a', NULL, NULL),
(69, 10, 'fill_blank', 'Fill: Kére_ (Please)', 'm', NULL, NULL),
(70, 10, 'fill_blank', 'Fill: Köszönö_ (Thank you)', 'm', NULL, NULL),
(71, 11, 'text', 'Hello -> German?', 'Hallo', NULL, NULL),
(72, 11, 'text', 'Good morning -> German?', 'Guten Morgen', NULL, NULL),
(73, 11, 'text', 'Good evening -> German?', 'Guten Abend', NULL, NULL),
(74, 11, 'text', 'Goodbye -> German?', 'Auf Wiedersehen', NULL, NULL),
(75, 11, 'text', 'Please -> German?', 'Bitte', NULL, NULL),
(76, 11, 'text', 'Thank you -> German?', 'Danke', NULL, NULL),
(77, 11, 'multiple_choice', 'Which means \"Hello\"?', 'Hallo', '[\"Hallo\", \"Auf Wiedersehen\", \"Bitte\", \"Danke\"]', NULL),
(78, 11, 'multiple_choice', 'Which means \"Goodbye\"?', 'Auf Wiedersehen', '[\"Danke\", \"Hallo\", \"Auf Wiedersehen\", \"Bitte\"]', NULL),
(79, 11, 'multiple_choice', 'Which means \"Thank you\"?', 'Danke', '[\"Bitte\", \"Guten Abend\", \"Danke\", \"Hallo\"]', NULL),
(80, 11, 'fill_blank', 'Fill: Hall_ (Hello)', 'o', NULL, NULL),
(81, 11, 'fill_blank', 'Fill: Bitt_ (Please)', 'e', NULL, NULL),
(82, 11, 'fill_blank', 'Fill: Dank_ (Thank you)', 'e', NULL, NULL),
(83, 12, 'text', 'Hello -> Italian?', 'Ciao', NULL, NULL),
(84, 12, 'text', 'Good morning -> Italian?', 'Buongiorno', NULL, NULL),
(85, 12, 'text', 'Good evening -> Italian?', 'Buonasera', NULL, NULL),
(86, 12, 'text', 'Goodbye -> Italian?', 'Arrivederci', NULL, NULL),
(87, 12, 'text', 'Please -> Italian?', 'Per favore', NULL, NULL),
(88, 12, 'text', 'Thank you -> Italian?', 'Grazie', NULL, NULL),
(89, 12, 'multiple_choice', 'Which means \"Hello\"?', 'Ciao', '[\"Ciao\", \"Arrivederci\", \"Grazie\", \"Per favore\"]', NULL),
(90, 12, 'multiple_choice', 'Which means \"Goodbye\"?', 'Arrivederci', '[\"Buongiorno\", \"Per favore\", \"Arrivederci\", \"Grazie\"]', NULL),
(91, 12, 'multiple_choice', 'Which means \"Thank you\"?', 'Grazie', '[\"Per favore\", \"Grazie\", \"Ciao\", \"Buonasera\"]', NULL),
(92, 12, 'fill_blank', 'Fill: Cia_ (Hello)', 'o', NULL, NULL),
(93, 12, 'fill_blank', 'Fill: Grazi_ (Thank you)', 'e', NULL, NULL),
(94, 12, 'fill_blank', 'Fill: Arrivederc_ (Goodbye)', 'i', NULL, NULL),
(95, 13, 'text', 'Hello -> Portuguese?', 'Olá', NULL, NULL),
(96, 13, 'text', 'Good morning -> Portuguese?', 'Bom dia', NULL, NULL),
(97, 13, 'text', 'Good evening -> Portuguese?', 'Boa noite', NULL, NULL),
(98, 13, 'text', 'Goodbye -> Portuguese?', 'Adeus', NULL, NULL),
(99, 13, 'text', 'Please -> Portuguese?', 'Por favor', NULL, NULL),
(100, 13, 'text', 'Thank you -> Portuguese?', 'Obrigado', NULL, NULL),
(101, 13, 'multiple_choice', 'Which means \"Hello\"?', 'Olá', '[\"Olá\", \"Adeus\", \"Obrigado\", \"Por favor\"]', NULL),
(102, 13, 'multiple_choice', 'Which means \"Goodbye\"?', 'Adeus', '[\"Bom dia\", \"Por favor\", \"Adeus\", \"Obrigado\"]', NULL),
(103, 13, 'multiple_choice', 'Which means \"Thank you\"?', 'Obrigado', '[\"Por favor\", \"Boa noite\", \"Obrigado\", \"Olá\"]', NULL),
(104, 13, 'fill_blank', 'Fill: Ol_ (Hello)', 'á', NULL, NULL),
(105, 13, 'fill_blank', 'Fill: Obrigad_ (Thank you)', 'o', NULL, NULL),
(106, 13, 'fill_blank', 'Fill: Adeu_ (Goodbye)', 's', NULL, NULL),
(107, 14, 'text', 'Hello -> Dutch?', 'Hallo', NULL, NULL),
(108, 14, 'text', 'Good morning -> Dutch?', 'Goedemorgen', NULL, NULL),
(109, 14, 'text', 'Good evening -> Dutch?', 'Goedenavond', NULL, NULL),
(110, 14, 'text', 'Goodbye -> Dutch?', 'Tot ziens', NULL, NULL),
(111, 14, 'text', 'Please -> Dutch?', 'Alsjeblieft', NULL, NULL),
(112, 14, 'text', 'Thank you -> Dutch?', 'Dank je', NULL, NULL),
(113, 14, 'multiple_choice', 'Which means \"Hello\"?', 'Hallo', '[\"Hallo\", \"Tot ziens\", \"Dank je\", \"Alsjeblieft\"]', NULL),
(114, 14, 'multiple_choice', 'Which means \"Goodbye\"?', 'Tot ziens', '[\"Goedemorgen\", \"Alsjeblieft\", \"Tot ziens\", \"Dank je\"]', NULL),
(115, 14, 'multiple_choice', 'Which means \"Thank you\"?', 'Dank je', '[\"Alsjeblieft\", \"Goedenavond\", \"Dank je\", \"Hallo\"]', NULL),
(116, 14, 'fill_blank', 'Fill: Hall_ (Hello)', 'o', NULL, NULL),
(117, 14, 'fill_blank', 'Fill: Dank j_ (Thank you)', 'e', NULL, NULL),
(118, 14, 'fill_blank', 'Fill: Alsjeblief_ (Please)', 't', NULL, NULL),
(119, 15, 'text', 'Hello -> Polish?', 'Cześć', NULL, NULL),
(120, 15, 'text', 'Good morning -> Polish?', 'Dzień dobry', NULL, NULL),
(121, 15, 'text', 'Good evening -> Polish?', 'Dobry wieczór', NULL, NULL),
(122, 15, 'text', 'Goodbye -> Polish?', 'Do widzenia', NULL, NULL),
(123, 15, 'text', 'Please -> Polish?', 'Proszę', NULL, NULL),
(124, 15, 'text', 'Thank you -> Polish?', 'Dziękuję', NULL, NULL),
(125, 15, 'multiple_choice', 'Which means \"Hello\"?', 'Cześć', '[\"Cześć\", \"Do widzenia\", \"Dziękuję\", \"Proszę\"]', NULL),
(126, 15, 'multiple_choice', 'Which means \"Goodbye\"?', 'Do widzenia', '[\"Dzień dobry\", \"Proszę\", \"Do widzenia\", \"Dziękuję\"]', NULL),
(127, 15, 'multiple_choice', 'Which means \"Thank you\"?', 'Dziękuję', '[\"Proszę\", \"Dobry wieczór\", \"Dziękuję\", \"Cześć\"]', NULL),
(128, 15, 'fill_blank', 'Fill: Cześ_ (Hello)', 'ć', NULL, NULL),
(129, 15, 'fill_blank', 'Fill: Prosz_ (Please)', 'ę', NULL, NULL),
(130, 15, 'fill_blank', 'Fill: Dziękuj_ (Thank you)', 'ę', NULL, NULL),
(131, 16, 'text', 'Hello -> Romanian?', 'Salut', NULL, NULL),
(132, 16, 'text', 'Good morning -> Romanian?', 'Bună dimineața', NULL, NULL),
(133, 16, 'text', 'Good evening -> Romanian?', 'Bună seara', NULL, NULL),
(134, 16, 'text', 'Goodbye -> Romanian?', 'La revedere', NULL, NULL),
(135, 16, 'text', 'Please -> Romanian?', 'Te rog', NULL, NULL),
(136, 16, 'text', 'Thank you -> Romanian?', 'Mulțumesc', NULL, NULL),
(137, 16, 'multiple_choice', 'Which means \"Hello\"?', 'Salut', '[\"Salut\", \"La revedere\", \"Mulțumesc\", \"Te rog\"]', NULL),
(138, 16, 'multiple_choice', 'Which means \"Goodbye\"?', 'La revedere', '[\"Bună dimineața\", \"Te rog\", \"La revedere\", \"Mulțumesc\"]', NULL),
(139, 16, 'multiple_choice', 'Which means \"Thank you\"?', 'Mulțumesc', '[\"Te rog\", \"Bună seara\", \"Mulțumesc\", \"Salut\"]', NULL),
(140, 16, 'fill_blank', 'Fill: Salu_ (Hello)', 't', NULL, NULL),
(141, 16, 'fill_blank', 'Fill: Te ro_ (Please)', 'g', NULL, NULL),
(142, 16, 'fill_blank', 'Fill: Mulțumes_ (Thank you)', 'c', NULL, NULL),
(143, 17, 'text', 'Hello -> Czech?', 'Ahoj', NULL, NULL),
(144, 17, 'text', 'Good morning -> Czech?', 'Dobré ráno', NULL, NULL),
(145, 17, 'text', 'Good evening -> Czech?', 'Dobrý večer', NULL, NULL),
(146, 17, 'text', 'Goodbye -> Czech?', 'Na shledanou', NULL, NULL),
(147, 17, 'text', 'Please -> Czech?', 'Prosím', NULL, NULL),
(148, 17, 'text', 'Thank you -> Czech?', 'Děkuji', NULL, NULL),
(149, 17, 'multiple_choice', 'Which means \"Hello\"?', 'Ahoj', '[\"Ahoj\", \"Na shledanou\", \"Děkuji\", \"Prosím\"]', NULL),
(150, 17, 'multiple_choice', 'Which means \"Goodbye\"?', 'Na shledanou', '[\"Dobré ráno\", \"Prosím\", \"Na shledanou\", \"Děkuji\"]', NULL),
(151, 17, 'multiple_choice', 'Which means \"Thank you\"?', 'Děkuji', '[\"Prosím\", \"Dobrý večer\", \"Děkuji\", \"Ahoj\"]', NULL),
(152, 17, 'fill_blank', 'Fill: Aho_ (Hello)', 'j', NULL, NULL),
(153, 17, 'fill_blank', 'Fill: Prosí_ (Please)', 'm', NULL, NULL),
(154, 17, 'fill_blank', 'Fill: Děkuj_ (Thank you)', 'i', NULL, NULL),
(155, 18, 'text', 'Hello -> Slovak?', 'Ahoj', NULL, NULL),
(156, 18, 'text', 'Good morning -> Slovak?', 'Dobré ráno', NULL, NULL),
(157, 18, 'text', 'Good evening -> Slovak?', 'Dobrý večer', NULL, NULL),
(158, 18, 'text', 'Goodbye -> Slovak?', 'Dovidenia', NULL, NULL),
(159, 18, 'text', 'Please -> Slovak?', 'Prosím', NULL, NULL),
(160, 18, 'text', 'Thank you -> Slovak?', 'Ďakujem', NULL, NULL),
(161, 18, 'multiple_choice', 'Which means \"Hello\"?', 'Ahoj', '[\"Ahoj\", \"Dovidenia\", \"Ďakujem\", \"Prosím\"]', NULL),
(162, 18, 'multiple_choice', 'Which means \"Goodbye\"?', 'Dovidenia', '[\"Dobré ráno\", \"Prosím\", \"Dovidenia\", \"Ďakujem\"]', NULL),
(163, 18, 'multiple_choice', 'Which means \"Thank you\"?', 'Ďakujem', '[\"Prosím\", \"Dobrý večer\", \"Ďakujem\", \"Ahoj\"]', NULL),
(164, 18, 'fill_blank', 'Fill: Aho_ (Hello)', 'j', NULL, NULL),
(165, 18, 'fill_blank', 'Fill: Prosí_ (Please)', 'm', NULL, NULL),
(166, 18, 'fill_blank', 'Fill: Ďakuje_ (Thank you)', 'm', NULL, NULL),
(175, 19, 'multiple_choice', 'Which means \"Thank you\"?', 'Дякую', '[\"Будь ласка\", \"Добрий вечір\", \"Дякую\", \"Привіт\"]', NULL),
(176, 19, 'fill_blank', 'Fill: Приві_ (Hello)', 'т', NULL, NULL),
(177, 19, 'fill_blank', 'Fill: Будь ласк_ (Please)', 'а', NULL, NULL),
(178, 19, 'fill_blank', 'Fill: Дяку_ (Thank you)', 'ю', NULL, NULL),
(179, 20, 'text', 'Hello -> Russian?', 'Привет', NULL, NULL),
(180, 20, 'text', 'Good morning -> Russian?', 'Доброе утро', NULL, NULL),
(181, 20, 'text', 'Good evening -> Russian?', 'Добрый вечер', NULL, NULL),
(182, 20, 'text', 'Goodbye -> Russian?', 'До свидания', NULL, NULL),
(183, 20, 'text', 'Please -> Russian?', 'Пожалуйста', NULL, NULL),
(184, 20, 'text', 'Thank you -> Russian?', 'Спасибо', NULL, NULL),
(185, 20, 'multiple_choice', 'Which means \"Hello\"?', 'Привет', '[\"Привет\", \"До свидания\", \"Спасибо\", \"Пожалуйста\"]', NULL),
(186, 20, 'multiple_choice', 'Which means \"Goodbye\"?', 'До свидания', '[\"Доброе утро\", \"Пожалуйста\", \"До свидания\", \"Спасибо\"]', NULL),
(187, 20, 'multiple_choice', 'Which means \"Thank you\"?', 'Спасибо', '[\"Пожалуйста\", \"Добрый вечер\", \"Спасибо\", \"Привет\"]', NULL),
(188, 20, 'fill_blank', 'Fill: Приве_ (Hello)', 'т', NULL, NULL),
(189, 20, 'fill_blank', 'Fill: Пожалуйст_ (Please)', 'а', NULL, NULL),
(190, 20, 'fill_blank', 'Fill: Спасиб_ (Thank you)', 'о', NULL, NULL),
(191, 21, 'text', 'Hello -> Turkish?', 'Merhaba', NULL, NULL),
(192, 21, 'text', 'Good morning -> Turkish?', 'Günaydın', NULL, NULL),
(193, 21, 'text', 'Good evening -> Turkish?', 'İyi akşamlar', NULL, NULL),
(194, 21, 'text', 'Goodbye -> Turkish?', 'Hoşçakal', NULL, NULL),
(195, 21, 'text', 'Please -> Turkish?', 'Lütfen', NULL, NULL),
(196, 21, 'text', 'Thank you -> Turkish?', 'Teşekkür ederim', NULL, NULL),
(197, 21, 'multiple_choice', 'Which means \"Hello\"?', 'Merhaba', '[\"Merhaba\", \"Hoşçakal\", \"Lütfen\", \"Teşekkür ederim\"]', NULL),
(198, 21, 'multiple_choice', 'Which means \"Goodbye\"?', 'Hoşçakal', '[\"Günaydın\", \"Lütfen\", \"Hoşçakal\", \"Teşekkür ederim\"]', NULL),
(199, 21, 'multiple_choice', 'Which means \"Thank you\"?', 'Teşekkür ederim', '[\"Lütfen\", \"İyi akşamlar\", \"Teşekkür ederim\", \"Merhaba\"]', NULL),
(200, 21, 'fill_blank', 'Fill: Merhab_ (Hello)', 'a', NULL, NULL),
(201, 21, 'fill_blank', 'Fill: Lütfe_ (Please)', 'n', NULL, NULL),
(202, 21, 'fill_blank', 'Fill: Hoşçaka_ (Goodbye)', 'l', NULL, NULL),
(203, 22, 'text', 'Hello -> Arabic?', 'مرحبا', NULL, NULL),
(204, 22, 'text', 'Good morning -> Arabic?', 'صباح الخير', NULL, NULL),
(205, 22, 'text', 'Good evening -> Arabic?', 'مساء الخير', NULL, NULL),
(206, 22, 'text', 'Goodbye -> Arabic?', 'مع السلامة', NULL, NULL),
(207, 22, 'text', 'Please -> Arabic?', 'من فضلك', NULL, NULL),
(208, 22, 'text', 'Thank you -> Arabic?', 'شكرا', NULL, NULL),
(209, 22, 'multiple_choice', 'Which means \"Hello\"?', 'مرحبا', '[\"مرحبا\", \"مع السلامة\", \"من فضلك\", \"شكرا\"]', NULL),
(210, 22, 'multiple_choice', 'Which means \"Goodbye\"?', 'مع السلامة', '[\"صباح الخير\", \"من فضلك\", \"مع السلامة\", \"شكرا\"]', NULL),
(211, 22, 'multiple_choice', 'Which means \"Thank you\"?', 'شكرا', '[\"من فضلك\", \"مساء الخير\", \"شكرا\", \"مرحبا\"]', NULL),
(212, 22, 'fill_blank', 'Fill: مرحب_ (Hello)', 'ا', NULL, NULL),
(213, 22, 'fill_blank', 'Fill: شكر_ (Thank you)', 'ا', NULL, NULL),
(214, 22, 'fill_blank', 'Fill: من فضل_ (Please)', 'ك', NULL, NULL),
(215, 23, 'text', 'Hello -> Chinese?', '你好', NULL, NULL),
(216, 23, 'text', 'Good morning -> Chinese?', '早上好', NULL, NULL),
(217, 23, 'text', 'Good evening -> Chinese?', '晚上好', NULL, NULL),
(218, 23, 'text', 'Goodbye -> Chinese?', '再见', NULL, NULL),
(219, 23, 'text', 'Please -> Chinese?', '请', NULL, NULL),
(220, 23, 'text', 'Thank you -> Chinese?', '谢谢', NULL, NULL),
(221, 23, 'multiple_choice', 'Which means \"Hello\"?', '你好', '[\"你好\", \"再见\", \"请\", \"谢谢\"]', NULL),
(222, 23, 'multiple_choice', 'Which means \"Goodbye\"?', '再见', '[\"早上好\", \"请\", \"再见\", \"谢谢\"]', NULL),
(223, 23, 'multiple_choice', 'Which means \"Thank you\"?', '谢谢', '[\"请\", \"晚上好\", \"谢谢\", \"你好\"]', NULL),
(224, 23, 'fill_blank', 'Fill: 你_ (Hello)', '好', NULL, NULL),
(225, 23, 'fill_blank', 'Fill: 谢_ (Thank you)', '谢', NULL, NULL),
(226, 23, 'fill_blank', 'Fill: 再_ (Goodbye)', '见', NULL, NULL),
(227, 24, 'text', 'Hello -> Japanese?', 'こんにちは', NULL, NULL),
(228, 24, 'text', 'Good morning -> Japanese?', 'おはよう', NULL, NULL),
(229, 24, 'text', 'Good evening -> Japanese?', 'こんばんは', NULL, NULL),
(230, 24, 'text', 'Goodbye -> Japanese?', 'さようなら', NULL, NULL),
(231, 24, 'text', 'Please -> Japanese?', 'お願いします', NULL, NULL),
(232, 24, 'text', 'Thank you -> Japanese?', 'ありがとう', NULL, NULL),
(233, 24, 'multiple_choice', 'Which means \"Hello\"?', 'こんにちは', '[\"こんにちは\", \"さようなら\", \"お願いします\", \"ありがとう\"]', NULL),
(234, 24, 'multiple_choice', 'Which means \"Goodbye\"?', 'さようなら', '[\"おはよう\", \"お願いします\", \"さようなら\", \"ありがとう\"]', NULL),
(235, 24, 'multiple_choice', 'Which means \"Thank you\"?', 'ありがとう', '[\"お願いします\", \"こんばんは\", \"ありがとう\", \"こんにちは\"]', NULL),
(236, 24, 'fill_blank', 'Fill: こんにち_ (Hello)', 'は', NULL, NULL),
(237, 24, 'fill_blank', 'Fill: ありがと_ (Thank you)', 'う', NULL, NULL),
(238, 24, 'fill_blank', 'Fill: さような_ (Goodbye)', 'ら', NULL, NULL),
(239, 25, 'text', 'Hello -> Korean?', '안녕하세요', NULL, NULL),
(240, 25, 'text', 'Good morning -> Korean?', '좋은 아침입니다', NULL, NULL),
(241, 25, 'text', 'Good evening -> Korean?', '좋은 저녁입니다', NULL, NULL),
(242, 25, 'text', 'Goodbye -> Korean?', '안녕히 가세요', NULL, NULL),
(243, 25, 'text', 'Please -> Korean?', '제발', NULL, NULL),
(244, 25, 'text', 'Thank you -> Korean?', '감사합니다', NULL, NULL),
(245, 25, 'multiple_choice', 'Which means \"Hello\"?', '안녕하세요', '[\"안녕하세요\", \"안녕히 가세요\", \"제발\", \"감사합니다\"]', NULL),
(246, 25, 'multiple_choice', 'Which means \"Goodbye\"?', '안녕히 가세요', '[\"좋은 아침입니다\", \"제발\", \"안녕히 가세요\", \"감사합니다\"]', NULL),
(247, 25, 'multiple_choice', 'Which means \"Thank you\"?', '감사합니다', '[\"제발\", \"좋은 저녁입니다\", \"감사합니다\", \"안녕하세요\"]', NULL),
(248, 25, 'fill_blank', 'Fill: 안녕하세_ (Hello)', '요', NULL, NULL),
(249, 25, 'fill_blank', 'Fill: 감사합니_ (Thank you)', '다', NULL, NULL),
(250, 25, 'fill_blank', 'Fill: 제_ (Please)', '발', NULL, NULL),
(251, 26, 'text', 'Szia -> angol?', 'Hello', NULL, NULL),
(252, 26, 'text', 'Jó reggelt -> angol?', 'Good morning', NULL, NULL),
(253, 26, 'text', 'Jó estét -> angol?', 'Good evening', NULL, NULL),
(254, 26, 'text', 'Viszlát -> angol?', 'Goodbye', NULL, NULL),
(255, 26, 'text', 'Kérem -> angol?', 'Please', NULL, NULL),
(256, 26, 'text', 'Köszönöm -> angol?', 'Thank you', NULL, NULL),
(257, 26, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Hello', '[\"Hello\", \"Goodbye\", \"Please\", \"Thank you\"]', NULL),
(258, 26, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Goodbye', '[\"Thank you\", \"Hello\", \"Goodbye\", \"Please\"]', NULL),
(259, 26, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Thank you', '[\"Please\", \"Good evening\", \"Thank you\", \"Hello\"]', NULL),
(260, 26, 'fill_blank', 'Egészítsd ki: Hell_ (Szia)', 'o', NULL, NULL),
(261, 26, 'fill_blank', 'Egészítsd ki: Pleas_ (Kérem)', 'e', NULL, NULL),
(262, 26, 'fill_blank', 'Egészítsd ki: Thank yo_ (Köszönöm)', 'u', NULL, NULL),
(263, 27, 'text', 'Szia -> német?', 'Hallo', NULL, NULL),
(264, 27, 'text', 'Jó reggelt -> német?', 'Guten Morgen', NULL, NULL),
(265, 27, 'text', 'Jó estét -> német?', 'Guten Abend', NULL, NULL),
(266, 27, 'text', 'Viszlát -> német?', 'Auf Wiedersehen', NULL, NULL),
(267, 27, 'text', 'Kérem -> német?', 'Bitte', NULL, NULL),
(268, 27, 'text', 'Köszönöm -> német?', 'Danke', NULL, NULL),
(269, 27, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Hallo', '[\"Hallo\", \"Auf Wiedersehen\", \"Bitte\", \"Danke\"]', NULL),
(270, 27, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Auf Wiedersehen', '[\"Danke\", \"Hallo\", \"Auf Wiedersehen\", \"Bitte\"]', NULL),
(271, 27, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Danke', '[\"Bitte\", \"Guten Abend\", \"Danke\", \"Hallo\"]', NULL),
(272, 27, 'fill_blank', 'Egészítsd ki: Hall_ (Szia)', 'o', NULL, NULL),
(273, 27, 'fill_blank', 'Egészítsd ki: Bitt_ (Kérem)', 'e', NULL, NULL),
(274, 27, 'fill_blank', 'Egészítsd ki: Dank_ (Köszönöm)', 'e', NULL, NULL),
(275, 28, 'text', 'Szia -> francia?', 'Salut', NULL, NULL),
(276, 28, 'text', 'Jó reggelt -> francia?', 'Bonjour', NULL, NULL),
(277, 28, 'text', 'Jó estét -> francia?', 'Bonsoir', NULL, NULL),
(278, 28, 'text', 'Viszlát -> francia?', 'Au revoir', NULL, NULL),
(279, 28, 'text', 'Kérem -> francia?', 'S\'il vous plaît', NULL, NULL),
(280, 28, 'text', 'Köszönöm -> francia?', 'Merci', NULL, NULL),
(281, 28, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Salut', '[\"Salut\", \"Au revoir\", \"Merci\", \"S\'il vous plaît\"]', NULL),
(282, 28, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Au revoir', '[\"Bonjour\", \"S\'il vous plaît\", \"Au revoir\", \"Merci\"]', NULL),
(283, 28, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Merci', '[\"S\'il vous plaît\", \"Bonsoir\", \"Merci\", \"Salut\"]', NULL),
(284, 28, 'fill_blank', 'Egészítsd ki: Salu_ (Szia)', 't', NULL, NULL),
(285, 28, 'fill_blank', 'Egészítsd ki: Merc_ (Köszönöm)', 'i', NULL, NULL),
(286, 28, 'fill_blank', 'Egészítsd ki: Bonjou_ (Jó reggelt)', 'r', NULL, NULL),
(287, 29, 'text', 'Szia -> spanyol?', 'Hola', NULL, NULL),
(288, 29, 'text', 'Jó reggelt -> spanyol?', 'Buenos días', NULL, NULL),
(289, 29, 'text', 'Jó estét -> spanyol?', 'Buenas noches', NULL, NULL),
(290, 29, 'text', 'Viszlát -> spanyol?', 'Adiós', NULL, NULL),
(291, 29, 'text', 'Kérem -> spanyol?', 'Por favor', NULL, NULL),
(292, 29, 'text', 'Köszönöm -> spanyol?', 'Gracias', NULL, NULL),
(293, 29, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Hola', '[\"Hola\", \"Adiós\", \"Por favor\", \"Gracias\"]', NULL),
(294, 29, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Adiós', '[\"Buenos días\", \"Por favor\", \"Adiós\", \"Gracias\"]', NULL),
(295, 29, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Gracias', '[\"Por favor\", \"Buenas noches\", \"Gracias\", \"Hola\"]', NULL),
(296, 29, 'fill_blank', 'Egészítsd ki: Hol_ (Szia)', 'a', NULL, NULL),
(297, 29, 'fill_blank', 'Egészítsd ki: Gracia_ (Köszönöm)', 's', NULL, NULL),
(298, 29, 'fill_blank', 'Egészítsd ki: Adió_ (Viszlát)', 's', NULL, NULL),
(299, 30, 'text', 'Szia -> olasz?', 'Ciao', NULL, NULL),
(300, 30, 'text', 'Jó reggelt -> olasz?', 'Buongiorno', NULL, NULL),
(301, 30, 'text', 'Jó estét -> olasz?', 'Buonasera', NULL, NULL),
(302, 30, 'text', 'Viszlát -> olasz?', 'Arrivederci', NULL, NULL),
(303, 30, 'text', 'Kérem -> olasz?', 'Per favore', NULL, NULL),
(304, 30, 'text', 'Köszönöm -> olasz?', 'Grazie', NULL, NULL),
(305, 30, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Ciao', '[\"Ciao\", \"Arrivederci\", \"Per favore\", \"Grazie\"]', NULL),
(306, 30, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Arrivederci', '[\"Buongiorno\", \"Per favore\", \"Arrivederci\", \"Grazie\"]', NULL),
(307, 30, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Grazie', '[\"Per favore\", \"Buonasera\", \"Grazie\", \"Ciao\"]', NULL),
(308, 30, 'fill_blank', 'Egészítsd ki: Cia_ (Szia)', 'o', NULL, NULL),
(309, 30, 'fill_blank', 'Egészítsd ki: Grazi_ (Köszönöm)', 'e', NULL, NULL),
(310, 30, 'fill_blank', 'Egészítsd ki: Arrivederc_ (Viszlát)', 'i', NULL, NULL),
(311, 31, 'text', 'Szia -> portugál?', 'Olá', NULL, NULL),
(312, 31, 'text', 'Jó reggelt -> portugál?', 'Bom dia', NULL, NULL),
(313, 31, 'text', 'Jó estét -> portugál?', 'Boa noite', NULL, NULL),
(314, 31, 'text', 'Viszlát -> portugál?', 'Adeus', NULL, NULL),
(315, 31, 'text', 'Kérem -> portugál?', 'Por favor', NULL, NULL),
(316, 31, 'text', 'Köszönöm -> portugál?', 'Obrigado', NULL, NULL),
(317, 31, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Olá', '[\"Olá\", \"Adeus\", \"Por favor\", \"Obrigado\"]', NULL),
(318, 31, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Adeus', '[\"Bom dia\", \"Por favor\", \"Adeus\", \"Obrigado\"]', NULL),
(319, 31, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Obrigado', '[\"Por favor\", \"Boa noite\", \"Obrigado\", \"Olá\"]', NULL),
(320, 31, 'fill_blank', 'Egészítsd ki: Ol_ (Szia)', 'á', NULL, NULL),
(321, 31, 'fill_blank', 'Egészítsd ki: Obrigad_ (Köszönöm)', 'o', NULL, NULL),
(322, 31, 'fill_blank', 'Egészítsd ki: Adeu_ (Viszlát)', 's', NULL, NULL),
(323, 32, 'text', 'Szia -> holland?', 'Hallo', NULL, NULL),
(324, 32, 'text', 'Jó reggelt -> holland?', 'Goedemorgen', NULL, NULL),
(325, 32, 'text', 'Jó estét -> holland?', 'Goedenavond', NULL, NULL),
(326, 32, 'text', 'Viszlát -> holland?', 'Tot ziens', NULL, NULL),
(327, 32, 'text', 'Kérem -> holland?', 'Alsjeblieft', NULL, NULL),
(328, 32, 'text', 'Köszönöm -> holland?', 'Dank je', NULL, NULL),
(329, 32, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Hallo', '[\"Hallo\", \"Tot ziens\", \"Alsjeblieft\", \"Dank je\"]', NULL),
(330, 32, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Tot ziens', '[\"Goedemorgen\", \"Alsjeblieft\", \"Tot ziens\", \"Dank je\"]', NULL),
(331, 32, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Dank je', '[\"Alsjeblieft\", \"Goedenavond\", \"Dank je\", \"Hallo\"]', NULL),
(332, 32, 'fill_blank', 'Egészítsd ki: Hall_ (Szia)', 'o', NULL, NULL),
(333, 32, 'fill_blank', 'Egészítsd ki: Dank j_ (Köszönöm)', 'e', NULL, NULL),
(334, 32, 'fill_blank', 'Egészítsd ki: Alsjeblief_ (Kérem)', 't', NULL, NULL),
(335, 33, 'text', 'Szia -> lengyel?', 'Cześć', NULL, NULL),
(336, 33, 'text', 'Jó reggelt -> lengyel?', 'Dzień dobry', NULL, NULL),
(337, 33, 'text', 'Jó estét -> lengyel?', 'Dobry wieczór', NULL, NULL),
(338, 33, 'text', 'Viszlát -> lengyel?', 'Do widzenia', NULL, NULL),
(339, 33, 'text', 'Kérem -> lengyel?', 'Proszę', NULL, NULL),
(340, 33, 'text', 'Köszönöm -> lengyel?', 'Dziękuję', NULL, NULL),
(341, 33, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Cześć', '[\"Cześć\", \"Do widzenia\", \"Proszę\", \"Dziękuję\"]', NULL),
(342, 33, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'Do widzenia', '[\"Dzień dobry\", \"Proszę\", \"Do widzenia\", \"Dziękuję\"]', NULL),
(343, 33, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Dziękuję', '[\"Proszę\", \"Dobry wieczór\", \"Dziękuję\", \"Cześć\"]', NULL),
(344, 33, 'fill_blank', 'Egészítsd ki: Cześ_ (Szia)', 'ć', NULL, NULL),
(345, 33, 'fill_blank', 'Egészítsd ki: Prosz_ (Kérem)', 'ę', NULL, NULL),
(346, 33, 'fill_blank', 'Egészítsd ki: Dziękuj_ (Köszönöm)', 'ę', NULL, NULL),
(347, 34, 'text', 'Szia -> román?', 'Salut', NULL, NULL),
(348, 34, 'text', 'Jó reggelt -> román?', 'Bună dimineața', NULL, NULL),
(349, 34, 'text', 'Jó estét -> román?', 'Bună seara', NULL, NULL),
(350, 34, 'text', 'Viszlát -> román?', 'La revedere', NULL, NULL),
(351, 34, 'text', 'Kérem -> román?', 'Te rog', NULL, NULL),
(352, 34, 'text', 'Köszönöm -> román?', 'Mulțumesc', NULL, NULL),
(353, 34, 'multiple_choice', 'Melyik jelenti azt, hogy \"Szia\"?', 'Salut', '[\"Salut\", \"La revedere\", \"Te rog\", \"Mulțumesc\"]', NULL),
(354, 34, 'multiple_choice', 'Melyik jelenti azt, hogy \"Viszlát\"?', 'La revedere', '[\"Bună dimineața\", \"Te rog\", \"La revedere\", \"Mulțumesc\"]', NULL),
(355, 34, 'multiple_choice', 'Melyik jelenti azt, hogy \"Köszönöm\"?', 'Mulțumesc', '[\"Te rog\", \"Bună seara\", \"Mulțumesc\", \"Salut\"]', NULL),
(356, 34, 'fill_blank', 'Egészítsd ki: Salu_ (Szia)', 't', NULL, NULL),
(357, 34, 'fill_blank', 'Egészítsd ki: Te ro_ (Kérem)', 'g', NULL, NULL),
(358, 34, 'fill_blank', 'Egészítsd ki: Mulțumes_ (Köszönöm)', 'c', NULL, NULL),
(467, 44, 'text', 'Hallo -> Englisch?', 'Hello', NULL, NULL),
(468, 44, 'text', 'Guten Morgen -> Englisch?', 'Good morning', NULL, NULL),
(469, 44, 'text', 'Guten Abend -> Englisch?', 'Good evening', NULL, NULL),
(470, 44, 'text', 'Auf Wiedersehen -> Englisch?', 'Goodbye', NULL, NULL),
(471, 44, 'text', 'Bitte -> Englisch?', 'Please', NULL, NULL),
(472, 44, 'text', 'Danke -> Englisch?', 'Thank you', NULL, NULL),
(473, 44, 'multiple_choice', 'Was bedeutet \"Hallo\"?', 'Hello', '[\"Hello\", \"Goodbye\", \"Please\", \"Thank you\"]', NULL),
(474, 44, 'multiple_choice', 'Was bedeutet \"Auf Wiedersehen\"?', 'Goodbye', '[\"Thank you\", \"Hello\", \"Goodbye\", \"Please\"]', NULL),
(475, 44, 'multiple_choice', 'Was bedeutet \"Danke\"?', 'Thank you', '[\"Please\", \"Good evening\", \"Thank you\", \"Hello\"]', NULL),
(476, 44, 'fill_blank', 'Ergänze: Hell_ (Hallo)', 'o', NULL, NULL),
(477, 44, 'fill_blank', 'Ergänze: Pleas_ (Bitte)', 'e', NULL, NULL),
(478, 44, 'fill_blank', 'Ergänze: Thank yo_ (Danke)', 'u', NULL, NULL),
(479, 45, 'text', 'Hallo -> Ungarisch?', 'Szia', NULL, NULL),
(480, 45, 'text', 'Guten Morgen -> Ungarisch?', 'Jó reggelt', NULL, NULL),
(481, 45, 'text', 'Guten Abend -> Ungarisch?', 'Jó estét', NULL, NULL),
(482, 45, 'text', 'Auf Wiedersehen -> Ungarisch?', 'Viszlát', NULL, NULL),
(483, 45, 'text', 'Bitte -> Ungarisch?', 'Kérem', NULL, NULL),
(484, 45, 'text', 'Danke -> Ungarisch?', 'Köszönöm', NULL, NULL),
(485, 45, 'multiple_choice', 'Was bedeutet \"Hallo\"?', 'Szia', '[\"Szia\", \"Viszlát\", \"Kérem\", \"Köszönöm\"]', NULL),
(486, 45, 'multiple_choice', 'Was bedeutet \"Auf Wiedersehen\"?', 'Viszlát', '[\"Köszönöm\", \"Szia\", \"Viszlát\", \"Kérem\"]', NULL),
(487, 45, 'multiple_choice', 'Was bedeutet \"Danke\"?', 'Köszönöm', '[\"Kérem\", \"Jó estét\", \"Köszönöm\", \"Szia\"]', NULL),
(488, 45, 'fill_blank', 'Ergänze: Szi_ (Hallo)', 'a', NULL, NULL),
(489, 45, 'fill_blank', 'Ergänze: Kére_ (Bitte)', 'm', NULL, NULL),
(490, 45, 'fill_blank', 'Ergänze: Köszönö_ (Danke)', 'm', NULL, NULL),
(491, 46, 'text', 'Hallo -> Französisch?', 'Salut', NULL, NULL),
(492, 46, 'text', 'Guten Morgen -> Französisch?', 'Bonjour', NULL, NULL),
(493, 46, 'text', 'Guten Abend -> Französisch?', 'Bonsoir', NULL, NULL),
(494, 46, 'text', 'Auf Wiedersehen -> Französisch?', 'Au revoir', NULL, NULL),
(495, 46, 'text', 'Bitte -> Französisch?', 'S\'il vous plaît', NULL, NULL),
(496, 46, 'text', 'Danke -> Französisch?', 'Merci', NULL, NULL),
(497, 46, 'multiple_choice', 'Was bedeutet \"Hallo\"?', 'Salut', '[\"Salut\", \"Au revoir\", \"Merci\", \"S\'il vous plaît\"]', NULL),
(498, 46, 'multiple_choice', 'Was bedeutet \"Auf Wiedersehen\"?', 'Au revoir', '[\"Bonjour\", \"S\'il vous plaît\", \"Au revoir\", \"Merci\"]', NULL),
(499, 46, 'multiple_choice', 'Was bedeutet \"Danke\"?', 'Merci', '[\"S\'il vous plaît\", \"Bonsoir\", \"Merci\", \"Salut\"]', NULL),
(500, 46, 'fill_blank', 'Ergänze: Salu_ (Hallo)', 't', NULL, NULL),
(501, 46, 'fill_blank', 'Ergänze: Merc_ (Danke)', 'i', NULL, NULL),
(502, 46, 'fill_blank', 'Ergänze: Bonjou_ (Guten Morgen)', 'r', NULL, NULL),
(503, 47, 'text', 'Hallo -> Italienisch?', 'Ciao', NULL, NULL),
(504, 47, 'text', 'Guten Morgen -> Italienisch?', 'Buongiorno', NULL, NULL),
(505, 47, 'text', 'Guten Abend -> Italienisch?', 'Buonasera', NULL, NULL),
(506, 47, 'text', 'Auf Wiedersehen -> Italienisch?', 'Arrivederci', NULL, NULL),
(507, 47, 'text', 'Bitte -> Italienisch?', 'Per favore', NULL, NULL),
(508, 47, 'text', 'Danke -> Italienisch?', 'Grazie', NULL, NULL),
(509, 47, 'multiple_choice', 'Was bedeutet \"Hallo\"?', 'Ciao', '[\"Ciao\", \"Arrivederci\", \"Per favore\", \"Grazie\"]', NULL),
(510, 47, 'multiple_choice', 'Was bedeutet \"Auf Wiedersehen\"?', 'Arrivederci', '[\"Buongiorno\", \"Per favore\", \"Arrivederci\", \"Grazie\"]', NULL),
(511, 47, 'multiple_choice', 'Was bedeutet \"Danke\"?', 'Grazie', '[\"Per favore\", \"Buonasera\", \"Grazie\", \"Ciao\"]', NULL),
(512, 47, 'fill_blank', 'Ergänze: Cia_ (Hallo)', 'o', NULL, NULL),
(513, 47, 'fill_blank', 'Ergänze: Grazi_ (Danke)', 'e', NULL, NULL),
(514, 47, 'fill_blank', 'Ergänze: Arrivederc_ (Auf Wiedersehen)', 'i', NULL, NULL),
(515, 5, 'text', 'Bonjour -> anglais ?', 'Hello', NULL, NULL),
(516, 5, 'text', 'Bonsoir -> anglais ?', 'Good evening', NULL, NULL),
(517, 5, 'text', 'Salut -> anglais ?', 'Hi', NULL, NULL),
(518, 5, 'text', 'Au revoir -> anglais ?', 'Goodbye', NULL, NULL),
(519, 5, 'text', 'S\'il vous plaît -> anglais ?', 'Please', NULL, NULL),
(520, 5, 'text', 'Merci -> anglais ?', 'Thank you', NULL, NULL),
(521, 5, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Hello', '[\"Hello\", \"Goodbye\", \"Please\", \"Thank you\"]', NULL),
(522, 5, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'Goodbye', '[\"Thank you\", \"Hello\", \"Goodbye\", \"Please\"]', NULL),
(523, 5, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Thank you', '[\"Please\", \"Good evening\", \"Thank you\", \"Hello\"]', NULL),
(524, 5, 'fill_blank', 'Complète : Hell_ (Bonjour)', 'o', NULL, NULL),
(525, 5, 'fill_blank', 'Complète : Pleas_ (S\'il vous plaît)', 'e', NULL, NULL),
(526, 5, 'fill_blank', 'Complète : Thank yo_ (Merci)', 'u', NULL, NULL),
(527, 48, 'text', 'Bonjour -> allemand ?', 'Hallo', NULL, NULL),
(528, 48, 'text', 'Bonsoir -> allemand ?', 'Guten Abend', NULL, NULL),
(529, 48, 'text', 'Salut -> allemand ?', 'Hallo', NULL, NULL),
(530, 48, 'text', 'Au revoir -> allemand ?', 'Auf Wiedersehen', NULL, NULL),
(531, 48, 'text', 'S\'il vous plaît -> allemand ?', 'Bitte', NULL, NULL),
(532, 48, 'text', 'Merci -> allemand ?', 'Danke', NULL, NULL),
(533, 48, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Hallo', '[\"Hallo\", \"Auf Wiedersehen\", \"Bitte\", \"Danke\"]', NULL),
(534, 48, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'Auf Wiedersehen', '[\"Danke\", \"Hallo\", \"Auf Wiedersehen\", \"Bitte\"]', NULL),
(535, 48, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Danke', '[\"Bitte\", \"Guten Abend\", \"Danke\", \"Hallo\"]', NULL),
(536, 48, 'fill_blank', 'Complète : Hall_ (Bonjour)', 'o', NULL, NULL),
(537, 48, 'fill_blank', 'Complète : Bitt_ (S\'il vous plaît)', 'e', NULL, NULL),
(538, 48, 'fill_blank', 'Complète : Dank_ (Merci)', 'e', NULL, NULL),
(539, 49, 'text', 'Bonjour -> espagnol ?', 'Hola', NULL, NULL),
(540, 49, 'text', 'Bonsoir -> espagnol ?', 'Buenas noches', NULL, NULL),
(541, 49, 'text', 'Salut -> espagnol ?', 'Hola', NULL, NULL),
(542, 49, 'text', 'Au revoir -> espagnol ?', 'Adiós', NULL, NULL),
(543, 49, 'text', 'S\'il vous plaît -> espagnol ?', 'Por favor', NULL, NULL),
(544, 49, 'text', 'Merci -> espagnol ?', 'Gracias', NULL, NULL),
(545, 49, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Hola', '[\"Hola\", \"Adiós\", \"Por favor\", \"Gracias\"]', NULL),
(546, 49, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'Adiós', '[\"Buenos días\", \"Por favor\", \"Adiós\", \"Gracias\"]', NULL),
(547, 49, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Gracias', '[\"Por favor\", \"Buenas noches\", \"Gracias\", \"Hola\"]', NULL),
(548, 49, 'fill_blank', 'Complète : Hol_ (Bonjour)', 'a', NULL, NULL),
(549, 49, 'fill_blank', 'Complète : Gracia_ (Merci)', 's', NULL, NULL),
(550, 49, 'fill_blank', 'Complète : Adió_ (Au revoir)', 's', NULL, NULL),
(551, 50, 'text', 'Bonjour -> italien ?', 'Buongiorno', NULL, NULL),
(552, 50, 'text', 'Bonsoir -> italien ?', 'Buonasera', NULL, NULL),
(553, 50, 'text', 'Salut -> italien ?', 'Ciao', NULL, NULL),
(554, 50, 'text', 'Au revoir -> italien ?', 'Arrivederci', NULL, NULL),
(555, 50, 'text', 'S\'il vous plaît -> italien ?', 'Per favore', NULL, NULL),
(556, 50, 'text', 'Merci -> italien ?', 'Grazie', NULL, NULL),
(557, 50, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Buongiorno', '[\"Buongiorno\", \"Arrivederci\", \"Per favore\", \"Grazie\"]', NULL),
(558, 50, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'Arrivederci', '[\"Buonasera\", \"Per favore\", \"Arrivederci\", \"Grazie\"]', NULL),
(559, 50, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Grazie', '[\"Per favore\", \"Buonasera\", \"Grazie\", \"Ciao\"]', NULL),
(560, 50, 'fill_blank', 'Complète : Cia_ (Salut)', 'o', NULL, NULL),
(561, 50, 'fill_blank', 'Complète : Grazi_ (Merci)', 'e', NULL, NULL),
(562, 50, 'fill_blank', 'Complète : Arrivederc_ (Au revoir)', 'i', NULL, NULL),
(563, 51, 'text', 'Bonjour -> hongrois ?', 'Szia', NULL, NULL),
(564, 51, 'text', 'Bonsoir -> hongrois ?', 'Jó estét', NULL, NULL),
(565, 51, 'text', 'Salut -> hongrois ?', 'Szia', NULL, NULL),
(566, 51, 'text', 'Au revoir -> hongrois ?', 'Viszlát', NULL, NULL),
(567, 51, 'text', 'S\'il vous plaît -> hongrois ?', 'Kérem', NULL, NULL),
(568, 51, 'text', 'Merci -> hongrois ?', 'Köszönöm', NULL, NULL),
(569, 51, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Szia', '[\"Szia\", \"Viszlát\", \"Kérem\", \"Köszönöm\"]', NULL),
(570, 51, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'Viszlát', '[\"Köszönöm\", \"Szia\", \"Viszlát\", \"Kérem\"]', NULL),
(571, 51, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Köszönöm', '[\"Kérem\", \"Jó estét\", \"Köszönöm\", \"Szia\"]', NULL),
(572, 51, 'fill_blank', 'Complète : Szi_ (Bonjour)', 'a', NULL, NULL),
(573, 51, 'fill_blank', 'Complète : Kére_ (S\'il vous plaît)', 'm', NULL, NULL),
(574, 51, 'fill_blank', 'Complète : Köszönö_ (Merci)', 'm', NULL, NULL),
(575, 52, 'text', 'Bonjour -> roumain ?', 'Bună ziua', NULL, NULL),
(576, 52, 'text', 'Bonsoir -> roumain ?', 'Bună seara', NULL, NULL),
(577, 52, 'text', 'Salut -> roumain ?', 'Salut', NULL, NULL),
(578, 52, 'text', 'Au revoir -> roumain ?', 'La revedere', NULL, NULL),
(579, 52, 'text', 'S\'il vous plaît -> roumain ?', 'Te rog', NULL, NULL),
(580, 52, 'text', 'Merci -> roumain ?', 'Mulțumesc', NULL, NULL),
(581, 52, 'multiple_choice', 'Que signifie \"Bonjour\" ?', 'Bună ziua', '[\"Bună ziua\", \"La revedere\", \"Te rog\", \"Mulțumesc\"]', NULL),
(582, 52, 'multiple_choice', 'Que signifie \"Au revoir\" ?', 'La revedere', '[\"Bună seara\", \"Te rog\", \"La revedere\", \"Mulțumesc\"]', NULL),
(583, 52, 'multiple_choice', 'Que signifie \"Merci\" ?', 'Mulțumesc', '[\"Te rog\", \"Bună seara\", \"Mulțumesc\", \"Salut\"]', NULL),
(584, 52, 'fill_blank', 'Complète : Salu_ (Salut)', 't', NULL, NULL),
(585, 52, 'fill_blank', 'Complète : Te ro_ (S\'il vous plaît)', 'g', NULL, NULL),
(586, 52, 'fill_blank', 'Complète : Mulțumes_ (Merci)', 'c', NULL, NULL),
(587, 53, 'text', 'Hola -> inglés?', 'Hello', NULL, NULL),
(588, 53, 'text', 'Buenos días -> inglés?', 'Good morning', NULL, NULL),
(589, 53, 'text', 'Buenas noches -> inglés?', 'Good evening', NULL, NULL),
(590, 53, 'text', 'Adiós -> inglés?', 'Goodbye', NULL, NULL),
(591, 53, 'text', 'Por favor -> inglés?', 'Please', NULL, NULL),
(592, 53, 'text', 'Gracias -> inglés?', 'Thank you', NULL, NULL),
(593, 53, 'multiple_choice', '¿Qué significa \"Hola\"?', 'Hello', '[\"Hello\", \"Goodbye\", \"Please\", \"Thank you\"]', NULL),
(594, 53, 'multiple_choice', '¿Qué significa \"Adiós\"?', 'Goodbye', '[\"Thank you\", \"Hello\", \"Goodbye\", \"Please\"]', NULL),
(595, 53, 'multiple_choice', '¿Qué significa \"Gracias\"?', 'Thank you', '[\"Please\", \"Good evening\", \"Thank you\", \"Hello\"]', NULL),
(596, 53, 'fill_blank', 'Completa: Hell_ (Hola)', 'o', NULL, NULL),
(597, 53, 'fill_blank', 'Completa: Pleas_ (Por favor)', 'e', NULL, NULL),
(598, 53, 'fill_blank', 'Completa: Thank yo_ (Gracias)', 'u', NULL, NULL),
(599, 54, 'text', 'Hola -> francés?', 'Bonjour', NULL, NULL),
(600, 54, 'text', 'Buenos días -> francés?', 'Bonjour', NULL, NULL),
(601, 54, 'text', 'Buenas noches -> francés?', 'Bonsoir', NULL, NULL),
(602, 54, 'text', 'Adiós -> francés?', 'Au revoir', NULL, NULL),
(603, 54, 'text', 'Por favor -> francés?', 'S\'il vous plaît', NULL, NULL),
(604, 54, 'text', 'Gracias -> francés?', 'Merci', NULL, NULL),
(605, 54, 'multiple_choice', '¿Qué significa \"Hola\"?', 'Bonjour', '[\"Bonjour\", \"Au revoir\", \"Merci\", \"S\'il vous plaît\"]', NULL),
(606, 54, 'multiple_choice', '¿Qué significa \"Adiós\"?', 'Au revoir', '[\"Bonjour\", \"S\'il vous plaît\", \"Au revoir\", \"Merci\"]', NULL),
(607, 54, 'multiple_choice', '¿Qué significa \"Gracias\"?', 'Merci', '[\"S\'il vous plaît\", \"Bonsoir\", \"Merci\", \"Bonjour\"]', NULL),
(608, 54, 'fill_blank', 'Completa: Bonjou_ (Hola)', 'r', NULL, NULL),
(609, 54, 'fill_blank', 'Completa: Merc_ (Gracias)', 'i', NULL, NULL),
(610, 54, 'fill_blank', 'Completa: Salu_ (Hola informal)', 't', NULL, NULL),
(611, 55, 'text', 'Hola -> italiano?', 'Ciao', NULL, NULL),
(612, 55, 'text', 'Buenos días -> italiano?', 'Buongiorno', NULL, NULL),
(613, 55, 'text', 'Buenas noches -> italiano?', 'Buonasera', NULL, NULL),
(614, 55, 'text', 'Adiós -> italiano?', 'Arrivederci', NULL, NULL),
(615, 55, 'text', 'Por favor -> italiano?', 'Per favore', NULL, NULL),
(616, 55, 'text', 'Gracias -> italiano?', 'Grazie', NULL, NULL),
(617, 55, 'multiple_choice', '¿Qué significa \"Hola\"?', 'Ciao', '[\"Ciao\", \"Arrivederci\", \"Per favore\", \"Grazie\"]', NULL),
(618, 55, 'multiple_choice', '¿Qué significa \"Adiós\"?', 'Arrivederci', '[\"Buongiorno\", \"Per favore\", \"Arrivederci\", \"Grazie\"]', NULL),
(619, 55, 'multiple_choice', '¿Qué significa \"Gracias\"?', 'Grazie', '[\"Per favore\", \"Buonasera\", \"Grazie\", \"Ciao\"]', NULL),
(620, 55, 'fill_blank', 'Completa: Cia_ (Hola)', 'o', NULL, NULL),
(621, 55, 'fill_blank', 'Completa: Grazi_ (Gracias)', 'e', NULL, NULL),
(622, 55, 'fill_blank', 'Completa: Arrivederc_ (Adiós)', 'i', NULL, NULL),
(623, 56, 'text', 'Hola -> portugués?', 'Olá', NULL, NULL),
(624, 56, 'text', 'Buenos días -> portugués?', 'Bom dia', NULL, NULL),
(625, 56, 'text', 'Buenas noches -> portugués?', 'Boa noite', NULL, NULL),
(626, 56, 'text', 'Adiós -> portugués?', 'Adeus', NULL, NULL),
(627, 56, 'text', 'Por favor -> portugués?', 'Por favor', NULL, NULL),
(628, 56, 'text', 'Gracias -> portugués?', 'Obrigado', NULL, NULL),
(629, 56, 'multiple_choice', '¿Qué significa \"Hola\"?', 'Olá', '[\"Olá\", \"Adeus\", \"Por favor\", \"Obrigado\"]', NULL),
(630, 56, 'multiple_choice', '¿Qué significa \"Adiós\"?', 'Adeus', '[\"Bom dia\", \"Por favor\", \"Adeus\", \"Obrigado\"]', NULL),
(631, 56, 'multiple_choice', '¿Qué significa \"Gracias\"?', 'Obrigado', '[\"Por favor\", \"Boa noite\", \"Obrigado\", \"Olá\"]', NULL),
(632, 56, 'fill_blank', 'Completa: Ol_ (Hola)', 'á', NULL, NULL),
(633, 56, 'fill_blank', 'Completa: Obrigad_ (Gracias)', 'o', NULL, NULL),
(634, 56, 'fill_blank', 'Completa: Adeu_ (Adiós)', 's', NULL, NULL),
(635, 57, 'text', 'Hola -> alemán?', 'Hallo', NULL, NULL),
(636, 57, 'text', 'Buenos días -> alemán?', 'Guten Morgen', NULL, NULL),
(637, 57, 'text', 'Buenas noches -> alemán?', 'Guten Abend', NULL, NULL),
(638, 57, 'text', 'Adiós -> alemán?', 'Auf Wiedersehen', NULL, NULL),
(639, 57, 'text', 'Por favor -> alemán?', 'Bitte', NULL, NULL),
(640, 57, 'text', 'Gracias -> alemán?', 'Danke', NULL, NULL),
(641, 57, 'multiple_choice', '¿Qué significa \"Hola\"?', 'Hallo', '[\"Hallo\", \"Auf Wiedersehen\", \"Bitte\", \"Danke\"]', NULL),
(642, 57, 'multiple_choice', '¿Qué significa \"Adiós\"?', 'Auf Wiedersehen', '[\"Danke\", \"Hallo\", \"Auf Wiedersehen\", \"Bitte\"]', NULL),
(643, 57, 'multiple_choice', '¿Qué significa \"Gracias\"?', 'Danke', '[\"Bitte\", \"Guten Abend\", \"Danke\", \"Hallo\"]', NULL),
(644, 57, 'fill_blank', 'Completa: Hall_ (Hola)', 'o', NULL, NULL),
(645, 57, 'fill_blank', 'Completa: Bitt_ (Por favor)', 'e', NULL, NULL),
(646, 57, 'fill_blank', 'Completa: Dank_ (Gracias)', 'e', NULL, NULL);

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
(2, 3, 'friend_request', 'TestV3 sent you a friend request!', 0, '2026-02-03 09:47:03'),
(3, 9, NULL, 'TestV3_3 sent you a friend request!', 0, '2026-02-03 09:50:22'),
(5, 9, 'chat_message', 'You received a new message.', 0, '2026-03-09 05:50:49');

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
  `type` enum('lesson','practice') DEFAULT 'lesson',
  `target_amount` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `quests`
--

INSERT INTO `quests` (`id`, `title`, `description`, `reward_xp`, `duration`, `type`, `target_amount`) VALUES
(1, 'Daily Warmup', 'Complete your first lesson of the day.', 10, 'daily', 'lesson', 1),
(2, 'Dedicated Learner', 'Complete 3 lessons today.', 50, 'daily', 'lesson', 3),
(3, 'Unit Conqueror', 'Finish a complete unit.', 100, 'daily', 'lesson', 1);

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
  `ui_language` varchar(10) DEFAULT 'en',
  `notifications_enabled` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `settings`
--

INSERT INTO `settings` (`id`, `user_id`, `dark_mode`, `sound_enabled`, `ui_language`, `notifications_enabled`) VALUES
(1, 9, 1, 1, 'en', 1),
(2, 25, 0, 1, 'en', 1);

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
(1, 9, 'Yearly', 12, '2026-02-03', '2027-02-03', 1, 'internal', NULL),
(2, 25, 'Premium', 1, '2026-03-11', '2026-04-11', 1, 'System', '82a0223c-e8a7-405a-80a1-99a055791b8f'),
(3, 26, 'Premium', 1, '2026-03-11', '2026-04-11', 1, 'System', 'f6184356-a1cd-468d-9166-851dfc284af2');

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
(7, 3, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(11, 7, 'Unit 1: Basics', 'Learn greetings and polite phrases in Hungarian.', 1),
(12, 8, 'Unit 1: Basics', 'Learn greetings and polite phrases in German.', 1),
(13, 9, 'Unit 1: Basics', 'Learn greetings and polite phrases in Italian.', 1),
(14, 10, 'Unit 1: Basics', 'Learn greetings and polite phrases in Portuguese.', 1),
(15, 11, 'Unit 1: Basics', 'Learn greetings and polite phrases in Dutch.', 1),
(16, 12, 'Unit 1: Basics', 'Learn greetings and polite phrases in Polish.', 1),
(17, 13, 'Unit 1: Basics', 'Learn greetings and polite phrases in Romanian.', 1),
(18, 14, 'Unit 1: Basics', 'Learn greetings and polite phrases in Czech.', 1),
(19, 15, 'Unit 1: Basics', 'Learn greetings and polite phrases in Slovak.', 1),
(20, 16, 'Unit 1: Basics', 'Learn greetings and polite phrases in Ukrainian.', 1),
(21, 17, 'Unit 1: Basics', 'Learn greetings and polite phrases in Russian.', 1),
(22, 18, 'Unit 1: Basics', 'Learn greetings and polite phrases in Turkish.', 1),
(23, 19, 'Unit 1: Basics', 'Learn greetings and polite phrases in Arabic.', 1),
(24, 20, 'Unit 1: Basics', 'Learn greetings and polite phrases in Chinese.', 1),
(25, 21, 'Unit 1: Basics', 'Learn greetings and polite phrases in Japanese.', 1),
(26, 22, 'Unit 1: Basics', 'Learn greetings and polite phrases in Korean.', 1),
(27, 23, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(28, 24, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(29, 25, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(30, 26, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(31, 27, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(32, 28, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(33, 29, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(34, 30, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(35, 31, '1. egység: Alapok', 'Alap köszönések és udvarias kifejezések.', 1),
(45, 41, 'Einheit 1: Grundlagen', 'Lerne grundlegende Begrüßungen und höfliche Ausdrücke.', 1),
(46, 42, 'Einheit 1: Grundlagen', 'Lerne grundlegende Begrüßungen und höfliche Ausdrücke.', 1),
(47, 43, 'Einheit 1: Grundlagen', 'Lerne grundlegende Begrüßungen und höfliche Ausdrücke.', 1),
(48, 44, 'Einheit 1: Grundlagen', 'Lerne grundlegende Begrüßungen und höfliche Ausdrücke.', 1),
(49, 45, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(50, 46, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(51, 47, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(52, 48, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(53, 49, 'Unité 1 : Les bases', 'Apprenez les salutations et les formules de politesse.', 1),
(54, 50, 'Unidad 1: Conceptos básicos', 'Aprende saludos y expresiones de cortesía.', 1),
(55, 51, 'Unidad 1: Conceptos básicos', 'Aprende saludos y expresiones de cortesía.', 1),
(56, 52, 'Unidad 1: Conceptos básicos', 'Aprende saludos y expresiones de cortesía.', 1),
(57, 53, 'Unidad 1: Conceptos básicos', 'Aprende saludos y expresiones de cortesía.', 1),
(58, 54, 'Unidad 1: Conceptos básicos', 'Aprende saludos y expresiones de cortesía.', 1);

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_heart_refill_at` datetime DEFAULT NULL,
  `streak` int(11) DEFAULT 0,
  `last_lesson_date` datetime DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `display_name`, `email`, `password_hash`, `profile_pic_url`, `hearts`, `coins`, `is_premium`, `role`, `created_at`, `last_heart_refill_at`, `streak`, `last_lesson_date`, `is_verified`, `verification_token`, `reset_token`, `reset_token_expiry`) VALUES
(1, 'lynqotester', 'Lynqo Tester', 'lynqotester@example.com', 'b6um5O1yTFtU+tGeypiSPiGYzbunjbXnRnLIMhf7M6Y=', NULL, 5, 0, 0, 'admin', '2025-10-23 12:10:28', NULL, 0, NULL, 0, NULL, NULL, NULL),
(3, 'bubu', 'bubu', 'andren@kkszki.hu', '0XK8fuW779KXzSf3nrWaVRxN3lebIJCuSj+NEQazk9E=', NULL, 5, 0, 0, 'user', '2025-10-23 12:17:57', NULL, 0, NULL, 0, NULL, NULL, NULL),
(7, 'cisco', 'cisco', 'cisco@gmail.com', 'sYvKoPjrgIO/RUL3Di0PHSISfUHW8hkEaExgEPefbGo=', NULL, 5, 0, 0, 'user', '2026-01-26 08:39:55', NULL, 0, NULL, 0, NULL, NULL, NULL),
(9, 'TestV3', 'TestV3_New', 'testv3_new@gmail.com', 'UkIyOS2ah1vgKMuFsSR1nUbINWiRZppdmFdRgjqverY=', '/media/images/profile_pictures/af4cd77c241847baa9df3d981ee9030c.jpg', 0, 0, 1, 'admin', '2026-02-03 08:02:42', '2026-03-09 08:10:09', 0, NULL, 0, NULL, NULL, NULL),
(24, 'TestV4', 'TestV4', 'TestV4@gmail.com', 'C+cr+uUrx44CgWUuFgfCjVxkvFXFr8352OAcOYUZ6Wc=', NULL, 4, 0, 0, 'user', '2026-02-27 07:10:43', NULL, 0, NULL, 0, NULL, NULL, NULL),
(25, 'TestV4_2', 'TestV4_2', 'testv4_2@gmail.com', 'yIfSLUH9vcUvesYAaJPLnmas0Syy5zmtnderOPBuop8=', '/media/images/profile_pictures/5a6b048efd304f4682bda59503aa6396.png', 5, 100, 1, 'user', '2026-03-11 08:10:57', NULL, 0, NULL, 0, NULL, NULL, NULL),
(26, 'StreakTest', 'StreakTest', 'streaktest@gmail.com', 'D3pH0T9C+BbXtQkA7RZVPakNu5suNIORqCYKWTUrW2M=', NULL, 5, 0, 1, 'user', '2026-03-11 10:36:34', NULL, 0, NULL, 0, NULL, NULL, NULL),
(36, 'Robi', 'Robi', 'kocsisr@kkszki.hu', 'ujtny4cKGk8vl4mF1XaTNWUMAtSiBxYEPxDRLWwjs/k=', NULL, 5, 0, 0, 'user', '2026-03-16 07:54:11', NULL, 0, NULL, 1, NULL, NULL, NULL);

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
(8, 9, 2, '2026-02-20 07:14:26', 3, 40, 100),
(9, 9, 3, '2026-02-20 07:14:44', 3, 40, 100),
(10, 9, 4, '2026-02-20 07:14:53', 3, 40, 100),
(13, 24, 1, '2026-02-27 07:11:31', 2, 38, 92),
(14, 9, 7, '2026-02-27 07:31:57', 3, 40, 100),
(15, 9, 26, '2026-03-09 05:45:55', 3, 40, 100),
(16, 9, 10, '2026-03-09 06:00:41', 2, 36, 83),
(17, 9, 8, '2026-03-09 07:11:19', 2, 34, 92),
(18, 9, 9, '2026-03-09 07:13:35', 1, 30, 0),
(21, 25, 1, '2026-03-11 08:30:40', 2, 38, 92),
(22, 25, 2, '2026-03-11 08:36:10', 3, 40, 100);

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

--
-- A tábla adatainak kiíratása `user_quests`
--

INSERT INTO `user_quests` (`id`, `user_id`, `quest_id`, `progress`, `completed_at`) VALUES
(1, 25, 1, 1, '2026-03-11 08:36:10'),
(2, 25, 2, 1, NULL);

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
(8, 9, 40, 'lesson', '2026-02-20 07:14:26'),
(9, 9, 40, 'lesson', '2026-02-20 07:14:44'),
(10, 9, 40, 'lesson', '2026-02-20 07:14:53'),
(11, 9, 40, 'lesson', '2026-02-20 07:15:17'),
(12, 9, 40, 'lesson', '2026-02-20 07:15:28'),
(13, 24, 38, 'lesson', '2026-02-27 07:11:31'),
(14, 9, 40, 'lesson', '2026-02-27 07:31:57'),
(15, 9, 40, 'lesson', '2026-03-09 05:45:54'),
(16, 9, 36, 'lesson', '2026-03-09 06:00:41'),
(17, 9, 34, 'lesson', '2026-03-09 07:11:19'),
(18, 9, 30, 'lesson', '2026-03-09 07:12:26'),
(19, 9, 30, 'lesson', '2026-03-09 07:13:35'),
(22, 25, 38, 'lesson', '2026-03-11 08:30:40'),
(23, 25, 40, 'lesson', '2026-03-11 08:36:10'),
(24, 25, 10, 'legendary', '2026-03-11 08:36:10');

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
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `idx_chat_pair_time` (`sender_id`,`receiver_id`,`timestamp`),
  ADD KEY `idx_chat_receiver_read` (`receiver_id`,`read_at`,`is_deleted`);

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
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `idx_friend_pair_status` (`sender_id`,`receiver_id`,`status`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_notifications_user_read` (`user_id`,`is_read`,`created_at`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT a táblához `lesson_contents`
--
ALTER TABLE `lesson_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=647;

--
-- AUTO_INCREMENT a táblához `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `practice_sessions`
--
ALTER TABLE `practice_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `quests`
--
ALTER TABLE `quests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `store_items`
--
ALTER TABLE `store_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_lessons`
--
ALTER TABLE `user_lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `user_purchases`
--
ALTER TABLE `user_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user_quests`
--
ALTER TABLE `user_quests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `user_xp`
--
ALTER TABLE `user_xp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
