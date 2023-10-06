import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import React from "react";
import SectionTitle from "../parts/section-title/section-title";
import Toggle from "@atlaskit/toggle";
import Table from "../parts/table/table";

const ActionsContent = () => (
  <ButtonGroup>
    <Button appearance="primary">Add holiday</Button>
    <Button>Revoke all holidays</Button>
  </ButtonGroup>
);

const mapHolidayDataToTable = (settings, setSettings) => {
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

const HolidaysSection = (props) => {
  const { settings, setSettings, isLoading } = props;

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
  const weeklyData = settings
    ? mapHolidayDataToTable(settings, setSettings)
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
        <div className="col-6"></div>
        <div className="col-6">
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
