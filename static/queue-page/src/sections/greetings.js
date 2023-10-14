import React from "react";
import SectionTitle from "../components/section-title";
import Toggle from "@atlaskit/toggle";
import InputLabelWrapper from "../components/inputLabel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GreetingsSection = (props) => {
  const { settings, setSettings, isLoading } = props;
  const contentLoaded = (
    <>
      <InputLabelWrapper label={`A.I. Greeting on Issue Create`}>
        <Toggle
          id="toggle-default"
          isChecked={
            settings?.ai_greetings_message?.ai_greetings_on_issue_create ??
            false
          }
          onChange={() => {
            // set settings here
            setSettings((settings) => ({
              ...settings,
              ai_greetings_message: {
                ...settings.ai_greetings_message,
                ai_greetings_on_issue_create:
                  !settings.ai_greetings_message.ai_greetings_on_issue_create,
              },
            }));
          }}
        />
      </InputLabelWrapper>
      <InputLabelWrapper
        label={`Greet customers in their own language (Default: English)`}
      >
        <Toggle
          id="toggle-default"
          isChecked={
            settings?.ai_greetings_message?.greet_in_local_language ?? false
          }
          onChange={() => {
            // set settings here
            setSettings((settings) => ({
              ...settings,
              ai_greetings_message: {
                ...settings.ai_greetings_message,
                greet_in_local_language:
                  !settings.ai_greetings_message.greet_in_local_language,
              },
            }));
          }}
        />
      </InputLabelWrapper>
    </>
  );
  const stillLoading = (
    <>
      <Skeleton width={"50%"} />
      <Skeleton width={"50%"} />
    </>
  );
  return (
    <div>
      <SectionTitle
        title={"A.I. Greetings"}
        subTitle={`Our A.I. is designed to greet customers on issue creation and can even greet them in their preferred language, thanks to its language capabilities. Toggle to turn this feature on`}
      />
      {isLoading ? stillLoading : contentLoaded}
    </div>
  );
};

export default GreetingsSection;
