import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import SectionTitle from "../parts/section-title/section-title";
import Toggle from "@atlaskit/toggle";
import Table from "../parts/table/table";
import { capitaliseFirstLetterCase } from "../helpers";
import moment from "moment";

const ActionsContent = () => (
  <ButtonGroup>
    <Button appearance="primary">Add holiday</Button>
    <Button>Revoke all holidays</Button>
  </ButtonGroup>
);

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
  return holidays?.map((holiday) => ({
    holiday_name: capitaliseFirstLetterCase(holiday.holiday_name),
    date: moment(holiday.date).format("dddd, MMMM Do YYYY"),
  }));
};

const HolidaysSection = (props) => {
  const { settings, setSettings, isLoading } = props;
  const [holidays, setHolidays] = useState();
  const [isHolidaysLoading, setHolidaysLoading] = useState(true);

  useEffect(() => {
    invoke("getHolidays").then((data) => {
      setHolidays(data);
      setHolidaysLoading(false);
    });
  }, []);

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
        buttonComponent={<ActionsContent />}
      />
      <div className="d-flex" style={{ width: "100%" }}>
        <div className="col-6 me-4">
          <Table
            columns={holidaysColumns}
            data={mapHolidaysToTable(holidays)}
            loading={isHolidaysLoading}
          />
        </div>
        <div className="col-5">
          <Table
            columns={weeklyHolidayColumns}
            data={weeklyData}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default HolidaysSection;
