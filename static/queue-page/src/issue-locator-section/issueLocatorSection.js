import React, { useState, useEffect } from "react";
import { invoke } from "@forge/bridge";
import InputLabelWrapper from "../parts/input-label/inputLabel";
import SectionTitle from "../parts/section-title/section-title";
import Toggle from "@atlaskit/toggle";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table from "../parts/table/table";
import { capitaliseFirstLetterCase } from "../helpers";

const maptoIssuesTable = (data) => {
  return data?.map((item) => ({
    teamName: capitaliseFirstLetterCase(item.team_name),
    assigneeName: item.assignee.displayName,
    jiraProject: item.jira.location.projectKey,
    conflenceTitle: item.confluence.title,
  }));
};

const IssueActionsContent = () => (
  <ButtonGroup>
    <Button appearance="primary">Link Jira Project</Button>
  </ButtonGroup>
);

const IssueLocatorSection = (props) => {
  const { settings, setSettings, isLoading } = props;
  const [locatorData, setLocatorData] = useState();
  const [islocatorLoading, setLocatorLoading] = useState(true);

  useEffect(() => {
    invoke("getAiIssueLocator").then((data) => {
      console.log(JSON.stringify(data, null, 2));
      setLocatorData(maptoIssuesTable(data));
      setLocatorLoading(false);
    });
  }, []);

  const locatorDataColumns = [
    {
      title: "Team Name",
      accessorKey: "teamName",
      width: 400,
    },
    {
      title: "Assignee Name",
      accessorKey: "assigneeName",
      width: 400,
    },
    {
      title: "Jira Project",
      accessorKey: "jiraProject",
      width: 200,
    },
    {
      title: "Linked Confluence",
      accessorKey: "conflenceTitle",
      width: 400,
    },
  ];

  const contentLoaded = (
    <InputLabelWrapper label={`Auto translate JIRA ticket in english`}>
      <Toggle
        id="toggle-default"
        isChecked={
          settings?.auto_ticket_locator?.auto_translate_english ?? false
        }
        onChange={() => {
          setSettings((settings) => ({
            ...settings,
            auto_ticket_locator: {
              ...settings.auto_ticket_locator,
              auto_translate_english:
                !settings?.auto_ticket_locator?.auto_translate_english,
            },
          }));
        }}
      />
    </InputLabelWrapper>
  );
  const stillLoading = <Skeleton width={"50%"} />;
  return (
    <>
      <SectionTitle
        title={"Issue Locator"}
        subTitle={`Configure your teams here, for our A.I. to forward customer issues automatically.`}
        buttonComponent={<IssueActionsContent />}
      />
      <div className="d-flex mb-4" style={{ width: "100%" }}>
        <Table
          columns={locatorDataColumns}
          data={locatorData}
          loading={islocatorLoading}
        />
      </div>
      {isLoading ? stillLoading : contentLoaded}
    </>
  );
};

export default IssueLocatorSection;
