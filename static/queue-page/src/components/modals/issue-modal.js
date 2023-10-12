import React, { useState } from "react";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button/standard-button";
const IssueModal = (props) => {
  const { closeModal } = props;
  const [a, setA] = useState(0);
  return (
    <>
      <ModalHeader>
        <ModalTitle>Duplicate this page</ModalTitle>
      </ModalHeader>
      <ModalBody>Issue Modal Body is here. {a}</ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={closeModal}>
          Cancel
        </Button>
        <Button appearance="primary" onClick={()=>{setA(a+1)}} autoFocus>
          Duplicate
        </Button>
      </ModalFooter>
    </>
  );
};

export default IssueModal;