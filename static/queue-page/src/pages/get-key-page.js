import { HelperMessage } from "@atlaskit/form";
import React, { useState } from "react";
import { invoke } from "@forge/bridge";
import Form, { Field } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { LoadingButton } from "@atlaskit/button";

const GetKey = (props) => {
  const { refreshHome } = props;
  const [isLoading, setLoading] = useState(false);
  const [isFailed, setFailed] = useState(false);
  return (
    <div className="cover-container">
      <div className="cover-card">
      <div className="get-key-title">{"Please provide us with your Open A.I key"}</div>
        <Form
          onSubmit={(value) => {
            setLoading(true);
            if (value?.key === "") {
              setLoading(false);
              setFailed(true);
              return;
            } else {
              invoke("setOpenAi", {
                value: value.key,
              })
                .then(() => {
                  setLoading(false);
                  refreshHome();
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
              <Field label="Open A.I. API key" name="key" defaultValue="">
                {({ fieldProps }) => (
                  <>
                    <Textfield
                      autoComplete="off"
                      type="password"
                      isRequired
                      {...fieldProps}
                    />
                    <HelperMessage>
                      Please provide an Open AI API key.
                    </HelperMessage>
                  </>
                )}
              </Field>
              <div className="mt-3">
                <LoadingButton
                  type="submit"
                  form="form-with-id"
                  appearance={isFailed ? "danger" : "primary"}
                  isLoading={isLoading}
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default GetKey;
