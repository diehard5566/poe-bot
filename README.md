# POE-LINE-Bot

POE-LINE-BOT(build with Node.js and Python)
About Path of Exile LINE bot to quickly fetch data from offical website or poe.ninja.

此 LINE bot 資料來源為 GGG 官方網站 / poe.ninja / 巴哈姆特 / 流亡黯道編年史，及其他非官網網站。

以 Node.js 及 Express 為主並串接 LINE MessagesAPI。Server 部屬於 Oracle Cloud Ubuntu Server，過程使用到 Nginx (Reverse proxy)、PM2 (Process manager)、 Cloudflare (DNS & CDN) ... 等工具。

搭配使用 Python 爬蟲 https://github.com/diehard5566/FB-poedb-scraper，及Puppeteer。

## 目前功能

-   查詢國際服的帳號：回傳角色與全身裝備賣場連結(當季)給你，需要稍後約 20-30 秒
-   查詢通貨現價：根據 ninja 的價格浮動調整(目前處於開季拓荒時期，價格的資料較不充足，一切請 以官方賣場為主)。
-   本日迷宮：每天都會根據 poelab 提供最新的路線(約每日 9:30 a.m.更新)。
-   流派轉盤：根據 3.17 開季第 6 天的前 10 昇華+技能做隨機排列組合。
-   實用連結：電腦版請輸入 "連結"。
-   傳奇道具查詢：輸入傳奇道具中文名稱，Bot 會回你該裝備目前的使用率及時價(by ninja)。
-   自動推送來自流亡黯道編年史的最新消息

## TODO

-   因 LINE 限制，預計將自動推送功能搬至 notify。
-   將查詢通貨功能細分為大、小通貨。
-   優化裝備查詢功能

## 免責聲明

-   This product is fan-made and not affiliated with Grinding Gear Games in any way.
