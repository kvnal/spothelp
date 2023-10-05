const SectionTitle = (props) => {
  const { title, subTitle, buttonComponent } = props;
  return (
    <>
      <div className="d-flex justify-content-between py-2 mt-2">
        <span style={{ fontSize: "1.4em" }}>{title}</span>
        <div className="float-end d-flex">{buttonComponent}</div>
      </div>
      <div style={{ color: "#44546F" }}>
        {subTitle}
      </div>
    </>
  );
};

export default SectionTitle;
