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
import { DatePicker } from "@atlaskit/datetime-picker";
import { invoke } from "@forge/bridge";

const HolidayModal = (props) => {
  const { handleClose, refreshHolidays } = props;
  const [isLoading, setLoading] = useState(false);
  const [isFailed, setFailed] = useState(false);
  return (
    <Form
      onSubmit={(value) => {
        if (
          !value["holidayName"] ||
          value["holidayName"]?.trim() === "" ||
          !value["date"]
        ) {
          setFailed(true);
          return;
        }
        setFailed(false);
        setLoading(true);
        const dateInSystem = new Date(new Date(value["date"]).getTime() - (new Date()).getTimezoneOffset()*60*1000);
        const holiday = {
          holiday_name: value["holidayName"].trim(),
          date: dateInSystem,
        };
        invoke("setHolidays", {value: holiday})
          .then((data) => {
            setLoading(false);
            refreshHolidays();
            handleClose();
          })
          .catch(() => {
            console.error("Unable to set Holidays!");
            setLoading(false);
            setFailed(true);
          });
      }}
    >
      {({ formProps }) => (
        <form id="form-with-id" {...formProps}>
          <ModalHeader>
            <ModalTitle>Add Holiday</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Field label="Holiday Name" name="holidayName" defaultValue="">
              {({ fieldProps }) => (
                <Textfield
                  autoComplete="off"
                  placeholder="Christmas"
                  {...fieldProps}
                />
              )}
            </Field>

            <Field label="Date" name="date">
              {({ fieldProps }) => (
                <DatePicker
                  {...fieldProps}
                  selectProps={{ inputId: fieldProps.id }}
                />
              )}
            </Field>
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

export default HolidayModal;
