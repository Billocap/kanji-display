# <img src="./public/images/icon.png" width="27"/> Kanji Display
![](https://img.shields.io/github/package-json/v/Billocap/kanji-display) ![](https://img.shields.io/github/deployments/Billocap/kanji-display/Production) ![](https://img.shields.io/github/stars/Billocap/kanji-display?style=social) ![](https://img.shields.io/github/watchers/Billocap/kanji-display?style=social)

[Kanji Display](https://kanji-display.vercel.app) is a web application designed to help you study the japanese characters known as [漢字(kanjis)](https://en.wikipedia.org/wiki/Kanji).

## Usage
### Search bar
Use the search bar to search for a specific kanji (_to type the kanji you must have a japanese keyboard on your device_) or a [reading](https://guidetojapanese.org/learn/complete/kanji#:~:text=Kanji%20in%20Japanese%20can%20have,that%20only%20use%20one%20character.) (_in either japanese or roman characters_).

In the search bar you can also access the previous kanjis and readings you searched for.

### List Dropdown
In the list dropdown you can search a list of kanjis that belong to that category.

### Kanji display
When viewing a kanji you can also click on it's readings to search for kanjis with a similar reading.

## Features
- Mobile and Desktop support
- Caching system for simplified search
- Backup database in IndexedDB for better offline support

## Tech
**Data Source**
- [kanjiapi.dev](https://kanjiapi.dev) - A 
modern JSON API for kanji

**Frontend**
- [React](https://reactjs.org) - JavaScript library used to build the UI.
- [Typescript](https://typescriptlang.org) - Strongly typed language that builds for JavaScript
- [Tailwind](https://tailwindcss.com) - Utility-first CSS framework

**Backend**
- [Vite](https://vitejs.dev) - On demand file server
- [Vercel](https://vercel.com) - Platform for deploying frontend frameworks and static sites

**Utils**
- [Fontawesome](https://fontawesome.com) - Icon library and toolkit
- [Wanakana](https://wanakana.com) - Javascript library for translating between english characters and japanese hiragana and katakana

## License
[MIT](https://choosealicense.com/licenses/mit/)