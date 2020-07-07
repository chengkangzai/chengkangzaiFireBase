var data = [{
        id: 1,
        name: "Name111",
        email: "Email111@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 2,
        name: "Name222",
        email: "Email222@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 3,
        name: "Name333",
        email: "Email333@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 4,
        name: "Name444",
        email: "Email444@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 5,
        name: "Name555",
        email: "Email555@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 6,
        name: "Name666",
        email: "Email666@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    },
    {
        id: 7,
        name: "Name777",
        email: "Email777@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    }, {
        id: 8,
        name: "Name888",
        email: "Email888@email.com",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iL12gXXoS9IorW6SNe6xBQHaEK%26pid%3DApi&f=1",
        money: Math.round(Math.random() * 10000)
    }
];
makeTable("lol", data)

//1. Prepare table container 
function makeTable(tableName, data = []) {
    var head = [];

    function generateHead() {
        var headerTd = [];
        Object.entries(data[0]).forEach((key) => {
            let value = key[0]
            dom = `<th>${value}</th>`;
            headerTd.push(dom);
            head.push(value);
        })
        headerTd.push("<th>action</th>");
        return headerTd;
    }

    function generateBody() {
        var bodyTd = [];
        //TODO auto generate by the key given in head...
        data.forEach((value) => {
            var dom = `
            <tr>
            <td>${value.id}</td>
            <td>${value.name}</td>
            <td>${value.email}</td>
            <td><img src="${value.image}" style="width:100px" /></td>
            <td>${value.money}</td>
            <td>
                <a href="#editModal" class="btn btn-primary">Edit</a>
                <a href="#deleteModal" class="btn btn-danger">Delete</a>
            </td>
            </tr>
            `;
            bodyTd.push(dom);
        })
        return bodyTd;
    }
    var thead = generateHead().join("");
    var tbody = generateBody().join("");

    var tableDom = `
    <table id="table-${tableName}" class="table table-hover table-primary">
        <thead>
            <tr>
                ${thead}
            </tr>
        </thead>
        <tbody id="tbody-${tableName}">
            ${tbody}
        </tbody>
    </table>    `;
    console.log(tableDom);
    $("#tableContainer").append(tableDom);

    const Dtableconfig = {
        dom: 'Bfrtip',
        lengthMenu: [
            [5, 10, 25, -1],
            ['5 rows', '10rows', '25 rows', 'Show all']
        ],
        buttons: [
            'colvis', 'pageLength',
            {
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: 'collection',
                text: 'Report',
                buttons: ['copy', 'csv', 'excel', 'pdf']
            }
        ]
    }
    $(`#table-${tableName}`).DataTable(Dtableconfig);
}


//1.1 Table container Generator
//2. Append Data 
//2.1 Data Renderer
//3 Create Data Table
//3. DT config
//4. Function Handler