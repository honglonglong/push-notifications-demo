<div>
    <h1 align="center">
        Push notifications
    </h1>
    <div align="center" style="display: inline_block"><br>
        <img align="center" alt="Angular" height="36" width="40" src="https://angular.io/assets/images/logos/angular/angular.svg">
        <img align="center" alt="Angular" height="30" width="40" src="https://angular.io/generated/images/marketing/concept-icons/pwa.svg">
        <img align="center" alt="Angular" height="30" width="40" src="https://nodejs.dev/static/images/brand/hexagon/js-green.svg">
    </div>
    <h3 align="center">Demonstration of push notifications with angular and node.</h3>
    <p align="center"></p>
    <p align="center">
        <a href="https://github.com/baptisteArno/typebot.io/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" /></a>
    </p>
	<hr>
</div>

<br>

## 🌐 Demo

- Available in [`demo-push-notifications.vercel.app`](https://demo-push-notifications.vercel.app/).
- After accessing and allowing notifications receiving, send a notification request to the server.Example:
```bash
curl -X POST https://demo-push-notifications-server.vercel.app/notification/push/send -H "Content-Type: application/json" -d '{"title": "Test 1", "body": "Notification Test"}'
```
