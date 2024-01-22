# Tweet Poster Playwright
You can post tweet

## Install
```
npm i https://github.com/secondphantom/tweet-poster-playwright
```

## Features
- [x] without tweeter api
- [x] support headless browser
- [x] tweet
  - [x] upload video
  - [x] multiple images

## Usage

```ts
const tweetPoster = new TweetPoster ({
	authFilePath: "./auth.json",
});

await tweetPoster.login();

const postDto = {
	filePath: {
		video: './video.mp4',
	},
	meta: {
		title: "title",
		tags: ["tagone", "tagtwo"],
	},
	config: {
		visibility: "schedule",
    scheduleDate: new Date("2024-02-22T04:58:44.518Z"),
	},
};

await tweetPoster.tweet.post(postDto);
```

## API
### Constructor
#### input
##### `authFilePath`
- Type: `string`
- Required: `true`

The auth file must be included in .gitignore
##### `launchOptions`
- Required: `false`

Browser launch options
### login
If the auth file does not exist, a browser asking for TikTok login will appear. After logging in, pressing enter will generate the auth file.
### tweet
#### post
##### input
```ts
type PostDto = {
  meta: {
    title: string;
    tags?: string[];
  };
  filePath?: {
    video?: string;
    images?: string[];
  };
  config?: {
    visibility?: "public" | "schedule";
    scheduleDate?: Date;
  };
};
```
### Dependency
- [playwright](https://playwright.dev/)
- [zod](https://zod.dev/)

