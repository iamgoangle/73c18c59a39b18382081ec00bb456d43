const axios = require("axios");

const github = require("./github.js");

jest.mock("axios");

describe("Github Handler", () => {
  describe("when API call to search repository successfully", () => {
    it("should return github repository list", async () => {
      const mockGithubResponse = {
        total_count: 13836,
        incomplete_results: false,
        items: [
          {
            id: 46426592,
            node_id: "MDEwOlJlcG9zaXRvcnk0NjQyNjU5Mg==",
            name: "golf",
            full_name: "dinever/golf",
            private: false,
            owner: {
              login: "dinever",
              id: 1311594,
              node_id: "MDQ6VXNlcjEzMTE1OTQ=",
              avatar_url: "https://avatars.githubusercontent.com/u/1311594?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/dinever",
              html_url: "https://github.com/dinever",
              followers_url: "https://api.github.com/users/dinever/followers",
              following_url:
                "https://api.github.com/users/dinever/following{/other_user}",
              gists_url: "https://api.github.com/users/dinever/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/dinever/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/dinever/subscriptions",
              organizations_url: "https://api.github.com/users/dinever/orgs",
              repos_url: "https://api.github.com/users/dinever/repos",
              events_url:
                "https://api.github.com/users/dinever/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/dinever/received_events",
              type: "User",
              site_admin: false,
            },
            html_url: "https://github.com/dinever/golf",
            description: ":golf: The Golf web framework",
            fork: false,
            url: "https://api.github.com/repos/dinever/golf",
            forks_url: "https://api.github.com/repos/dinever/golf/forks",
            keys_url: "https://api.github.com/repos/dinever/golf/keys{/key_id}",
            collaborators_url:
              "https://api.github.com/repos/dinever/golf/collaborators{/collaborator}",
            teams_url: "https://api.github.com/repos/dinever/golf/teams",
            hooks_url: "https://api.github.com/repos/dinever/golf/hooks",
            issue_events_url:
              "https://api.github.com/repos/dinever/golf/issues/events{/number}",
            events_url: "https://api.github.com/repos/dinever/golf/events",
            assignees_url:
              "https://api.github.com/repos/dinever/golf/assignees{/user}",
            branches_url:
              "https://api.github.com/repos/dinever/golf/branches{/branch}",
            tags_url: "https://api.github.com/repos/dinever/golf/tags",
            blobs_url:
              "https://api.github.com/repos/dinever/golf/git/blobs{/sha}",
            git_tags_url:
              "https://api.github.com/repos/dinever/golf/git/tags{/sha}",
            git_refs_url:
              "https://api.github.com/repos/dinever/golf/git/refs{/sha}",
            trees_url:
              "https://api.github.com/repos/dinever/golf/git/trees{/sha}",
            statuses_url:
              "https://api.github.com/repos/dinever/golf/statuses/{sha}",
            languages_url:
              "https://api.github.com/repos/dinever/golf/languages",
            stargazers_url:
              "https://api.github.com/repos/dinever/golf/stargazers",
            contributors_url:
              "https://api.github.com/repos/dinever/golf/contributors",
            subscribers_url:
              "https://api.github.com/repos/dinever/golf/subscribers",
            subscription_url:
              "https://api.github.com/repos/dinever/golf/subscription",
            commits_url:
              "https://api.github.com/repos/dinever/golf/commits{/sha}",
            git_commits_url:
              "https://api.github.com/repos/dinever/golf/git/commits{/sha}",
            comments_url:
              "https://api.github.com/repos/dinever/golf/comments{/number}",
            issue_comment_url:
              "https://api.github.com/repos/dinever/golf/issues/comments{/number}",
            contents_url:
              "https://api.github.com/repos/dinever/golf/contents/{+path}",
            compare_url:
              "https://api.github.com/repos/dinever/golf/compare/{base}...{head}",
            merges_url: "https://api.github.com/repos/dinever/golf/merges",
            archive_url:
              "https://api.github.com/repos/dinever/golf/{archive_format}{/ref}",
            downloads_url:
              "https://api.github.com/repos/dinever/golf/downloads",
            issues_url:
              "https://api.github.com/repos/dinever/golf/issues{/number}",
            pulls_url:
              "https://api.github.com/repos/dinever/golf/pulls{/number}",
            milestones_url:
              "https://api.github.com/repos/dinever/golf/milestones{/number}",
            notifications_url:
              "https://api.github.com/repos/dinever/golf/notifications{?since,all,participating}",
            labels_url:
              "https://api.github.com/repos/dinever/golf/labels{/name}",
            releases_url:
              "https://api.github.com/repos/dinever/golf/releases{/id}",
            deployments_url:
              "https://api.github.com/repos/dinever/golf/deployments",
            created_at: "2015-11-18T15:10:14Z",
            updated_at: "2022-01-24T09:43:14Z",
            pushed_at: "2021-08-27T22:20:34Z",
            git_url: "git://github.com/dinever/golf.git",
            ssh_url: "git@github.com:dinever/golf.git",
            clone_url: "https://github.com/dinever/golf.git",
            svn_url: "https://github.com/dinever/golf",
            homepage: "https://golf.readme.io/",
            size: 196,
            stargazers_count: 252,
            watchers_count: 252,
            language: "Go",
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: true,
            has_pages: false,
            forks_count: 30,
            mirror_url: null,
            archived: false,
            disabled: false,
            open_issues_count: 6,
            license: {
              key: "mit",
              name: "MIT License",
              spdx_id: "MIT",
              url: "https://api.github.com/licenses/mit",
              node_id: "MDc6TGljZW5zZTEz",
            },
            allow_forking: true,
            is_template: false,
            topics: [
              "framework",
              "go",
              "golf",
              "middleware",
              "router",
              "server",
              "web",
              "webframework",
            ],
            visibility: "public",
            forks: 30,
            open_issues: 6,
            watchers: 252,
            default_branch: "master",
            score: 1.0,
          },
        ],
      };

      axios.request.mockResolvedValueOnce(mockGithubResponse);

      const result = await github.githubSearchClient("nodejs", "1");

      expect(result).toStrictEqual(mockGithubResponse);
    });
  });
});
