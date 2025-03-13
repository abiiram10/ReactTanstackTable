
import SimpleTable from './Components/SimpleTable'
import dayjs from "dayjs";
import srcData from "./data.json"

function App() {
  let columnas = [
    {
      header: "ID",
      accessorKey: 'id'
    },
    // {
    //     header: "Nombre",
    //     accessorKey: 'first_name',
    //     accessorFn: (row: any) => `${row.first_name} ${row.last_name} `
    // }, 
    {
      header: "Nombre",
      accessorKey: 'first_name'
    },
    {
      header: "Apellido",
      accessorKey: 'last_name'
    },
    {
      header: "Email",
      accessorKey: 'email'
    },
    {
      header: "Pais",
      accessorKey: 'country'
    }
    ,
    {
      header: "Fecha nacimiento",
      accessorKey: 'dateBD',
      cell: (info: any) => {
        return dayjs(info.getValue()).format("DD/MM/YYYY")
      }
    }

  ]


  return (
    <>
      <div>

        <SimpleTable data={srcData} columns={columnas}>

        </SimpleTable>



      </div>
    </>
  )
}

export default App
