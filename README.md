A nodejs server that recieve files and commit them to github repo

## Installation

Recommended way - `git clone` and deploy with ci system<br />
(such as
<a href="https://heroku.com" target="_blank">
  <img height="30" valign="middle" src="assets/heroku-logo.svg" alt="heroku" />
</a>.
Read the <a href="https://devcenter.heroku.com/articles/github-integration" target="_blank">guide</a>)

## Usage

`POST` this payload:

```json
{
  "remoteRepo": "{owner}/{repository_name}",
  "token": "{personal_access_token}",
  "commitMessage": "{commit_message}",
  "files": [
    {
      "path": "path/to/first-file.txt",
      "content": "content of first-file.txt"
    },
    {
      "path": "path/to/second-file.txt",
      "content": "content of second-file.txt"
    }
  ]
}
```

`personal_access_token` - Meant to allow the server to commit on your behalf. <a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank">How do I get this token?</a>