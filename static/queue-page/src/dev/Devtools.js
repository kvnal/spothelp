import { useState } from "react";
import './dev.css';
import ReactJson from 'react-json-view';


const Devtools = () => {
    const [show, setshow] = useState(false);
    const onEdit = (e) => {
        console.log(e);
    };

    const getStorage = () => {
        console.log(":");
    };

    const setStorage = () => {
        console.log(":");
    };
    return (
        <>
            <button onClick={() => setshow(!show)}>Dev Tools</button>

            {
                show &&
                <div className="dev">
                    <div className="devContainer">

                        <div className="json">

                            <ReactJson src={mock}
                                theme={"monokai"}
                                collapsed={1}
                                onEdit={onEdit}
                            />
                        </div>

                        <div className="inp">
                            <input type="text" placeholder="getStorage" />
                            {/* <input type="text" placeholder="getStorage" /> */}
                            <button onClick={getStorage}>get</button> 
                            <button onClick={setStorage}>setStorage</button> 
                        </div>
                    </div>

                </div>
            }
        </>
    );
};

const mock = [
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=70121:1848c046-b89f-4f8f-a22f-846875694d2a",
        "accountId": "70121:1848c046-b89f-4f8f-a22f-846875694d2a",
        "accountType": "atlassian",
        "emailAddress": "ksnkunal@gmail.com",
        "avatarUrls": {
            "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/70121:1848c046-b89f-4f8f-a22f-846875694d2a/19b03f53-cba2-447b-b806-ad7a9c160d36/48",
            "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/70121:1848c046-b89f-4f8f-a22f-846875694d2a/19b03f53-cba2-447b-b806-ad7a9c160d36/24",
            "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/70121:1848c046-b89f-4f8f-a22f-846875694d2a/19b03f53-cba2-447b-b806-ad7a9c160d36/16",
            "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/70121:1848c046-b89f-4f8f-a22f-846875694d2a/19b03f53-cba2-447b-b806-ad7a9c160d36/32"
        },
        "displayName": "Kunal Singh",
        "active": true,
        "timeZone": "Asia/Kolkata",
        "locale": "en_US"
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:f58131cb-b67d-43c7-b30d-6b58d40bd077",
        "accountId": "557058:f58131cb-b67d-43c7-b30d-6b58d40bd077",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/600529a9c8bfef89daa848e6db28ed2d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAJ-0.png",
            "24x24": "https://secure.gravatar.com/avatar/600529a9c8bfef89daa848e6db28ed2d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAJ-0.png",
            "16x16": "https://secure.gravatar.com/avatar/600529a9c8bfef89daa848e6db28ed2d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAJ-0.png",
            "32x32": "https://secure.gravatar.com/avatar/600529a9c8bfef89daa848e6db28ed2d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAJ-0.png"
        },
        "displayName": "Automation for Jira",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5d53f3cbc6b9320d9ea5bdc2",
        "accountId": "5d53f3cbc6b9320d9ea5bdc2",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/40cff14f727dbf6d865576d575c6bdd2?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJO-4.png",
            "24x24": "https://secure.gravatar.com/avatar/40cff14f727dbf6d865576d575c6bdd2?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJO-4.png",
            "16x16": "https://secure.gravatar.com/avatar/40cff14f727dbf6d865576d575c6bdd2?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJO-4.png",
            "32x32": "https://secure.gravatar.com/avatar/40cff14f727dbf6d865576d575c6bdd2?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJO-4.png"
        },
        "displayName": "Jira Outlook",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5cb4ae0e4b97ab11a18e00c7",
        "accountId": "5cb4ae0e4b97ab11a18e00c7",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5cb4ae0e4b97ab11a18e00c7/0c3fec9a-029d-422f-8586-89bc4ac2fe7e/48",
            "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5cb4ae0e4b97ab11a18e00c7/0c3fec9a-029d-422f-8586-89bc4ac2fe7e/24",
            "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5cb4ae0e4b97ab11a18e00c7/0c3fec9a-029d-422f-8586-89bc4ac2fe7e/16",
            "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5cb4ae0e4b97ab11a18e00c7/0c3fec9a-029d-422f-8586-89bc4ac2fe7e/32"
        },
        "displayName": "Atlassian Assist",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=60e5a86a471e61006a4c51fd",
        "accountId": "60e5a86a471e61006a4c51fd",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/33d4f224cd83fc4ec3d32e132209baf4?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-2.png",
            "24x24": "https://secure.gravatar.com/avatar/33d4f224cd83fc4ec3d32e132209baf4?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-2.png",
            "16x16": "https://secure.gravatar.com/avatar/33d4f224cd83fc4ec3d32e132209baf4?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-2.png",
            "32x32": "https://secure.gravatar.com/avatar/33d4f224cd83fc4ec3d32e132209baf4?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-2.png"
        },
        "displayName": "Microsoft Teams for Jira Cloud",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:0867a421-a9ee-4659-801a-bc0ee4a4487e",
        "accountId": "557058:0867a421-a9ee-4659-801a-bc0ee4a4487e",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/ab3787cd0c16633ae050dff9d5ab15fc?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-0.png",
            "24x24": "https://secure.gravatar.com/avatar/ab3787cd0c16633ae050dff9d5ab15fc?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-0.png",
            "16x16": "https://secure.gravatar.com/avatar/ab3787cd0c16633ae050dff9d5ab15fc?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-0.png",
            "32x32": "https://secure.gravatar.com/avatar/ab3787cd0c16633ae050dff9d5ab15fc?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-0.png"
        },
        "displayName": "Slack",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:950f9f5b-3d6d-4e1d-954a-21367ae9ac75",
        "accountId": "557058:950f9f5b-3d6d-4e1d-954a-21367ae9ac75",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/726e9dfb98dfab7231aca0392486818d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJW-2.png",
            "24x24": "https://secure.gravatar.com/avatar/726e9dfb98dfab7231aca0392486818d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJW-2.png",
            "16x16": "https://secure.gravatar.com/avatar/726e9dfb98dfab7231aca0392486818d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJW-2.png",
            "32x32": "https://secure.gravatar.com/avatar/726e9dfb98dfab7231aca0392486818d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJW-2.png"
        },
        "displayName": "Jira Service Management Widget",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5dd64082af96bc0efbe55103",
        "accountId": "5dd64082af96bc0efbe55103",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/675673c3f473815508441d00933b1752?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAI-3.png",
            "24x24": "https://secure.gravatar.com/avatar/675673c3f473815508441d00933b1752?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAI-3.png",
            "16x16": "https://secure.gravatar.com/avatar/675673c3f473815508441d00933b1752?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAI-3.png",
            "32x32": "https://secure.gravatar.com/avatar/675673c3f473815508441d00933b1752?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAI-3.png"
        },
        "displayName": "Alert Integration",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:214cdd6a-ff93-4d8b-838b-62dfcf1a2a71",
        "accountId": "557058:214cdd6a-ff93-4d8b-838b-62dfcf1a2a71",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/5f14d72ea4c4ebb05e46175191444f71?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-2.png",
            "24x24": "https://secure.gravatar.com/avatar/5f14d72ea4c4ebb05e46175191444f71?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-2.png",
            "16x16": "https://secure.gravatar.com/avatar/5f14d72ea4c4ebb05e46175191444f71?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-2.png",
            "32x32": "https://secure.gravatar.com/avatar/5f14d72ea4c4ebb05e46175191444f71?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-2.png"
        },
        "displayName": "Trello",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5b6c7b3afbc68529c6c47967",
        "accountId": "5b6c7b3afbc68529c6c47967",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/1ac15886f45477da1a8230e3c52df31e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSJ-2.png",
            "24x24": "https://secure.gravatar.com/avatar/1ac15886f45477da1a8230e3c52df31e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSJ-2.png",
            "16x16": "https://secure.gravatar.com/avatar/1ac15886f45477da1a8230e3c52df31e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSJ-2.png",
            "32x32": "https://secure.gravatar.com/avatar/1ac15886f45477da1a8230e3c52df31e?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FSJ-2.png"
        },
        "displayName": "Statuspage for Jira",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5cf112d31552030f1e3a5905",
        "accountId": "5cf112d31552030f1e3a5905",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/92dbb0e2c4bdf7a4e079ce410ddb6029?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJS-2.png",
            "24x24": "https://secure.gravatar.com/avatar/92dbb0e2c4bdf7a4e079ce410ddb6029?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJS-2.png",
            "16x16": "https://secure.gravatar.com/avatar/92dbb0e2c4bdf7a4e079ce410ddb6029?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJS-2.png",
            "32x32": "https://secure.gravatar.com/avatar/92dbb0e2c4bdf7a4e079ce410ddb6029?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FJS-2.png"
        },
        "displayName": "Jira Spreadsheets",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=63a22fb348b367d78a14c15b",
        "accountId": "63a22fb348b367d78a14c15b",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/22d8b94cf93cb1e0e47e16960c8ac093?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FPM-0.png",
            "24x24": "https://secure.gravatar.com/avatar/22d8b94cf93cb1e0e47e16960c8ac093?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FPM-0.png",
            "16x16": "https://secure.gravatar.com/avatar/22d8b94cf93cb1e0e47e16960c8ac093?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FPM-0.png",
            "32x32": "https://secure.gravatar.com/avatar/22d8b94cf93cb1e0e47e16960c8ac093?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FPM-0.png"
        },
        "displayName": "Proforma Migrator",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=630db2cd9796033b256bc349",
        "accountId": "630db2cd9796033b256bc349",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/630db2cd9796033b256bc349/4f3c075d-f5e0-4bef-a0c8-81181a2e1b5d/48",
            "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/630db2cd9796033b256bc349/4f3c075d-f5e0-4bef-a0c8-81181a2e1b5d/24",
            "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/630db2cd9796033b256bc349/4f3c075d-f5e0-4bef-a0c8-81181a2e1b5d/16",
            "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/630db2cd9796033b256bc349/4f3c075d-f5e0-4bef-a0c8-81181a2e1b5d/32"
        },
        "displayName": "Atlas for Jira Cloud",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5b70c8b80fd0ac05d389f5e9",
        "accountId": "5b70c8b80fd0ac05d389f5e9",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/7d674fbf0569d8bdd3f2c19ae5b4462a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCN-5.png",
            "24x24": "https://secure.gravatar.com/avatar/7d674fbf0569d8bdd3f2c19ae5b4462a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCN-5.png",
            "16x16": "https://secure.gravatar.com/avatar/7d674fbf0569d8bdd3f2c19ae5b4462a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCN-5.png",
            "32x32": "https://secure.gravatar.com/avatar/7d674fbf0569d8bdd3f2c19ae5b4462a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCN-5.png"
        },
        "displayName": "Chat Notifications",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:cbc04d7b-be84-46eb-90e4-e567aa5332c6",
        "accountId": "557058:cbc04d7b-be84-46eb-90e4-e567aa5332c6",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/189be88917ebf55b8c24642ca8bb3f38?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-3.png",
            "24x24": "https://secure.gravatar.com/avatar/189be88917ebf55b8c24642ca8bb3f38?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-3.png",
            "16x16": "https://secure.gravatar.com/avatar/189be88917ebf55b8c24642ca8bb3f38?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-3.png",
            "32x32": "https://secure.gravatar.com/avatar/189be88917ebf55b8c24642ca8bb3f38?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-3.png"
        },
        "displayName": "Confluence Analytics (System)",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=6035864ce2020c0070b5285b",
        "accountId": "6035864ce2020c0070b5285b",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/97d907f7217b38ccb2fba859c551db35?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-4.png",
            "24x24": "https://secure.gravatar.com/avatar/97d907f7217b38ccb2fba859c551db35?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-4.png",
            "16x16": "https://secure.gravatar.com/avatar/97d907f7217b38ccb2fba859c551db35?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-4.png",
            "32x32": "https://secure.gravatar.com/avatar/97d907f7217b38ccb2fba859c551db35?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMC-4.png"
        },
        "displayName": "Microsoft Teams for Confluence Cloud",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5d9afe0010f4800c341a2bba",
        "accountId": "5d9afe0010f4800c341a2bba",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/7864acb4bb3d9580f3f392b7fe2bead6?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-1.png",
            "24x24": "https://secure.gravatar.com/avatar/7864acb4bb3d9580f3f392b7fe2bead6?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-1.png",
            "16x16": "https://secure.gravatar.com/avatar/7864acb4bb3d9580f3f392b7fe2bead6?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-1.png",
            "32x32": "https://secure.gravatar.com/avatar/7864acb4bb3d9580f3f392b7fe2bead6?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-1.png"
        },
        "displayName": "Opsgenie Incident Timeline",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=5d9b2860cd50b80dcea8a5b7",
        "accountId": "5d9b2860cd50b80dcea8a5b7",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/a3f534eca2fc5dc81bf31edec3adee37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-3.png",
            "24x24": "https://secure.gravatar.com/avatar/a3f534eca2fc5dc81bf31edec3adee37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-3.png",
            "16x16": "https://secure.gravatar.com/avatar/a3f534eca2fc5dc81bf31edec3adee37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-3.png",
            "32x32": "https://secure.gravatar.com/avatar/a3f534eca2fc5dc81bf31edec3adee37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FOT-3.png"
        },
        "displayName": "Opsgenie Incident Timeline",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=6326e30c14c6b4b221099d1f",
        "accountId": "6326e30c14c6b4b221099d1f",
        "accountType": "atlassian",
        "avatarUrls": {
            "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6326e30c14c6b4b221099d1f/44ebd7c6-09e8-4495-912e-b833c6dcfeb7/48",
            "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6326e30c14c6b4b221099d1f/44ebd7c6-09e8-4495-912e-b833c6dcfeb7/24",
            "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6326e30c14c6b4b221099d1f/44ebd7c6-09e8-4495-912e-b833c6dcfeb7/16",
            "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6326e30c14c6b4b221099d1f/44ebd7c6-09e8-4495-912e-b833c6dcfeb7/32"
        },
        "displayName": "Soumitro Datta",
        "active": true,
        "locale": "en_US"
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=557058:d6b5955a-e193-41e1-b051-79cdb0755d68",
        "accountId": "557058:d6b5955a-e193-41e1-b051-79cdb0755d68",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/53e3e37950768a905d53cebdfcbd63e3?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-1.png",
            "24x24": "https://secure.gravatar.com/avatar/53e3e37950768a905d53cebdfcbd63e3?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-1.png",
            "16x16": "https://secure.gravatar.com/avatar/53e3e37950768a905d53cebdfcbd63e3?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-1.png",
            "32x32": "https://secure.gravatar.com/avatar/53e3e37950768a905d53cebdfcbd63e3?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FT-1.png"
        },
        "displayName": "Trello",
        "active": true
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=712020:4370b406-6d80-427b-b27b-4c79bd337e94",
        "accountId": "712020:4370b406-6d80-427b-b27b-4c79bd337e94",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/51e9713b43ca226eb34e44f128d09cef?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FO-6.png",
            "24x24": "https://secure.gravatar.com/avatar/51e9713b43ca226eb34e44f128d09cef?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FO-6.png",
            "16x16": "https://secure.gravatar.com/avatar/51e9713b43ca226eb34e44f128d09cef?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FO-6.png",
            "32x32": "https://secure.gravatar.com/avatar/51e9713b43ca226eb34e44f128d09cef?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FO-6.png"
        },
        "displayName": "oik",
        "active": false
    },
    {
        "self": "https://nuvs.atlassian.net/rest/api/3/user?accountId=712020:aace4503-5a84-4347-a8ad-09ada7f9a9ba",
        "accountId": "712020:aace4503-5a84-4347-a8ad-09ada7f9a9ba",
        "accountType": "app",
        "avatarUrls": {
            "48x48": "https://secure.gravatar.com/avatar/4b66d320d0cd956b6298a973cac64a50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-1.png",
            "24x24": "https://secure.gravatar.com/avatar/4b66d320d0cd956b6298a973cac64a50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-1.png",
            "16x16": "https://secure.gravatar.com/avatar/4b66d320d0cd956b6298a973cac64a50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-1.png",
            "32x32": "https://secure.gravatar.com/avatar/4b66d320d0cd956b6298a973cac64a50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FS-1.png"
        },
        "displayName": "spothelp",
        "active": true
    }
];
export default Devtools;