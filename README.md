# Starhelper: Shooting Stars Management System for F2P OSRS

## Overview
Starhelper is a Discord bot that offers comprehensive CRUD features to improve the collaborative process of discovering, monitoring, and managing Shooting Stars in Old School RuneScape free-to-play worlds.

## Discord Commands
### Standard
`/active`         Show list of active stars

`/call`           Call a star. This puts it on `/active`

`/update-tier`    Update the tier of a star

`/poof`           Mark a star as disappeared

### Holding
`/backups`        Show a list of backup stars. Worlds are hidden to everyone except the person who is holding the star and mods

`/hold`           Save a star as backup

`/release`        Release a backup star

### Misc
`/info`           See bot metadata

## Example Usage
#### Multi-user calling, and updating and displaying
![demo_resized](https://github.com/luisr96/discord-bot-starhunters/assets/56360815/cd9deb6d-7920-4e78-99d4-cb38e2112bda)

#### Holding stars (and its scoped visibility)

## Auto-finding and auto-holding
As an extra functionality, the app also supports automatically sending the star data from RuneLite and automatically placing those stars in a backup state.

## Contributing
Contributions are welcome. If you'd like to contribute to Starhelper, please submit a pull request.

## License
This project is licensed under the MIT License.
