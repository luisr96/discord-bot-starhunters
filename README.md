# Starhelper: Shooting Stars Management System for F2P OSRS

## Overview
Starhelper is a Discord bot that offers comprehensive CRUD features to improve the collaborative process of discovering, monitoring, and managing Shooting Stars in Old School RuneScape free-to-play worlds.

## Discord Commands
### Standard
`/active`         Show list of active stars

`/call`           Call a star. This puts it on `/active`

`/update-tier`    Update the tier of a star

`/poof`           Mark a star as disappeared

### Backups
`/backups`        Show a list of backup stars. Worlds are hidden to everyone except the person who is holding the star and mods

`/hold`           Save a star as backup

`/release`        Release a backup star

### Misc
`/info`           See bot metadata

## Example Usage
#### Multi-user calling, and updating and displaying
![demo_resized](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/cd9deb6d-7920-4e78-99d4-cb38e2112bda)

#### Holding stars (and its scoped visibility)
![holding_demo_resized](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/012f41f3-e525-41ef-acc1-ebfda059b619)

That's all you need to get started.

## Auto-finding and auto-holding
If you want to go above and beyond, the app also supports automatically feeding the star data from a webhook.

1. Install the [Star Info plugin ](https://runelite.net/plugin-hub/show/startierindicator) and make sure this checkbox is ticked

![image](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/564a263c-b533-4697-aff4-a4e1a5cbea8f)

2. Install the [Chat Notifications plugin](https://github.com/runelite/runelite/wiki/Chat-Notifications) on RuneLite and set the highlight words to "Star Found:"

 ![image](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/75d764f5-747f-43cb-a182-b6d8a0fd81c5)

3. Download the [Discord Notifier plugin](https://runelite.net/plugin-hub/show/discord-notifier) on RuneLite and follow their instructions on creating and setting up the webhook. Name the webhook "Starcaller". It should appear in the channel's Integration menu when you add it, like this:

![image](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/0f92fd46-118e-494a-bd4b-bc11c891d0a0)

> I recommend setting up the webhook in a private channel that not everyone has access to

4. Now, any time you get a chat notification like this:

![image](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/7c81196b-9fe9-4e91-9600-197198c523c5)

The "Starcaller" webhook will trigger, and the bot will parse that data and save it as a Backup.

![image](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/2b79aaa3-162f-4c28-9838-68fa44e662aa)

## Contributing
Contributions are welcome. If you'd like to contribute to Starhelper, please submit a pull request. If there's a bug or feature you'd like implement, feel free to open an issue.

## License
This project is licensed under the MIT License.
