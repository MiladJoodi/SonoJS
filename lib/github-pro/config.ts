import "server-only"

export class GitHubProConfigError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GitHubProConfigError"
  }
}

export type GitHubProConfig = {
  token: string
  owner: string
  repo: string
}

export function getGitHubProConfig(): GitHubProConfig {
  const token = process.env.GITHUB_TOKEN?.trim()
  const owner = process.env.GITHUB_REPO_OWNER?.trim()
  const repo = process.env.GITHUB_REPO_NAME?.trim()

  if (!token) {
    throw new GitHubProConfigError("Missing GITHUB_TOKEN")
  }
  if (!owner) {
    throw new GitHubProConfigError("Missing GITHUB_REPO_OWNER")
  }
  if (!repo) {
    throw new GitHubProConfigError("Missing GITHUB_REPO_NAME")
  }

  return { token, owner, repo }
}
