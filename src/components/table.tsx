import { Component, For, JSX, ParentComponent } from "solid-js";

type TableColType = {
  title: string | JSX.Element;
  size: number;
};

export const TableRow: ParentComponent<
  JSX.HTMLAttributes<HTMLTableRowElement>
> = (props) => {
  return (
    <tr
      classList={{
        "border-b border-skin-neutral-40 last:border-b-0 [&_td]:py-4 [&_td]:px-6":
          true,
        [props.class ?? ""]: !!props.class,
      }}
      {...props}
    >
      {props.children}
    </tr>
  );
};

export const Table: ParentComponent<
  JSX.HTMLAttributes<HTMLTableElement> & {
    tableColumns: TableColType[];
  }
> = (props) => {
  return (
    <table
      classList={{
        "w-full rounded-lg table-fixed table-border max-w-4xl mx-auto": true,
        [props.class ?? ""]: !!props.class,
      }}
      {...props}
    >
      <colgroup>
        <For each={props.tableColumns}>
          {(col) => <col style={{ width: `${col.size}%` }} />}
        </For>
      </colgroup>
      <thead class="border-b border-skin-neutral-50">
        <tr>
          <For each={props.tableColumns}>
            {(col) => (
              <th class="py-4 px-6 text-left text-skin-neutral-80 text-xs uppercase font-semibold">
                {col.title}
              </th>
            )}
          </For>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
