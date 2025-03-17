import { getUserAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helpers";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import DetailUser from "./detail.user";
import CreateUser from "./create.user";

type TSearch = {
  fullName: string;
  email: string;
  createdAt: Date;
  createdAtRange: Date;
};

const TableUser = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const columns: ProColumns<IUserTable>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "_id",
      dataIndex: "_id",
      hideInSearch: true,
      render(doc, entity) {
        return (
          <a
            onClick={() => {
              setDataViewDetail(entity);
              setOpenViewDetail(true);
            }}
            href="#"
          >
            {entity._id}
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      copyable: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAtRange",
      valueType: "dateRange",
      hideInTable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      hideInSearch: true,
      render: (_, record) => (
        <>
          <Button type="link">✏️</Button>
          <Button type="link" danger>
            🗑
          </Button>
        </>
      ),
    },
  ];

  const refreshTable = () => {
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable<IUserTable, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          let query = "";

          if (params) {
            query += `current=${params.current}&pageSize=${params.pageSize}`;
            if (params.email) {
              query += `&email=/${params.email}/i`;
            }
            if (params.fullName) {
              query += `&fullName=/${params.fullName}/i`;
            }

            const createDateRange = dateRangeValidate(params.createdAtRange);
            if (createDateRange) {
              query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
            }

            // default
            query += `&sort=-createdAt`;

            if (sort && sort.createdAt) {
              query += `&sort=${
                sort.createdAt === "ascend" ? "createdAt" : "-createdAt"
              }`;
            }
          }
          const res = await getUserAPI(query);
          if (res.data) {
            setMeta(res.data.meta);
          }
          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total,
          };
        }}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          pageSizeOptions: ["10", "20", "30"],
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        dateFormatter="string"
        headerTitle="Table user"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModalCreate(true);
            }}
            type="primary"
          >
            Add new
          </Button>,
        ]}
      />
      <DetailUser
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      <CreateUser
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />
    </>
  );
};

export default TableUser;
