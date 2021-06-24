const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let users = [];


getUsers();
getUsers();
getUsers();



async function getUsers() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];
  
    const newUser = {
        name: `${user.name.first}  ${user.name.last}`,
        money: Math.floor(Math.random() *1000000)
    }
    addUser(newUser)
}

function sortByRichest() {
    users.sort((a,b) => b.money - a.money );
    updateDOM();
}

//filter millionairs
function showMillionairs(){
     users = users.filter(user => user.money > 1000000);
     updateDOM(users);
}
// entire wealth

function calculateWealth() {
    const wealth = users.reduce((acc, user) => (acc + user.money), 0)
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

}


function addUser(obj) {
    users.push(obj)
    updateDOM()
    console.log(users)
}

function updateDOM(providedData =users){
    //clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
    
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    })
}


//format money from https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(money) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getUsers)

doubleBtn.addEventListener('click', () => {
    users = users.map(user => {
        return { ...user, money: user.money*2 }
    })
    updateDOM(users)
    
})

sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionairs)
calculateWealthBtn.addEventListener('click', calculateWealth)