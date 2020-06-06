var data = {
    level: 39,
    name: 'JavaScript',
    material: [{
            name: '稀有金属',
            wanted: {
                color: 'purple',
                number: 4,
            },
            have: {
                color: 'purple',
                number: 1
            }
        },
        {
            name: '优质木材',
            wanted: {
                color: 'blue',
                number: 8,
            },
            have: {
                color: 'purple',
                number: 4
            }
        },
        {
            name: '金属',
            wanted: {
                color: 'orange',
                number: 7,
            },
            have: {
                color: 'blue',
                number: 6
            }
        },
    ]
}
var temp = [];
data.material.forEach(element => {
    function calcWhiteBase(num, color) {
        switch (color) {
            case "white":
                whiteBase = num;
                break;
            case "green":
                whiteBase = num * 5;
                break;
            case "blue":
                whiteBase = num * 5 * 5
                break;
            case "purple":
                whiteBase = num * 5 * 5 * 5
                break;
            case "orange":
                whiteBase = num * 5 * 5 * 5 * 5
                break;
        }
        return whiteBase;
    }

    var name = element.name;
    var haveColor = element.have.color;
    var haveNumber = element.have.number;
    var wantedColor = element.wanted.color;
    var wantedNumber = element.wanted.number;

    var percentage = (calcWhiteBase(haveNumber, haveColor) / calcWhiteBase(wantedNumber, wantedColor)) * 100;

    if (percentage >= 100) {
        temp.push(`                    
        <div class="progress m-2">
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="${percentage}" style="width: ${percentage}%">${name}</div>
        </div>`);
    } else if (percentage <= 0) {
        temp.push(`                    
        <div class="progress m-2">
            <div class="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">${name}</div>
        </div>`);
    } else {
        temp.push(`                    
        <div class="progress m-2">
            <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${percentage}%">${name}</div>
        </div>`);
    }
});

console.log(temp.join(""))