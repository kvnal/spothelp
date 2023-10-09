import api, { route } from "@forge/api";
import { convert } from "html-to-text";


class Utils {

  getConfluenceBody = async (id) => {
    // let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/${id}?expand=body.dynamic`);
    let response = await api.asUser().requestConfluence(route`/wiki/rest/api/content/${id}?expand=body.view`);

    let pageBody = await response.json();

    let bodyView = pageBody['body']['view']

    let plainText = convert(bodyView['value'])
    // console.log(plainText);/
    return {raw : plainText, body : bodyView};

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

  getLlamaTokenizePrompt = (confluenceRawBody) =>{
    let prompt = `Tokenize the given team description in a way such that their would be sufficient info about the team. so that you would be able to recognize the given the bugs belong to this team. exclude any unnecessary text in the response. start and end tokenized text with text "START" and "END" \n\n ${confluenceRawBody}`

    return prompt;

  }

  delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  guessBugTeamPrompt = () =>{
    let teamCount = 0;
    let bugTitleDescription = null;
    let heading = `there is an organization with ${teamCount} below listed team in technical side.`

    let bugText = `now suppose their is a bug with given description: ${bugTitleDescription} \nNow guess which team from the above organization should take the responsibility of this bug. answer without explanation. start and ends team name with text "START" and "END".`


  }

  translate = "generate a text greeting  a customer by thanking them for raising query and tell them politely that team is working on it in english. feel free to be more creative in the response. exclude other text and keep it short"

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


  CONFLUENCE_TEAM_DESC_TEMPLATE_BODY = {
    "id": "1671169",
    "title": "Team Name ",
    "type": "page",
    "space": {
      "id": 1245186,
      "key": "JSC",
      "name": "jira-scrum-company",
      "type": "global",
      "status": "current",
      "_expandable": {
        "settings": "/rest/api/space/JSC/settings",
        "metadata": "",
        "operations": "",
        "lookAndFeel": "/rest/api/settings/lookandfeel?spaceKey=JSC",
        "identifiers": "",
        "permissions": "",
        "icon": "",
        "description": "",
        "theme": "/rest/api/space/JSC/theme",
        "history": "",
        "homepage": "/rest/api/content/1245262"
      },
      "_links": {
        "webui": "/spaces/JSC",
        "self": "https://nuvs.atlassian.net/wiki/rest/api/space/JSC"
      }
    },
    "status": "current",
    "body": {
      "storage": {
        "value": "<p>test data</p><p><strong>bold data</strong></p><h1>heading data</h1><p><span style=\"color: rgb(255,86,48);\">colored data</span></p><p />",
        "representation": "storage"
      }
    }
  }
  
  DEFAULT_CONFLUENCE_TEAM_DESC_TEMPLATE = "<h2>Technical Team Name:<em>Insert name of your technical team here</em></h2><h3>Description:</h3><p>The<strong>insert name of your technical team here</strong>is responsible for<em>briefly describe the main area of focus for this team</em>. They work collaboratively with other teams across the organization to<em>list at least two key stakeholders or teams that this team works closely with</em>. The primary responsibilities of this team include:</p><ul><li><strong>List at least three specific technical tasks or activities that this team handles:</strong><br>Some examples might include things like &quot;designing and implementing new features,&quot; &quot;troubleshooting and resolving technical issues,&quot; or &quot;maintaining and optimizing existing software.&quot;</li></ul><h3>Skills and Expertise:</h3><p>Members of this team have strong proficiency in<em>at least one programming language or technology stack commonly used by this team</em>, as well as knowledge of additional tools and technologies as needed. Some common skills and expertise for this team might include:</p><ul><li>Programming languages:<em>insert list of relevant programming languages or technologies</em></li><li>Frameworks and libraries:<em>insert list of relevant frameworks or libraries</em></li><li>Databases:<em>insert list of relevant databases or data storage solutions</em></li><li>Cloud platforms:<em>insert list of relevant cloud platforms</em></li><li>Security protocols and standards:<em>insert list of relevant security protocols or standards</em></li><li>Other relevant technologies:<em>insert any additional technologies that are commonly used by this team</em></li></ul><p>I hope this helps! Let me know if you have any questions or need further clarification.</p>"




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

  MOCK_AI_LOCATOR = {
    "team_name": "team a",
    "assignee":{},
    "jira": {
        "id": 1,
        "self": "https://nuvs.atlassian.net/rest/agile/1.0/board/1",
        "name": "JSC board",
        "type": "scrum",
        "location": {
            "projectId": 10001,
            "displayName": "jira-scrum-company (JSC)",
            "projectName": "jira-scrum-company",
            "projectKey": "JSC",
            "projectTypeKey": "software",
            "avatarURI": "https://nuvs.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=small",
            "name": "jira-scrum-company (JSC)"
        }
    },
    "confluence": {
        "id": "1769492",
        "type": "page",
        "status": "current",
        "title": "Getting started in Confluence",
        "macroRenderedOutput": {},
        "extensions": {
            "position": 604
        },
        "_expandable": {
            "container": "/rest/api/space/~701211848c046b89f4f8fa22f846875694d2a",
            "metadata": "",
            "restrictions": "/rest/api/content/33363/restriction/byOperation",
            "history": "/rest/api/content/33363/history",
            "body": "",
            "version": "",
            "descendants": "/rest/api/content/33363/descendant",
            "space": "/rest/api/space/~701211848c046b89f4f8fa22f846875694d2a",
            "childTypes": "",
            "schedulePublishInfo": "",
            "operations": "",
            "schedulePublishDate": "",
            "children": "/rest/api/content/33363/child",
            "ancestors": ""
        },
        "_links": {
            "self": "https://nuvs.atlassian.net/wiki/rest/api/content/33363",
            "tinyui": "/x/U4I",
            "editui": "/pages/resumedraft.action?draftId=33363",
            "webui": "/spaces/~701211848c046b89f4f8fa22f846875694d2a/pages/33363/Getting+started+in+Confluence"
        }
    }
}
}

export default Utils;
