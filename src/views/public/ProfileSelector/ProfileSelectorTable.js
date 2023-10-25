import { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import {  Card } from "reactstrap"

// import ProductList from "../shop/ProductList"

export default function ProfileTable({profileData}) {


const columns = [
  {
    id: 1,
    name: "id",
    selector: (row) => row.id,
    sortable: true,
    reorder: true,
    center: true
  },
  {
    id: 2,
    name: "userName",
    selector: (row) => row.userName,
    sortable: true,
    center: true,
    reorder: true
  },
  {
    id: 3,
    name: "profileName",
    selector: (row) => row.profileName,
    sortable: true,
    center: true,
    reorder: true
  },
  {
    id: 4,
    name: "profileType",
    selector: (row) => row.profileType,
    sortable: true,
    center: true,
    reorder: true
  },  {
    id: 5,
    name: "userId",
    selector: (row) => row.userId,
    sortable: true,
    center: true,
    reorder: true
  },
  {
    id: 6,
    name: "profileId",
    selector: (row) => row.profileId,
    sortable: true,
    center: true,
    reorder: true
  }
]


  return (
  
 
 <Card>
        <DataTable
          title="Movies"
          columns={columns}
          data={profileData}
          defaultSortFieldId={1}

          pagination
          selectableRows
        />
    </Card>

  )
}
