import React from "react";
import InputLabelWrapper from "../parts/input-label/inputLabel";
import SectionTitle from "../parts/section-title/section-title";
import Toggle from "@atlaskit/toggle";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueActionsContent = () => (
    <ButtonGroup>
      <Button appearance="primary">Link Jira Project</Button>
    </ButtonGroup>
  );

const IssueLocatorSection = (props) => {
  const { settings, setSettings, isLoading } = props;
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
  const stillLoading = <Skeleton width={"50%"}/>;
  return (
    <>
      <SectionTitle
        title={"Issue Locator"}
        subTitle={`Configure your teams here, for our A.I. to forward customer issues automatically.`}
        buttonComponent={<IssueActionsContent />}
      />
      <div className="d-flex" style={{ width: "100%" }}></div>
      {isLoading ? stillLoading : contentLoaded}
    </>
  );
};

export default IssueLocatorSection;