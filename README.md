# POE-LINE-Bot

POE-LINE-BOT(build with Node.js and Python)
About Path of Exile LINE bot to quickly fetch data from offical website or poe.ninja.

此 LINE bot 資料來源為 GGG 官方網站 / poe.ninja / 巴哈姆特 / 流亡黯道編年史，及其他非官網網站。

以 Node.js 及 Express 為主並串接 LINE MessagesAPI。Server 部屬於 Oracle Cloud Ubuntu Server，過程使用到 Nginx (Reverse proxy)、PM2 (Process manager)、 Cloudflare (DNS & CDN)、Python 爬蟲 ... 等工具。

搭配使用 Python 爬蟲 https://github.com/diehard5566/FB-poedb-scraper

## 目前功能

-   查詢帳號角色/裝備，請輸入：帳號+空格+帳號名稱，例如："帳號 abc123"
    -   接著請輸入：編號+空格+角色編號數字 例如："編號 2"
-   查詢通貨現價，請輸入：通貨。
-   實用連結，請輸入：連結。
-   本日迷宮：請輸入：迷宮。
-   關於 BOT：請輸入：關於。
-   實用連結：
    -   查詢宿敵配方：請輸入：宿敵。
    -   查詢章節教學：請輸入：章節。
    -   查詢搶劫策略：請輸入：搶劫。
    -   查詢迷宮攻略：請輸入：迷宮攻略。
    -   查詢賺錢策略：請輸入：發大財。
-   自動推送來自流亡黯道編年史的最新消息

## TODO

-   因 LINE 限制，預計將自動推送功能搬至 notify。
-   將查詢通貨功能細分為大、小通貨。
-   優化裝備查詢功能

## 免責聲明

-   This product is fan-made and not affiliated with Grinding Gear Games in any way.
