import ButtonGroup from "@atlaskit/button/button-group";
import { LoadingButton } from "@atlaskit/button";
import React, { useEffect, useState, useCallback } from "react";
import { invoke } from "@forge/bridge";
import SectionTitle from "../components/section-title";
import Toggle from "@atlaskit/toggle";
import Table from "../components/table";
import { capitaliseFirstLetterCase } from "../helpers";
import HolidayModal from "../components/modals/holiday-modal";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import { ensureArray } from "../helpers";
import moment from "moment";

const ActionsContent = (props) => {
  const { handleModalOpen, refreshHolidays } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteAllHolidays = () => {
    setIsDeleting(true)
    invoke("deleteHolidays").then(() => {
      setIsDeleting(false);
      refreshHolidays();
    });
  };

  return (
    <ButtonGroup>
      <LoadingButton appearance="primary" onClick={handleModalOpen}>
        Add holiday
      </LoadingButton>
      <LoadingButton onClick={deleteAllHolidays} isLoading={isDeleting}>
        Revoke all holidays
      </LoadingButton>
    </ButtonGroup>
  );
};

const mapWeeklyHolidayDataToTable = (settings, setSettings) => {
  const weeklyHolidays = settings.holidays.weekly;
  const daysOfTheWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return daysOfTheWeek.map((dayofTheWeek) => {
    return {
      day: dayofTheWeek.charAt(0).toUpperCase() + dayofTheWeek.slice(1),
      value: (
        <>
          <Toggle
            id="toggle-default"
            isChecked={weeklyHolidays[dayofTheWeek] ?? false}
            onChange={() => {
              // set settings here
              setSettings((settings) => ({
                ...settings,
                holidays: {
                  ...settings.holidays,
                  weekly: {
                    ...settings.holidays.weekly,
                    [dayofTheWeek]: !weeklyHolidays[dayofTheWeek],
                  },
                },
              }));
            }}
          />
        </>
      ),
    };
  });
};

const mapHolidaysToTable = (holidays) => {
  if (!holidays || ensureArray(holidays).length === 0) return;
  return ensureArray(holidays).map((holiday) => ({
    holiday_name: capitaliseFirstLetterCase(holiday?.holiday_name),
    date: moment(holiday?.date).format("dddd, MMMM Do YYYY"),
  }));
};

const HolidaysSection = (props) => {
  const { settings, setSettings, isLoading } = props;
  const [holidays, setHolidays] = useState();
  const [isHolidaysLoading, setHolidaysLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    invoke("getHolidays").then((data) => {
      setHolidays(data);
      setHolidaysLoading(false);
    });
  }, []);

  const refreshHolidays = () => {
    setHolidaysLoading(true);
    invoke("getHolidays").then((data) => {
      setHolidays(data);
      setHolidaysLoading(false);
    });
  };

  const weeklyHolidayColumns = [
    {
      title: "Day",
      accessorKey: "day",
      width: 400,
    },
    {
      title: "",
      accessorKey: "value",
      width: 100,
    },
  ];
  const holidaysColumns = [
    {
      title: "Holiday Name",
      accessorKey: "holiday_name",
      width: 400,
    },
    {
      title: "Date",
      accessorKey: "date",
      width: 500,
    },
  ];
  const weeklyData = settings
    ? mapWeeklyHolidayDataToTable(settings, setSettings)
    : undefined;
  return (
    <>
      <SectionTitle
        title={"Holidays"}
        subTitle={`A list of holidays which will trigger a sweet A.I. generated message for
        your customers.`}
        buttonComponent={
          <ActionsContent
            handleModalOpen={handleOpen}
            refreshHolidays={refreshHolidays}
          />
        }
      />
      <div className="d-flex" style={{ width: "100%" }}>
        <div className="col-5 me-4">
          <Table
            columns={weeklyHolidayColumns}
            data={weeklyData}
            loading={isLoading}
          />
        </div>
        <div className="col-6">
          <Table
            columns={holidaysColumns}
            data={mapHolidaysToTable(holidays)}
            loading={isHolidaysLoading}
          />
        </div>
      </div>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={handleClose}>
            <HolidayModal
              handleClose={handleClose}
              refreshHolidays={refreshHolidays}
            />
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default HolidaysSection;
