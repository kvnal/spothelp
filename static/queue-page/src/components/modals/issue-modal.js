import React, { useState } from "react";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@atlaskit/modal-dialog";
import { LoadingButton } from "@atlaskit/button";
import Form, { Field } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { AsyncSelect } from "@atlaskit/select";
import { invoke } from "@forge/bridge";
import { ensureArray } from "../../helpers";

const IssueModal = (props) => {
  const { handleClose, refreshLocator } = props;
  const [isLoading, setLoading] = useState(false);
  const [isFailed, setFailed] = useState(false);

  const loadJiraBoards = async (inputValue) => {
    try {
      const boards = ensureArray(
        await invoke("getJiraBoards")
      )?.[0]?.values?.filter((value) =>
        value?.name?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      return boards?.map((board) => ({
        label: (
          <div className="py-1">
            <div>{board?.name}</div>
            <div className="sub-option">
              {"Project: "}
              {board?.location?.displayName}
            </div>
          </div>
        ),
        value: board,
      }));
    } catch (err) {
      console.error("No Users Found");
      return [];
    }
  };

  const loadConfluenceWikis = async (inputValue) => {
    try {
      const wikis = ensureArray(
        await invoke("getConfluenceWikis")
      )?.[0]?.results?.filter((value) =>
        value?.title?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      return wikis?.map((wiki) => ({
        label: wiki?.title,
        value: wiki,
      }));
    } catch (err) {
      console.error("No Users Found");
      return [];
    }
  };

  const loadUserOptions = async (inputValue) => {
    try {
      const users = ensureArray(await invoke("getUsers"))?.filter((value) =>
        value?.displayName?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );

      return users?.map((user) => ({
        label: user?.displayName,
        value: user,
      }));
    } catch (err) {
      console.error("No Users Found");
      return [];
    }
  };

  return (
    <Form
      onSubmit={(value) => {
        setLoading(true);
        if (
          value?.team_name === "" ||
          !value?.jira?.value ||
          !value?.confluence?.value ||
          !value?.assignee?.value
        ) {
          setLoading(false);
          setFailed(true);
          return;
        } else {
          console.log({
            team_name: value.team_name,
            jira: value.jira.value,
            confluence: value.confluence.value,
            assignee: value.assignee.value,
          });
          invoke("setAiIssueLocator", {
            value: {
              team_name: value.team_name,
              jira: value.jira.value,
              confluence: value.confluence.value,
              assignee: value.assignee.value,
            },
          })
            .then(() => {
              setLoading(false);
              refreshLocator();
              handleClose();
            })
            .catch(() => {
              console.error("Unable to set Issue Endpoint!");
              setLoading(false);
              setFailed(true);
            });
        }
      }}
    >
      {({ formProps }) => (
        <form id="form-with-id" {...formProps}>
          <ModalHeader>
            <ModalTitle>Link Project Board</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Field label="Team Name" name="team_name" defaultValue="">
              {({ fieldProps }) => (
                <Textfield
                  autoComplete="off"
                  placeholder="Backend Team"
                  isRequired
                  {...fieldProps}
                />
              )}
            </Field>

            <Field label="User" name="assignee">
              {({ fieldProps }) => (
                <AsyncSelect
                  {...fieldProps}
                  defaultOptions={true}
                  loadOptions={loadUserOptions}
                  isRequired
                />
              )}
            </Field>

            <Field label="Jira Board" name="jira">
              {({ fieldProps }) => (
                <AsyncSelect
                  {...fieldProps}
                  defaultOptions={true}
                  loadOptions={loadJiraBoards}
                  isRequired
                />
              )}
            </Field>
            <div className="mb-4">
              <Field
                label="Confluence Wikis"
                name="confluence"
                className="py-2"
              >
                {({ fieldProps }) => (
                  <AsyncSelect
                    {...fieldProps}
                    defaultOptions={true}
                    loadOptions={loadConfluenceWikis}
                    isRequired
                  />
                )}
              </Field>
            </div>
          </ModalBody>
          <ModalFooter>
            <LoadingButton onClick={handleClose} appearance="subtle">
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              form="form-with-id"
              appearance={isFailed ? "danger" : "primary"}
              isLoading={isLoading}
            >
              Submit
            </LoadingButton>
          </ModalFooter>
        </form>
      )}
    </Form>
  );
};

export default IssueModal;
