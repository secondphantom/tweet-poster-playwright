import { PostDto } from "../core/service/post.service";
import { TweetPoster } from "../index";
import dotenv from "dotenv";
dotenv.config();

describe("index", () => {
  let tweetPoster: TweetPoster;

  beforeAll(() => {
    tweetPoster = new TweetPoster({
      authFilePath: process.env.AUTH_FILE_PATH!,
      launchOptions: { headless: false },
    });
  }, 30000);

  test.skip("login", async () => {
    const { isLogin } = await tweetPoster.login();

    expect(isLogin).toEqual(true);
  }, 60000);

  describe("tweet", () => {
    test("post", async () => {
      await tweetPoster.login();
      const dto: PostDto = {
        filePath: {
          video: process.env.VIDEO_FILE_PATH!,
        },
        meta: {
          title: "test",
          tags: ["tagone", "tagtwo"],
        },
        config: {
          visibility: "schedule",
          scheduleDate: new Date("2024-02-22T04:58:44.518Z"),
        },
      };

      await tweetPoster.tweet.post(dto);
    }, 180000);
  });
});
