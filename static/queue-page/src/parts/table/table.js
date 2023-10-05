import React from "react";

import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const Table = (props) => {
  const { columns, data, loading } = props;

  const dataLoaded = (
    <>
      {data ? (
        data.map((item) => (
          <Row key={item.id}>
            {columns.map((column) => (
              <Cell key={column.accessorKey}>{item[column.accessorKey]}</Cell>
            ))}
          </Row>
        ))
      ) : (
        <div
          role="row"
          style={{
            padding: "10px",
            textAlign: "center",
            borderBottom: "1px solid #EBECF0",
          }}
        >
          No Data to Display
        </div>
      )}
    </>
  );
  const stillLoading = <Rows items={undefined} />;
  return (
    <TableTree>
      <Headers>
        {columns.map((column) => (
          <Header key={column.accessorKey} width={column.width ?? 200}>
            {column.title}
          </Header>
        ))}
      </Headers>
      {loading ? stillLoading : dataLoaded}
    </TableTree>
  );
};

export default Table;
