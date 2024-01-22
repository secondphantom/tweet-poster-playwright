import { PostService } from "../../../core/service/post.service";
import { PostController } from "../../../core/controller/post.controller";

describe("Video Controller", () => {
  let postService: PostService;
  let postController: PostController;

  beforeAll(() => {
    postService = {} as any;
    postController = new PostController(postService);
  });

  describe("upload video dto", () => {
    test.each<{
      params: any;
      message: string;
      isError: boolean;
    }>([
      {
        params: {
          filePath: {
            video: "filePath",
            images: ["filePath", "filePath"],
          },
          meta: {
            title: "title",
            tags: ["tag1", "tag2"],
          },
          config: {
            visibility: "public",
            scheduleDate: new Date(),
          },
        },
        message: "valid input",
        isError: false,
      },
      {
        params: {
          filePath: {
            video: "filePath",
            images: ["filePath", "filePath"],
          },
          meta: {
            title: "title",
            tags: ["tag1", "tag2"],
          },
          // config: {
          //   visibility: "public",
          // },
        },
        message: "valid input",
        isError: false,
      },
      {
        params: {
          filePath: {
            video: "filePath",
            images: ["filePath", "filePath"],
          },
          meta: {
            title: "title",
            // tags: ["tag1", "tag2"],
          },
          config: {
            visibility: "public",
            scheduleDate: new Date(),
          },
        },
        message: "valid input",
        isError: false,
      },
      {
        params: {
          filePath: {
            video: "filePath",
          },
          meta: {
            // title: "title",
            tags: ["tag1", "tag2"],
          },
          config: {
            visibility: "public",
          },
        },
        message: "meta title is required",
        isError: true,
      },
      {
        params: {
          filePath: {
            video: "filePath",
          },
          // meta: {
          //   title: "title",
          //   tags: ["tag1", "tag2"],
          // },
          config: {
            visibility: "public",
          },
        },
        message: "meta is required",
        isError: true,
      },
      {
        params: {
          filePath: {
            images: "filePath",
          },
          meta: {
            title: "title",
            tags: ["tag1", "tag2"],
          },
          config: {
            visibility: "public",
            scheduleDate: new Date(),
          },
        },
        message: "invalid images input",
        isError: true,
      },
    ])(`$message`, ({ params, isError }) => {
      const checkErrorFn = jest.fn();
      try {
        const result = postController["uploadVideoDtoSchema"].parse(params);
        expect(result).toEqual(params);
      } catch (e) {
        checkErrorFn();
      }
      if (isError) {
        expect(checkErrorFn).toBeCalled();
      } else {
        expect(checkErrorFn).not.toBeCalled();
      }
    });
  });
});
