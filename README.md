
###Dribbble app built with React Native

![dribbble-app-update](https://cloud.githubusercontent.com/assets/2805320/9274780/1ca63a6a-42a1-11e5-8570-2c2781ec721f.gif)

Plugins used:
- [HTML parser](https://github.com/jsdf/react-native-htmlview)
- [React native Parallax view](https://github.com/lelandrichardson/react-native-parallax-view)
- [React native vector icons](https://github.com/oblador/react-native-vector-icons)

####How to run it locally

- Clone this repo `git clone https://github.com/future-challenger/react-native-dribbble-app.git`
- `cd react-native-dribbble-app`
- run `npm install`
- Open `DribbbleApp.xcodeproj` in `XCode`
- Press `cmd+r` to build it
- Or open terminal, and run command `react-native run-ios`


####Improvements
- [ ] run it on Android, this is what I'm doing
- [ ] support offline display with redux and related middlewares
- [x] add icons in TabBar
  - [ ] maybe use [react native flux router](https://github.com/aksonov/react-native-router-flux) do the tab and nav thing, or
  - [ ] ios use tab and android use drawer view
- [ ] refactor 'facebook-movies' fetching logic
- [x] add author view
- [x] fetch comments in shot details
- [x] switch to `ES6`
