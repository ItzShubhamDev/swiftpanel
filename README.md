# Swift Panel
A Pterodactyl Panel Clone using Javascript

## Why????
I was very much interested in making [Pterodactyl Panel](https://github.com/pterodactyl/panel) addons, but I lacked the knowledge of **PHP**, I once thought of learning it but couldn't make up my mind. So instead I rewritted it in Js (One of the Most Used Languages).

## Challenges!
Initially, I thought of using [Next.js](https://nextjs.org) but it bacame very challenging specially with the app router. I had to use client side rendering on almost every page, which killed the purpose of using Next.js.
I researched online for 2 ~ 3 days, tried many frameworks and then found [Adonis.js](https://adonisjs.com/) not very popular but it left a good impact on me at the first try. And I continued using it. I also wanted to ensure that any existing Projects based of [Pterodactyl Panel](https://github.com/pterodactyl/panel) is compatible with SwiftPanel, so I had to made all API routes and their Request and Response the same as Ptero.

## Development
First of all I made Database from an exported database of [Pterodactyl Panel](https://github.com/pterodactyl/panel), then I made all the API endpoints Application, Client and Remote with the help of [Pteronotes](https://github.com/devnote-dev/ptero-notes) and [Dashflo](https://dashflo.net/docs/api/pterodactyl/v1/).
And then onto making Admin Pages, I thought of making all pages on my own, which took me a week just to make 2 pages, I dropped the idea and just copy pasted all the Admin pages from [Pterodactyl Panel](https://github.com/pterodactyl/panel) which still took a lot of time, converting Blade to Edge, Adding routes, etc.
For the Client side despite the struggles I made own pages.
**It's still not complete, but I decided to pause the development for a while due to my exams in January, I will continue it after than**

## Completion 
| Application         | Status             | Notes                        |
|---------------------|--------------------|------------------------------|
| API Application     | ✅                 | Almost Complete              |
| Client Application  | ✅                 | Almost Complete              |
| Admin               | 🚀                 | Partially Complete           |
| Client              | ⚠️                 | Only a little Complete       |


## Acknowledgements
 - [Adonis.js](https://adonisjs.com/) - Thanks for your Awesome Framework
 - [Pterodactyl Panel](https://github.com/pterodactyl/panel) - Thanks for your Awesome Project
 - [Pteronotes](https://github.com/devnote-dev/ptero-notes) and [Dashflo](https://dashflo.net/docs/api/pterodactyl/v1/) - Thanks for the API Documentations

## Note
This project is not at all related with [Pterodactyl Panel](https://github.com/pterodactyl/panel), do not ask them anything about it<br/>
Running on your own hardware - **This version is not ready for production yet**, the connection between SwiftPanel and Pterodactyl Wings currently require some special configurations which I will be fixing after my exams. Have patience :v: 

## Previews
![Login Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-01.png?raw=true)
![Home Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-02.png?raw=true)
![Server Console Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-03.png?raw=true)
![Server Files Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-04.png?raw=true)
![Server Startup Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-05.png?raw=true)
![Server Settings Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-06.png?raw=true)
![Admin Overview Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-07.png?raw=true)
![Admin Settings Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-08.png?raw=true)
![Admin API Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-09.png?raw=true)
![Admin Locations Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-10.png?raw=true)
![Admin Nodes Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-11.png?raw=true)
![Admin Servers Page](https://github.com/ItzShubhamDev/swift-panel/blob/main/images/image-12.png?raw=true)
