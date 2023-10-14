import React, { useState, useEffect, useCallback } from "react";
import { invoke } from "@forge/bridge";
import InputLabelWrapper from "../components/inputLabel";
import SectionTitle from "../components/section-title";
import Toggle from "@atlaskit/toggle";
import ButtonGroup from "@atlaskit/button/button-group";
import { LoadingButton } from "@atlaskit/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table from "../components/table";
import { capitaliseFirstLetterCase } from "../helpers";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import IssueModal from "../components/modals/issue-modal";
import { ensureArray } from "../helpers";

const maptoIssuesTable = (data) => {
  if (!data || ensureArray(data).length === 0) return;
  return ensureArray(data)?.map((item) => ({
    teamName: capitaliseFirstLetterCase(item.team_name),
    assigneeName: item.assignee.displayName,
    jiraProject: item.jira.name,
    conflenceTitle: item.confluence.title,
  }));
};

const IssueActionsContent = (props) => {
  const { handleOpen, refreshLocator } = props;

  const [isDeleting, setIsDeleting] = useState(false);
  const deleteAllIssues = () => {
    setIsDeleting(true);
    invoke("deleteAiIssueLocator").then(() => {
      setIsDeleting(false);
      refreshLocator();
    });
  };

  return (
    <ButtonGroup>
      <LoadingButton appearance="primary" onClick={handleOpen}>
        Link Jira Project
      </LoadingButton>
      <LoadingButton onClick={deleteAllIssues} isLoading={isDeleting}>
        Remove all linked boards
      </LoadingButton>
    </ButtonGroup>
  );
};

const IssueLocatorSection = (props) => {
  const { settings, setSettings, isLoading } = props;
  const [locatorData, setLocatorData] = useState();
  const [islocatorLoading, setLocatorLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    invoke("getAiIssueLocator").then((data) => {
      setLocatorData(maptoIssuesTable(data));
      setLocatorLoading(false);
    });
  }, []);

  const refreshLocator = () => {
    setLocatorLoading(true);
    invoke("getAiIssueLocator").then((data) => {
      setLocatorData(maptoIssuesTable(data));
      setLocatorLoading(false);
    });
  };

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
    <div>
      <SectionTitle
        title={"Issue Locator"}
        subTitle={`Configure your teams here, for our A.I. to forward customer issues automatically.`}
        buttonComponent={
          <IssueActionsContent
            handleOpen={handleOpen}
            refreshLocator={refreshLocator}
          />
        }
      />
      <div className="d-flex mb-4" style={{ width: "100%" }}>
        <Table
          columns={locatorDataColumns}
          data={locatorData}
          loading={islocatorLoading}
        />
      </div>
      {isLoading ? stillLoading : contentLoaded}
      <ModalTransition>
        {isOpen && (
          <Modal onClose={handleClose}>
            <IssueModal
              handleClose={handleClose}
              refreshLocator={refreshLocator}
            />
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
};

export default IssueLocatorSection;
