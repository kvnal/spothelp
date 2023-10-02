/*
POST JIRA 
/rest/api/3/issue/CS-1/comment

{
    "body": {
      "content": [
        {
          "content": [
            {
              "text": "ok working..",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    }
  }
///////////
/rest/api/3/issueLink

{"comment": {
    "body": {
      "content": [
        {
          "content": [
            {
              "text": "Linked related issue!",
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    }
  },
  "inwardIssue": {
    "key": "CS-1"
  },
  "outwardIssue": {
    "key": "JSC-1"
  },
  "type": {
    "name": "Cloners"
  }
}

  //////////////////
{
  "issueLinkTypes": [
    {
      "id": "10000",
      "name": "Blocks",
      "inward": "is blocked by",
      "outward": "blocks",
      "self": "https://nuvs.atlassian.net/rest/api/3/issueLinkType/10000"
    },
    {
      "id": "10001",
      "name": "Cloners",
      "inward": "is cloned by",
      "outward": "clones",
      "self": "https://nuvs.atlassian.net/rest/api/3/issueLinkType/10001"
    },
    {
      "id": "10002",
      "name": "Duplicate",
      "inward": "is duplicated by",
      "outward": "duplicates",
      "self": "https://nuvs.atlassian.net/rest/api/3/issueLinkType/10002"
    },
    {
      "id": "10006",
      "name": "Problem/Incident",
      "inward": "is caused by",
      "outward": "causes",
      "self": "https://nuvs.atlassian.net/rest/api/3/issueLinkType/10006"
    },
    {
      "id": "10003",
      "name": "Relates",
      "inward": "relates to",
      "outward": "relates to",
      "self": "https://nuvs.atlassian.net/rest/api/3/issueLinkType/10003"
    }
  ]
}
  */