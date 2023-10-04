import api, { route } from "@forge/api";

class Utils {

  getConfluenceBody = async (id) => {
    let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/${id}?expand=body.dynamic`);

    let pageBody = await response.json();

    console.log(pageBody);
    return pageBody;

  };

  createJiraIssue = async (jsmIssueEvent, jiraProjectId, assigneeId) => {
    let eventFields = jsmIssueEvent.issue.fields;
    let newJiraIssue = this.ISSUE_DEFAULT_BODY;

    newJiraIssue['fields']['summary'] = eventFields['summary'];
    newJiraIssue['fields']['project']['id'] = jiraProjectId;
    newJiraIssue['fields']['assignee']['id'] = assigneeId;
    

    const response = await api.asUser().requestJira(route`/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJiraIssue)
    });

    let newlyCreatedJiraIssue = await response.json();
    return newlyCreatedJiraIssue;
  };

  createJiraIssueLink = async (inwardIssueKey, outwardIssueKey) =>{
    let bodyData = this.ISSUE_LINK_BODY;
    bodyData['inwardIssue']['key']=inwardIssueKey
    bodyData['outwardIssue']['key']=outwardIssueKey

    const response = await api.asUser().requestJira(route`/rest/api/3/issueLink`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    return {msg:"linked"}
  }

  createIssueComment = async (issueKey, commentText) =>{
    let bodyData = this.ISSUE_COMMENT_BODY;
    bodyData['body']['content'][0]['content'][0]['text']=commentText;

    const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueKey}/comment`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    let responseJson = await response.json();
    return responseJson;
  }

  getUsers = async () => {
    let response = await api.asApp().requestJira(
      route`/rest/api/3/users/search`
    );
    if (response.statusText = "OK") {
      response = await response.json();
      return response.filter(user => (user["accountType"] == "atlassian" && user.active == true));
    }
  };



  ///////////


  ISSUE_DEFAULT_BODY = {
    "fields": {
      "assignee": {
        "id":""
      },
      "components": [],
      "description": {
        "content": [
          {
            "content": [
              {
                "text": "check linked issue for details...",
                "type": "text"
              }
            ],
            "type": "paragraph"
          }
        ],
        "type": "doc",
        "version": 1
      },
      "issuetype": {
        "id": "10001" //todo test
      },
      "labels": [
        "bugfix",
        "customer-bug"
      ],

      "project": {
        "id": ""  //change
      },
      "summary": "created by rest api", //change


    },
    "update": {}
  };

  ISSUE_LINK_BODY = {
  "inwardIssue": {
    "key": ""
  },
  "outwardIssue": {
    "key": ""
  },
  "type": {
    "name": "Cloners"
  }
}

  ISSUE_COMMENT_BODY ={
    "body": {
      "content": [
        {
          "content": [
            {
              "text": "<comment here..>",
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

  MOCK_EVENT_ISSUE = {
    "issue": {
      "id": "10010",
      "key": "CS-6",
      "fields": {
        "summary": "test issue",
        "issuetype": {
          "self": "https://nuvs.atlassian.net/rest/api/2/issuetype/10003",
          "id": "10003",
          "description": "For customer support issues. Created by Jira Service Desk.",
          "iconUrl": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10553?size=medium",
          "name": "Support",
          "subtask": false,
          "avatarId": 10553,
          "hierarchyLevel": 0
        },
        "creator": {
          "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
        },
        "created": "2023-10-03T19:29:17.500+0530",
        "project": {
          "self": "https://nuvs.atlassian.net/rest/api/2/project/10000",
          "id": "10000",
          "key": "CS",
          "name": "Customer SM",
          "projectTypeKey": "service_desk",
          "simplified": false,
          "avatarUrls": {
            "48x48": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415",
            "24x24": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=small",
            "16x16": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=xsmall",
            "32x32": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10415?size=medium"
          }
        },
        "reporter": {
          "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
        },
        "assignee": null,
        "updated": "2023-10-03T19:29:17.500+0530",
        "status": {
          "self": "https://nuvs.atlassian.net/rest/api/2/status/10000",
          "description": "This was auto-generated by Jira Service Management during workflow import",
          "iconUrl": "https://nuvs.atlassian.net/images/icons/status_generic.gif",
          "name": "Waiting for support",
          "id": "10000",
          "statusCategory": {
            "self": "https://nuvs.atlassian.net/rest/api/2/statuscategory/4",
            "id": 4,
            "key": "indeterminate",
            "colorName": "yellow",
            "name": "In Progress"
          }
        }
      }
    },
    "associatedUsers": [
      {
        "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a"
      }
    ],
    "eventType": "avi:jira:created:issue",
    "selfGenerated": false,
    "context": {
      "cloudId": "e894bd1b-eba9-4e06-adff-f0985bd90e2f",
      "moduleKey": "event-trigger"
    }
  };
}

export default Utils;
